"use server"

import { generateOtp } from "@/lib/otp";
import { prisma } from "@/lib/prisma"
import bcrypt from "bcrypt";
import { OtpTemplate } from "../emailTemplates/OtpTemplate";
import { transporter } from "@/lib/transporter";

export const registerAction =  async( prevState:{ message: string, isSuccess: boolean, email?:string}, formData: FormData,) =>{
    const email = formData?.get("email") as string
    const firstName = formData.get("firstName") as string
    const lastName = formData.get("lastName") as string
    const password = formData.get("password") as string
    const gender = formData.get("gender") as string

    const isUserExist = await prisma.user.findUnique({
        where:{
            email:email
        }
    });
    
    if(isUserExist){
        return {message:"User already register", isSuccess: false, email:""}
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    const generatedOTP:number = generateOtp();
    if(hashedPassword){  
        const userInfo = {
        firstName,
        lastName,
        password: hashedPassword,
        gender,
        email,
        Otp: generatedOTP
    }
    
    const otpHtml = OtpTemplate(generatedOTP);

    const newUser = await prisma.user.create({data: userInfo});
    if(newUser){
     
    let message = {
        from: 'noreply',
        to: `${email}`,
        subject: 'Blog-app OTP Verification',
        html: otpHtml 
    };

    transporter.sendMail(message, (err, info)=>{
        if(err){
            console.log('Error occurred. ' + err.message);
        }
    })
    return {message:"User Created successfully", isSuccess: true, email:email}
    }
   }
    return {message: "something went wrong!", isSuccess: false, email:""}
}

export const otpVerificationAction = async( prevState:{ message: string, isSuccess: boolean}, formData: FormData,)=>{
    console.log(formData, 61)
   return {message:"", isSuccess:false}
}
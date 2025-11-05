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

export const otpVerificationAction = async( prevState:{ message: string, isSuccess: boolean, email?:string | null }, formData: FormData,)=>{
    
    const email = prevState.email as string
    const otp = formData.get("otp") as string

    const user = await prisma.user.findUnique({
        where:{ email }
    }) 
    if(!user){
        return {message:"User not found", isSuccess:false, email:""}
    }
    if(user.Otp !== Number(otp)){
        return {message:"Invaild otp", isSuccess:false, email:""}
    }
    const updateUser = await prisma.user.update({
        where:{ email},
        data:{ Otp: null, isActive: true, updatedAt: new Date() }
    })
    if(updateUser){
       return {message:"User Reqistered Successfully", isSuccess:true, email:email}
    }
     return {message:"Faliled to update the user", isSuccess:false, email:email}
}

export const forgotpasswordAction = async( prevState:{ message: string, isSuccess: boolean }, formData: FormData,)=>{
   const email = formData.get("email") as string

   const generatedotp:number = generateOtp();
   const user = await prisma.user.update({
    where:{ email},
    data:{ Otp: generatedotp}
   })

   if(!user){
    return {message:"User not found", isSuccess:false}
   }
   const otpHtml = OtpTemplate(generatedotp);

   if(user){

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
    return {message:"OTP sent to your email", isSuccess:true}
   }
   return {message:"Something went wrong", isSuccess:false}
}

export const resetPasswordAction = async( prevState:{ message: string, isSuccess: boolean, email?:string}, formData: FormData,)=>{
    const email = prevState.email as string;
    const newpassword = formData.get("newPassword") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    const userdetails = await prisma.user.findUnique({
        where:{ email }
    }) 

    if(newpassword !== userdetails?.password){
        return {message: "Use Different Password ", isSuccess:false, email:""}
    }

    if(newpassword !== confirmPassword){
        return {message: "Passwords do not match", isSuccess:false, email:""}
    }

    const hashedPassword = bcrypt.hashSync(newpassword, 10);
    const user = await prisma.user.update({
        where:{ email},
        data:{ password: hashedPassword}
    })
    if(user){
        return {message:"Password reset successfully", isSuccess:true, email:email}
    }
    return {message:"Something went wrong", isSuccess:false, email:""}
}

export const signInAction = async( prevState:{ message: string, isSuccess: boolean,}, formData: FormData,)=>{
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const user = await prisma.user.findUnique({
        where:{ email }
    });

    console.log(user, 155)
    if(!user){
        return {message:"User not found", isSuccess:false}
    }
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if(!isPasswordValid){
        return {message:"Invalid password", isSuccess:false}
    }
    return {message:"Sign In Successful", isSuccess:true}
}

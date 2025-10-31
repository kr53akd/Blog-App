"use server"

import { generateOtp } from "@/lib/otp";
import { prisma } from "@/lib/prisma"
import bcrypt from "bcrypt";
import { OtpTemplate } from "../emailTemplates/OtpTemplate";

export const registerAction =  async( prevState:{ message: string, isSuccess: boolean}, formData: FormData,) =>{
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
        return {message:"User already register", isSuccess: false}
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

    fetch("http://localhost:3000/api/email",{
        method:"POST",
        body: JSON.stringify({
            body:otpHtml,
            email: email
        }),
        headers:{
            "Content-Type":"application/json"
        }
    });

    const newUser = await prisma.user.create({data: userInfo});
    if(newUser){
    return {message:"User Created successfully", isSuccess: true}
    }
   }
    return {message: "something went wrong!", isSuccess: false}
}
"use server";

import { generateOtp } from "@/lib/otp";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { OtpTemplate } from "../emailTemplates/OtpTemplate";
import { transporter } from "@/lib/transporter";
import { cookies } from "next/headers";
import { generateToken } from "@/lib/jwt";
import { getUserFromCookies } from "@/lib/getUserFromCookies";


export const registerAction = async (
  prevState: { message: string; isSuccess: boolean; email?: string },
  formData: FormData
) => {
  const email = formData?.get("email") as string;
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const password = formData.get("password") as string;
  const gender = formData.get("gender") as string;

  const isUserExist = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (isUserExist) {
    return { message: "User already register", isSuccess: false, email: "" };
  }
  const hashedPassword = bcrypt.hashSync(password, 10);
  const generatedOTP: number = generateOtp();
  if (hashedPassword) {
    const userInfo = {
      firstName,
      lastName,
      password: hashedPassword,
      gender,
      email,
      Otp: generatedOTP,
    };

    const otpHtml = OtpTemplate(generatedOTP);

    const newUser = await prisma.user.create({ data: userInfo });
    if (newUser) {
      let message = {
        from: "noreply",
        to: `${email}`,
        subject: "Blog-app OTP Verification",
        html: otpHtml,
      };

      transporter.sendMail(message, (err, info) => {
        if (err) {
          console.log("Error occurred. " + err.message);
        }
      });
      return {
        message: "User Created successfully",
        isSuccess: true,
        email: email,
      };
    }
  }
  return { message: "something went wrong!", isSuccess: false, email: "" };
};

export const otpVerificationAction = async (
  prevState: { message: string; isSuccess: boolean; email?: string | null },
  formData: FormData
) => {
  const email = prevState.email as string;
  const otp = formData.get("otp") as string;

  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) {
    return { message: "User not found", isSuccess: false, email: "" };
  }
  if (user.Otp !== Number(otp)) {
    return { message: "Invaild otp", isSuccess: false, email: "" };
  }
  const updateUser = await prisma.user.update({
    where: { email },
    data: { Otp: null, isActive: true, updatedAt: new Date() },
  });
  if (updateUser) {
    return {
      message: "User Reqistered Successfully",
      isSuccess: true,
      email: email,
    };
  }
  return {
    message: "Faliled to update the user",
    isSuccess: false,
    email: email,
  };
};

export const forgotpasswordAction = async (
  prevState: { message: string; isSuccess: boolean },
  formData: FormData
) => {
  const email = formData.get("email") as string;

  const generatedotp: number = generateOtp();
  const user = await prisma.user.update({
    where: { email },
    data: { Otp: generatedotp },
  });

  if (!user) {
    return { message: "User not found", isSuccess: false };
  }
  const otpHtml = OtpTemplate(generatedotp);

  if (user) {
    let message = {
      from: "noreply",
      to: `${email}`,
      subject: "Blog-app OTP Verification",
      html: otpHtml,
    };

    transporter.sendMail(message, (error, info) => {
      if (error) {
        console.log("Error occurred. " + error.message);
      }
    });
    return { message: "OTP sent to your email", isSuccess: true };
  }
  return { message: "Something went wrong", isSuccess: false };
};

export const resetPasswordAction = async (
  prevState: { message: string; isSuccess: boolean; email?: string },
  formData: FormData
) => {
  const email = prevState.email as string;
  const newpassword = formData.get("newPassword") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  const userdetails = await prisma.user.findUnique({
    where: { email },
  });

  if (newpassword !== userdetails?.password) {
    return { message: "Use Different Password ", isSuccess: false, email: "" };
  }

  if (newpassword !== confirmPassword) {
    return { message: "Passwords do not match", isSuccess: false, email: "" };
  }

  const hashedPassword = bcrypt.hashSync(newpassword, 10);
  const user = await prisma.user.update({
    where: { email },
    data: { password: hashedPassword },
  });
  if (user) {
    return {
      message: "Password reset successfully",
      isSuccess: true,
      email: email,
    };
  }
  return { message: "Something went wrong", isSuccess: false, email: "" };
};

export const signInAction = async (
  prevState: { message: string; isSuccess: boolean },
  formData: FormData
) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return { message: "User not found", isSuccess: false, email: null };
  }
  if (!user?.isActive) {
    const generatedOTP: number = generateOtp();
    const otpHtml = OtpTemplate(generatedOTP);
    const message = {
      from: "noreply",
      to: `${email}`,
      subject: "Blog-app OTP Verification",
      html: otpHtml,
    };

    await prisma?.user?.update({
      data: { Otp: generatedOTP },
      where: { email },
    });
    transporter.sendMail(message, (error, info) => {
      if (error) {
        console.log(
          `Error in sending the otp mail for activating the user while login: ${error}`
        );
      }
    });
    return { message: "User not verified", isSuccess: true, email: email };
  }
  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) {
    return { message: "Invalid password", isSuccess: false, email: null };
  }
  const generatedToken = generateToken(user);
  const storeCookie = await cookies();
  storeCookie.set({
    name: "token",
    value: generatedToken,
    httpOnly: process.env.NODE_ENV === "production",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
  return { message: "Sign In Successful", isSuccess: true, email: email };
};

export const signOutAction = async (prevState: {
  message: string;
  isSuccess: boolean;
}) => {
  const storeCookie = await cookies();
  storeCookie.delete("token");
  return { message: "Sign Out Successful", isSuccess: true };
};

export const postAction = async (
  prevState: { message: string; isSuccess: boolean },
  formData: FormData
) => {
  const tokenFromCookie = getUserFromCookies();
  const user = await tokenFromCookie;

  // Read form fields
  const title = formData.get("title") as string;
  const image = formData.get("image") as string;
  const category = formData.get("category") as string;
  const content = formData.get("content") as string;
  const authorId = Number(user?.id);
  const authorName = user?.firstName;

  // Simple validation
  if (!title || !category || !content) {
    return {
      message: "Please fill all required fields.",
      isSuccess: false,
    };
  }


    // Create Post
   const postCreate = await prisma.post.create({
      data: {
        title,
        image,
        category,
        content,
        authorId: authorId || null,
        authorName: authorName || null,
      },
    });

    if (postCreate){
    return {
      message: "Post created successfully!",
      isSuccess: true,
    };
}
  
    return {
    message: "image URL is not valid.",
    isSuccess: false,
  };
}
  

export const fetchFeaturedPosts = async () => {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 3,
  });
  return posts;
};

export const fetchPostById = async (id: number) => {
  try {
    const post = await prisma.post.findUnique({
      where: { id },
    });
    return post;
  } catch (error) {
    console.log("Fetch Post By ID Error:", error);
    return null;
  }
};

export const fetchRelatedPosts = async (
  category: string,
  excludeId: number
) => {
  const relatedPosts = await prisma.post.findMany({
    where: {
      category,
      id: { not: excludeId },
    },
    take: 3,
    orderBy: {
      createdAt: "desc",
    },
  });
  return relatedPosts;
};

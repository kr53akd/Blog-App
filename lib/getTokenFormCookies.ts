"use server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export const token = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  return token;
};


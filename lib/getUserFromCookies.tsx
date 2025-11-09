import { token } from "./getTokenFormCookies";
import jwt from "jsonwebtoken";

export async function getUserFromCookies() {
  const userToken = await token();
  if (!userToken) return null;

  try {
    const decoded = jwt.decode(userToken) as { name: string; email: string };
    return decoded;
  } catch {
    return null;
  }
}

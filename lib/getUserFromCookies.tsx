import { token } from "./getTokenFormCookies";
import jwt from "jsonwebtoken";

export async function getUserFromCookies() {
  const userToken = await token();
  if (!userToken) return null;

  try {
    const decoded = jwt.decode(userToken) as { firstName: string; email: string; id: number };
    return decoded;
  } catch {
    return null;
  }
}

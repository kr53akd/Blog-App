import jwt from "jsonwebtoken";
const jwtSecret = process.env.JWT_SECRET_KEY || "defaultSecretKeyShouldbeappliedhere";

export const generateToken=(payload:{ 
    email: string;
    password: string; 
    id: number; 
    firstName: string; 
    lastName: string; 
    gender: string; 
    isActive: boolean; 
    Otp: number | null;
    createdAt: Date; 
    updatedAt: Date;
    userTypeId: number; },
 expire=1 )=>{
  const token = jwt.sign(payload, jwtSecret ,{expiresIn: `${expire}h`});
  return token;
}

export const verifyToken = (token:string)=>{
   const isTokenVerified = jwt.verify(token, jwtSecret);
   if(!isTokenVerified){
      return null;
   }
   return token;
}
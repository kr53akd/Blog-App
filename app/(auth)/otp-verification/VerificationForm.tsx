"use client";
import React, { useActionState, useEffect, useRef, useState } from "react";
import AppButton from "@/component/AppButton/AppButton";
import { otpVerificationAction } from "@/app/action/registerAction";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";


const OTP_LENGTH = 4; 

const VerificationForm = () => {
  const router = useRouter();
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const [error, setError] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const  searchParams = useSearchParams();
  const email = searchParams.get("email");
  const type = searchParams.get("type");


  const [state, OtpVerifyAction, isPending] = useActionState(otpVerificationAction,{
    message: "",
    isSuccess: false,
    email: email
  });

  useEffect(()=>{
    if(state?.isSuccess){
      router.push("/")
    }
  },[state?.isSuccess])

  //  Handle OTP input changes
  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; 
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  //  Handle backspace navigation
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  //  Handle Submit
  const handleSubmit = async (formData: FormData) => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length < OTP_LENGTH) {
      setError("Please enter a complete OTP.");
      return;
    }

    setError("");
    formData.append("otp", enteredOtp);
    console.log("FormData OTP:", formData.get("otp"));
    OtpVerifyAction(formData);
    if(type === "forgot-password"){
      router.push(`/reset-password?email=${encodeURIComponent(email ?? '')}`);
    }
    
    
  };

  //  Resend OTP
  const handleResend = () => {
    setOtp(Array(OTP_LENGTH).fill(""));
    setError("");
    inputRefs.current[0]?.focus();
    console.log("Resend OTP logic triggered");
  };

  //  Autofocus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-linear-to-br from-gray-50 to-blue-100 px-4">
      <form
        action={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md space-y-6 border border-gray-100 transition-all hover:shadow-xl"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          OTP Verification
        </h2>
        <p className="text-center text-gray-500 text-sm mb-4">
          Enter the 4-digit code sent to your email or phone.
        </p>

        <div className="flex justify-center gap-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                if (inputRefs.current) {
                  inputRefs.current[index] = el;
                }
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-12 text-center text-lg font-semibold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          ))}
        </div>

        {error && (
          <p className="text-center text-red-500 text-sm">{error}</p>
        )}

        <div className="pt-2">
          <AppButton name="Verify OTP" isPending={isPending} />
        </div>

        {state?.message && (
          <p
            className={`text-center text-sm mt-2 ${
              state.isSuccess ? "text-green-600" : "text-red-500"
            }`}
          >
            {state.message}
          </p>
        )}

        <p className="text-center text-gray-500 text-sm mt-3">
          Didn’t receive OTP?{" "}
          <button
            type="button"
            onClick={handleResend}
            className="text-blue-600 hover:underline"
          >
            Resend
          </button>
        </p>
      </form>
    </div>
  );
};

export default VerificationForm;

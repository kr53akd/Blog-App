"use client"
import React, { useActionState, useEffect, useMemo, useState } from "react";
import AppInput from "@/component/AppInput/AppInput";
import AppButton from "@/component/AppButton/AppButton";
import { AppInputProp } from "@/lib/customTypes";
import { signInAction } from "@/app/action/registerAction";
import { useRouter } from "next/navigation";

const SignInForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const formFields: AppInputProp[] = useMemo(() => [
    {
      name: "email",
      type: "email",
      placeholder: "Enter your email",
      required:true
    },
    {
      name: "password",
      type: "password",
      placeholder: "Enter your password",
      showPassword: showPassword,
      togglePassword: (e: React.MouseEvent) => setShowPassword((prev) => !prev),
      required:true
    },
  ], [showPassword]);

  const [state, SignInAction, isPending] = useActionState( signInAction, {
    message: "",
    isSuccess: false,
    email: null
  });

  //  Handle client-side validation before calling action
  const handleSubmit = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      setError("Please fill out all fields");
      return;
    }

    setError("");
    SignInAction(formData);
  };

  const handleReset = (e: React.MouseEvent) => {
    e.preventDefault();
    setError("");
    const form = document.getElementById("signin-form") as HTMLFormElement;
    form?.reset();
  
  };

  useEffect(()=>{
    if(state?.isSuccess && window && state?.message==="User not verified"){
      window.location.reload();
      window.location.href = `/otp-verification?email=${state?.email}`
    }
    else if(state?.isSuccess && window){
      router.push("/")
      router.refresh();
    }
  },[state?.isSuccess])

  return (
    <div className="flex justify-center items-center  px-4">
      <form
        id="signin-form"
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md space-y-4 border border-gray-100 transition-all hover:shadow-xl"
        action={handleSubmit}
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
          Welcome Back 
        </h2>
        <p className="text-center text-gray-500 text-sm mb-6">
          Please log in to your account
        </p>

        {formFields.map(({ name, type, ...rest }: AppInputProp, index: number) => (
          <div key={index} className="flex flex-col space-y-1">
            <AppInput name={name} type={type} {...rest} />
          </div>
        ))}

        {error && (
          <p className="text-red-500 text-sm text-center">{error}</p>
        )}

        <div className="flex justify-end">
          <a
            href="/forgot-password"
            className="text-sm text-blue-600 hover:underline"
          >
            Forgot Password?
          </a>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <AppButton name="Sign In" isPending={isPending} />
          <button
            type="button"
            onClick={handleReset}
            className="w-full sm:w-auto px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition-all"
          >
            Reset
          </button>
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
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">
            Create one
          </a>
        </p>
      </form>
    </div>
  );
};

export default SignInForm;

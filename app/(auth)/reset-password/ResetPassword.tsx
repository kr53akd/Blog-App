"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useActionState } from "react"; 
import AppInput from "@/component/AppInput/AppInput";
import AppButton from "@/component/AppButton/AppButton";
import { AppInputProp } from "@/lib/customTypes";
import { resetPasswordAction } from "@/app/action/registerAction";


const ResetPasswordForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  // Input fields configuration
  const formFields: AppInputProp[] = useMemo(() => [
    {
      name: "newPassword",
      type: "password",
      placeholder: "Enter new password",
      showPassword,
      togglePassword: () => setShowPassword(prev => !prev),
      required: true,
    },
    {
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm new password",
      showPassword,
      togglePassword: () => setShowPassword(prev => !prev),
      required: true,
    },
  ], [showPassword]);

  // Action state for form submission
  const [state, resetPasswordFormAction, isPending] = useActionState(resetPasswordAction, {
    message: "",
    isSuccess: false,
    email: email ?? "",
  });

  // Validate password match before submitting
  const handleSubmit = async (formData: FormData) => {
    const newPassword = formData.get("newPassword") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setError("");
    resetPasswordFormAction(formData);
  };

  // Redirect on success
  useEffect(() => {
    if (state?.isSuccess) {
      router.push("/sign-in");
    }
  }, [state?.isSuccess, router]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-linear-to-br from-gray-50 to-blue-100 px-4">
      <form
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md space-y-4 border border-gray-100 transition-all hover:shadow-xl"
        action={handleSubmit}
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
          Reset Password
        </h2>

        {formFields.map(({ name, type, ...rest }: AppInputProp, index: number) => (
          <div key={index} className="flex flex-col space-y-1">
            <AppInput name={name} type={type} {...rest} />
          </div>
        ))}

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        {state?.message && (
          <p className={`text-sm text-center ${state.isSuccess ? "text-green-600" : "text-red-600"}`}>
            {state.message}
          </p>
        )}

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <AppButton name="Reset Password" isPending={isPending} />
          <AppButton type="reset" name="Clear" coustomClass="bg-gray-500 text-white" />
        </div>
      </form>
    </div>
  );
};

export default ResetPasswordForm;

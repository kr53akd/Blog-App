"use client";
import React, { useActionState, useMemo, useState } from "react";
import AppInput from "@/component/AppInput/AppInput";
import AppButton from "@/component/AppButton/AppButton";
import { AppInputProp } from "@/lib/customTypes";
import { registerAction } from "@/app/action/registerAction";

const ForgotPasswordForm = () => {
  const [error, setError] = useState<string>("");

  const formFields: AppInputProp[] = useMemo(
    () => [
      {
        name: "email",
        type: "email",
        placeholder: "Enter your registered email",
      },
    ],
    []
  );

  const [state, ForgotPasswordAction, isPending] = useActionState(
    registerAction,
    { message: "", isSuccess: false }
  );

  // Validate before submit
  const handleSubmit = async (formData: FormData) => {
    const email = formData.get("email") as string;

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    setError("");
    ForgotPasswordAction(formData);
  };

  // Reset input
  const handleReset = (e: React.MouseEvent) => {
    e.preventDefault();
    setError("");
    const form = document.getElementById("forgot-form") as HTMLFormElement;
    form?.reset();
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-linear-to-br from-gray-50 to-blue-100 px-4">
      <form
        id="forgot-form"
        action={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md space-y-4 border border-gray-100 transition-all hover:shadow-xl"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Forgot Password
        </h2>

        <p className="text-center text-gray-500 text-sm mb-4">
          Enter your email and we’ll send you an OTP or reset link.
        </p>

        {formFields.map(({ name, type, ...rest }: AppInputProp, index: number) => (
          <div key={index} className="flex flex-col space-y-1">
            <AppInput name={name} type={type} {...rest} />
          </div>
        ))}

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <AppButton name="Submit" isPending={isPending} />
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
          Remembered your password?{" "}
          <a href="/sign-in" className="text-blue-600 hover:underline">
            Sign in
          </a>
        </p>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;

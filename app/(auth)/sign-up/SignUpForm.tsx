"use client"
import { registerAction } from '@/app/action/registerAction'
import AppButton from '@/component/AppButton/AppButton'
import AppInput from '@/component/AppInput/AppInput'
import { AppInputProp } from '@/lib/customTypes'
import { useRouter } from 'next/navigation'
import React, { useActionState, useMemo, useState, useEffect } from 'react'

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();
  const formFields: AppInputProp[] = useMemo(() => [
    { name: "firstName", type: "text", placeholder: "Enter first name", required:true },
    { name: "lastName", type: "text", placeholder: "Enter last name",required:true },
    { name: "email", type: "email", placeholder: "Enter email", required:true },
    {
      name: "password",
      type: "password",
      placeholder: "Enter password",
      showPassword: showPassword,
      togglePassword: (e: React.MouseEvent) => setShowPassword(prev => !prev),
      required:true
    },
    {
      name: "confirm-password",
      type: "password",
      placeholder: "Enter confirm password",
      showPassword: showPassword,
      togglePassword: (e: React.MouseEvent) => setShowPassword(prev => !prev),
      required:true
    },
    {
      name: "gender",
      type: "radio",
      options: [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
        { label: "Other", value: "other" }
      ],
      required:true
    }
  ], [showPassword]);

  const [state, SignUpFormAction, isPending] = useActionState(registerAction, {
    message: "",
    email:"",
    isSuccess: false
  });

  //  Validate password match before submitting
  const handleSubmit = async (formData: FormData) => {
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirm-password") as string;

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setError("");
    SignUpFormAction(formData);
  };

  useEffect(()=>{
      if(state?.isSuccess){
        router.push(`/otp-verification?email=${encodeURIComponent(state?.email)}&type=registration`);
      }
  },[state?.isSuccess])
  return (
    <div className="flex justify-center items-center  px-4">
      <form
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md space-y-4 border border-gray-100 transition-all hover:shadow-xl"
        action={handleSubmit}
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
          Create an Account
        </h2>

        {formFields.map(({ name, type, ...rest }: AppInputProp, index: number) => (
          <div key={index} className="flex flex-col space-y-1">
            <AppInput
              name={name}
              type={type}
              {...rest}
            />
          </div>
        ))}

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <AppButton name="Register" isPending={isPending} />
          <AppButton type='reset' name='Reset' coustomClass="bg-gray-500 text-green-500"/>
        </div>


        <p className="text-center text-gray-500 text-sm mt-3">
          Already have an account?{" "}
          <a href="/sign-in" className="text-blue-600 hover:underline">
            Sign In
          </a>
        </p>
      </form>
    </div>
  )
}

export default SignUpForm

"use client"
import { registerAction } from '@/app/action/registerAction'
import AppButton from '@/component/AppButton/AppButton'
import AppInput from '@/component/AppInput/AppInput'
import { AppInputProp } from '@/lib/customTypes'
import React, { useActionState, useMemo, useState } from 'react'

const SignUpForm = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const formFields: AppInputProp[] = useMemo(()=>[
        {
           name:"firstName",
           type: "text",
           placeholder: "Enter first name"
        },
        {
           name:"lastName",
           type: "text",
           placeholder: "Enter last name"
        },
        {
           name:"email",
           type: "email",
           placeholder: "Enter email"
        },
        {
            name: "password",
            type: "password",
            placeholder: "Enter password",
            showPassword: showPassword,
            togglePassword: (e:React.MouseEvent)=> setShowPassword(prev=> !prev)
        },
        {
            name: "confirm-password",
            type: "password",
            placeholder: "Enter confirm password",
            showPassword: showPassword,
            togglePassword: (e:React.MouseEvent)=> setShowPassword(prev=> !prev)
        },
        {
            name: "gender",
            type: "radio",
            options:[
                {label:"Male", value: "male"},
                {label:"Female", value: "female"},
                {label:"Other", value: "other"}
            ]
        }
    ],[showPassword]);
    
    const [state, SignUpForm, isPending] = useActionState(registerAction, {message:"", isSuccess: false});

  return (
    <form className='space-y-2' action={SignUpForm}>
        {formFields?.map(({name, type, ...rest}:AppInputProp, index: number)=>(<AppInput
        key={index}
        name={name}
        type={type}
        {...rest}
        />))}
        <div className='w-4/5 mx-auto'>
            <AppButton name="Register" isPending={isPending}/>
        </div>
    </form>
  )
}

export default SignUpForm
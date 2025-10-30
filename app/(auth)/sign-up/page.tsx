import React from 'react'
import SignUpForm from './SignUpForm'

const SignUpPage = () => {
  return (
    <div className='w-full h-full flex items-center justify-center'>
        <div className='w-4/5 md:w-3/5 lg:w-2/5 max-h-4/5 h-auto border shadow rounded-xl py-5 px-3'>
        <SignUpForm/>
        </div>
    </div>
  )
}

export default SignUpPage
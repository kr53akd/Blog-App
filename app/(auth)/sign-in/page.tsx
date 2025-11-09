import React from 'react'
import SignInForm from './SignInForm'

const SignInPage = () => {
  return (
    <div className='w-full h-screen flex items-center justify-center bg-linear-to-br from-gray-50 to-blue-100'>
        <div className='w-full md:w-3/5 lg:w-2/5 max-h-4/5 h-auto py-5 px-3'>
        <SignInForm/>
        </div>
    </div>
  )
}

export default SignInPage
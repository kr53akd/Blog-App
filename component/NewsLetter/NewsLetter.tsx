import React from 'react'
import AppInput from '../AppInput/AppInput'
import AppButton from '../AppButton/AppButton'

const NewsLetter = () => {
  return (
      <section className="bg-blue-600 text-white text-center px-2 py-16">
        <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
        <p className="mb-6">Get our latest posts delivered to your inbox.</p>
        <div className="flex justify-center items-center w-4/5 md:w-2/5 mx-auto">
      
          <AppInput type='email' name='email' placeholder="Enter your email" coustomClass='!px-5 !py-2  !text-gray-900 !bg-white !rounded-l-lg !w-full !rounded-r-none ' />
          <AppButton name='Subscribe' type='button' coustomClass='!w-2/5 bg-gray-900 px-3 rounded-r-lg rounded-l-none hover:bg-gray-800'/>
        </div>
      </section>
  )
}

export default NewsLetter

import React from 'react'

const AppDropdown = ({children, show}:{children: React.ReactNode, show: boolean}) => {
  return (
    <div className={`border border-gray-300 shadow-lg rounded-2xl p-3 bg-white absolute right-0 w-fit mt-3 ${show?"top-full":"-top-full"} transition-all -z-10`}>
        {children}
    </div>
  )
}

export default AppDropdown
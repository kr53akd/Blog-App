import React from 'react'

const BlogLayout = ({children}:{children: React.ReactNode}) => {
  return (
    <div className='w-full h-full'>
        {children}
    </div>
  )
}

export default BlogLayout
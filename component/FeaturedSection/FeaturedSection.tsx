"use client"
import { fetchFeaturedPosts } from '@/app/action/registerAction';
import { postType } from '@/lib/customTypes'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react';


const FeaturedSection = () => {
   const [blogs, setBlogs] =  useState<postType []>([]);
    useEffect(()=>{
        const fetchBlogs = async()=>{
            const response = await fetchFeaturedPosts();
            setBlogs(response);
        }
        fetchBlogs();
    },[])
  return (
    <section className="max-w-6xl  mx-auto  py-12 ">
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Posts</h2>
        <div className="grid md:grid-cols-3 gap-8 px-4">
          {blogs.map((blog) => (
            <Link
              href={`/blog/${blog.id}`}
              key={blog.id}
              className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition"
            >
              <Image
                src={blog.image}
                alt={blog.title}
                width={400}
                height={250}
                className="w-full h-56 object-fill object-center"
              />
              <div className="p-5">
                <span className="text-sm text-blue-500">{blog.tag}</span>
                <h3 className="text-xl font-semibold mt-2 hover:text-blue-600">
                  {blog.title}
                </h3>
                <p className="text-gray-500 text-sm mt-1">
                  By {blog.authorName} • {blog.updatedAt.toDateString()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
  )
}

export default FeaturedSection

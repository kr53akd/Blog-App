"use client";
import { fetchPostById, fetchRelatedPosts } from "@/app/action/registerAction";
import AppButton from "@/component/AppButton/AppButton";
import AppInput from "@/component/AppInput/AppInput";
import { postType } from "@/lib/customTypes";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const  BlogDetailsPage = () =>{
  const { id } = useParams();

  
const [blog, setBlog] = useState<postType >()
const [related, setRelated] = useState<postType []>([])

  useEffect(()=>{
    const fetchBlogDetails = async()=>{
      const response = await fetchPostById(Number(id));
      const relatedPosts = await fetchRelatedPosts(response?.category || "", Number(id));
      if(response == null) return;
      setBlog(response);
      setRelated(relatedPosts);
    }
    fetchBlogDetails();
  },[id])

  return (
    <main className="h-full w-full bg-gray-50 text-gray-900">
     

      {/* Hero Image */}
      {
        blog && <>
      
      <section className="relative w-full h-80 md:h-[450px]">
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          className="object-cover opacity-80"
          priority
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center text-white px-6 gap-8">
          <h1 className="text-4xl md:text-5xl font-extrabold">{blog.title}</h1>
          <p className="">{blog.category}</p>
        </div>
      </section>

      {/* Blog Content */}
      <article className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-sm text-gray-500 mb-6 flex justify-between">
          <p> {blog?.authorName}</p>
          <p> {blog?.updatedAt.toDateString()}</p>
        </div>

        <div
          className="text-justify leading-7 space-y-6"
          >{blog?.content}</div>

        {/* Tags */}
        <div className="mt-10">
          <p className="text-gray-500 text-sm">
            Tagged under: <span className="text-blue-600">{blog?.category}</span>
          </p>
        </div>
      </article>

      {/* Related Posts */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {related.map((item) => (
            <Link
              href={`/blog/${item.id}`}
              key={item.id}
              className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition"
            >
              <Image
                src={item.image}
                alt={item.title}
                width={500}
                height={300}
                className="w-full h-52 object-cover"
              />
              <div className="p-5">
                <h3 className="text-lg font-semibold hover:text-blue-600">
                  {item.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Comments Section */}
      <section className="max-w-4xl mx-auto px-6 pb-16">
        <h2 className="text-2xl font-bold mb-6">Comments</h2>
        <div className="bg-white shadow-md rounded-xl p-6">
          <AppInput
            type='textarea'
            name='comment'
            placeholder="Write your comment..."
            coustomClass="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <AppButton
            name='Post Comment'
            type='submit'
            coustomClass="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
          />
        </div>
      </section>
      </>
}
    </main>
  );
}



export default BlogDetailsPage;
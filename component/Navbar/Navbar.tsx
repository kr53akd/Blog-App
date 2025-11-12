"use client";
import { signOutAction } from "@/app/action/registerAction";
import React, { useActionState, useEffect, useState } from "react";
import AppButton from "../AppButton/AppButton";
import { useRouter } from "next/navigation";
import { token } from "@/lib/getTokenFormCookies";
import Link from "next/link";
import AppDropdown from "../AppDropdown/AppDropdown";
import { FaChevronDown } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { BsPostcard } from "react-icons/bs";
import { IoMdLogOut } from "react-icons/io";

const Navbar = () => {
  const router = useRouter();
  const [showProfile, setShowProfile] = useState(false)
  const [state, SignOut, isPending] = useActionState(signOutAction, {
    message: "",
    isSuccess: false,
  });

  useEffect(()=>{
    if(state.isSuccess){
      router.push("/sign-in")
    }
  },[state?.isSuccess])
  
  return (
    <>
      <nav className="bg-black w-full py-3 flex items-center px-8 shadow-lg justify-between sticky top-0 z-50">
        <Link href={"/"}>
        <h1 className="text-3xl text-white">Blogify.</h1>
        </Link>
        <div className="relative" >
          <p className="text-white flex items-center gap-2 cursor-pointer" onClick={()=>setShowProfile(prev=> !prev)}>Hi Abhishek! <FaChevronDown className={`${showProfile?"rotate-180": "rotate-0"} transition-all`}/></p>
          <AppDropdown 
          show ={showProfile}
          children = {<div>
             <ul className="space-y-1">
              <li className="flex items-center gap-2"><CgProfile size={20}/> Profile</li>
              <li className="flex items-center gap-2"><BsPostcard size={20}/> My&nbsp;posts</li>
              <li className=""><form action={SignOut}>
              <button className="cursor-pointer flex items-center gap-2"><IoMdLogOut size={20}/> Logout</button>
            </form> </li>
             </ul>
          </div>}
          />
            {/* <form action={SignOut}>
              <AppButton
                name="Logout"
                type="submit"
                coustomClass="bg-gray-500 text-green-500"
              />
            </form> */}
        </div>
      </nav>
    </>
  );
};

export default Navbar;

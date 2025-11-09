"use client";
import { signOutAction } from "@/app/action/registerAction";
import React, { useActionState, useEffect, useState } from "react";
import AppButton from "../AppButton/AppButton";
import { useRouter } from "next/navigation";
import { token } from "@/lib/getTokenFormCookies";
import Link from "next/link";

const Navbar = ({ children }: { children: React.ReactNode }) => {
  const [isLogIn, setIsLogIn] = useState(true);
  const router = useRouter();
  const [state, SignOut, isPending] = useActionState(signOutAction, {
    message: "",
    isSuccess: false,
  });

  useEffect(() => {
    if (state?.isSuccess) {
      setIsLogIn(false);
      router.push("/sign-in");
    }
  }, [state?.isSuccess, ]);

  if (!token) {
    setIsLogIn(false);
  }

  

  return (
    <>
      <div className="bg-black w-full h-20 flex items-center px-8 shadow-lg justify-between sticky top-0 z-50">
        <Link href={"/"}>
        <h1 className="text-3xl text-white">Blogify.</h1>
        </Link>
        <div>
          {isLogIn && (
            <form action={SignOut}>
              <AppButton
                name="Logout"
                type="submit"
                coustomClass="bg-gray-500 text-green-500"
              />
            </form>
          )}
        </div>
      </div>
      {children}
    </>
  );
};

export default Navbar;

import React, { useState } from "react";
import logo from "../images/logo-dark.svg";
import Image from "next/image";
import { CgMenu } from "react-icons/cg";
import { MdOutlineClose } from "react-icons/md";
import Link from "next/link";
import { useRouter } from "next/router";
import { checkAuth } from "../helpers/checkAuth";
import { auth } from "../config";
import { signOut } from "firebase/auth";

function Navbar() {
  const [isSidebar, setIsSidebar] = useState(false);
  const router = useRouter();
  const signout = async () => {
    await signOut(auth);
    router.push("/");
    setIsSidebar(false);
  };
  return (
    <header className="shadow-xs max-h-[105px] border-b border-b-purple-200/5  w-full text-zinc-600 fixed top-0 bg-white/80 backdrop-blur-lg  z-50">
      <nav className=" max-w-6xl mx-auto flex items-center justify-between px-6 md:px-3 ">
        <Link href="/" className=" w-24 h-16  relative cursor-pointer block">
          <Image
            src={logo}
            layout="fill"
            alt="shodex garden logo"
            priority
            loading="eager"
          />
        </Link>
        <div
          className={`flex lg:p-0 p-5 lg:flex-row justify-center lg:-left-[0vw] transition-all ease-linear duration-200 flex-col lg:relative fixed lg:h-fit h-screen lg:bg-transparent bg-white inset-0 ${
            isSidebar ? "-left-[0vw]" : "-left-[100vw] "
          }  lg:w-fit w-full `}
        >
          <Link
            href="/"
            className="lg:hover:bg-transparent hover:bg-zinc-50 transition-all ease-linear duration-100  hover:text-purple-400 flex flex-col items-center  px-4 py-4 rounded lg:py-2 my-6 lg:my-1 font-medium text-md"
            onClick={() => setIsSidebar(false)}
          >
            Home
          </Link>
          {checkAuth() && (
            <Link
              href="/d"
              className="lg:hover:bg-transparent hover:bg-zinc-50 transition-all ease-linear duration-100  hover:text-purple-400 flex flex-col items-center  px-4 py-4 rounded lg:py-2 my-6 lg:my-1 font-medium text-md"
              onClick={() => setIsSidebar(false)}
            >
              Dashboard
            </Link>
          )}
          <Link
            href="/#features"
            className="lg:hover:bg-transparent hover:bg-zinc-50 transition-all ease-linear duration-100  hover:text-purple-400 flex flex-col items-center  px-4 py-4 rounded lg:py-2 my-6 lg:my-1 font-medium text-md"
            onClick={() => setIsSidebar(false)}
          >
            Features
          </Link>
          {/* <Link href="/api-v1">
            <a
              className="lg:hover:bg-transparent hover:bg-zinc-50 transition-all ease-linear duration-100  hover:text-purple-400 flex flex-col items-center  px-4 py-4 rounded lg:py-2 my-6 lg:my-1 font-medium text-md"
              onClick={() => setIsSidebar(false)}
            >
              Api
            </a>
          </Link> */}

          {checkAuth() ? (
            <button
              className="hover:bg-purple-500 transition-all ease-in-out bg-purple-400  text-zinc-100 rounded-md flex flex-col items-center  px-4 py-4 lg:py-2 my-6 lg:my-1 font-medium text-md"
              onClick={signout}
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                href="/login"
                className="lg:bg-transparent bg-purple-100 lg:hover:text-purple-400 flex flex-col items-center  px-4 py-4 lg:py-2 mt-4 mb-0 lg:mt-1 lg:mb-1 font-medium text-md"
                onClick={() => setIsSidebar(false)}
              >
                Log In
              </Link>
              <Link
                href="/signup"
                className="hover:bg-purple-500 transition-all ease-in-out bg-purple-400  text-zinc-100 rounded-md flex flex-col items-center  px-4 py-4 lg:py-2 my-6 lg:my-1 font-medium text-md"
                onClick={() => setIsSidebar(false)}
              >
                Sign Up
              </Link>
            </>
          )}

          {/* close mobile menu button */}
          <MdOutlineClose
            className="cursor-pointer text-3xl  right-10 top-10 absolute lg:hidden "
            onClick={() => setIsSidebar(false)}
          />
        </div>{" "}
        {/* open mobile menu button */}
        <div className="ml-auto flex items-center gap-x-2 lg:hidden">
          {/* {checkAuth() ? (
            <button
              className="hover:bg-purple-500 transition-all ease-in-out bg-purple-400  text-zinc-100 rounded-md flex flex-col items-center  px-4 py-2   font-medium text-sm"
              onClick={signout}
            >
              Logout
            </button>
          ) : (
            <Link href="/signup">
              <a
                className="hover:bg-purple-500 transition-all ease-in-out bg-purple-400  text-zinc-100 rounded-md flex flex-col items-center  px-4 py-2   font-medium text-sm"
                onClick={() => setIsSidebar(false)}
              >
                Sign Up
              </a>
            </Link>
          )} */}
          <CgMenu
            onClick={() => setIsSidebar(true)}
            className="ml-3 mr-1  cursor-pointer text-2xl"
          />
        </div>
      </nav>
    </header>
  );
}

export default Navbar;

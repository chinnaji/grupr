import React from "react";
import Image from "next/image";
import Link from "next/link";
import whale from "../images/whale.svg";
function error() {
  return (
    <section className="min-h-[calc(100vh-5rem)] bg-dark relative hover:bg-purple-500 transition-all ease-in-out bg-purple-400  text-zinc-50 flex items-center justify-center mb-16">
      <div className=" max-w-6xl  mx-auto flex items-center flex-col justify-center lg:flex-row  px-6 md:px-24 md:py-20 lg:py-32 gap-10 lg:gap-28">
        <div className="w-full lg:w-1/2">
          <div className="  w-full lg:h-96 h-56 relative ">
            <Image
              src={whale}
              //   layout="fill"
              priority
              loading="eager"
              alt="404 icon"
              className=" "
              //   placeholder="blur"
            />
          </div>
        </div>
        <div className="w-full lg:w-1/2 text-center">
          <h1 className="py-4  text-7xl  font-extrabold text-gray-800 dark:text-white">
            404
          </h1>

          <p className="p-2 text-base text-gray-800 dark:text-white">
            Sorry about that! Please visit our hompage to get where you need to
            go.
          </p>
          <Link href="/" passHref legacyBehavior>
            <button className="w-full lg:w-auto my-4 rounded-md px-1 sm:px-16 py-3 bg-teal text-white bg-orange-500 font-semibold focus:outline-none focus:ring-2 focus:ring-orange-700 focus:ring-opacity-50">
              Go back to Homepage
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default error;

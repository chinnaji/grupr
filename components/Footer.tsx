import React, { useLayoutEffect, useState } from "react";
import { BsHeartFill } from "react-icons/bs";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
function Footer() {
  const router = useRouter();
  const [isNewsletter, setIsNewletter] = useState(true);
  const [email, setEmail] = useState(" ");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // typeof window &&
  //   useLayoutEffect(() => {
  //     setIsNewletter(router.pathname == "/" ? true : false);
  //   });

  const handleSubNewsletter = (e: any) => {
    e.preventDefault();
    setEmail("");
    setIsLoading(true);
    axios
      .post("/api/newsletter", { email })
      .then((res) => {
        // console.log(res.data);
        setIsLoading(false);
        setIsSubscribed(true);
        setTimeout(() => setIsSubscribed(false), 3000);
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <footer className="w-full  border-top border-top-2   px-3 md:mt-10">
      <section className="py-5 px-3  border-t ">
        <p className="text-md md:text-xl max-w-3xl mx-auto text-center relative text-zinc-600">
          Made With <BsHeartFill className="text-red-600/70 inline" /> by{" "}
          <a
            href="https://github.com/chinnaji"
            className="text-purple-400 font-semibold"
          >
            Chinnaji
          </a>
        </p>
      </section>
    </footer>
  );
}

export default Footer;

import React, { useState } from "react";
import Grupr from "../../components/Grupr";
import Grid from "../../components/Grid";
import List from "../../components/List";
import Image from "next/image";
import smiley from "../../images/smiley.png";
import link from "../../images/link.png";
import { FaThList } from "react-icons/fa";
import { BsFillGrid1X2Fill } from "react-icons/bs";
import testImg1 from "../../images/d.png";
import testImg2 from "../../images/d2.png";

function Index() {
  const [isListLayout, setIsListLayout] = useState(true);
  const items = Array(22).fill(1);
  return (
    <main className="mx-auto max-w-6xl px-3 lg:px-5 pt-20">
      <h1 className="text-3xl md:text-5xl font-bold text-purple-400 text-center">
        Hello, Johnson{" "}
        <Image
          src={smiley}
          alt="user emoji"
          className="-mb-3"
          width={40}
          height={40}
          priority
          loading="eager"
        />
        {/* <span className="text-orange-500">grupn </span> */}
      </h1>
      <p className="mt-6 flex gap-x-2 justify-center text-md md:text-xl max-w-3xl mx-auto text-center relative text-zinc-600">
        Let&apos;s get Grupn
        <div className="w-9 h-9 rotate-45 -mt-3 rounded-full relative ">
          <Image
            src={link}
            alt="Chart"
            className="  h-full w-full "
            layout="fill"
            priority
            loading="eager"
          />
        </div>
      </p>
      <Grupr />
      <section className="py-24">
        <div className="flex items-center gap-3 mb-10">
          <h1 className="text-3xl  font-bold text-purple-400">All Grups</h1>
          <div
            onClick={() => setIsListLayout(!isListLayout)}
            className="flex items-center justify-center cursor-pointer bg-purple-400 px-3 py-2 rounded-md"
          >
            {isListLayout ? (
              <BsFillGrid1X2Fill className="text-white text-md" />
            ) : (
              <FaThList className="text-white text-md" />
            )}
          </div>
        </div>

        <section className="flex flex-wrap">
          {items.map((item) => {
            return (
              <div className="w-full md:w-1/2 p-3 lg:w-1/3">
                {isListLayout ? (
                  <List
                    title="Dribbble - Discover the World"
                    url="www.dribbble.com"
                    image={testImg1}
                  />
                ) : (
                  <Grid
                    title="Activision - Call Of Duty Modern Warfare"
                    url="www.activision.com"
                    image={testImg2}
                  />
                )}
              </div>
            );
          })}
        </section>
      </section>
    </main>
  );
}

export default Index;
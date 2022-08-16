import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Chart from "../images/Chart.png";
import crossedFingers from "../images/Crossed-fingers.png";
// import VictoryHand from "../images/Victory-hand.png";
import link from "../images/link.svg";
import links from "../images/links.png";
import Grupr from "../components/Grupr";
import frame1 from "../images/frame (1).svg";
import frame2 from "../images/frame (2).svg";
import frame3 from "../images/frame (3).svg";
import frame4 from "../images/frame (4).svg";
import Excel from "../images/Excel.png";
import groupLinks from "../images/groupLinks.png";
import { BsFillGrid1X2Fill } from "react-icons/bs";
import { FaThList } from "react-icons/fa";
import Testimonials from "../components/Testimonials";
// import logo from "../images/logo.png";
const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Lets get Grupn</title>
        <meta
          name="description"
          content="Shorten multiple URL's and merge them into a single short link."
        />
        <meta
          name="keywords"
          content="grupr, compress multiple links, share multiple links,share multiple url,url aggregator,url aggregation"
        ></meta>
        <meta property="og:title" content="Lets get Grupn" />
        <meta
          property="og:description"
          content="Shorten multiple URL's and merge them into a single short link."
        />
        <meta property="og:image" content="/logo.png" />
        <meta property="og:url" content="https://www.grupr.nl" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Grupr.nl" />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@grupr.nl" />
        <meta name="twitter:creator" content="@chinnaji" />
        <meta name="twitter:title" content="Lets get Grupn" />
        <meta
          name="twitter:description"
          content="Shorten multiple URL's and merge them into a single short link."
        />
        <meta name="twitter:image" content="/logo.png" />
        {/* <meta name="twitter:image:alt" content=Lets get Grupn /> */}
      </Head>
      <main className=" flex w-full flex-1 flex-col items-center justify-center px-5 text-center max-w-5xl pt-24 mx-auto ">
        <section className="relative w-full ">
          <h1 className="text-4xl md:text-5xl font-bold text-purple-400 text-center">
            Shorten <span className="text-orange-500">multiple links</span>,
            share as one.
          </h1>
          <p className="mt-6 text-md md:text-xl max-w-2xl mx-auto text-center relative text-zinc-600">
            Sharing links one by one sucks😒. Grupr helps you share multiple
            links with one short URL. Create your
            <span className="text-orange-500"> Grup </span>
            and share in seconds.
            <p className="w-9 h-9 rotate-90 rounded-full absolute left-0 md:-bottom-32 -bottom-10 ">
              <Image
                src={link}
                alt="Chart"
                className="absolute  h-full w-full "
                layout="fill"
                priority
                loading="eager"
              />
            </p>
          </p>

          <Grupr />
          {/* decor images */}

          <div className="w-9 h-9  rounded-full absolute left-0 -top-12 sm:top-16 ">
            <Image
              src={crossedFingers}
              alt="crossed fingers"
              className="absolute  h-full w-full "
              layout="fill"
              priority
              loading="eager"
            />
          </div>
          <div className="md:w-9 md:h-9 h-6 w-6 rounded-full absolute right-0 top-24 ">
            <Image
              src={Chart}
              alt="Chart"
              className="absolute  h-full w-full "
              layout="fill"
              priority
              loading="eager"
            />
          </div>
          {/* <div className="w-9 h-9  rounded-full absolute left-28 -bottom-20 ">
          <Image
            src={link}
            alt="link"
            className="absolute  h-full w-full "
            layout="fill"
            priority
            loading="eager"
          />
        </div> */}
          {/* <div className="w-9 h-9  rounded-full absolute right-0 -bottom-64 ">
          <Image
            src={VictoryHand}
            alt="Chart"
            className="absolute  h-full w-full "
            layout="fill"
            priority
            loading="eager"
          />
        </div> */}
          <div className="w-9 h-9  rounded-full absolute right-10 md:bottom-10 md:block hidden ">
            <Image
              src={links}
              alt="link"
              className="absolute  h-full w-full "
              layout="fill"
              priority
              loading="eager"
            />
          </div>

          {/************ decor images ************/}
        </section>

        <section className="py-8  mt-10 lg:mt-32" id="features">
          {/* <h1 className="text-4xl md:text-5xl  font-bold text-purple-400 text-center">
          Amazing Features
        </h1> */}
          {/* frame 1 */}
          <div className="w-full  flex flex-wrap my-10 py-5">
            <div className="w-full md:w-1/2 p-3  flex items-center flex-col justify-center">
              <div className="w-24 h-24 mb-5 text-center  rounded-full relative ">
                <Image
                  src={groupLinks}
                  alt="link"
                  className="  h-full w-full "
                  layout="fill"
                  priority
                  loading="eager"
                />
              </div>
              <h2 className="text-3xl font-bold text-purple-400">
                One short link,
                <span className="text-orange-500">Infinite possibilities.</span>
              </h2>
              <p className="mt-5 font-light text-center lg:mb-0 mb-10">
                Get on short shareble link that acts as a gateway to an infinite
                number of your favourite Url&apos;s.
              </p>
            </div>
            <div className="w-full md:w-1/2 p-5  relative min-h-[450px]">
              <Image
                src={frame4}
                alt="link"
                className="absolute  h-full w-full "
                layout="fill"
                objectFit="contain"
                priority
                loading="eager"
              />
            </div>
          </div>

          {/* frame 2*/}

          <div className="w-full  flex md:flex-row-reverse flex-wrap my-20 py-10">
            <div className="w-full md:w-1/2 p-3  flex items-center flex-col justify-center">
              <div className="text-4xl mb-5 flex gap-x-3">
                <FaThList className="text-purple-400 transform -rotate-[20deg]" />
                <BsFillGrid1X2Fill className="text-orange-500 transform rotate-[20deg]" />
              </div>
              <h2 className="text-3xl font-bold text-purple-400">
                Multiple preview layouts
              </h2>
              <p className="mt-5 font-light text-center lg:mb-0 mb-10">
                Toggle between list and grid layout to Preview Your stored
                links.
              </p>
            </div>
            <div className="w-full md:w-1/2 p-5  relative min-h-[450px]">
              <Image
                src={frame1}
                alt="link"
                className="absolute  h-full w-full "
                layout="fill"
                objectFit="contain"
                priority
                loading="eager"
              />
            </div>
          </div>

          {/* frame 3 */}
          <div className="w-full  flex flex-wrap my-20 py-10">
            <div className="w-full md:w-1/2 p-3  flex items-center flex-col justify-center">
              <div className="w-12 h-12 mb-5 text-center  rounded-full relative ">
                <Image
                  src={Excel}
                  alt="link"
                  className="  h-full w-full "
                  layout="fill"
                  priority
                  loading="eager"
                />
              </div>
              <h2 className="text-3xl font-bold text-purple-400">
                Import CSV support
              </h2>
              <p className="mt-5 font-light text-center lg:mb-0 mb-10">
                Got a CSV file? no wories! Import your CSV file and get your
                links ready to share seconds.
              </p>
            </div>
            <div className="w-full md:w-1/2 p-5  relative min-h-[450px]">
              <Image
                src={frame2}
                alt="link"
                className="absolute  h-full w-full "
                layout="fill"
                objectFit="contain"
                priority
                loading="eager"
              />
            </div>
          </div>

          {/* frame 4 */}

          <div className="w-full md:flex-row-reverse  flex flex-wrap my-20 pt-10">
            <div className="w-full md:w-1/2 p-3  flex items-center flex-col justify-center">
              <p className="mb-5">
                <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-orange-500">
                  https://grupr.nl/short
                </h2>
              </p>
              <h2 className="text-3xl font-bold text-purple-400">
                Simple and Short URL
              </h2>
              <p className="mt-5 font-light text-center lg:mb-0 mb-10">
                Get a beautiful, short and easy to remember link in no time
              </p>
            </div>
            <div className="w-full md:w-1/2 p-5  relative min-h-[450px]">
              <Image
                src={frame3}
                alt="link"
                className="absolute  h-full w-full "
                layout="fill"
                objectFit="contain"
                priority
                loading="eager"
              />
            </div>
          </div>
        </section>
        {/* <Testimonials /> */}
      </main>

      {/* soft blur items */}

      <section className=" md:block hidden">
        <div className="hover:bg-purple-500 transition-all ease-in-out bg-purple-400  absolute top-[115vh]  lg:w-[280px] w-[150px] lg:h-[280px] h-[150px] lg:-left-[250px] -left-[120px] blur-[120px] lg:blur-[250px]"></div>
        <div className="bg-orange-500 absolute top-[285vh] lg:w-[280px] lg:h-[280px] lg:-right-[250px] blur-[270px]"></div>
      </section>
      {/* soft blur items */}
    </>
  );
};

export default Home;

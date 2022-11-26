import React, { useState } from "react";
import Grupr from "../../components/Grupr";
import Image from "next/image";
import smiley from "../../images/smiley.png";
import link from "../../images/link.svg";
import Link from "next/link";
import { GetServerSidePropsContext } from "next";
import { firebaseAdmin } from "../../config/firebaseAdmin";
import {
  doc,
  getDoc,
  getDocs,
  query,
  where,
  collection,
  DocumentData,
} from "firebase/firestore";
import { db } from "../../config";
import nookies from "nookies";
import { TdashboardProps } from "../../types";
import DashboardList from "../../components/DashboardList";

function Index({ userData }: TdashboardProps) {
  // console.log(userData);
  const { name, userGrups } = userData;
  const [isListLayout, setIsListLayout] = useState(true);
  return (
    <main className="mx-auto max-w-6xl px-3 lg:px-5 pt-20">
      <h1 className="text-2xl flex items-center justify-center gap-x-2 md:text-4xl font-bold text-purple-400 text-center">
        Hello, {name.split(" ")[0]}
        <Image
          src={smiley}
          alt="user emoji"
          width={40}
          height={40}
          priority
          loading="eager"
        />
        {/* <span className="text-orange-500">grupn </span> */}
      </h1>
      <p className="mt-4 flex gap-x-1 justify-center text-md md:text-xl max-w-3xl mx-auto text-center relative text-zinc-600">
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
      <section className="py-32">
        <div className="flex items-center gap-3 mb-10 justify-center">
          <h1 className="text-3xl font-bold flex items-center justify-center gap-x-2 text-purple-400">
            All Grups{" "}
            <span className=" rounded p-1 w-6 h-6 bg-orange-500 flex items-center justify-center text-sm">
              {userGrups.length}
            </span>
          </h1>
        </div>

        {userData.userGrups.length < 0 ? (
          <p className="text-center gap-x-1 text-lg -mt-5 w-full justify-center  flex ">
            No grups.{"  "}
            <Link href="/d#grupr" className="text-purple-400">
              Create Now!
            </Link>
          </p>
        ) : (
          <section className="w-full flex flex-col gap-y-3">
            {userGrups.map(({ grupId, fullUrl, title, dateCreated }, index) => {
              return (
                <DashboardList
                  key={grupId}
                  data={{ grupId, fullUrl, title, dateCreated }}
                />
              );
            })}
          </section>
        )}
        {/*  // <div key={index} className="w-full md:w-1/2 p-3 lg:w-1/3">
              //   {isListLayout ? (
              //     <List
              //       title="Dribbble - Discover the World"
              //       url="www.dribbble.com"
              //       image={testImg1}
              //     />
              //   ) : (
              //     <Grid
              //       title="Activision - Call Of Duty Modern Warfare"
              //       url="www.activision.com"
              //       image={testImg2}
              //     />
              //   )}
              // </div> */}
      </section>
    </main>
  );
}

export default Index;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  try {
    /****verify auth token and get user id****************************************** */
    //
    const cookies = nookies.get(ctx);
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
    const { uid } = token;
    // the  is authenticated!

    /**********FETCH STUFF HERE************************************ */
    const docRef = doc(db, "userData", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { name, email } = docSnap.data();

      // console.log(userData.name);
      // get all grups belonging to user
      const usersGrupsRef = collection(db, "grups");

      // Create a query against the collection.
      const usersGrups = query(usersGrupsRef, where("createdBy", "==", uid));
      const querySnapshot = await getDocs(usersGrups);
      const userGrups: DocumentData[] = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        userGrups.push(doc.data());
      });
      // console.log(userGrups);
      const userData = { name, email, userGrups };
      /**********return user data************************************ */
      return {
        props: { userData },
      };
    }
  } catch (err) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
      // `as never` is required for correct type inference
      // by InferGetServerSidePropsType below
      props: {} as never,
    };
  }
}

import React from "react";
import link from "../images/link.svg";
import Image from "next/image";
import CopyToClipboard from "./CopyToClipboard";
import { AiOutlineDelete } from "react-icons/ai";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../config";
import Link from "next/link";
function DashboardList({ data }: any) {
  async function handleDelete(id: string) {
    const confirm = prompt("Type 'yes' to confirm delete " + data.title);
    if (confirm === "yes") {
      await deleteDoc(doc(db, "grups", id));
      alert("Grup deleted");
      // firebaseAdmin.firestore().collection("grups").doc(id).delete();
    }
  }
  return (
    <div className="bg-purple-100 hover:bg-purple-400/10 transition-all ease-in-out duration-200 text-purple-400 flex items-center rounded-md  max-w-3xl w-full mx-auto px-5 ">
      {/* <div className="w-7 h-7 rotate-45 mr-3  rounded-full relative ">
        <Image
          src={link}
          alt="Chart"
          className="  h-full w-full "
          layout="fill"
          priority
          loading="eager"
        />
      </div> */}
      <div className="flex flex-col mr-auto overflow-hidden max-w-[70%] ">
        <h3 className="text-zinc-800 w-full truncate">{data.title}</h3>
        <Link href={"/" + data.grupId}>
          <a className=" md:text-md text-sm font-medium ">
            grupr.nl/{data.grupId}
          </a>
        </Link>
      </div>

      <div className="ml-auto  flex gap-x-3">
        <CopyToClipboard type={2} text={data.fullUrl} />
        <button
          title={`Delete ${data.title}`}
          onClick={() => handleDelete(data.grupId)}
          type="button"
          className={`ml-auto px-2 my-2 py-4 outline-none flex gap-x-2  justify-center items-center duration-200 rounded-md text-red-500 font-semibold  transition-all ease-in-out`}
        >
          <AiOutlineDelete className="text-xl" />{" "}
          <span className="md:block hidden text-sm">Delete</span>
        </button>
      </div>
    </div>
  );
}

export default DashboardList;

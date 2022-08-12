import React from "react";
import link from "../images/link.png";
import Image from "next/image";
import CopyToClipboard from "./CopyToClipboard";
import { AiOutlineDelete } from "react-icons/ai";
function DashboardList({ data }: any) {
  function handleDelete(id: string) {
    const confirm = prompt("Type 'yes' to confirm delete " + data.title);
    if (confirm === "delete") {
      // firebaseAdmin.firestore().collection("grups").doc(id).delete();
    }
  }
  return (
    <div className="bg-purple-100 hover:bg-purple-400/10 transition-all ease-in-out duration-200 text-purple-400 flex items-center rounded-md  max-w-3xl w-full mx-auto md:px-5 px-3">
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
        <a
          target="_blank"
          // href={data.fullUrl}
          href={"/" + data.grupId}
          className=" md:text-md text-sm font-medium "
        >
          grupr.nl/{data.grupId}
        </a>
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

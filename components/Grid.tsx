import React from "react";
import Image from "next/image";
import { TLayoutProps } from "../types";
function Grid({ title, url, image }: TLayoutProps) {
  return (
    <a href={url} className=" bg-purple-400  rounded-lg p-0">
      <div className="w-full lg:h-44 h-36 relative rounded-t-lg overflow-hidden  p-0">
        <img src={image} className="w-full h-full object-contain" />
      </div>
      <div className="flex flex-col bg-zinc-100 mt-3 justify-center flex-1 py-3 rounded-b-md w-full px-3 gap-y-1">
        <h2 className="w-full truncate font-medium ">{title}</h2>
        <p className="text-light text-sm">{url}</p>
      </div>
    </a>
  );
}

export default Grid;

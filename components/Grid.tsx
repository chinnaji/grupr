import React from "react";
import { TLayoutProps } from "../types";
import formatUrl from "../helpers/formatUrl";
function Grid({ title, url, image }: TLayoutProps) {
  return (
    <a
      target="_blank"
      href={url}
      className="shadow-md overflow-hidden  bg-purple-400  rounded-lg p-0"
    >
      <div className="w-full bg-zinc-200  lg:h-44 h-36 relative rounded-t-lg overflow-hidden  p-10">
        <img
          src={image}
          alt={url + title}
          className="md:w-1/2 md:mx-auto w-full h-full object-contain"
        />
      </div>
      <div className="flex flex-col bg-zinc-100  justify-center flex-1 py-3 rounded-b-md w-full px-3 gap-y-1">
        <h2 className="w-full truncate font-semibold ">{title}</h2>
        <p className="text-light text-purple-400 text-sm">{formatUrl(url)}</p>
      </div>
    </a>
  );
}

export default Grid;

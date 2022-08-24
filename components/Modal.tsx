import React, { useEffect, useCallback } from "react";
import { MdOutlineClose } from "react-icons/md";
import { TModalProps } from "../types";
function Modal({ setIsModal, children }: TModalProps) {
  // close on esc
  const escFunction = useCallback((e: any) => {
    if (e.keyCode === 27) {
      setIsModal(false);
    }
  }, []);
  useEffect(() => {
    document.addEventListener("keydown", escFunction);

    return () => {
      document.removeEventListener("keydown", escFunction);
    };
  });

  return (
    <section className="z-[100] fixed inset-0 backdrop-blur-2xl flex justify-center p-3 bg-white/60 items-center">
      <div className=" relative lg:w-[40%] w-[90%] lg:p-5 py-10 p-3 bg-white shadow rounded-md">
        <MdOutlineClose
          className="cursor-pointer text-2xl text-zinc-600  right-2 top-2 absolute "
          onClick={() => setIsModal(false)}
        />
        {children}
      </div>
    </section>
  );
}

export default Modal;

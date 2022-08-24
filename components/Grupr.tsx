import React, { useState } from "react";
import UploadExcel from "./UploadExcel";
import Modal from "../components/Modal";
import Image from "next/image";
import party from "../images/party.png";
import { FiExternalLink } from "react-icons/fi";
import {
  saveGrupr,
  readCsv,
  handleGruprValidation,
} from "../helpers/handleGruprSubmit";
import CopyToClipboard from "./CopyToClipboard";
import Share from "./Share";
import { checkAuth } from "../helpers/checkAuth";
function Grupr() {
  const [isExcel, setisExcel] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [title, setTitle] = useState("");
  const [textArealinks, settextArealinks] = useState("");
  const [grupUrl, setGrupUrl] = useState("");
  const [excelFile, setExcelFile] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");
  const user = checkAuth();
  const createdBy = user ? user.uid : "Anonymous";

  const handleErrnLoading = (err: string) => {
    setErr(err);
    setIsLoading(false);
    setTimeout(() => {
      setErr("");
    }, 3000);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // validate title length
    if (title.length < 1) {
      handleErrnLoading("Please provide a title");
      return;
    }
    // start loading animation
    setIsLoading(true);
    // var newUrls = [];
    // if csv file is uploaded
    if (isExcel) {
      // get csv files as array
      const newUrls = await readCsv(excelFile);
      // check type of newUrls
      // if type is string, means error
      if (typeof newUrls === "string") {
        handleErrnLoading(newUrls);
        return;
      }

      // validate urls
      const validateUrls = handleGruprValidation(newUrls);
      // if validation response is string, means error
      if (typeof validateUrls === "string") {
        handleErrnLoading(validateUrls);
        return;
      }

      // if no error, save to database
      const { code, fullUrl } = await saveGrupr({
        urls: validateUrls,
        createdBy,
        title,
      });
      if (code === 200) {
        setGrupUrl(fullUrl);
        setIsModal(true);
        setIsLoading(false);
      } else {
        handleErrnLoading("Error creating Grup, Please try again");
      }
      // console.log(validateUrls);
    } else {
      const urls = textArealinks.trim().split("\n");
      // validate urls
      const validateUrls = handleGruprValidation(urls);
      // if validation response is string, means error
      if (typeof validateUrls === "string") {
        handleErrnLoading(validateUrls);
        return;
      }
      // console.log(validateUrls);
      // setIsLoading(false);
      // if no error, save to database
      const { code, fullUrl } = await saveGrupr({
        urls: validateUrls,
        createdBy,
        title,
      });
      if (code === 200) {
        // update full url
        setGrupUrl(fullUrl);
        // open modal
        setIsModal(true);
        // end loading animation
        setIsLoading(false);
      } else {
        handleErrnLoading("Error creating Grup, Please try again");
      }
    }
  };

  return (
    <>
      <form
        id="grupr"
        onSubmit={handleSubmit}
        className="shadow-md rounded-lg p-2 overflow-hidden relative bg-white flex flex-wrap max-w-xl mt-10 mx-auto border-purple-200/5 border-2"
      >
        {err.length > 0 ? (
          <p className="mx-2 rounded w-full bg-red-200 text-red-500  my-3 p-3 text-center text-sm font-medium  ">
            {err}
          </p>
        ) : null}
        {/* title  */}
        <div className="w-full md:w-[75%] p-2 order-2 md:order-none">
          <input
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            required
            placeholder="Title"
            className="p-3 outline-none focus:border-1 focus:border-purple-200 rounded-md bg-purple-100 text-purple-300 w-full"
          />
        </div>
        {/* toogle file upload component */}
        <div className="w-full md:w-[25%] p-2 order-1 md:order-none">
          <button
            onClick={() => setisExcel(!isExcel)}
            type="button"
            className={`px-2 py-3 outline-none font-semibold    rounded-md ${
              isExcel
                ? "text-purple-400 bg-purple-100"
                : "text-orange-500 bg-orange-100"
            } w-full`}
          >
            {isExcel ? " Manually" : "Import CSV"}
          </button>
        </div>

        <div className="w-full p-2 order-3 md:order-none">
          {/*  file upload component */}

          {isExcel ? (
            <UploadExcel
              setExcelFile={setExcelFile}
              excelFile={excelFile}
              title={title}
            />
          ) : (
            // manual input component
            <textarea
              title="Input links line by line"
              className="p-3 outline-none focus:border-1 focus:border-purple-200 rounded-md bg-purple-100 text-purple-300 w-full"
              placeholder={
                "https://www.androidpill.com/\nwww.dribbble.com/\nhttps://www.activision.com/\nhttps://www.google.com/"
              }
              onChange={(e) => settextArealinks(e.target.value)}
              autoFocus={false}
              rows={7}
            ></textarea>
          )}
          {/* submit button */}
          <div className="w-full  mt-3 order-4 md:order-none">
            {isLoading ? (
              <button
                title="Creating a Grup"
                type="button"
                className="px-2 py-4 outline-none justify-center flex items-center gap-x-1  rounded-md text-zinc-100 font-semibold hover:bg-purple-500 transition-all ease-in-out bg-purple-400  w-full"
              >
                <svg
                  aria-hidden="true"
                  className="mr-2 w-6 h-6 text-gray-200 animate-spin  fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>{" "}
                Creating ...
              </button>
            ) : (
              <button
                type="submit"
                className="px-2 py-4 outline-none   rounded-md text-zinc-100 font-semibold hover:bg-purple-500 transition-all ease-in-out bg-purple-400  w-full"
              >
                Create a Grup
              </button>
            )}
          </div>
        </div>
      </form>

      {/* Grupr success modal */}
      {isModal && (
        <Modal setIsModal={setIsModal} isModal={isModal}>
          <>
            <h1 className="text-xl flex items-center gap-x-2 mx-auto w-fit mb-1 md:text-3xl font-bold text-purple-400 text-center">
              CONGRATULATIONS!
              <Image
                src={party}
                alt="partying emoji"
                width={40}
                height={40}
                priority
                loading="eager"
              />
              {/* <span className="text-orange-500">grupn </span> */}
            </h1>
            <p className="mb-6 text-sm md:text-xl max-w-3xl mx-auto text-center relative text-zinc-600">
              Grup created succesfully!
            </p>
            <div className="mx-2">
              <input
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                readOnly
                disabled
                required
                value={grupUrl}
                className="px-3 py-4 my-2 outline-none focus:border-1 focus:border-purple-200 rounded-md bg-purple-100 text-purple-300 w-full"
              />
            </div>
            <div className="flex flex-wrap -mt-2">
              <div className="w-full p-2  md:w-1/2">
                <CopyToClipboard type={1} text={grupUrl} />
              </div>
              <div className="w-full p-2 md:w-1/2">
                {/* <Link href={grupUrl.slice(20, -1)}>
                  <a className="px-2  py-4 outline-none  lg:my-2 flex gap-x-3  justify-center items-center rounded-md text-zinc-100 font-semibold hover:bg-purple-500 transition-all ease-in-out bg-purple-400  w-full">
                    <FiExternalLink className="text-xl" /> Preview
                  </a>
                </Link> */}

                {/* <Link > */}
                <a
                  onClick={() => setIsModal(false)}
                  href={grupUrl.slice(20, -1)}
                  target="_blank"
                  className="px-2  py-4 outline-none  md:my-2 flex gap-x-3  justify-center items-center rounded-md text-zinc-100 font-semibold hover:bg-purple-500 transition-all ease-in-out bg-purple-400  w-full"
                >
                  <FiExternalLink className="text-xl" /> Preview
                </a>
                {/* </Link> */}
              </div>
              <Share url={grupUrl} />
            </div>
          </>
        </Modal>
      )}
    </>
  );
}

export default Grupr;

import React, { useState, useEffect } from "react";
import Excel from "../images/Excel.png";
import Image from "next/image";
interface UploadExcelProps {
  title: string;
  excelFile: any;
  setExcelFile: (file: any) => void;
}
function UploadExcel({ title, excelFile, setExcelFile }: UploadExcelProps) {
  // const [excelFile, setExcelFile] = useState<File[]>([]);
  const [isUploaded, setisUploaded] = useState(false);
  const handleFileUpload = async (e: any) => {
    setExcelFile(e.target.files[0]);
    setisUploaded(true);
  };
  // useEffect(() => {
  //   console.log(isUploaded);
  //   console.log(excelFile);
  // }, []);
  return (
    <>
      <div className="min-h-[150px] relative cursor-pointer border-dashed border-2 rounded-md flex items-center flex-col">
        <div className="w-10 h-10 mt-6 mb-2  text-center  rounded-full relative ">
          <Image
            src={Excel}
            alt="link"
            className="  h-full w-full "
            layout="fill"
            priority
            loading="eager"
          />
        </div>
        <h4 className="text-md font-bold text-zinc-800">
          Drag and drop files,{" "}
          <span className="text-purple-400 text-sm">or Browse</span>
        </h4>
        {isUploaded && (
          <div className="text-sm mt-2">({excelFile.name} uploaded!)</div>
        )}

        <input
          onChange={handleFileUpload}
          // accept=".xlsx, .xls"
          accept=".csv"
          type="file"
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
      </div>
      <p className="relative my-5 text-sm text-center">
        <a
          title="Download a sample Template "
          href="/grupr-sample.csv "
          className="underline"
          download
        >
          Download CSV Sample
        </a>
      </p>
    </>
  );
}

export default UploadExcel;

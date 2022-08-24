import axios from "axios";
import { TgetShortenDataProps, TsubmitProps } from "../types";

export const handleGruprValidation = (urls: any) => {
  for (let i = 0; i < urls.length; i++) {
    // check if each url is valid
    try {
      new URL(urls[i]);
    } catch (e) {
      console.log(e);
      // const toStr = e as Error;
      return `Invalid Url - ${urls[i]}`;
    }
  }
  return urls;
};

function readFileAsync(file: any) {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result);
    };

    reader.onerror = reject;

    reader.readAsText(file);
  });
}

export const readCsv = async (excelFile: any) => {
  // console.log(excelFile);
  try {
    let csvData: any = await readFileAsync(excelFile);
    if (csvData.length > 0) {
      return csvData.trim().split("\r\n");
    } else {
      return "Empty File, please check again";
    }
  } catch (err) {
    return "Error with File, please check again";
  }
};

export const saveGrupr = async ({ urls, title, createdBy }: any) => {
  // return { urls, title, createdBy };
  return await axios
    .post("/api/shortenUrls", { urls, title, createdBy })
    .then((res) => {
      const { fullUrl } = res.data;
      // console.log(res.data);

      return res.data;
    })
    .catch((err) => {
      return err;

      // console.log(err);
    });
};

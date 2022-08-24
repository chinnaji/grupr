import axios from "axios";
import { saveGruprProps } from "../types";

export const handleGruprValidation = (urls: Array<string>) => {
  for (let i = 0; i < urls.length; i++) {
    // check if each url is valid
    try {
      new URL(urls[i]);
    } catch (e) {
      // console.log(e);
      return `Invalid Url - ${urls[i]}`;
    }
  }
  return urls;
};

// function to read csv file
function readFileAsync(file: File) {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result);
    };

    reader.onerror = reject;

    reader.readAsText(file);
  });
}

export const readCsv = async (
  excelFile: File
): Promise<string | Array<string>> => {
  try {
    let csvData = (await readFileAsync(excelFile)) as string;
    // check if file contains any data
    // if it does, return array of urls
    if (csvData.length > 0) {
      return csvData.trim().split("\r\n");
    } else {
      return "Empty File, please check again";
    }
  } catch (err) {
    return "Error with File, please check again";
  }
};

export const saveGrupr = async ({ urls, title, createdBy }: saveGruprProps) => {
  // save data to DB and return response
  return await axios
    .post("/api/shortenUrls", { urls, title, createdBy })
    .then((res) => {
      // const { fullUrl } = res.data;
      // console.log(res.data);

      return res.data;
    })
    .catch((err) => {
      return (err as Error).message;

      // console.log(err);
    });
};

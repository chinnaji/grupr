import axios from "axios";
import { TgetShortenDataProps, TsubmitProps } from "../types";
import urlRegex from "url-regex";

export const handleGruprValidation = (urls: any) => {
  const newUrls: any = [];
  // const urls = links.trim().split("\n");
  // console.log({ urls });
  for (let i = 0; i < urls.length; i++) {
    // check if each url is valid
    const testUrl = urlRegex({ exact: true, strict: true }).test(urls[i]);
    // ? urls[i]
    // : false;
    if (!testUrl) {
      return "Invalid Url, please check again";
    }
    if (urls[i].includes("https://") || urls[i].includes("http://")) {
      newUrls.push(urls[i]);
    } else {
      newUrls.push("http://" + urls[i]);
    }
  }
  return newUrls;
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

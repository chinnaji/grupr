import axios from "axios";
import { TgetShortenDataProps, TsubmitProps } from "../types";

export const handleGruprValidation = (urls: any) => {
  const newUrls = [];
  // const urls = links.trim().split("\n");
  // console.log({ urls });
  for (let i = 0; i < urls.length; i++) {
    const formatProtocol =
      urls[i].slice(0, 2) == "//"
        ? "http:" + urls[i]
        : urls[i].slice(0, 3) == "www"
        ? "http://" + urls[i]
        : urls[i]; //dummy protocol so that URL works
    // console.log({ formatProtocol });
    try {
      const checkUrl = new URL(formatProtocol);
      newUrls.push(checkUrl.href);
      // console.log({ checkUrl });
    } catch (e: any) {
      return "Invalid Url, please check again";
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

export const handleCsv = async (excelFile: any) => {
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

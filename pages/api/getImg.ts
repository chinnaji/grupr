import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../config";
import { setDoc, doc } from "firebase/firestore";
import fs from "fs";
import path from "path";
import { customAlphabet } from "nanoid";
import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";

const filePath = path.resolve(".", "images_folder/img.png");
const imageBuffer = fs.readFileSync(filePath);

export default async function (req: any, res: any) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
  // generate a random id for the grup
  const getHash = customAlphabet(characters, 6);
  const id = getHash();
  const ck = getCookies({ req, res });

  //   const data = { ip, method, url, headers };
  const data = { ck };
  console.log(data);
  res.setHeader("Content-Type", "image/jpg");
  console.log(req.headers.cookie);
  try {
    //  save user info to db and use user id as doc id
    await setDoc(doc(db, "test", id), data);
  } catch (err) {
    console.log(err);
    return res.status(302).json({
      code: 404,
      message: "failed",
      err,
    });
  }
  return res.send(imageBuffer);

  //   rawHeaders
  // save {host:req.rawHeaders[1],body:req.body }
}

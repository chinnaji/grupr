import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../config";
import { setDoc, doc } from "firebase/firestore";
import fs from "fs";
import path from "path";
import { customAlphabet } from "nanoid";

const filePath = path.resolve(".", "images_folder/img.png");
const imageBuffer = fs.readFileSync(filePath);

export default async function (req: any, res: any) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
  // generate a random id for the grup
  const getHash = customAlphabet(characters, 6);
  const id = getHash();
  const { method, url, headers } = req;
  var ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || null;

  const data = { ip, method, url, headers };

  res.setHeader("Content-Type", "image/jpg");
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

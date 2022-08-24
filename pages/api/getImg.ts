import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../config";
import { setDoc, doc } from "firebase/firestore";
import fs from "fs";
import path from "path";

const filePath = path.resolve(".", "images_folder/img.png");
const imageBuffer = fs.readFileSync(filePath);

export default async function (req: any, res: any) {
  //   const data = { host: req.rawHeaders[1], body: req.body };
  res.setHeader("Content-Type", "image/jpg");
  try {
    //  save user info to db and use user id as doc id
    await setDoc(doc(db, "test", "dfgfefw432435ffd"), req);
  } catch (err) {
    // console.log(err);
    return res.status(302).json({
      code: 404,
      message: "failed",
    });
  }
  res.send(imageBuffer);

  //   rawHeaders
  // save {host:req.rawHeaders[1],body:req.body }
}

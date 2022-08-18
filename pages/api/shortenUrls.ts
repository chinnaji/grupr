import type { NextApiRequest, NextApiResponse } from "next";
import { customAlphabet } from "nanoid";
import { db } from "../../config";
import { setDoc, doc } from "firebase/firestore";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // console.log(req.body);
  if (req.method == "POST") {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
    // generate a random id for the grup
    const getHash = customAlphabet(characters, 6);
    const grupId = getHash();

    //  save to db
    const result = {
      grupId,
      fullUrl: `https://www.grupr.nl/${grupId} `,
      dateCreated: new Date().toISOString(),
      createdBy: req.body.createdBy,
      destinations: req.body.urls,
      title: req.body.title,
    };

    try {
      //  save user info to db and use user id as doc id
      await setDoc(doc(db, "grups", grupId), result);
    } catch (err) {
      // console.log(err);
      return res.status(302).json({
        code: 404,
        message: "failed",
      });
    }

    // console.log(result);
    // return result;
    return res.status(200).json({
      code: 200,
      message: "success",
      fullUrl: `https://www.grupr.nl/${grupId} `,
    });
  }

  //   if api request is a not post request
  return res.status(405).json({
    type: "Error",
    code: 405,
    message: "Only POST method is accepted on this route",
  });
}

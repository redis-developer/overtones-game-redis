import { decodeToken } from "./jwt";
import { ObjectId } from "mongodb";

export const auth = async (db: any, req: any, res: any) => {
  const token = req.headers.authorization as string;

  if (!token) {
    return null;
  }

  try {
    const decoded = decodeToken(token);

    if (!decoded) {
      return null;
    }

    const findUser = await db
      .collection("users")
      .find({ _id: new ObjectId(decoded) })
      .toArray();

    if (!findUser || !findUser.length) {
      return null;
    }

    return findUser[0];
  } catch (e) {
    return null;
  }
};

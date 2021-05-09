import connectToDb from "lib/mongodb";
import { auth } from "lib/auth-middleware";

export default async function handler(req, res) {
  const db = await connectToDb();
  const user = await auth(db, req, res);

  if (!user) {
    return res.status(401).json({ unauthorized: true });
  }

  return res.status(200).send({
    username: user.username,
    lastHighScore: user.latestHighScore || 0,
  });
}

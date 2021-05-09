import bcrypt from "bcrypt-nodejs";
import connectToDb from "lib/mongodb";
import { generateToken } from "lib/jwt";

export default async function handler(req, res) {
  const db = await connectToDb();

  const username = req.body.username.toLowerCase();
  const password = req.body.password;

  try {
    // check if username has been used
    const findUser = await db.collection("users").find({ username }).toArray();

    if (!findUser || !findUser.length) {
      return res.status(400).json({ error: "Username does not exist" });
    }

    const user = findUser[0];

    const passwordMatches = bcrypt.compareSync(password, user.password);

    if (!passwordMatches) {
      return res.status(400).json({ error: "Password incorrect" });
    }

    res.status(200).json({ user, token: generateToken(user._id) });
  } catch (e) {
    res.status(500).json({});
  }
}

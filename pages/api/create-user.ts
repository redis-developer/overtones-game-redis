import connectToDb from "lib/mongodb";
import { generateToken, hashPassword } from "lib/jwt";
import { redisjson } from "lib/redis"

export default async function handler(req, res) {
  const db = await connectToDb();

  const username = req.body.username.toLowerCase();
  const password = req.body.password;

  // check if username has been used
  const findUser = await db.collection("users").find({ username }).toArray();

  if (findUser && findUser.length) {
    return res.status(400).json({ error: "Username already used!" });
  }

  try {
    // TODO type this
    const newUser = await db.collection("users").insertOne({
      username,
      password: hashPassword(password),
      latestHighScore: 0,
      highScores: [],
      createdAt: new Date(),
    });

    if (!newUser) {
      res.status(500).json({});
    }
    
    const user = newUser.ops[0];

    // Create empty array for storing study activity for this user
    await redisjson.set(`sa:${user._id}`, '.', []);

    res.status(200).json({ saved: true, user, token: generateToken(user._id) });
  } catch (e) {
    res.status(500).json({});
  }
}

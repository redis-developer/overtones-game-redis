import connectToDb from "lib/db";
import { auth } from "lib/auth-middleware";

export default async function handler(req, res) {
  const db = await connectToDb();
  const user = await auth(db, req, res);

  if (!user) {
    return res.status(401).json({});
  }

  const body = req.body;

  try {
    const currentHighScore = user.latestHighScore;

    if (body.score > currentHighScore) {
      await db.collection("users").findOneAndUpdate(
        { _id: user._id },
        {
          $set: {
            latestHighScore: body.score,
          },
          $push: {
            highScores: currentHighScore,
          },
        }
      );

      res
        .status(200)
        .json({ newHighScore: body.score, prevHighScore: currentHighScore });
    }

    res.status(200).json({
      newHighScore: currentHighScore,
      prevHighScore: currentHighScore,
    });

    // add up all the scores and then store the new highscore on the user
  } catch (e) {
    res.status(500).json({});
  }
}

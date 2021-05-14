import connectToDb from "lib/mongodb";
import { auth } from "lib/auth-middleware";
import { leaderboardAllTime } from "lib/leaderboard";

export default async function handler(req, res) {
  const db = await connectToDb();
  const user = await auth(db, req, res);

  if (!user) {
    return res.status(401).json({});
  }

  const body = req.body;

  try {
    const lastScore = (await leaderboardAllTime.score(user._id)) || 0
    const lastRank = (await leaderboardAllTime.rank(user._id)) || 0

    if (body.score > lastScore) { 

      await leaderboardAllTime.update([
        { id: user._id, value: body.score }
      ]);

      const playerCount = (await leaderboardAllTime.count()) || 0
      const newRank = await leaderboardAllTime.rank(user._id)

      res
        .status(200)
        .json({ 
          newHighScore: body.score, 
          newRank: newRank,
          prevHighScore: lastScore,
          prevRank: lastRank,
          totalPlayers: playerCount
        });
    } else {
      
      const playerCount = (await leaderboardAllTime.count()) || 0

      res.status(200).json({
        newHighScore: lastScore,
        newRank: lastRank,
        prevHighScore: lastScore,
        prevRank: lastRank,
        totalPlayers: playerCount
      });
    }
      
      // add up all the scores and then store the new highscore on the user
  } catch (e) {
    res.status(500).json({});
  }
}

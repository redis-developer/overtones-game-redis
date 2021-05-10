import connectToDb from "lib/mongodb";
import { auth } from "lib/auth-middleware";
import { Leaderboard } from 'redis-rank';
import redis from "lib/redis"

export default async function handler(req, res) {
  const db = await connectToDb();
  const user = await auth(db, req, res);

  if (!user) {
    return res.status(401).json({});
  }

  const body = req.body;

  const lb = new Leaderboard(redis, 'lb:example', {
    sortPolicy: 'high-to-low',
    updatePolicy: 'replace'
  });

  try {
    const lastScoreOrNull = await lb.score(user._id)
    const lastScore = lastScoreOrNull ? lastScoreOrNull : 0

    const lastRankOrNull = await lb.rank(user._id)
    const lastRank = lastRankOrNull ? lastRankOrNull : 0

    const playerCount = await lb.count()

    if (body.score > lastScore) { 
      await lb.update([
        { id: user._id, value: body.score }
      ]);

      const newRank = await lb.score(user._id)

      res
        .status(200)
        .json({ 
          newHighScore: body.score, 
          newRank: newRank,
          prevHighScore: lastScore,
          prevRank: lastRank,
          totalPlayers: playerCount
        });
    }

    res.status(200).json({
      newHighScore: lastScore,
      newRank: lastRank,
      prevHighScore: lastScore,
      prevRank: lastRank,
      totalPlayers: playerCount
    });

    // add up all the scores and then store the new highscore on the user
  } catch (e) {
    res.status(500).json({});
  }
}

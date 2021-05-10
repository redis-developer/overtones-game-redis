import connectToDb from "lib/mongodb";
import { auth } from "lib/auth-middleware";
import redis from "lib/redis"
import { Leaderboard } from 'redis-rank';

export default async function handler(req, res) {
  const db = await connectToDb();
  const user = await auth(db, req, res);

  if (!user) {
    return res.status(401).json({ unauthorized: true });
  }

  const lb = new Leaderboard(redis, 'lb:example', {
    sortPolicy: 'high-to-low',
    updatePolicy: 'replace'
  });

  const lastScore = await lb.score(user._id)
  const lastRank = await lb.rank(user._id)
  const totalPlayers = await lb.count()

  return res.status(200).send({
    username: user.username,
    lastHighScore: lastScore || 0,
    lastRank: lastRank || 0,
    totalPlayers: totalPlayers || 0
  });
}

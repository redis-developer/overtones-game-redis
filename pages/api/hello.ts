import connectToDb from "lib/mongodb";
import { auth } from "lib/auth-middleware";
import { leaderboardAllTime } from "lib/leaderboard";
import { redisjson } from "lib/redis";

export default async function handler(req, res) {
  const db = await connectToDb();
  const user = await auth(db, req, res);

  if (!user) {
    return res.status(401).json({ unauthorized: true });
  }
  const lastScore = await leaderboardAllTime.score(user._id);
  const lastRank = await leaderboardAllTime.rank(user._id);
  const totalPlayers = await leaderboardAllTime.count();

  try {
    const studyactivity = await redisjson.get(`sa:${user._id}`, ".");
    const numExercisesDone = studyactivity.length;
    var totalMinutesPracticed = 0
    if (numExercisesDone > 0) {
      totalMinutesPracticed =
      studyactivity.map((x) => x.timeTaken).reduce((acc, cur) => acc + cur) /
      (1000 * 60);
    } else {
      totalMinutesPracticed = 0
    }

    return res.status(200).send({
      username: user.username,
      lastHighScore: lastScore || 0,
      lastRank: lastRank || 0,
      totalPlayers: totalPlayers || 0,
      numExercisesDone: numExercisesDone || 0,
      totalMinutesPracticed:
        (Math.round(totalMinutesPracticed * 100) / 100).toFixed(2) || 0,
    });
  } catch (e) {
    return res.status(200).send({
      username: user.username,
      lastHighScore: lastScore || 0,
      lastRank: lastRank || 0,
      totalPlayers: totalPlayers || 0,
      numExercisesDone: 0,
      totalMinutesPracticed: 0,
    });
  }
}

import connectToDb from "lib/mongodb";
import { auth } from "lib/auth-middleware";


export default async function handler(req, res) {
  const db = await connectToDb();
  const user = await auth(db, req, res);

  if (!user) {
    return res.status(401).json({});
  }

  const body = req.body;

  try {
    // TODO type this
    await db.collection("studyactivity").insertOne({
      user: user._id,
      exerciseId: body._id,
      sessionId: body.sessionId,
      level: body.level,
      lexemeId: body.lexemeId,
      score: body.score,
      startTime: body.startTime,
      endTime: body.endTime,
      timeTaken: body.timeTaken,
      correct: body.correct,
      guess: body.guess || [],
      choices: body.choices || [],
      correctIndices: body.correctIndices || [],
      meta: body.meta,
      settings: body.settings,
      createdAt: new Date(),
    });

    res.status(200).json({ saved: true });
  } catch (e) {
    res.status(500).json({});
  }
}

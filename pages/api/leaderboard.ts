import connectToDb from "lib/mongodb";
import redis from "lib/redis";

export default async function handler(req, res) {
  const db = await connectToDb();

  try {
    const limit = req.query.limit || 15;

    res.status(200).json({ saved: true });
  } catch (e) {
    res.status(500).json({});
  }
}

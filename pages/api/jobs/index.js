import { connectToDatabase } from "@/db/db";

export default async function handler(req, res) {
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  const client = await connectToDatabase();
  const jobsCollection = client.db().collection("jobs");

  try {
    const posts = await jobsCollection
      .find({})
      .skip(skip)
      .limit(parseInt(limit))
      .toArray();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

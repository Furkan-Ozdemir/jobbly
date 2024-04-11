import { MongoClient } from "mongodb";

export async function connectToDatabase() {
  try {
    const client = await MongoClient.connect(
      `mongodb+srv://adminFurkan:${process.env.DB_PASSWORD}@cluster0.dpj3v.mongodb.net/jobbly?retryWrites=true&w=majority`
    );
    console.log("Connected to MongoDB");
    return client;
  } catch (e) {
    console.log(e);
  }
}

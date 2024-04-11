import { connectToDatabase } from "../../../db/db";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }
  const client = await connectToDatabase();
  const db = client.db();
  const existingUser = await db
    .collection("users")
    .findOne({ email: req.body.email });
  if (existingUser) {
    res.status(422).json({ message: "User already exists!", ok: false });
    res.body = "User exists already!";
    client.close();
    return;
  }
  const { email, password, name } = req.body;
  if (
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim().length < 7 ||
    !name
  ) {
    res.status(422).json({ message: "Invalid input", ok: false });
    client.close();
    return;
  }
  const hashedPassword = await bcrypt.hash(password, 12);
  db.collection("users").insertOne({ email, password: hashedPassword, name });
  res.status(201).json({ message: "Created user!", ok: true });
}

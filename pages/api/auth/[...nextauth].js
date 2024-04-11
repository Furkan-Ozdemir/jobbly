import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "../../../db/db";
import bcrypt from "bcryptjs";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    jwt: true,
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const client = await connectToDatabase();
        const usersCollection = client.db().collection("users");
        const user = await usersCollection.findOne({
          email: credentials.email,
        });
        if (
          !user ||
          !(await bcrypt.compare(credentials.password, user.password))
        ) {
          client.close();
          throw new Error("No user found or wrong password");
        }
        client.close();
        return { email: user.email, name: user.name };
      },
    }),
  ],
};

export default NextAuth(authOptions);

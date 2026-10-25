import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "./index";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { users } from "./schema";
import { eq } from "drizzle-orm";

function passwordToSalt(password: string) {
  const saltRounds = 10;
  const hash = bcrypt.hashSync(password, saltRounds);
  return hash;
}

async function getUserFromDb(username: string) {
  const user = await db.query.users.findFirst({
    where: eq(users.name, username),
  });
  return user;
}

async function addUserToDb(username: string, saltedPassword: string) {
  const user = await db
    .insert(users)
    .values({
      id: crypto.randomUUID(),
      name: username,
      password: saltedPassword,
    })
    .returning();
  return user.pop();
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "myusername",
        },
        password: { label: "Password", type: "text" },
      },
      async authorize(credentials, request) {
        let user = null;
        const username = credentials.username as string;
        const password = credentials.password as string;
        if (!username || !password) {
          return null;
        }

        user = await getUserFromDb(username);
        if (user) {
          if (!user.password) {
            return null;
          }
          const isAuthenticated = await bcrypt.compare(password, user.password);
          if (isAuthenticated) {
            return user;
          } else {
            return null;
          }
        }

        if (!user) {
          const saltPassword = passwordToSalt(password);
          user = await addUserToDb(username, saltPassword);
        }

        if (!user) {
          throw new Error("user not found and could not be created.");
        }

        return user;
      },
    }),
  ],
  callbacks:{
    async session({session,user,token}){
      return session;
    }
  },
  session:{
    strategy:"jwt"
  }
});

// lib/auth.ts (or auth/options.ts)
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import type { User } from "next-auth";
import type { NextAuthOptions } from "next-auth";
import sql from "@/app/lib/db";

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId:
        process.env.GITHUB_ID ??
        (() => {
          throw new Error("GITHUB_ID is not defined");
        })(),
      clientSecret:
        process.env.GITHUB_SECRET ??
        (() => {
          throw new Error("GITHUB_SECRET is not defined");
        })(),
    }),
    GoogleProvider({
      clientId:
        process.env.GOOGLE_CLIENT_ID ??
        (() => {
          throw new Error("GOOGLE_CLIENT_ID is not defined");
        })(),
      clientSecret:
        process.env.GOOGLE_CLIENT_SECRET ??
        (() => {
          throw new Error("GOOGLE_CLIENT_SECRET is not defined");
        })(),
    }),
    FacebookProvider({
      clientId:
        process.env.FACEBOOK_CLIENT_ID ??
        (() => {
          throw new Error("FACEBOOK_CLIENT_ID is not defined");
        })(),
      clientSecret:
        process.env.FACEBOOK_CLIENT_SECRET ??
        (() => {
          throw new Error("FACEBOOK_CLIENT_SECRET is not defined");
        })(),
    }),
  ],
  events: {
    async signIn({ user }) {
      await AddNewUser(user);
    },
  },
  callbacks: {
    session: async ({ session, token }) => {
      return {
        ...session,
        provider: token.provider,
        userId: token.userId,
      };
    },
    jwt: async ({ token, account, user }) => {
      if (account) {
        token.provider = account.provider;
      }

      if (user && user.email) {
        try {
          const userResult = await sql`
            SELECT id FROM users WHERE email = ${user.email}
          `;
          if (userResult.length > 0) {
            token.userId = userResult[0].id;
          }
        } catch (error) {
          console.error("Error fetching user ID:", error);
        }
      }

      return token;
    },
  },
  pages: {
    error: "/auth/error",
  },
};

async function AddNewUser(user: User) {
  try {
    const existingUser = await sql`
          SELECT id FROM users WHERE email = ${user.email}
        `;

    if (existingUser.length === 0) {
      const firstName = user.name?.split(" ")[0] || "";
      const lastName = user.name?.split(" ").slice(1).join(" ") || "";

      await sql`
            INSERT INTO users (email, password_hash, first_name, last_name, profile_picture, created_at, updated_at)
            VALUES (${user.email}, '', ${firstName}, ${lastName}, ${
        user.image || null
      }, NOW(), NOW())
          `;

      console.log(`New user created: ${user.email}`);
    }
  } catch (error) {
    console.error("Error creating user:", error);
  }
}

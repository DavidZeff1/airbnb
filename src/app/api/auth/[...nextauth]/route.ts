// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";

const handler = NextAuth({
  debug: true,
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
  callbacks: {
    session: async ({ session, token }) => {
      return {
        ...session,
        provider: token.provider,
      };
    },
    jwt: async ({ token, account }) => {
      if (account) {
        token.provider = account.provider;
      }
      return token;
    },
  },
  pages: {
    error: "/auth/error",
  },
});

export { handler as GET, handler as POST };

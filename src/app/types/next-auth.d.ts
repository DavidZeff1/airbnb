// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    provider?: string;
    userId?: number;
  }

  interface JWT {
    provider?: string;
    userId?: number;
  }
}

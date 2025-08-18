import { PrismaClient } from "@/generated/prisma"; // adjust to match your path

declare global {
  // Prevent multiple instances of Prisma in dev
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ??
  new PrismaClient({
    log: ["query"], // optional for debugging
  });

if (process.env.NODE_ENV !== "production") global.prisma = prisma;

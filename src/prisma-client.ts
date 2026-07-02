// Declare and explort prisma client once for entire app to use
import "dotenv/config";
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

export const prisma = new PrismaClient({ adapter });
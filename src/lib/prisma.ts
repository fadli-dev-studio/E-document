import { PrismaClient } from "@prisma/client";

// Shortcut untuk deteksi Vercel
const isVercel = process.env.VERCEL === "1";
if (isVercel) {
  // Paksa DATABASE_URL ke /tmp agar bisa ditulis (writable)
  process.env.DATABASE_URL = "file:/tmp/dev.db";
}

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;

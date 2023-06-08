import { PrismaClient } from "@prisma/client";

// global.d.ts
declare global {
  var prisma: any;
}

let client = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV === "production") globalThis.prisma = client;

export default client;

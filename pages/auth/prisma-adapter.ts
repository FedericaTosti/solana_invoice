import { Adapter } from "next-auth/adapters";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export function PrismaAdapter(): Adapter {
  return {
    // Implementazione dell'adapter
  };
}

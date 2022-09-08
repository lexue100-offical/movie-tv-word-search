// src/server/db/client.ts
import { PrismaClient } from "@prisma/client";
import { env } from "../../env/server.mjs";
export var prisma = global.prisma ||
    new PrismaClient({
        log: env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    });
if (env.NODE_ENV !== "production") {
    global.prisma = prisma;
}

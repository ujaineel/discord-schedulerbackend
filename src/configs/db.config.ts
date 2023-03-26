import { PrismaClient } from "@prisma/client";
import { ENV } from "@utils/types/app.types";
import { env } from "./app.config";

const prismaClient = new PrismaClient({
  log: ["query", "info"],
  errorFormat: env === ENV.LOCAL ? "pretty" : undefined,
  datasources: {
    db: {
      url: process.env.APP_DATABASE_URL,
    },
  },
});

export default prismaClient;

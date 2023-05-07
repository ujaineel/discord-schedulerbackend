import { PrismaClient } from "@prisma/client";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import { ENV } from "@utils/types/app.types";
import { env } from "./app.config";

/* istanbul ignore next */
const prismaClient = new PrismaClient({
  errorFormat: env === ENV.LOCAL ? "pretty" : undefined,
});

/* istanbul ignore next */
export const store = new PrismaSessionStore(new PrismaClient(), {
  checkPeriod: 2 * 60 * 1000,
  dbRecordIdIsSessionId: true,
  dbRecordIdFunction: undefined,
});

export default prismaClient;

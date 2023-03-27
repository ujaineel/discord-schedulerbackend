import { PrismaClient } from "@prisma/client";
import { ENV } from "@utils/types/app.types";
import { env } from "./app.config";

const prismaClient = new PrismaClient({
  errorFormat: env === ENV.LOCAL ? "pretty" : undefined,
});

export default prismaClient;

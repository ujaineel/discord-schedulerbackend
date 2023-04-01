import { ENV } from "@utils/types/app.types";
import { type RouterOptions } from "express";

export const routerConfig: RouterOptions = {
  caseSensitive: true,
  strict: true,
};

export const appPort: number =
  typeof process.env.PORT === "string" ? parseInt(process.env?.PORT) : 8081;
export const env: string = process.env?.NODE_ENV ?? ENV.LOCAL;

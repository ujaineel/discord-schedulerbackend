import dotenv from "dotenv";
import { env } from "@configs/app.config";
import { ENV } from "@utils/types/app.types";
import { config } from "dotenv-vault-core";

// istanbul ignore next
export const configFn = (): void => {
  if (env !== ENV.LOCAL) {
    config();
  } else {
    dotenv.config({ path: `../env/.env.${env}` });
  }
};

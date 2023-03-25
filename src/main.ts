import { env } from "@configs/app.config";
import { config } from "dotenv-vault-core";

config({ path: `../env/.env.${env}` });

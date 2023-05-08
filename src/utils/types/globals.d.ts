declare module "dotenv-vault-core";

declare global {
  namespace Express {
    export interface User {
      id?: string;
    }
  }
}

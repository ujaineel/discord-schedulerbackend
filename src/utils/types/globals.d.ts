declare module "dotenv-vault-core";

declare global {
  declare namespace Express {
    interface User {
      id: string;
      username: string;
    }
  }
}

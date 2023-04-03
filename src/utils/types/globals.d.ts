declare module "dotenv-vault-core";

declare global {
  namespace Express {
    interface User {
      id: string;
    }
  }
}

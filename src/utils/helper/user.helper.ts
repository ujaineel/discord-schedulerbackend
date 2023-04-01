import { type LocalUserFetch } from "@utils/types/interfaces";
import { isEmail, isvalidUUID } from "./misc.helper";

const areInvalidOptions = (options: LocalUserFetch): boolean => {
  return (isEmail(options.email) ?? true) && (isvalidUUID(options.id) ?? true);
};

export { areInvalidOptions };

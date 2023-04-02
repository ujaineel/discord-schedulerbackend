import { type LocalUserFetch } from "@utils/types/interfaces";
import { isEmail, isvalidUUID } from "./misc.helper";

const areInvalidUserSearchOptions = (options: LocalUserFetch): boolean => {
  return (isEmail(options.email) ?? true) && (isvalidUUID(options.id) ?? true);
};

const isValidCreateLocalUserDto = (body: any): boolean => {
  return (
    ("email" in body ? isEmail(body.email) : true) &&
    ("username" in body ? typeof body.username === "string" : false) &&
    ("password" in body ? typeof body.password === "string" : false)
  );
};

export { areInvalidUserSearchOptions, isValidCreateLocalUserDto };

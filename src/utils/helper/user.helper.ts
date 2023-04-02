import { type LocalUserFetch } from "@utils/types/interfaces";
import { isEmail, isvalidUUID } from "./misc.helper";

const areValidSearchOptions = (options: LocalUserFetch): boolean => {
  return (
    ("email" in options ? isEmail(options.email) : true) &&
    ("id" in options ? isvalidUUID(options.id) : true)
  );
};

const isValidCreateLocalUserDto = (body: any): boolean => {
  return (
    ("email" in body ? isEmail(body.email) : true) &&
    ("username" in body ? typeof body.username === "string" : false) &&
    ("password" in body ? typeof body.password === "string" : false)
  );
};

export { areValidSearchOptions, isValidCreateLocalUserDto };

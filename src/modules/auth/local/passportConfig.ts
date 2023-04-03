import bcrypt from "bcrypt";
import { Strategy as LocalStrategy } from "passport-local";
import { type PassportStatic } from "passport";
import { type User } from "@prisma/client";
import { exclude } from "@utils/helper/misc.helper";
import { getLocalUser } from "@root/src/services/users.services";

const authenticate = async (
  username: any,
  password: string | Buffer,
  done: (arg0: null, arg1: boolean | Omit<Record<any, any>, string>) => void
): Promise<void> => {
  try {
    const user: User | null = await getLocalUser({ username });
    if (user === null) {
      done(null, false);
    }

    if (user?.password !== null && typeof user?.password === "string") {
      const matchedPassword = await bcrypt.compare(password, user?.password);
      if (matchedPassword && user !== null) {
        done(null, exclude(user, ["password"]));
      } else {
        done(null, false);
      }
    }
  } catch (error: any) {
    done(error, false);
  }
};

const serialize = (user: any, cb: (arg0: null, arg1: any) => void): void => {
  cb(null, user.id);
};

const deserialize = async (
  id: string,
  cb: (arg0: Error | null, arg1: boolean | Omit<Record<any, any>, any>) => void
): Promise<void> => {
  try {
    const user = await getLocalUser({ id });
    if (user === null) {
      cb(null, false);
    } else {
      cb(null, exclude(user, ["password"]));
    }
  } catch (error: any) {
    cb(error, { id });
  }
};

const authSetup = (passport: PassportStatic): void => {
  passport.use(new LocalStrategy(authenticate));

  passport.serializeUser(serialize);

  passport.deserializeUser(deserialize);
};

export { authSetup, authenticate, serialize, deserialize };

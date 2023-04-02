import bcrypt from "bcrypt";
import { Strategy as LocalStrategy } from "passport-local";
import { type PassportStatic } from "passport";
import { type User } from "@prisma/client";
import { exclude } from "@utils/helper/misc.helper";
import { getLocalUser } from "@root/src/services/users.services";

const authSetup = (passport: PassportStatic): void => {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user: User | null = await getLocalUser({ username });
        if (user === null) {
          return done(null, false);
        }

        const matchedPassword = await bcrypt.compare(password, user?.password);
        if (matchedPassword) {
          return done(null, exclude(user, ["password"]));
        }
      } catch (error: any) {
        throw new Error(error);
      }
    })
  );

  passport.serializeUser((user: Express.User, cb) => {
    cb(null, exclude(user, ["password"]));
  });

  passport.deserializeUser(async (id: string, cb) => {
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
  });
};

export default authSetup;

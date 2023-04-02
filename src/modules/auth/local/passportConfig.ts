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
          done(null, false);
        }

        if (user?.password !== null && typeof user?.password === "string") {
          const matchedPassword = await bcrypt.compare(
            password,
            user?.password
          );
          if (matchedPassword && user !== null) {
            done(null, exclude(user, ["password"]));
          } else {
            done(null, false);
          }
        }
      } catch (error: any) {
        throw new Error(error);
      }
    })
  );

  passport.serializeUser((user: any, cb) => {
    cb(null, user.id);
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

export { authSetup };

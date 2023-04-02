import { routerConfig } from "@configs/app.config";
import { Router } from "express";
import { isEmpty } from "lodash";
import passport from "passport";
import { createLocalUser, getLocalUser } from "../services/users.services";

const router: Router = Router(routerConfig);

// Routes
router.post("/local/login", (req, res, next) => {
  passport.authenticate("local", (err: any, user: Express.User, info: any) => {
    if (!isEmpty(err)) throw err;
    if (isEmpty(user)) res.send("No User Exists");
    else {
      req.logIn(user, (err) => {
        if (!isEmpty(err)) throw err;
        res.send("Successfully Authenticated");
        console.log("user: ", req.user);
      });
    }
  })(req, res, next);
});

router.post("/local/register", async (req, res) => {
  try {
    const user = await getLocalUser({ username: req.body?.username });

    if (!isEmpty(user)) {
      res.json({ message: "User Already Exists" });
    } else {
      const newUser = await createLocalUser(req.body);

      res.json({ message: "User Created", username: newUser?.username });
    }
  } catch (error: any) {
    throw new Error(error);
  }
});

router.get("/user", (req, res) => {
  if (!isEmpty(req?.user)) {
    return res.send(req.user); // The req.user stores the entire user that has been authenticated inside of it. (Except password)
  }
  return res.send("No user");
});

export default router;

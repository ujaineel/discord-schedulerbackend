import { routerConfig } from "@configs/app.config";
import { RESPONSE_CODE } from "@utils/types/response.types";
import { Router } from "express";
import { isEmpty } from "lodash";
import passport from "passport";
import { createLocalUser, getLocalUser } from "../services/users.services";

const router: Router = Router(routerConfig);

// Routes
router.post("/local/login", (req, res, next) => {
  passport.authenticate("local", (err: any, user: Express.User) => {
    if (!isEmpty(err)) {
      return res
        .status(RESPONSE_CODE.INTERNAL_SERVER_ERROR)
        .json({
          message:
            "INTERNAL SERVER ERROR: An error occurred while authenticating",
        });
    }
    if (isEmpty(user))
      res.status(RESPONSE_CODE.NOT_FOUND).json({ message: "No User Exists" });
    else {
      req.logIn(user, (err) => {
        if (!isEmpty(err)) {
          return res
            .status(RESPONSE_CODE.INTERNAL_SERVER_ERROR)
            .json({
              message:
                "INTERNAL SERVER ERROR: An error occurred while authenticating",
            });
        }
        res
          .status(RESPONSE_CODE.ACCEPTED)
          .json({ message: "Successfully Authenticated" });
        console.log("user: ", req.user);
      });
    }
  })(req, res, next);
});

router.post("/local/register", async (req, res) => {
  try {
    const user = await getLocalUser({ username: req.body?.username });

    if (!isEmpty(user)) {
      res
        .status(RESPONSE_CODE.FORBIDDEN)
        .json({ message: "User Already Exists" });
    } else {
      const newUser = await createLocalUser(req.body);

      res
        .status(RESPONSE_CODE.CREATED)
        .json({ message: "User Created", username: newUser?.username });
    }
  } catch (error: any) {
    console.log(error, error.message, error.stack);
    res
      .status(RESPONSE_CODE.INTERNAL_SERVER_ERROR)
      .json({
        message:
          "INTERNAL SERVER ERROR: An error occurred while registering user",
      });
  }
});

router.get("/user", (req, res) => {
  if (!isEmpty(req?.user)) {
    return res.status(RESPONSE_CODE.OK).send(req.user); // The req.user stores the entire user that has been authenticated inside of it. (Except password)
  }
  return res.status(RESPONSE_CODE.NOT_FOUND).send("No user");
});

export default router;

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
    /* istanbul ignore next line */
    if (!isEmpty(err)) {
      /* istanbul ignore next lint */
      return res.status(RESPONSE_CODE.INTERNAL_SERVER_ERROR).json({
        message:
          "INTERNAL SERVER ERROR: An error occurred while authenticating",
      });
    }
    if (isEmpty(user)) {
      res.status(RESPONSE_CODE.NOT_FOUND).json({ message: "No User Exists" });
    } else {
      req.logIn(user, (err) => {
        /* istanbul ignore next line */
        if (!isEmpty(err)) {
          /* istanbul ignore next line */
          return res.status(RESPONSE_CODE.INTERNAL_SERVER_ERROR).json({
            message:
              "INTERNAL SERVER ERROR: An error occurred while authenticating",
          });
        }
        res
          .status(RESPONSE_CODE.OK)
          .cookie("userAuth", req.session.id, {
            maxAge: 1000 * 60 * 60 * 24,
            signed: true,
          })
          .json({ message: "Successfully Authenticated" });
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
    /* istanbul ignore next line */
    console.log(error, error.message, error.stack);
    /* istanbul ignore next line */
    res.status(RESPONSE_CODE.INTERNAL_SERVER_ERROR).json({
      message:
        "INTERNAL SERVER ERROR: An error occurred while registering user",
    });
  }
});

export default router;

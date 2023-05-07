import { RESPONSE_CODE } from "@utils/types/response.types";
import { Router } from "express";
import { isEmpty } from "lodash";

const router: Router = Router();

router.get("/user", (req, res) => {
  if (!isEmpty(req?.user)) {
    return res.status(RESPONSE_CODE.OK).send({ data: req.user }); // The req.user stores the entire user that has been authenticated inside of it. (Except password)
  }
  return res
    .status(RESPONSE_CODE.NOT_FOUND)
    .json({ message: "No authenticated user" });
});

export default router;

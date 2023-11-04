import express from "express";
import { blankSchema } from "../schema/blank.schema";
import { authObject } from "../schema/user.schema";
import validateResources from "../middleware/validateResources";
import { handleRegister } from "../controllers/users/register.user.controller";
const router = express.Router();

router.post(
  "/register",
  validateResources(blankSchema, authObject, blankSchema),
  handleRegister
);
router.get("/", function (req, res) {
  res.status(200).json({
    message: "ok",
  });
});

export default router;

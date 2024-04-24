import express from "express";
import { verifyJwt } from "../middlewares/authMiddleware";
import { isProfessor } from "../middlewares/getRole";
import { addAttendence } from "../controllers/attendence/addAttendence";
import { upload } from "../utils/multer";

const router = express.Router();

router.post(
  "/add-multiple",
  verifyJwt,
  isProfessor,
  upload.single("file"),
  addAttendence
);

export default router;

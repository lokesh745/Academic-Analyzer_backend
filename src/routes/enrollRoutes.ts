import express from "express";
import { verifyJwt } from "../middlewares/authMiddleware";
import { isProfessor } from "../middlewares/getRole";
import {
  addMultipleStudent,
  addStudent,
} from "../controllers/enroll/addStudents";
import { upload } from "../utils/multer";

const router = express.Router();

router.post("/add", verifyJwt, isProfessor, addStudent);
router.post(
  "/add-multiple",
  verifyJwt,
  isProfessor,
  upload.single("file"),
  addMultipleStudent
);

export default router;

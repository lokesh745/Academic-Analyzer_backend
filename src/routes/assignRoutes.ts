import express from "express";
import { verifyJwt } from "../middlewares/authMiddleware";
import { isAdmin } from "../middlewares/getRole";
import { addProfessor } from "../controllers/assign/addProf";
import { assignMultipleToProf } from "../controllers/professor/assignedCourses";
import { upload } from "../utils/multer";

const router = express.Router();

router.post("/add", verifyJwt, isAdmin, addProfessor);
router.post(
  "/add-multiple",
  verifyJwt,
  isAdmin,
  upload.single("file"),
  assignMultipleToProf
);

export default router;

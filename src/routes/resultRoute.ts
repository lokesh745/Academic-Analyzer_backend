import express from "express";
import { verifyJwt } from "../middlewares/authMiddleware";
import { isProfessor } from "../middlewares/getRole";
import { addMultipleResult, addNewResult } from "../controllers/results/add";
import { upload } from "../utils/multer";

const router = express.Router();

router.post("/add", verifyJwt, isProfessor, addNewResult);
router.post(
  "/add-multiple",
  verifyJwt,
  upload.single("file"),
  isProfessor,
  addMultipleResult
);

export default router;

import express from "express";
import { verifyJwt } from "../middlewares/authMiddleware";
import { isProfessor } from "../middlewares/getRole";
import { addMultipleResult, addNewResult } from "../controllers/results/add";
import { upload } from "../utils/multer";
import {approveResult} from "../controllers/results/approveResult";
import { getResult, getResultGraphData } from "../controllers/results/getResult";

const router = express.Router();

router.post("/add", verifyJwt, isProfessor, addNewResult);
router.post(
  "/add-multiple",
  verifyJwt,
  upload.single("file"),
  isProfessor,
  addMultipleResult
);
router.post("/approve",verifyJwt,isProfessor,approveResult);
router.post("/result",verifyJwt,getResult);
router.get("/result-data",verifyJwt,getResultGraphData);

export default router;

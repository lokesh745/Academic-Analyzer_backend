import express from "express";
import { verifyJwt } from "../middlewares/authMiddleware";
import { isProfessor } from "../middlewares/getRole";
import { addNewResult } from "../controllers/results/add";

const router = express.Router();

router.post("/add", verifyJwt, isProfessor, addNewResult);

export default router;

import express from "express";
import { verifyJwt } from "../middlewares/authMiddleware";
import { isAdmin, isProfessor } from "../middlewares/getRole";
import { getCount } from "../controllers/graphs&data/getCount";

const router = express.Router();

router.get("/totalusers", verifyJwt, isAdmin, getCount);

export default router;

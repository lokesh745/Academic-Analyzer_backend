import express from "express";
import { verifyJwt } from "../middlewares/authMiddleware";
import { isProfessor } from "../middlewares/getRole";
import { List } from "../controllers/students/list";

const router = express.Router();

router.get("/students-list", verifyJwt, isProfessor, List);

export default router;

import express from "express";
import { verifyJwt } from "../middlewares/authMiddleware";
import { isAdmin } from "../middlewares/getRole";
import { addProfessor } from "../controllers/assign/addProf";

const router = express.Router();

router.post("/add", verifyJwt, isAdmin, addProfessor);

export default router;

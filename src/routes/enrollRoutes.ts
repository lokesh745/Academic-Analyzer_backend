import express from "express";
import { verifyJwt } from "../middlewares/authMiddleware";
import { isProfessor } from "../middlewares/getRole";
import { addStudent } from "../controllers/enroll/addStudents";

const router = express.Router();

router.post("/add", verifyJwt, isProfessor, addStudent);

export default router;

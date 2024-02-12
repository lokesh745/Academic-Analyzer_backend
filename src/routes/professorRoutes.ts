import express from "express";
import { verifyJwt } from "../middlewares/authMiddleware";
import { isProfessor } from "../middlewares/getRole";
import { allStudents } from "../controllers/professor/allStudents";
import { assignCourses } from "../controllers/professor/assignedCourses";

const router = express.Router();

router.get("/students", verifyJwt, isProfessor, allStudents);
router.get("/courses", verifyJwt, isProfessor, assignCourses);

export default router;

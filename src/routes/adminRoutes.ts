import express from "express";
import { verifyJwt } from "../middlewares/authMiddleware";
import { isAdmin, isProfessor } from "../middlewares/getRole";
import { allProf } from "../controllers/professor/allProfessors";
import { deleteUser } from "../controllers/user/deleteUser";
import { assignToProf } from "../controllers/professor/assignedCourses";

const router = express.Router();

router.get("/professors", verifyJwt, isAdmin, allProf);
router.delete("/delete", verifyJwt, isProfessor, deleteUser);
router.get("/assigned-courses", verifyJwt, isAdmin, assignToProf);
export default router;

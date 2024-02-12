import express from "express";
import { verifyJwt } from "../middlewares/authMiddleware";
import { isAdmin } from "../middlewares/getRole";
import { addCourse } from "../controllers/courses/add.course";
import { allCourses } from "../controllers/courses/all.course";

const router = express.Router();

// admin secured routes
router.post("/add-course", verifyJwt, isAdmin, addCourse);
router.get("/all-courses", verifyJwt, allCourses);

export default router;

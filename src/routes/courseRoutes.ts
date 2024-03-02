import express from "express";
import { verifyJwt } from "../middlewares/authMiddleware";
import { isAdmin } from "../middlewares/getRole";
import { upload } from "../utils/multer";
import {
  addCourse,
  addMultipleCourse,
} from "../controllers/courses/add.course";
import { allCourses } from "../controllers/courses/all.course";
import { deleteCourse } from "../controllers/courses/delete.course";
import { getCourse } from "../controllers/courses/get.course";

const router = express.Router();

// admin secured routes
router.post("/add-course", verifyJwt, isAdmin, addCourse);
router.get("/all-courses", verifyJwt, allCourses);
router.post(
  "/add-multiple-course",
  verifyJwt,
  isAdmin,
  upload.single("file"),
  addMultipleCourse
);
router.delete("/del-course", verifyJwt, isAdmin, deleteCourse);
router.get("/get-course", verifyJwt, getCourse);

export default router;

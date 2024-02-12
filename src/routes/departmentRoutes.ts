import express, { Request, Response, NextFunction } from "express";
import { addDepartment } from "../controllers/department/add.department";
import { isAdmin } from "../middlewares/getRole";
import { verifyJwt } from "../middlewares/authMiddleware";
import { allDepartments } from "../controllers/department/all.departments";
import { deleteDept } from "../controllers/department/delete.department";
import { getDeptInfo } from "../controllers/department/get.department";
import { editDept } from "../controllers/department/edit.department";

const router = express.Router();

router.post("/add-department", verifyJwt, isAdmin, addDepartment);
router.get("/all-department", verifyJwt, allDepartments);
router.delete("/delete-department", verifyJwt, isAdmin, deleteDept);
router.get("/info-department", verifyJwt, getDeptInfo);
router.put("/edit-department", verifyJwt, isAdmin, editDept);

export default router;

import express, { Request, Response, NextFunction } from "express";
import {
  registerMultipleUser,
  registerUser,
} from "../controllers/user/register";
import { login } from "../controllers/user/login";
import { logout } from "../controllers/user/logout";
import { verifyJwt } from "../middlewares/authMiddleware";
import { isAdmin, isProfessor } from "../middlewares/getRole";
import { myProfile } from "../controllers/user/profile";
import { getAllUsers } from "../controllers/user/getAllUsers";
import { allProf } from "../controllers/professor/allProfessors";
import { upload } from "../utils/multer";
import { getUserDetails } from "../controllers/user/getUser";

const router = express.Router();

router.post("/login", login);

//secured routes
router.post("/logout", verifyJwt, logout);
router.post("/me", verifyJwt, myProfile);
router.get("/users", verifyJwt, getAllUsers);
//professor + admin secured routes
router.post("/register", verifyJwt, isProfessor, registerUser);
router.post(
  "/registerMultiple",
  verifyJwt,
  isProfessor,
  upload.single("file"),
  registerMultipleUser
);
router.get("/details", verifyJwt, getUserDetails);

export default router;

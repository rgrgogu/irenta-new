import express from "express";
import {
  GetAllUsers,
  GetSpecificUser,
  CreateUser,
  UpdateUser,
  DeleteUser,
  LoginUser,
  GoogleLoginUser,
} from "./users.controller.js";
import upload from "../../global/config/Multer.js";
import RequireAuth from "../../global/middlewares/requireauth.js";

const router = express.Router();

// USER INFO API
// routes for allusers and specificuser, add user, update user, and delete user
router.get("/", RequireAuth, GetAllUsers);
router.get("/:id", GetSpecificUser);

// route for create/upload profile and picture
router.post("/", upload.single("file"), CreateUser);

// route for update profile and picture
router.patch("/:id", upload.single("file"), UpdateUser);

// route for delete user
router.delete("/:id", DeleteUser);

// LOGIN INFO API
router.post("/login", LoginUser);
router.post('/google-login', GoogleLoginUser); // Google login

export default router;
import express from "express";
import {
  authUser,
  deleteUser,
  getAllUsers,
  getUserById,
  getUserProfile,
  registerUser,
  updateUserProfile,
  updateUserProfileByAdmin,
} from "../Controllers/userController.js";
import { isAdmin, protectRoute } from "../Middleware/authMiddleware.js";

const router = express.Router();

//@desc   Register a user and get a Token
//@route  POST /api/users
//@access Public
router.route("/").post(registerUser);

//@desc   Get all Users
//@route  GET /api/users/all
//@access Private/Admin
router.route("/all").get(protectRoute, isAdmin, getAllUsers);

//@desc   Validate the user and get a Token
//@route  POST /api/users/login
//@access Public
router.post("/login", authUser);

//@desc   Get user profile or Update it
//@route  GET or PUT /api/users/profile
//@access Private
router
  .route("/profile")
  .get(protectRoute, getUserProfile)
  .put(protectRoute, updateUserProfile);

//@desc   Delete User, get a User By Id and Update User Profile for Admin
//@route  DELETE /api/users/id
//@access Private/Admin
router
  .route("/:id")
  .delete(protectRoute, isAdmin, deleteUser)
  .get(protectRoute, isAdmin, getUserById)
  .put(protectRoute, isAdmin, updateUserProfileByAdmin);

export default router;

import expressAsyncHandler from "express-async-handler";
import { generateWebToken } from "../utils/generateWebToken.js";
import User from "../Models/userModel.js";

export const authUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateWebToken(user._id),
    });
  }

  res.status(401);
  throw new Error("Invalid email or password");
});

export const registerUser = expressAsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User already Exist");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateWebToken(user._id),
    });
  }

  res.status(400);
  throw new Error("Invalid User Data");
});

export const getUserProfile = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  }

  res.status(404);
  throw new Error("User not found");
});

export const getAllUsers = expressAsyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

export const getUserById = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.json(user);
  }

  throw new Error("Can't fird the User");
});

export const deleteUser = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.remove();
    res.json({
      message: "User Removed",
    });
  }

  res.status(404);
  throw new Error("User Not Found");
});

export const updateUserProfile = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateWebToken(updatedUser._id),
    });
  }

  res.status(404);
  throw new Error("User not found");
});

export const updateUserProfileByAdmin = expressAsyncHandler(
  async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.isAdmin = req.body.isAdmin != null ? req.body.isAdmin : user.isAdmin;
      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      });
    }

    res.status(404);
    throw new Error("User not found");
  }
);

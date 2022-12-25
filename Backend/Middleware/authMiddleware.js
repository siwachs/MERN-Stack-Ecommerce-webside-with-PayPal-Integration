import jwt from "jsonwebtoken";

import User from "../Models/userModel.js";

import expressAsyncHandler from "express-async-handler";

export const protectRoute = expressAsyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decode = jwt.verify(token, process.env.SECRET_KEY_FOR_JWT);
      req.user = await User.findById(decode.id).select("-password");
      next();
    } catch (error) {
      console.log(error);
      token = null;
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not Authorized no token");
  }
});

//Admin MiddleWare
export const isAdmin = (req, res, next) => {
  if (req.user || req.user.isAdmin) {
    next();
  } else {
    res.status(404);
    throw new Error("Not a Admin");
  }
};

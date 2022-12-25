import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const generateWebToken = (id) => {
  return jwt.sign(
    {
      id,
    },
    process.env.SECRET_KEY_FOR_JWT,
    {
      expiresIn: "30d",
    }
  );
};

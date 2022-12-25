import express from "express";
import {
  getProducts,
  getProductById,
  deleteProductById,
  updateProduct,
  createProduct,
  createReview,
  getTopRatedProducts,
} from "../Controllers/productController.js";
import { protectRoute, isAdmin } from "../Middleware/authMiddleware.js";

const router = express.Router();

//@desc   Fetch all Products in MongoDB and add new product
//@route  GET /api/products
//@access Public
router.route("/").get(getProducts).post(protectRoute, isAdmin, createProduct);

//@desc   Fetch all Top rated products
//@route  GET /api/products/top
//@access Public
router.route("/top").get(getTopRatedProducts);

//@desc   POST a review
//@route  POST /api/products/reviews/:id
//@access Private
router.route("/reviews/:id").post(protectRoute, createReview);

//@desc   Fetch Product By its ID, delete and update
//@route  GET DELETE /api/products/id
//@access Public and Private + Admin
router
  .route("/:id")
  .get(getProductById)
  .delete(protectRoute, isAdmin, deleteProductById)
  .put(protectRoute, isAdmin, updateProduct);

export default router;

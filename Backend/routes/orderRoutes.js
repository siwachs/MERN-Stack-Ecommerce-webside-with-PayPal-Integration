import express from "express";
import {
  addOrderItems,
  getAllOrders,
  getOrderById,
  getOrders,
  updateOrderToDelivered,
  updateOrderToPaid,
} from "../Controllers/orderController.js";
import { protectRoute, isAdmin } from "../Middleware/authMiddleware.js";

const router = express.Router();

//@desc   Create Order in DB
//@route  POST /api/orders
//@access Private
router
  .route("/")
  .post(protectRoute, addOrderItems)
  .get(protectRoute, isAdmin, getAllOrders);

//@desc   GET fetch order
//@route  GET /api/orders/myorders
//@access Private
router.route("/myorders").get(protectRoute, getOrders);

//@desc   GET Order By DB
//@route  GET /api/orders/:id
//@access Private
router.route("/:id").get(protectRoute, getOrderById);

//@desc   GET update Payment Status
//@route  PUT /api/orders/:id/pay
//@access Private
router.route("/:id/pay").put(protectRoute, updateOrderToPaid);

//@desc   GET update Payment Status
//@route  PUT /api/orders/:id/pay
//@access Private
router.route("/:id/deliver").put(protectRoute, isAdmin, updateOrderToDelivered);

export default router;

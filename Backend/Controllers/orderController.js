import expressAsyncHandler from "express-async-handler";
import Order from "../Models/orderModel.js";
import Product from "../Models/productModel.js";

export const addOrderItems = expressAsyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order Items");
  }
  //Update Stock
  orderItems.map(async (order) => {
    const product = await Product.findById(order.product);
    product.countInStock = product.countInStock - order.qty;
    await product.save();
  });

  const order = new Order({
    user: req.user._id,
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  });
  const createdOrder = await order.save();
  res.status(201).json(createdOrder);
});

export const getOrderById = expressAsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.json(order);
  }

  res.status(404);
  throw new Error("Order not found");
});

export const updateOrderToPaid = expressAsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }
  order.isPaid = true;
  order.paidAt = Date.now();
  order.paymentResult = {
    id: req.body.id,
    status: req.body.status,
    update_time: req.body.update_time,
    email_address: req.body.payer.email_address,
  };

  const updatedOrder = await order.save();
  res.json(updatedOrder);
});

export const updateOrderToDelivered = expressAsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }
  order.isDelivered = true;
  order.deliveredAt = Date.now();

  const updatedOrder = await order.save();
  res.json(updatedOrder);
});

export const getOrders = expressAsyncHandler(async (req, res) => {
  const orders = await Order.find({
    user: req.user._id,
  }).sort({ updatedAt: "desc" });
  res.json(orders);
});

export const getAllOrders = expressAsyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "id name");
  res.json(orders);
});

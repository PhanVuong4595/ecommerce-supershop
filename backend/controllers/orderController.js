import Order from "../models/orderModel";
import Product from "../models/productModel";
import ErrorHandler from "../utils/errorHandler";
import asyncHandler from "express-async-handler";

export const newOrder = asyncHandler(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    user: req.userInfo.userId,
  });
  res.status(201).json({ success: true, order });
});

export const getSingleOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "orderItems.product",
    "title images"
  );
  if (!order) return next(new ErrorHandler("Order not found.", 404));
  res.status(200).json({ success: true, order });
});

export const myOrders = asyncHandler(async (req, res, next) => {
  const orders = await Order.find({ user: req.userInfo.userId }).populate(
    "orderItems.product",
    "title images"
  );
  res.status(200).json({ success: true, orders });
});

export const getAllOrders = asyncHandler(async (req, res, next) => {
  const orders = await Order.find().populate(
    "orderItems.product",
    "title images"
  );
  res.status(200).json({ success: true, orders });
});

export const deleteOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) return next(new ErrorHandler("Order not found.", 404));
  await order.remove();
  res.status(200).json({ success: true });
});

export const updateOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) return next(new ErrorHandler("Order not found.", 404));
  if (order.orderStatus === "Delivered")
    return next(new ErrorHandler("You have already deliverd this item", 400));
  if (order.orderStatus === "Proccessing" && req.body.status === "Delivered")
    return next(
      new ErrorHandler("Not possible to deliver before shipping.", 400)
    );

  if (req.body.status === "Shipped") {
    order.orderItems.forEach(async (o) => {
      await updateStock(o.product, o.quantity);
    });
  }
  order.orderStatus = req.body.status;
  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });
  res.status(200).json({ success: true });
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);
  product.stock -= quantity;
  await product.save({ validateBeforeSave: false });
}

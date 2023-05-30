import User from "../models/userModel";
import Store from "../models/storeModel";
import Product from "../models/productModel";
import Order from "../models/orderModel";
import ErrorHandler from "../utils/errorHandler";
import { saveImages, removeFiles } from "../utils/processImages";

import asyncHandler from "express-async-handler";

export const getUsers = asyncHandler(async (req, res, next) => {
  const { userId } = req.userInfo;
  const users = await User.find({ _id: { $ne: userId } }).select(
    "-refreshToken"
  );
  res.status(200).json({ success: true, users });
});

export const getUserDetails = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id).select("-refreshToken");
  if (!user) return next(new ErrorHandler("User does not exists.", 404));
  res.status(200).json({ success: true, user });
});

export const deleteUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) return next(new ErrorHandler("User not found", 404));

  const activeOrder = await Order.findOne({ user: id });
  if (activeOrder) return next(new ErrorHandler("User not deleted", 400));

  const activeProduct = await Product.findOne({
    $or: [{ addedBy: id }, { updatedBy: id }],
  });
  if (activeProduct) return next(new ErrorHandler("User not deleted", 400));

  const path = `avatar/${user._id}`;
  removeFiles(path);
  await user.remove();
  res.status(200).json({ success: true, message: "User deleted." });
});

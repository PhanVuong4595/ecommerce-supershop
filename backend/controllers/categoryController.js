import Category from "../models/categoryModel";
import ErrorHandler from "../utils/errorHandler";
import Product from "../models/productModel";

import asyncHandler from "express-async-handler";

export const addCategory = asyncHandler(async (req, res, next) => {
  req.body.addedBy = req.userInfo.userId;
  const category = await Category.create(req.body);
  res.status(201).json({ success: true, category });
});

export const getCategories = asyncHandler(async (req, res, next) => {
  const categories = await Category.find();
  res.status(200).json({ success: true, categories });
});

export const getCategoryDetails = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id);
  if (!category) return next(new ErrorHandler("Category not found.", 404));
  res.status(200).json({ success: true, category });
});

export const updateCategory = asyncHandler(async (req, res, next) => {
  req.body.updatedBy = req.userInfo.userId;
  let category = await Category.findById(req.params.id);
  if (!category) return next(new ErrorHandler("Category not found.", 404));
  category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(201).json({ success: true, category });
});

export const deleteCategory = asyncHandler(async (req, res, next) => {
  let category = await Category.findById(req.params.id);
  if (!category) return next(new ErrorHandler("Category not found.", 404));
  const active = await Product.findOne({ category: req.params.id });
  if (active)
    return next(new ErrorHandler("Category is used.Could not deleted.", 406));
  await category.remove();
  res.status(200).json({ success: true });
});

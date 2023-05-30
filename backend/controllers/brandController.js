import Brand from "../models/brandModel";
import ErrorHandler from "../utils/errorHandler";
import Product from "../models/productModel";

import asyncHandler from "express-async-handler";

export const addBrand = asyncHandler(async (req, res, next) => {
  req.body.addedBy = req.userInfo.userId;
  const brand = await Brand.create(req.body);
  res.status(201).json({ success: true, brand });
});

export const getBrand = asyncHandler(async (req, res, next) => {
  const categories = await Brand.find();
  res.status(200).json({ success: true, categories });
});

export const getBrandDetails = asyncHandler(async (req, res, next) => {
  const brand = await Brand.findById(req.params.id);
  if (!brand) return next(new ErrorHandler("Brand not found.", 404));
  res.status(200).json({ success: true, brand });
});

export const updateBrand = asyncHandler(async (req, res, next) => {
  req.body.updatedBy = req.userInfo.userId;
  let brand = await Brand.findById(req.params.id);
  if (!brand) return next(new ErrorHandler("Brand not found.", 404));
  brand = await Brand.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(201).json({ success: true, brand });
});

export const deleteBrand = asyncHandler(async (req, res, next) => {
  let brand = await Brand.findById(req.params.id);
  if (!brand) return next(new ErrorHandler("Brand not found.", 404));
  const active = await Product.findOne({ brand: req.params.id });
  if (active)
    return next(new ErrorHandler("Brand is used.Could not deleted.", 406));
  await brand.remove();
  res.status(200).json({ success: true });
});

import { configureStore } from "@reduxjs/toolkit";

import AuthReducer from "../Redux/features/authSlice";
import BrandReducer from "../Redux/features/brandSlice";
import CategoryReducer from "../Redux/features/categorySlice";
import StoreReducer from "../Redux/features/storeSlice";
import ProductReducer from "../Redux/features/productSlice";
import CartReducer from "../Redux/features/cartSlice";
import ReviewReducer from "../Redux/features/reviewSlice";
import ShippingReducer from "../Redux/features/shippingSlice";
import OrderReducer from "../Redux/features/orderSlice";

export default configureStore({
  reducer: {
    auth: AuthReducer,
    brand: BrandReducer,
    category: CategoryReducer,
    store: StoreReducer,
    product: ProductReducer,
    cart: CartReducer,
    review: ReviewReducer,
    shipping: ShippingReducer,
    order: OrderReducer,
  },
});

import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cart/cartSlice';
import productReducer from './features/product/productSlice';
import { api } from './api/products'; 
const store = configureStore({
  reducer: {
    cart: cartReducer,
    product: productReducer,
    [api.reducerPath]:api.reducer
  },
  middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(api.middleware)
});

export default store;

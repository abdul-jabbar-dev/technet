import { IProduct } from '@/types/globalTypes';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ICart {
  products: IProduct[];
  total: number;
}
const initialCart: ICart = {
  products: [],
  total: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCart,
  reducers: {
    addToCart: (state, action: PayloadAction<IProduct>) => {
      const exist = state.products.find((ep) => ep._id === action.payload._id);
      if (exist) {
        exist.quantity = exist.quantity! + 1;
      } else {
        state.products.push({ ...action.payload, quantity: 1 });
      }
      state.total += action.payload.price;
    },
    removeOne: (state, action: PayloadAction<IProduct>) => {
      const exist = state.products.find((ep) => ep._id === action.payload._id);
      if (exist) {
        const quantity = exist.quantity!;
        if (quantity > 1) {
          exist.quantity = exist.quantity! - 1;
        } else {
          state.products = state.products.filter((dt) => dt._id !== exist._id);
        }
      }
      state.total -= action.payload.price;
    },
    removeItem: (state, action: PayloadAction<IProduct>) => {
      const ext: IProduct =
        state.products.find((pr) => pr._id === action.payload._id) ||
        action.payload;
      state.total -= ext.price * (ext.quantity || 1);
      state.products = state.products.filter(
        (pr) => pr._id !== action.payload._id
      );
    },
  },
});
export const { addToCart, removeOne, removeItem } = cartSlice.actions;
export default cartSlice.reducer;

import { IProduct } from '@/types/globalTypes';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type IProductFilter = {
  status: boolean;
  priceRange: number;
};

const initialState: IProductFilter = {
  status: false,
  priceRange: 0,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    toggleState: (state) => {
      state.status = !state.status;
    },
    setPriceRange: (state, action: PayloadAction<number>) => {
      state.priceRange = action.payload;
    },
  },
});
export const { toggleState, setPriceRange } = productSlice.actions;
export default productSlice.reducer;

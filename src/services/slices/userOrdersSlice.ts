import { getOrdersApi } from './../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder, TResponseStatus } from './../../utils/types';

export interface TUserOrdersSlice extends TResponseStatus {
  orders: TOrder[];
}

export const initialState: TUserOrdersSlice = {
  orders: [],
  isLoading: false,
  error: null
};

export const getUserOrders = createAsyncThunk('userOrders/get', async () =>
  getOrdersApi()
);

const userOrdersSlice = createSlice({
  name: 'userOrders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.orders = [];
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      });
  },
  selectors: {
    selectUserOrders: (state) => state.orders
  }
});

export const { selectUserOrders } = userOrdersSlice.selectors;

export default userOrdersSlice.reducer;

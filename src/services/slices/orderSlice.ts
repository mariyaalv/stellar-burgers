import { getOrderByNumberApi, orderBurgerApi } from '../../utils/burger-api';
import {
  createAsyncThunk,
  createSlice,
  isPending,
  isRejected
} from '@reduxjs/toolkit';
import { TOrder, TResponseStatus } from './../../utils/types';

export interface TOrderSlice extends TResponseStatus {
  orderInfo: TOrder | null;
  orderRequest: boolean;
}

export const initialState: TOrderSlice = {
  orderInfo: null,
  isLoading: false,
  orderRequest: false,
  error: null
};

export const createOrder = createAsyncThunk(
  'order/create',
  async (data: string[], { dispatch }) => {
    dispatch(clearOrder());
    const res = await orderBurgerApi(data);
    return res;
  }
);

export const getOrderByNumber = createAsyncThunk(
  'order/getByNumber',
  async (number: number, { dispatch }) => {
    dispatch(clearOrder());
    return getOrderByNumberApi(number);
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.orderInfo = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.orderInfo = action.payload.orders[0];
        state.isLoading = false;
        state.orderRequest = false;
      })
      .addCase(getOrderByNumber.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(getOrderByNumber.rejected, (state) => {
        state.orderRequest = false;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderInfo = action.payload.order;
        state.isLoading = false;
        state.orderRequest = false;
      })
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(createOrder.rejected, (state) => {
        state.orderRequest = false;
      })
      .addMatcher(isPending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addMatcher(isRejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
  selectors: {
    selectOrderInfo: (state) => state.orderInfo,
    selectOrderRequest: (state) => state.orderRequest
  }
});

export const { selectOrderRequest, selectOrderInfo } = orderSlice.selectors;

export default orderSlice.reducer;

export const { clearOrder } = orderSlice.actions;

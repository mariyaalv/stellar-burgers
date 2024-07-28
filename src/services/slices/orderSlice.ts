import { getOrderByNumberApi, orderBurgerApi } from '../../utils/burger-api';
import {
  createAsyncThunk,
  createSlice,
  isPending,
  isRejected
} from '@reduxjs/toolkit';
import { TOrder, TResponseStatus } from '@utils-types';

interface TOrderSlice extends TResponseStatus {
  orderInfo: TOrder | null;
  orderRequest: boolean;
}

const initialState: TOrderSlice = {
  orderInfo: null,
  orderRequest: false,
  isLoading: false,
  error: null
};

export const createOrder = createAsyncThunk('order/create', (data: string[]) =>
  orderBurgerApi(data)
);

export const getOrderByNumber = createAsyncThunk(
  'order/getByNumber',
  (number: number) => getOrderByNumberApi(number)
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.orderInfo = action.payload.orders[0];
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderInfo = action.payload.order;
        state.orderRequest = true;
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

import { TOrderResponse, TNewOrderResponse } from './../../utils/burger-api';
import { expect, it, describe } from '@jest/globals';
import orderReducer, {
  initialState,
  TOrderSlice,
  createOrder,
  getOrderByNumber,
  selectOrderRequest,
  selectOrderInfo
} from '../../services/slices/orderSlice';

describe('ordersSlice', () => {
  it('should return default state when passed an empty action', () => {
    const res = orderReducer(undefined, { type: '' });

    expect(res).toEqual(initialState);
  });

  describe('check "createOrder"', () => {
    const data: string[] = [
      '643d69a5c3f7b9001cfa093e',
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa093d'
    ];

    it('should change status with "createOrder.pending" action', () => {
      const state = orderReducer(
        initialState,
        createOrder.pending('pending', data)
      );

      expect(state.orderRequest).toBeTruthy();
      expect(state.isLoading).toBeTruthy();
      expect(state.error).toBeNull();
    });

    it('should create order with "createOrder.fulfilled" action', () => {
      const expectedResult: TNewOrderResponse = {
        order: {
          _id: '66b491a1119d45001b4fe5e1',
          ingredients: [
            '643d69a5c3f7b9001cfa093e',
            '643d69a5c3f7b9001cfa093d',
            '643d69a5c3f7b9001cfa093d'
          ],
          status: 'done',
          name: 'Флюоресцентный люминесцентный бургер',
          createdAt: '2024-08-08T09:36:33.140Z',
          updatedAt: '2024-08-08T09:36:33.589Z',
          number: 48817
        },
        name: '',
        success: false
      };

      const state = orderReducer(
        initialState,
        createOrder.fulfilled(expectedResult, 'fulfilled', data)
      );

      expect(state.orderInfo).toEqual(expectedResult.order);
      expect(state.isLoading).not.toBeTruthy();
      expect(state.orderRequest).not.toBeTruthy();
    });

    it('should change status with "createOrder.rejected" action', () => {
      const state = orderReducer(
        initialState,
        createOrder.rejected(null, 'rejected', data)
      );

      expect(state.orderRequest).not.toBeTruthy();
      expect(state.isLoading).not.toBeTruthy();
      expect(state.error).not.toBeNull();
    });
  });

  describe('check "getOrderByNumber"', () => {
    const expectedResult: TOrderResponse = {
      success: false,
      orders: [
        {
          _id: '66b491a1119d45001b4fe5e1',
          ingredients: [
            '643d69a5c3f7b9001cfa093e',
            '643d69a5c3f7b9001cfa093d',
            '643d69a5c3f7b9001cfa093d'
          ],
          status: 'done',
          name: 'Флюоресцентный люминесцентный бургер',
          createdAt: '2024-08-08T09:36:33.140Z',
          updatedAt: '2024-08-08T09:36:33.589Z',
          number: 48817
        },
        {
          _id: '66b48f17119d45001b4fe5d5',
          ingredients: [
            '643d69a5c3f7b9001cfa093e',
            '643d69a5c3f7b9001cfa093d',
            '643d69a5c3f7b9001cfa093d'
          ],
          status: 'done',
          name: 'Флюоресцентный люминесцентный бургер',
          createdAt: '2024-08-08T09:25:43.972Z',
          updatedAt: '2024-08-08T09:25:44.463Z',
          number: 48816
        }
      ]
    };

    it('should change status with "getOrderByNumber.pending" action', () => {
      const state = orderReducer(
        initialState,
        getOrderByNumber.pending('pending', 1)
      );

      expect(state.orderRequest).toBeTruthy();
      expect(state.isLoading).toBeTruthy();
      expect(state.error).toBeNull();
    });

    it('should create order with "getOrderByNumber.fulfilled" action', () => {
      const state = orderReducer(
        initialState,
        getOrderByNumber.fulfilled(expectedResult, 'fulfilled', 1)
      );

      expect(state.orderInfo).toEqual(expectedResult.orders[0]);
      expect(state.orderRequest).not.toBeTruthy();
      expect(state.isLoading).not.toBeTruthy();
    });

    it('should change status with "getOrderByNumber.rejected" action', () => {
      const state = orderReducer(
        initialState,
        getOrderByNumber.rejected(null, 'rejected', 1)
      );

      expect(state.orderRequest).not.toBeTruthy();
      expect(state.isLoading).not.toBeTruthy();
      expect(state.error).not.toBeNull();
    });
  });
});

describe('ordersSelectors', () => {
  const expectedResult: TOrderSlice = {
    orderInfo: {
      _id: '66b491a1119d45001b4fe5e1',
      ingredients: [
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Флюоресцентный люминесцентный бургер',
      createdAt: '2024-08-08T09:36:33.140Z',
      updatedAt: '2024-08-08T09:36:33.589Z',
      number: 48817
    },
    orderRequest: false,
    isLoading: false,
    error: null
  };

  it('should select order from state', () => {
    const res = selectOrderInfo({ order: expectedResult });
    expect(res).toEqual(expectedResult.orderInfo);
  });

  it('should select order request from state', () => {
    const res = selectOrderRequest({
      order: expectedResult
    });
    expect(res).toEqual(expectedResult.orderRequest);
  });
});

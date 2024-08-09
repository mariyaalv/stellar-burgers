import { TOrder } from './../../utils/types';
import { expect, it, describe } from '@jest/globals';
import userOrdersReducer, {
  initialState,
  TUserOrdersSlice,
  getUserOrders,
  selectUserOrders
} from '../../services/slices/userOrdersSlice';

describe('userOrdersSlice', () => {
  it('should return default state when passed an empty action', () => {
    const res = userOrdersReducer(undefined, { type: '' });

    expect(res).toEqual(initialState);
  });

  it('should change status with "getUserOrders.pending" action', () => {
    const state = userOrdersReducer(
      initialState,
      getUserOrders.pending('pending')
    );

    expect(state.isLoading).toBeTruthy();
    expect(state.error).toBeNull();
  });

  it('should get orders of user with "getUserOrders.fulfilled" action', () => {
    const expectedResult: TOrder[] = [
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
    ];

    const state = userOrdersReducer(
      initialState,
      getUserOrders.fulfilled(expectedResult, 'fulfilled')
    );

    expect(state.isLoading).not.toBeTruthy();
    expect(state.orders).toEqual(expectedResult);
  });

  it('should change status with "getUserOrders.rejected" action', () => {
    const state = userOrdersReducer(
      initialState,
      getUserOrders.rejected(null, 'rejected')
    );

    expect(state.isLoading).not.toBeTruthy();
    expect(state.error).not.toBeNull();
  });
});

describe('userOrdersSliceSelectors', () => {
  const expectedResult: TUserOrdersSlice = {
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
    ],
    isLoading: false,
    error: null
  };

  it('should select orders of user from state', () => {
    const res = selectUserOrders({ userOrders: expectedResult });
    expect(res).toEqual(expectedResult.orders);
  });
});

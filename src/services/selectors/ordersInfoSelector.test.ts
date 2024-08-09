import { TOrder } from './../../utils/types';
import { TFeedSlice } from './../slices/feedSlice';
import { RootState } from './../store';
import { TUserOrdersSlice } from './../slices/userOrdersSlice';
import { ordersInfoSelector } from './orderInfoSelectors';
import { expect, it, describe } from '@jest/globals';
import { TOrderSlice } from '../slices/orderSlice';

describe('ordersInfoSelector', () => {
  const orderNumber = 1111;
  const selector = ordersInfoSelector(`${orderNumber}`);

  const userOrdersData: TUserOrdersSlice = {
    orders: [
      {
        _id: '66b491a1119d45001b4fe5e1',
        ingredients: [
          '643d69a5c3f7b9001cfa093e',
          '643d69a5c3f7b9001cfa093d',
          '643d69a5c3f7b9001cfa093d'
        ],
        status: 'done',
        name: 'userOrdersData 1',
        createdAt: '2024-08-08T09:36:33.140Z',
        updatedAt: '2024-08-08T09:36:33.589Z',
        number: orderNumber
      },
      {
        _id: '66b48f17119d45001b4fe5d5',
        ingredients: [
          '643d69a5c3f7b9001cfa093e',
          '643d69a5c3f7b9001cfa093d',
          '643d69a5c3f7b9001cfa093d'
        ],
        status: 'done',
        name: 'userOrdersData 2',
        createdAt: '2024-08-08T09:25:43.972Z',
        updatedAt: '2024-08-08T09:25:44.463Z',
        number: 48817
      }
    ],
    isLoading: false,
    error: null
  };

  const feedOrdersData: TFeedSlice = {
    orders: [
      {
        _id: '66b491a1119d45001b4fe5e1',
        ingredients: [
          '643d69a5c3f7b9001cfa093e',
          '643d69a5c3f7b9001cfa093d',
          '643d69a5c3f7b9001cfa093d'
        ],
        status: 'done',
        name: 'feedOrdersData 1',
        createdAt: '2024-08-08T09:36:33.140Z',
        updatedAt: '2024-08-08T09:36:33.589Z',
        number: orderNumber
      },
      {
        _id: '66b48f17119d45001b4fe5d5',
        ingredients: [
          '643d69a5c3f7b9001cfa093e',
          '643d69a5c3f7b9001cfa093d',
          '643d69a5c3f7b9001cfa093d'
        ],
        status: 'done',
        name: 'feedOrdersData 2',
        createdAt: '2024-08-08T09:25:43.972Z',
        updatedAt: '2024-08-08T09:25:44.463Z',
        number: 48817
      }
    ],
    feed: {
      total: 100,
      totalToday: 10
    },
    isLoading: false,
    error: null
  };

  const orderOrdersData: TOrderSlice = {
    orderInfo: {
      _id: '66b491a1119d45001b4fe5e1',
      ingredients: [
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'orderOrdersData 1',
      createdAt: '2024-08-08T09:36:33.140Z',
      updatedAt: '2024-08-08T09:36:33.589Z',
      number: orderNumber
    },
    orderRequest: false,
    isLoading: false,
    error: null
  };

  it('should select order from "userOrders" state if it has orders', () => {
    const expectedResult = selector({
      userOrders: userOrdersData
    } as RootState);
    expect(userOrdersData.orders).toContainEqual(expectedResult);
  });

  it('should select order from "feed" state if it has orders', () => {
    userOrdersData.orders[0].number = 2222;

    const expectedResult = selector({
      userOrders: userOrdersData,
      feed: feedOrdersData
    } as RootState);
    expect(feedOrdersData.orders).toContainEqual(expectedResult);
  });

  it('should select order from "order" state if it has orders', () => {
    userOrdersData.orders[0].number = 2222;
    feedOrdersData.orders[0].number = 3333;

    const expectedResult = selector({
      userOrders: userOrdersData,
      feed: feedOrdersData,
      order: orderOrdersData
    } as RootState);
    expect(orderOrdersData.orderInfo).toEqual(expectedResult);
  });

  it('should nothing select if states do not have orders', () => {
    userOrdersData.orders[0].number = 2222;
    feedOrdersData.orders[0].number = 3333;
    (orderOrdersData.orderInfo as TOrder).number = 4444;

    const expectedResult = selector({
      userOrders: userOrdersData,
      feed: feedOrdersData,
      order: orderOrdersData
    } as RootState);
    expect(expectedResult).toBeNull();
  });
});

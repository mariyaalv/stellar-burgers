import { TFeedsResponse } from './../../utils/burger-api';
import { expect, it, describe } from '@jest/globals';
import feedReducer, {
  initialState,
  TFeedSlice,
  fetchFeeds,
  selectOrders,
  selectFeed
} from '../../services/slices/feedSlice';

describe('feedSlice', () => {
  it('should return default state when passed an empty action', () => {
    const res = feedReducer(undefined, { type: '' });

    expect(res).toEqual(initialState);
  });

  it('should change status with "fetchFeed.pending" action', () => {
    // создаем стор в который будем класть данные, полученные в результате fetchFeed
    const state = feedReducer(initialState, fetchFeeds.pending('pending'));

    expect(state.isLoading).toBeTruthy();
    expect(state.error).toBeNull();
  });

  it('should fetch feed with "fetchFeed.fulfilled" action', () => {
    const expectedResult: TFeedsResponse = {
      success: true,
      orders: [
        {
          _id: '66b3ba2f119d45001b4fe431',
          ingredients: [
            '643d69a5c3f7b9001cfa093c',
            '643d69a5c3f7b9001cfa0942',
            '643d69a5c3f7b9001cfa093c'
          ],
          status: 'done',
          name: 'Краторный spicy бургер',
          createdAt: '2024-08-07T18:17:19.973Z',
          updatedAt: '2024-08-07T18:17:20.433Z',
          number: 48781
        },
        {
          _id: '66b3ba0c119d45001b4fe42e',
          ingredients: [
            '643d69a5c3f7b9001cfa093c',
            '643d69a5c3f7b9001cfa0942',
            '643d69a5c3f7b9001cfa093c'
          ],
          status: 'done',
          name: 'Краторный spicy бургер',
          createdAt: '2024-08-07T18:16:44.627Z',
          updatedAt: '2024-08-07T18:16:45.077Z',
          number: 48780
        }
      ],
      total: 48407,
      totalToday: 89
    };

    const state = feedReducer(
      initialState,
      fetchFeeds.fulfilled(expectedResult, 'fulfilled')
    );

    expect(state.isLoading).not.toBeTruthy();
    expect(state.orders).toEqual(expectedResult.orders);
    expect(state.feed.total).toEqual(expectedResult.total);
    expect(state.feed.totalToday).toEqual(expectedResult.totalToday);
  });

  it('should change status with "fetchFeed.rejected" action', () => {
    const state = feedReducer(
      initialState,
      fetchFeeds.rejected(null, 'rejected')
    );

    expect(state.isLoading).not.toBeTruthy();
    expect(state.error).not.toBeNull();
  });
});

describe('feedSelectors', () => {
  const expectedResult: TFeedSlice = {
    orders: [
      {
        _id: '66b3ba2f119d45001b4fe431',
        ingredients: [
          '643d69a5c3f7b9001cfa093c',
          '643d69a5c3f7b9001cfa0942',
          '643d69a5c3f7b9001cfa093c'
        ],
        status: 'done',
        name: 'Краторный spicy бургер',
        createdAt: '2024-08-07T18:17:19.973Z',
        updatedAt: '2024-08-07T18:17:20.433Z',
        number: 48781
      },
      {
        _id: '66b3ba0c119d45001b4fe42e',
        ingredients: [
          '643d69a5c3f7b9001cfa093c',
          '643d69a5c3f7b9001cfa0942',
          '643d69a5c3f7b9001cfa093c'
        ],
        status: 'done',
        name: 'Краторный spicy бургер',
        createdAt: '2024-08-07T18:16:44.627Z',
        updatedAt: '2024-08-07T18:16:45.077Z',
        number: 48780
      }
    ],
    feed: {
      total: 48407,
      totalToday: 89
    },
    isLoading: false,
    error: null
  };

  it('should select orders from state', () => {
    const res = selectOrders({ feed: expectedResult });
    expect(res).toEqual(expectedResult.orders);
  });

  it('should select feed from state', () => {
    const res = selectFeed({ feed: expectedResult });
    expect(res).toEqual(expectedResult.feed);
  });
});

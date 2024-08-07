// import { TFeedsResponse } from './../../utils/burger-api';
// import { expect, it, describe } from '@jest/globals';
// import feedReducer, {
//   initialState,
//   TFeedSlice,
//   fetchFeeds,
//   selectOrders,
//   selectFeed
// } from '../../services/slices/feedSlice';

// const feed: TFeedSlice = {
//   orders: [
//     {
//       _id: '66b3ba2f119d45001b4fe431',
//       ingredients: [
//         '643d69a5c3f7b9001cfa093c',
//         '643d69a5c3f7b9001cfa0942',
//         '643d69a5c3f7b9001cfa093c'
//       ],
//       status: 'done',
//       name: 'Краторный spicy бургер',
//       createdAt: '2024-08-07T18:17:19.973Z',
//       updatedAt: '2024-08-07T18:17:20.433Z',
//       number: 48781
//     },
//     {
//       _id: '66b3ba0c119d45001b4fe42e',
//       ingredients: [
//         '643d69a5c3f7b9001cfa093c',
//         '643d69a5c3f7b9001cfa0942',
//         '643d69a5c3f7b9001cfa093c'
//       ],
//       status: 'done',
//       name: 'Краторный spicy бургер',
//       createdAt: '2024-08-07T18:16:44.627Z',
//       updatedAt: '2024-08-07T18:16:45.077Z',
//       number: 48780
//     }
//   ],
//   feed: {
//     total: 48407,
//     totalToday: 89
//   },
//   isLoading: false,
//   error: null
// };

// describe('feedSlice', () => {
//   it('should return default state when passed an empty action', () => {
//     const res = feedReducer(undefined, { type: '' });

//     expect(res).toEqual(initialState);
//   });
// });

// describe('feedThunk', () => {
//   const mockOrders: TFeedsResponse = {
//     success: false,
//     orders: feed.orders,
//     total: 48407,
//     totalToday: 89
//   };

//   it('should fetchFeeds with resolved responce', async () => {
//     global.fetch = jest.fn(() =>
//       Promise.resolve({
//         json: () => Promise.resolve(mockOrders)
//       })
//     ) as jest.Mock;

//     const dispatch = jest.fn(); //замоканный диспатч
//     const thunk = fetchFeeds();

//     await thunk(
//       dispatch,
//       () => ({}),
//       () => ({})
//     );

//     const { calls } = dispatch.mock;

//     const [start, end] = calls;

//     expect(start[0].type).toBe('feed/get/pending');
//     expect(end[0].type).toBe('feed/get/fulfilled');
//     expect(end[0].payload).toBe(mockOrders);
//   });
//   it('should fetchFeeds with rejected responce', async () => {});
// });

// // describe('feedThunk', () => {
// //   it('should fetchFeeds with resolved responce', () => {});
// //   it('should fetchFeeds with rejected responce', () => {});
// // });

//   describe('feedSelectors', () => {
//   it('should select orders from state', () => {
//     const res = selectOrders({ feed });
//     expect(res).toEqual(feed.orders);
//   });
//   it('should select feed from state', () => {
//     const res = selectFeed({ feed });
//     expect(res).toEqual(feed.feed);
//   });
// });

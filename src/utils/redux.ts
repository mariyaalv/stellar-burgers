import { AsyncThunk, UnknownAction } from '@reduxjs/toolkit';

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;
export type PendingAction = ReturnType<GenericAsyncThunk['pending']>;
export type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>;
export type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>;

// export const hasPrefix = (action: UnknownAction, prefix: string): boolean =>
//   action.type.startsWith(prefix);

export const isPending = (action: PendingAction): boolean =>
  action.type.endsWith('/pending');

export const isFulfilled = (action: FulfilledAction): boolean =>
  action.type.endsWith('/fulfilled');

export const isRejected = (action: RejectedAction): boolean =>
  action.type.endsWith('/rejected');

// export const isActionPending = (prefix: string) => (action: PendingAction) => {
//   hasPrefix(action, prefix) && isPending(action);
// };

// export const isActionRejected =
//   (prefix: string) => (action: RejectedAction) => {
//     hasPrefix(action, prefix) && isRejected(action);
//   };

// export const isActionFulfilled =
//   (prefix: string) => (action: FulfilledAction) => {
//     hasPrefix(action, prefix) && isFulfilled(action);
//   };

// export function getActionName(actionType: string) {
//   return actionType.split('/')[1];
// }

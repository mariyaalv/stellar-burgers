import { AsyncThunk } from '@reduxjs/toolkit';

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;
export type PendingAction = ReturnType<GenericAsyncThunk['pending']>;
export type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>;
export type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>;

export const isPending = (action: PendingAction): boolean =>
  action.type.endsWith('/pending');

export const isFulfilled = (action: FulfilledAction): boolean =>
  action.type.endsWith('/fulfilled');

export const isRejected = (action: RejectedAction): boolean =>
  action.type.endsWith('/rejected');

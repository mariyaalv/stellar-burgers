import {
  TRegisterData,
  TLoginData,
  TAuthResponse,
  TUserResponse
} from './../../utils/burger-api';
import { expect, it, describe } from '@jest/globals';
import userReducer, {
  initialState,
  IUserSlice,
  userRegister,
  userLogin,
  userLogout,
  getUser,
  updateUser,
  authChecked,
  selectUser
} from '../../services/slices/userSlice';
import { TUser } from '@utils-types';

describe('userSlice', () => {
  it('should return default state when passed an empty action', () => {
    const res = userReducer(undefined, { type: '' });

    expect(res).toEqual(initialState);
  });

  it('should return status of auth with "authChecked" action', () => {
    const newState = userReducer(initialState, authChecked());

    expect(newState.isAuthChecked).toBeTruthy();
  });

  describe('check "userRegister"', () => {
    const newUser: TRegisterData = {
      email: 'NewUser@email.ru',
      name: 'NewUser',
      password: 'NewUserPassword111'
    };

    it('should change status with "userRegister.pending" action', () => {
      const state = userReducer(
        initialState,
        userRegister.pending('pending', newUser)
      );

      expect(state.isAuthChecked).toBeTruthy();
      expect(state.isLoading).toBeTruthy();
      expect(state.error).toBeNull();
    });

    it('should register new user with "userRegister.fulfilled" action', () => {
      const expectedResult: TAuthResponse = {
        success: false,
        refreshToken: 'testRefreshToken',
        accessToken: 'testAccessToken',
        user: newUser
      };

      const state = userReducer(
        initialState,
        userRegister.fulfilled(expectedResult, 'fulfilled', newUser)
      );

      expect(state.user).toEqual(expectedResult.user);
      expect(state.isLoading).not.toBeTruthy();
      expect(state.isAuthChecked).toBeTruthy();
    });

    it('should change status with "userRegister.rejected" action', () => {
      const state = userReducer(
        initialState,
        userRegister.rejected(null, 'rejected', newUser)
      );

      expect(state.isLoading).not.toBeTruthy();
      expect(state.error).not.toBeNull();
    });
  });

  describe('check "userLogin"', () => {
    const user: TLoginData = {
      email: 'NewUser@email.ru',
      password: 'NewUserPassword111'
    };

    it('should change status with "userLogin.pending" action', () => {
      const state = userReducer(
        initialState,
        userLogin.pending('pending', user)
      );

      expect(state.isLoading).toBeTruthy();
      expect(state.error).toBeNull();
    });

    it('should login user with "userLogin.fulfilled" action', () => {
      const expectedResult: TUser = {
        email: 'TestUser@email.ru',
        name: 'TestUser'
      };

      const state = userReducer(
        initialState,
        userLogin.fulfilled(expectedResult, 'fulfilled', user)
      );

      expect(state.user).toEqual(expectedResult);
      expect(state.isLoading).not.toBeTruthy();
      expect(state.isAuthChecked).toBeTruthy();
    });

    it('should change status with "userLogin.rejected" action', () => {
      const state = userReducer(
        initialState,
        userLogin.rejected(null, 'rejected', user)
      );

      expect(state.isAuthChecked).not.toBeTruthy();
      expect(state.isLoading).not.toBeTruthy();
      expect(state.error).not.toBeNull();
    });
  });

  describe('check "userLogout"', () => {
    const expectedResult = () => console.log('Test Logout');

    it('should change status with "userLogout.pending" action', () => {
      const state = userReducer(initialState, userLogout.pending('pending'));

      expect(state.isAuthChecked).toBeTruthy();
      expect(state.isLoading).toBeTruthy();
      expect(state.error).toBeNull();
    });

    it('should login user with "userLogout.fulfilled" action', () => {
      const state = userReducer(
        initialState,
        userLogout.fulfilled(expectedResult(), 'fulfilled')
      );

      expect(state.user).toBeNull();
      expect(state.isLoading).not.toBeTruthy();
      expect(state.isAuthChecked).not.toBeTruthy();
    });

    it('should change status with "userLogout.rejected" action', () => {
      const state = userReducer(
        initialState,
        userLogout.rejected(null, 'rejected', expectedResult())
      );

      expect(state.isLoading).not.toBeTruthy();
      expect(state.error).not.toBeNull();
    });
  });

  describe('check "getUser"', () => {
    it('should change status with "getUser.pending" action', () => {
      const state = userReducer(initialState, getUser.pending('pending'));

      expect(state.isLoading).toBeTruthy();
      expect(state.error).toBeNull();
    });

    it('should get user with "getUser.fulfilled" action', () => {
      const expectedResult: TUserResponse = {
        success: false,
        user: {
          email: 'TestUser@email.ru',
          name: 'TestUser'
        }
      };

      const state = userReducer(
        initialState,
        getUser.fulfilled(expectedResult, 'fulfilled')
      );

      expect(state.user).toEqual(expectedResult.user);
    });

    it('should change status with "getUser.rejected" action', () => {
      const state = userReducer(
        initialState,
        getUser.rejected(null, 'rejected')
      );

      expect(state.error).not.toBeNull();
    });
  });

  describe('check "updateUser"', () => {
    const newUser: TRegisterData = {
      email: 'NewUser@email.ru',
      name: 'NewUser',
      password: 'NewUserPassword111'
    };

    it('should change status with "updateUser.pending" action', () => {
      const state = userReducer(
        initialState,
        updateUser.pending('pending', newUser)
      );

      expect(state.user).toBeNull();
      expect(state.isLoading).toBeTruthy();
      expect(state.error).toBeNull();
    });

    it('should update user with "updateUser.fulfilled" action', () => {
      const expectedResult: TUserResponse = {
        success: false,
        user: newUser
      };

      const state = userReducer(
        initialState,
        updateUser.fulfilled(expectedResult, 'fulfilled', newUser)
      );

      expect(state.user).toEqual(expectedResult.user);
      expect(state.isLoading).not.toBeTruthy();
      expect(state.isAuthChecked).toBeTruthy();
    });

    it('should change status with "updateUser.rejected" action', () => {
      const state = userReducer(
        initialState,
        updateUser.rejected(null, 'rejected', newUser)
      );

      expect(state.isLoading).not.toBeTruthy();
      expect(state.error).not.toBeNull();
    });
  });
});

describe('userSliceSelectors', () => {
  const expectedResult: IUserSlice = {
    user: {
      email: 'TestUser@email.ru',
      name: 'TestUser'
    },
    isAuthChecked: false,
    isLoading: false,
    error: null
  };

  it('should select order from state', () => {
    const res = selectUser({ user: expectedResult });
    expect(res).toEqual(expectedResult);
  });
});

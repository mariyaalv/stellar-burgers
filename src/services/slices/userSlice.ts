import {
  TLoginData,
  TRegisterData,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  updateUserApi
} from '@api';
import {
  createAsyncThunk,
  createSlice,
  isPending,
  isRejected
} from '@reduxjs/toolkit';
import { TResponseStatus, TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../../utils/cookie';

interface IUserSlice extends TResponseStatus {
  user: TUser | null;
  isAuth: boolean;
}

const initialState: IUserSlice = {
  user: null,
  isAuth: false,
  isLoading: false,
  error: null
};

export const userRegister = createAsyncThunk(
  'user/register',
  async ({ email, name, password }: TRegisterData) => {
    const data = await registerUserApi({ email, name, password });
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data;
  }
);

export const userLogin = createAsyncThunk(
  'user/login',
  async ({ email, password }: TLoginData) => {
    const data = await loginUserApi({ email, password });
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data;
  }
);

export const userLogout = createAsyncThunk('user/logout', async () => {
  logoutApi().then(() => {
    deleteCookie('accessToken');
    localStorage.clear();
  });
});

export const checkUserAuth = createAsyncThunk('user/getApi', async () =>
  getUserApi()
);

export const updateUser = createAsyncThunk(
  'user/updateApi',
  async (user: Partial<TRegisterData>) => updateUserApi(user)
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userRegister.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuth = true;
        state.user = action.payload.user;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuth = true;
        state.user = action.payload.user;
      })
      .addCase(userLogout.fulfilled, (state, action) => {
        state = initialState;
        localStorage.clear();
      })
      .addCase(checkUserAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuth = true;
        state.user = action.payload.user;
      })
      .addMatcher(isPending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addMatcher(isRejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        state.isAuth = false;
      });
  },
  selectors: {
    selectUser: (state) => state
  }
});

export const { selectUser } = userSlice.selectors;

// export const { authChecked } = userSlice.actions;

export default userSlice.reducer;

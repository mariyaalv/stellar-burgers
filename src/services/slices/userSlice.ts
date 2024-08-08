import {
  TLoginData,
  TRegisterData,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  updateUserApi
} from './../../utils/burger-api';
import {
  createAsyncThunk,
  createSlice,
  isPending,
  isRejected
} from '@reduxjs/toolkit';
import { TResponseStatus, TUser } from './../../utils/types';
import { deleteCookie, getCookie, setCookie } from '../../utils/cookie';

export interface IUserSlice extends TResponseStatus {
  user: TUser | null;
  isAuthChecked: boolean;
}

export const initialState: IUserSlice = {
  user: null,
  isAuthChecked: false, // флаг для статуса проверки токена пользователя
  isLoading: false,
  error: null
};

export const userRegister = createAsyncThunk(
  'user/register',
  async ({ email, name, password }: TRegisterData, { rejectWithValue }) => {
    const data = await registerUserApi({ email, name, password });
    if (!data?.success) {
      return rejectWithValue(data);
    }
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data;
  }
);

export const userLogin = createAsyncThunk(
  'user/login',
  async ({ email, password }: TLoginData, { rejectWithValue }) => {
    const data = await loginUserApi({ email, password });
    if (!data?.success) {
      return rejectWithValue(data);
    }
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data.user;
  }
);

export const userLogout = createAsyncThunk('user/logout', async () => {
  logoutApi().then(() => {
    deleteCookie('accessToken');
    localStorage.clear();
  });
});

export const getUser = createAsyncThunk('user/getApi', async () =>
  getUserApi()
);

export const checkUserAuth = createAsyncThunk(
  'user/checkUser',
  (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      dispatch(getUser()).finally(() => {
        dispatch(authChecked());
      });
    } else {
      dispatch(authChecked());
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/updateApi',
  async (user: Partial<TRegisterData>) => updateUserApi(user)
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authChecked: (state) => {
      state.isAuthChecked = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(userRegister.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthChecked = true;
        state.user = action.payload.user;
      })
      .addCase(userRegister.pending, (state) => {
        state.isAuthChecked = true;
        state.isLoading = true;
      })
      .addCase(userRegister.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthChecked = true;
        state.user = action.payload;
      })
      .addCase(userLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userLogin.rejected, (state) => {
        state.isAuthChecked = false;
        state.isLoading = false;
      })
      .addCase(userLogout.fulfilled, (state) => {
        state.user = null;
        state.isLoading = false;
      })
      .addCase(userLogout.pending, (state) => {
        state.isAuthChecked = true;
        state.isLoading = true;
      })
      .addCase(userLogout.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthChecked = true;
        state.user = action.payload.user;
      })
      .addCase(updateUser.pending, (state) => {
        state.user = null;
        state.isLoading = true;
      })
      .addCase(updateUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addMatcher(isPending, (state) => {
        state.error = null;
      })
      .addMatcher(isRejected, (state, action) => {
        state.error = action.error.message;
      });
  },
  selectors: {
    selectUser: (state) => state
  }
});

export const { selectUser } = userSlice.selectors;
export const { authChecked } = userSlice.actions;

export default userSlice.reducer;

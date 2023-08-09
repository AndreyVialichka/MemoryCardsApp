import { createSlice } from "@reduxjs/toolkit";
import {
  ArgForgotPassportType,
  ArgLoginType,
  ArgNewNameAndAvatar,
  ArgNewPassportType,
  ArgRegisterType,
  authApi,
  ProfileType,
} from "features/auth/auth.api";
import { createAppAsyncThunk, thunkTryCatch } from "common/utils";

const slice = createSlice({
  name: "auth",
  initialState: {
    profile: null as ProfileType | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.profile = action.payload.profile;
    });
    builder.addCase(forgotPassword.fulfilled, (state, action) => {
      state.profile = null;
    });
    builder.addCase(logut.fulfilled, (state, action) => {
      state.profile = null;
    });
    builder.addCase(setNameAndAvatar.fulfilled, (state, action) => {
      state.profile = action.payload.updatedUser;
    });
  },
});

const login = createAppAsyncThunk<{ profile: ProfileType }, ArgLoginType>(
  "auth/login",
  async (arg, thunkAPI) => {
    return thunkTryCatch(
      thunkAPI,
      async () => {
        const res = await authApi.login(arg);
        return { profile: res.data };
      },
      false
    );
  }
);

const logut = createAppAsyncThunk("auth/logut", async (arg, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    await authApi.logout();
  });
});

const register = createAppAsyncThunk<void, ArgRegisterType>(
  "auth/register",
  async (arg, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const res = await authApi.register(arg);
      return {res:res}
    });
  }
);

const forgotPassword = createAppAsyncThunk<void, ArgForgotPassportType>(
  "auth/forgotPassword",
  async (arg, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      await authApi.forgorPassport(arg);
    });
  }
);

const setNewPassword = createAppAsyncThunk<void, ArgNewPassportType>(
  "auth/setNewPassport",
  async (arg, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      let payload = {
        ...arg,
        resetPasswordToken: arg.resetPasswordToken,
      };
      await authApi.setNewPassport(payload);
    });
  }
);

const setNameAndAvatar = createAppAsyncThunk<
  { updatedUser: ProfileType },
  ArgNewNameAndAvatar
>("auth/register", async (arg, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    const res = await authApi.setUserNameAndAvatar(arg);
    debugger;
    return { updatedUser: res.data.updatedUser };
  });
});

export const authReducer = slice.reducer;
export const authThunks = {
  register,
  login,
  forgotPassword,
  setNewPassword,
  logut,
  setNameAndAvatar,
};

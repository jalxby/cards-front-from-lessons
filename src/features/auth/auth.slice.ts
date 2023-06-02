import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import {
  AuthApi,
  LoginArgs,
  RegisterArgs,
  RegisterResponse,
  User,
} from "@/features/auth/auth.api"
import { createAppAsyncThunk, createThunkAction } from "@/common"

const THUNK_PREFIXES = {
  REGISTER: "auth/register",
  LOGIN: "auth/login",
}

const register = createAppAsyncThunk<{ user: RegisterResponse }, RegisterArgs>(
  THUNK_PREFIXES.REGISTER,
  createThunkAction(AuthApi.register, (res) => ({ user: res.data })),
)

const login = createAppAsyncThunk<{ user: User }, LoginArgs>(
  THUNK_PREFIXES.LOGIN,
  createThunkAction(AuthApi.login, (res) => ({ user: res.data })),
)

const slice = createSlice({
  name: "auth",
  initialState: {
    user: null as User | null,
    isAuthed: null as null | boolean,
    isLoading: false,
  },
  reducers: {
    setUser: (state, action: PayloadAction<{ user: User }>) => {
      state.user = action.payload.user
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      if (action.payload?.user) {
        state.user = action.payload.user
      }
    })
  },
})

export const authReducer = slice.reducer
export const authThunks = { register, login }

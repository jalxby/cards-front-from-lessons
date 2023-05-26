import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import {
  AuthApi,
  LoginArgs,
  RegisterArgs,
  User,
} from "@/features/auth/auth.api"

const register = createAsyncThunk("auth/register", (arg: RegisterArgs) => {
  AuthApi.register(arg)
    .then((res) => {
      console.log(res)
    })
    .catch((res) => {
      console.error(res)
    })
})

const login = createAsyncThunk("auth/login", async (arg: LoginArgs) => {
  try {
    const res = await AuthApi.login(arg)
    return { user: res.data }
  } catch (e) {
    console.error(e)
  }
})

const slice = createSlice({
  name: "auth",
  initialState: { user: null as User | null },
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

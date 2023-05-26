import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import {
  AuthApi,
  LoginArgs,
  RegisterArgs,
  User,
} from "@/features/auth/auth.api"
import { createAppAsyncThunk } from "@/common"

const THUNK_PREFIXES = {
  REGISTER: "auth/register",
}

const register = createAppAsyncThunk<any, RegisterArgs>(
  THUNK_PREFIXES.REGISTER,
  (arg) => {
    AuthApi.register(arg)
      .then((res) => {
        console.log(res)
      })
      .catch((res) => {
        console.error(res)
      })
  },
)

const login = createAppAsyncThunk<{ user: User }, LoginArgs>(
  "auth/login",
  async (arg) => {
    const res = await AuthApi.login(arg)
    return { user: res.data }
  },
)

const slice = createSlice({
  name: "auth",
  initialState: { user: null as User | null, isLoading: false },
  reducers: {
    setUser: (state, action: PayloadAction<{ user: User }>) => {
      state.user = action.payload.user
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(login.fulfilled, (state, action) => {
      if (action.payload?.user) {
        state.user = action.payload.user
        state.isLoading = false
      }
    })
    builder.addCase(login.rejected, (state) => {
      state.isLoading = false
    })
  },
})

export const authReducer = slice.reducer
export const authThunks = { register, login }

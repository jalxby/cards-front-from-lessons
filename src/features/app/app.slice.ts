import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialAppState = {
  error: null as null | string,
  isLoading: true,
  isAppInitialized: false,
}

export type InitialAppState = typeof initialAppState

const slice = createSlice({
  name: "app",
  initialState: initialAppState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<{ isLoading: boolean }>) => {
      state.isLoading = action.payload.isLoading
    },
    setError: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error
    },
    setAppInitialized: (
      state,
      action: PayloadAction<{ isAppInitialized: boolean }>,
    ) => {
      state.isAppInitialized = action.payload.isAppInitialized
    },
  },
})

export const appReducer = slice.reducer
export const appActions = slice.actions

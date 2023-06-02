import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { isAxiosError } from "axios"
import { toast } from "react-toastify"

const initialAppState = {
  error: null as null | string,
  isLoading: true,
  isAppInitialized: false,
  unhandledActions: [] as Array<any>,
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
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => {
          return action.type.endsWith("/pending")
        },
        (state) => {
          state.isLoading = true
        },
      )
      .addMatcher(
        (action) => {
          return action.type.endsWith("/rejected")
        },
        (state, { payload: { error } }) => {
          state.isLoading = false
          const errorMessage = getErrorMessage(error)
          if (errorMessage === null) return
          toast.error(errorMessage)
        },
      )
      .addMatcher(
        (action) => {
          return action.type.endsWith("/fulfilled")
        },
        (state) => {
          state.isLoading = false
        },
      )
      .addDefaultCase((state, action) => {
        console.log("addDefaultCase 🚀", action.type)
        state.unhandledActions.push(action)
      })
  },
})

/* if null is returned no message should be shown */
function getErrorMessage(error: unknown): null | string {
  if (isAxiosError(error)) {
    if (
      error?.response?.status === 400 &&
      error?.request.responseURL.endsWith("/login")
    ) {
      return null
    }
    return error?.response?.data?.error ?? error.message
  }
  if (error instanceof Error) {
    return `Native error: ${error.message}`
  }
  return JSON.stringify(error)
}

export const appReducer = slice.reducer
export const appActions = slice.actions

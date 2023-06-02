import { BaseThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk"
import { AppDispatch, RootState } from "@/app/store"
import { thunkTryCatch } from "./"

export const createThunkAction = <A, R, T>(
  promise: (arg: A) => Promise<R>,
  transformPromise?: (arg: R) => T,
) => {
  return (
    arg: A,
    thunkAPI: BaseThunkAPI<RootState, any, AppDispatch, unknown>,
  ) => {
    return thunkTryCatch(thunkAPI, () => promise(arg).then(transformPromise))
  }
}

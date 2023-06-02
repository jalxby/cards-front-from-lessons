import { createAction } from "@reduxjs/toolkit"

export const unhandledAction = createAction<string>("common/unhandledAction")

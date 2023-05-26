import { AuthInstance } from "@/features/auth/auth.instance"

export const AuthApi = {
  register: (params: RegisterArgs) => {
    return AuthInstance.post<RegisterResponse>("register", params)
  },
  login: (params: LoginArgs) => {
    return AuthInstance.post<User>("login", params)
  },
}

export type RegisterResponse = {
  addedUser: AddedUser
}

type PasswordToPick = {
  password: string
}

export type AddedUser = Omit<User, "token" | "tokenDeathTime">
export type RegisterArgs = Pick<User, "email"> & PasswordToPick
export type LoginArgs = Pick<User, "email" | "rememberMe"> & PasswordToPick
export type PartialUser = Partial<User>

export type User = {
  _id: string
  email: string
  rememberMe: boolean
  isAdmin: boolean
  name: string
  verified: boolean
  publicCardPacksCount: number
  created: string
  updated: string
  token: string
  tokenDeathTime: number
  __v: number
}

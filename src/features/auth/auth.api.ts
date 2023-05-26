import { AuthInstance } from "@/features/auth/auth.instance"

export const AuthApi = () => ({
  register: (params: any) => {
    return AuthInstance.post(params)
  },
})

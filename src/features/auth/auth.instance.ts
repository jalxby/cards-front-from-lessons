import axios from "axios"

export const AuthInstance = axios.create({
  baseURL: import.meta.env.BASE_URL + "auth/",
  withCredentials: true,
})

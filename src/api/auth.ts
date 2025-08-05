import { axiosInstance } from "@/lib/axios";

export const login = async (username: string, password: string) => {
  return axiosInstance.post(`/auth/whoami`, { username, password });
}
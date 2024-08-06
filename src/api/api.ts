import { ApiResponse, LoginParams, RegisterParams, SendPasswordResetParams } from "@/types/types";
import API from "./client";

export const login = async (data: LoginParams) => API.post("/auth/login", data);

export const signup = async (data: RegisterParams) => API.post("/auth/register", data);
export const logout = async () => API.get("/auth/logout");
export const verifyEmail = async (verificationCode: string) =>
  API.get(`/auth/email/verify/${verificationCode}`);

export const sendPasswordResetEmail = async (email: SendPasswordResetParams) =>
  API.post("/auth/password/forgot", email);
export const resetPassword = async (data: string) => API.post("/auth/password/reset", data); //data = {verificationCode, password}
export const getUser = async (): Promise<ApiResponse> => API.get("/user");

import { baseApi } from "@/api/baseApi";
import { TResponse } from "../types";
import { TSigninValue, TSignupValue, TUser } from "./types";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<TResponse<TUser>, TSigninValue>({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),
    signup: builder.mutation<TResponse<TUser>, TSignupValue>({
      query: (data) => ({
        url: "/auth/signup",
        method: "POST",
        body: data,
      }),
    }),
    changePassword: builder.mutation<
      TResponse<null>,
      { oldPassword: string; newPassword: string }
    >({
      query: (data) => ({
        url: "/auth/change-password",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useChangePasswordMutation,
} = authApi;

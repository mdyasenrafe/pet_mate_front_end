import { baseApi } from "../../../api/baseApi";
import { TUser, updateUser } from "../auth";
import { TQueryParams, TResponse } from "../types";
import { TUpdateValue } from "./types";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    me: builder.query<TResponse<TUser>, undefined>({
      query: () => {
        return { url: "/users/me" };
      },
    }),
    getAllUsers: builder.query<TResponse<TUser[]>, TQueryParams[]>({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParams) => {
            params.append(item.name, item.value as string);
          });
        }

        return { url: "/users", params: params };
      },
      providesTags: ["Users"],
    }),
    update: builder.mutation<TResponse<TUser>, TUpdateValue>({
      query: (data) => ({
        url: "users/me",
        method: "PUT",
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(updateUser(data?.data as TUser));
        } catch (error) {
          console.error("Failed to update user:", error);
        }
      },
    }),
    updateRole: builder.mutation<TResponse<TUser>, string>({
      query: (id) => ({
        url: `users/role-update/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["Users"],
    }),
    softDeleteUser: builder.mutation<TResponse<TUser>, string>({
      query: (id) => ({
        url: `users/change-status/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useMeQuery,
  useGetAllUsersQuery,
  useUpdateMutation,
  useUpdateRoleMutation,
  useSoftDeleteUserMutation,
} = userApi;

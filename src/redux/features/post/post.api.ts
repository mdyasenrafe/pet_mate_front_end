import { baseApi } from "@/api/baseApi";
import { TCreatePostRequest, TPost, TUpdatePostRequest } from "./post.type";
import { TQueryParams, TResponse } from "../types";
import { TreeProps } from "antd";

// Define the API endpoints related to posts
export const postsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRandomPosts: builder.query<TResponse<TPost[]>, TQueryParams[]>({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParams) => {
            params.append(item.name, item.value as string);
          });
        }

        return { url: "/post/random", params: params };
      },
      providesTags: ["Post"],
    }),
    getPosts: builder.query<TResponse<TPost[]>, TQueryParams[]>({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParams) => {
            params.append(item.name, item.value as string);
          });
        }

        return { url: "/post", params: params };
      },
      providesTags: ["Post"],
    }),

    createPost: builder.mutation<TResponse<TPost>, TCreatePostRequest>({
      query: (newPost) => ({
        url: "/post",
        method: "POST",
        body: newPost,
      }),
      invalidatesTags: ["Post"],
    }),
    updatePost: builder.mutation<TResponse<TPost>, TUpdatePostRequest>({
      query: ({ postId, ...postData }) => ({
        url: `/post/${postId}`,
        method: "PUT",
        body: postData,
      }),
      invalidatesTags: ["Post"],
    }),
    deletePost: builder.mutation<TResponse<TPost>, string>({
      query: (postId) => ({
        url: `/post/${postId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Post"],
    }),
    upvotePost: builder.mutation<TResponse<TPost>, string>({
      query: (postId) => ({
        url: `/post/${postId}/upvote`,
        method: "POST",
      }),
    }),
    downvotePost: builder.mutation<TResponse<TPost>, string>({
      query: (postId) => ({
        url: `/post/${postId}/downvote`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetPostsQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useUpvotePostMutation,
  useDownvotePostMutation,
  useGetRandomPostsQuery,
} = postsApi;

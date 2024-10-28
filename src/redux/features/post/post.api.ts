import { baseApi } from "@/api/baseApi";
import {
  TCreateCommentRequest,
  TCreatePostRequest,
  TPost,
  TUpdatePostRequest,
} from "./post.type";
import { TQueryParams, TResponse } from "../types";

export const postsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyPosts: builder.query<TResponse<TPost[]>, TQueryParams[]>({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParams) => {
            params.append(item.name, item.value as string);
          });
        }

        return { url: "/post/my-posts", params: params };
      },
      providesTags: ["Post"],
    }),
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
      query: (postData) => ({
        url: `/post`,
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
    undoVotePost: builder.mutation<
      TResponse<TPost>,
      { postId: string; type: string }
    >({
      query: ({ postId, type }) => ({
        url: `/post/${postId}/undo-vote`,
        method: "POST",
        params: { type },
      }),
    }),
    getPostDetails: builder.query<TResponse<TPost>, string>({
      query: (postId) => ({
        url: `/post/${postId}/details`,
        method: "GET",
      }),
      providesTags: ["Post"],
    }),
    addComment: builder.mutation<TResponse<TPost>, TCreateCommentRequest>({
      query: (newComment) => ({
        url: "/comment",
        method: "POST",
        body: newComment,
      }),
      invalidatesTags: ["Post"],
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
  useUndoVotePostMutation,
  useGetPostDetailsQuery,
  useAddCommentMutation,
  useGetMyPostsQuery,
} = postsApi;

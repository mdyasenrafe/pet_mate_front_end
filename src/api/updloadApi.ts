import { baseApi } from "./baseApi";

const uploadApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fileUpload: builder.mutation({
      query: (payload) => ({
        url: "upload",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useFileUploadMutation } = uploadApi;

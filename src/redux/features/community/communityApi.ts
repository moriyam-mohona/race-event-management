/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../api/baseApi";

const communityApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get All My Community By User
    getAllMyCommunity: builder.query({
      query: (data) => {
        const params = new URLSearchParams();
        if (data?.queryObj) {
          data?.queryObj.forEach((item: any) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: `community/get-all-my-community`,
          method: "GET",
          params: params,
        };
      },
      providesTags: ["community"],
    }),
    // Get Single Community Details
    getSingleCommunity: builder.query({
      query: (id) => ({
        url: `/community/get-community/${id}`,
        method: "GET",
      }),
      providesTags: ["community"],
    }),
    //  Follow Or Unfollow A Community
    followOrUnfollowACommunity: builder.mutation({
      query: (id) => ({
        url: `community/follow-or-unfollow-community/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["community"],
    }),
    // Create Post On Community
    createPostOnCommunity: builder.mutation({
      query: (data) => ({
        url: `community/create-post`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["community"],
    }),
    // Get all Community Posts
    getAllCommunityPosts: builder.query({
      query: ({ queryObj, id }) => {
        const params = new URLSearchParams();
        if (queryObj) {
          queryObj.forEach((item: any) => {
            params.append(item.name, String(item.value));
          });
        }
        return {
          url: `community/get-all-post/${id}?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["community"],
    }),
    // Like or Unlike any post
    createLikeOnPost: builder.mutation({
      query: (id) => ({
        url: `community/give-or-remove-like/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["community"],
    }),
    // Get All Comments on any post
    getAllComments: builder.query({
      query: ({ queryObj, id }) => {
        const params = new URLSearchParams();
        if (queryObj) {
          queryObj.forEach((item: any) => {
            params.append(item.name, String(item.value));
          });
        }
        return {
          url: `community/get-all-comments/${id}?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["community"],
    }),

    // Create Comment on any post
    createCommentOnPost: builder.mutation({
      query: ({ data, id }) => ({
        url: `community/make-comment/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["community"],
    }),
    // Delete any post
    deletePost: builder.mutation({
      query: (id) => ({
        url: `community/delete-post/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["community"],
    }),
  }),
});

export const {
  useGetAllMyCommunityQuery,
  useGetSingleCommunityQuery,
  useFollowOrUnfollowACommunityMutation,
  useCreatePostOnCommunityMutation,
  useGetAllCommunityPostsQuery,
  useCreateLikeOnPostMutation,
  useGetAllCommentsQuery,
  useCreateCommentOnPostMutation,
  useDeletePostMutation,
} = communityApi;

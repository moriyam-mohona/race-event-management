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
  }),
});

export const {
  useGetAllMyCommunityQuery,
  useGetSingleCommunityQuery,
  useFollowOrUnfollowACommunityMutation,
} = communityApi;

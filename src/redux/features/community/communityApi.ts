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
  }),
});

export const { useGetAllMyCommunityQuery } = communityApi;

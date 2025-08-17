/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../api/baseApi";

const subscriberApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSubscriber: builder.query({
      query: (data) => {
        const params = new URLSearchParams();
        if (data?.queryObj) {
          data?.queryObj.forEach((item: any) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: `admin/get-all-subscriber`,
          method: "GET",
          params: params,
        };
      },
      providesTags: ["subscriber"],
    }),

    createSubscriber: builder.mutation({
      query: (data) => {
        return {
          url: "user/create-subscriber",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["subscriber"],
    }),
  }),
});

export const { useCreateSubscriberMutation, useGetAllSubscriberQuery } =
  subscriberApi;

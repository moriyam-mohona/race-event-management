/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../api/baseApi";

const eventApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get-all-approved-events-for-user ----> For landing page
    getAllApprovedEvents: builder.query({
      query: (data) => {
        const params = new URLSearchParams();
        if (data?.queryObj) {
          data?.queryObj.forEach((item: any) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: `event/get-all-approved-events-for-user`,
          method: "GET",
          params: params,
        };
      },
      providesTags: ["event"],
    }),
    getSingleEvent: builder.query({
      query: (id) => ({
        url: `admin/get-event-details-by-id/${id}`,
        method: "GET",
      }),
      providesTags: ["event"],
    }),
  }),
});

export const { useGetAllApprovedEventsQuery, useGetSingleEventQuery } =
  eventApi;

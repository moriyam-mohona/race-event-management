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
    // Bookmark any event
    addEventToSaved: builder.mutation({
      query: (id) => ({
        url: `event/add-or-remove-events-from-saved-list/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["event"],
    }),
    // Get All My Saved Events by user
    getAllSavedEvents: builder.query({
      query: (data) => {
        const params = new URLSearchParams();
        if (data?.queryObj) {
          data?.queryObj.forEach((item: any) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: `event/get-all-my-saved-events`,
          method: "GET",
          params: params,
        };
      },
      providesTags: ["event"],
    }),

    getAllMyRegisteredEvents: builder.query({
      query: (data) => {
        const params = new URLSearchParams();
        if (data?.queryObj) {
          data?.queryObj.forEach((item: any) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: `event/get-all-my-registered-events`,
          method: "GET",
          params: params,
        };
      },
      providesTags: ["event"],
    }),
    // Get all shared events for user
    getAllSharedEvents: builder.query({
      query: (data) => {
        const params = new URLSearchParams();
        if (data?.queryObj) {
          data?.queryObj.forEach((item: any) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: `event/get-all-share-events`,
          method: "GET",
          params: params,
        };
      },
      providesTags: ["event"],
    }),
  }),
});

export const {
  useGetAllApprovedEventsQuery,
  useGetSingleEventQuery,
  useAddEventToSavedMutation,
  useGetAllSavedEventsQuery,
  useGetAllSharedEventsQuery,
  useGetAllMyRegisteredEventsQuery,
} = eventApi;

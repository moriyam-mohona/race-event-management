/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../api/baseApi";

const vendorApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getVendorDashboardCardInfo: builder.query({
      query: () => {
        return {
          url: `vendor/get-vendor-dashboard-cards`,
          method: "GET",
        };
      },
      providesTags: ["vendor"],
    }),
    getVendorDashboardPieChartInfo: builder.query({
      query: () => {
        return {
          url: `vendor/get-race-report-pie-chart`,
          method: "GET",
        };
      },
      providesTags: ["vendor"],
    }),
    getVendorRevenuePerMonth: builder.query({
      query: () => {
        return {
          url: `vendor/get-vendor-revenue-per-month`,
          method: "GET",
        };
      },
      providesTags: ["vendor"],
    }),
    getAllEventsForVendor: builder.query({
      query: (data) => {
        const params = new URLSearchParams();
        if (data?.queryObj) {
          data?.queryObj.forEach((item: any) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: `event/get-all-events-for-vendor`,
          method: "GET",
          params: params,
        };
      },
      providesTags: ["vendor"],
    }),
    stopEventRegistration: builder.mutation<any, any>({
      query: ({ id, data }) => {
        return {
          url: `event/stop-event-registration/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["vendor"],
    }),
    getAllBookingByVendor: builder.query<any, any>({
      query: ({ id, data }) => {
        const params = new URLSearchParams();
        if (data?.queryObj) {
          data?.queryObj.forEach((item: any) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: `vendor/get-all-booking-events/${id}`,
          method: "GET",
          params: params,
        };
      },
      providesTags: ["vendor"],
    }),
    approveOrRejectBooking: builder.mutation<any, any>({
      query: ({ id, data }) => {
        return {
          url: `vendor/approve-or-reject-booking/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["vendor"],
    }),

    getAllBookingForVerify: builder.query<any, any>({
      query: ({ id, data }) => {
        const params = new URLSearchParams();
        if (data?.queryObj) {
          data?.queryObj.forEach((item: any) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: `vendor/get-all-shared-booking-events/${id}`,
          method: "GET",
          params: params,
        };
      },
      providesTags: ["vendor"],
    }),
    approveOrRejectSharedEvent: builder.mutation<any, any>({
      query: ({ id, data }) => {
        return {
          url: `vendor/approve-or-reject-shared-booking/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["vendor"],
    }),
  }),
});

export const {
  useGetVendorDashboardCardInfoQuery,
  useGetVendorDashboardPieChartInfoQuery,
  useGetVendorRevenuePerMonthQuery,
  useGetAllEventsForVendorQuery,
  useStopEventRegistrationMutation,
  useGetAllBookingByVendorQuery,
  useApproveOrRejectBookingMutation,
  useGetAllBookingForVerifyQuery,
  useApproveOrRejectSharedEventMutation,
} = vendorApi;

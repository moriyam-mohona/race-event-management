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
  }),
});

export const {
  useGetVendorDashboardCardInfoQuery,
  useGetVendorDashboardPieChartInfoQuery,
  useGetVendorRevenuePerMonthQuery,
} = vendorApi;

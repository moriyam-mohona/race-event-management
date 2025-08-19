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
  }),
});

export const { useGetVendorDashboardCardInfoQuery } = vendorApi;

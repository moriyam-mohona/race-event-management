/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../api/baseApi";

const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllVendors: builder.query({
      query: (data) => {
        const params = new URLSearchParams();
        if (data?.queryObj) {
          data?.queryObj.forEach((item: any) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: `admin/get-all-vendors`,
          method: "GET",
          params: params,
        };
      },
      providesTags: ["admin"],
    }),
    //     approve/reject vendor
    approveOrRejectVendor: builder.mutation({
      query: ({ data, id }) => ({
        url: `admin/approve-vendor/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["admin"],
    }),
    // Get all events by vendor
    getAllEventsByVendor: builder.query({
      query: ({
        id,
        queryObj,
      }: {
        id: string | number | undefined;
        queryObj?: any[];
      }) => {
        const params = new URLSearchParams();
        if (queryObj) {
          queryObj.forEach((item) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: `admin/get-all-events-for-admin-by-vendorId/${id}`,
          method: "GET",
          params,
        };
      },
      providesTags: ["admin"],
    }),
    // Get All Community
    getAllCommunityByAdmin: builder.query({
      query: (data) => {
        const params = new URLSearchParams();
        if (data?.queryObj) {
          data?.queryObj.forEach((item: any) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: `admin/get-all-community`,
          method: "GET",
          params: params,
        };
      },
      providesTags: ["admin"],
    }),
  }),
});

export const {
  useGetAllVendorsQuery,
  useApproveOrRejectVendorMutation,
  useGetAllEventsByVendorQuery,
  useGetAllCommunityByAdminQuery,
} = adminApi;

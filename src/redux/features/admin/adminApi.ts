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
  }),
});

export const { useGetAllVendorsQuery, useApproveOrRejectVendorMutation } =
  adminApi;

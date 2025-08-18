/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../api/baseApi";

const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get admin cards data for dashboard page
    getAdminCardsData: builder.query({
      query: () => ({
        url: `admin/get-race-report-for-admin`,
        method: "GET",
      }),
      providesTags: ["admin"],
    }),
    // Get admin revenue
    getAdminRevenue: builder.query({
      query: () => ({
        url: `admin/get-admin-revenue-per-month`,
        method: "GET",
      }),
      providesTags: ["admin"],
    }),
    // Get all vendors
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
    // Approve/reject vendor
    approveOrRejectVendor: builder.mutation({
      query: ({ data, id }) => ({
        url: `admin/approve-vendor/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["admin"],
    }),
    // Get all events of a  vendor
    getAllEventsOfVendor: builder.query({
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
    // Get all community titles for dropdown
    getAllCommunityTitles: builder.query({
      query: () => {
        return {
          url: `admin/get-community-titles-for-dropdown`,
          method: "GET",
        };
      },
      providesTags: ["admin"],
    }),
    // Get all members of any single community
    getAllMembersByCommunityId: builder.query({
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
          url: `admin/get-all-community-members/${id}`,
          method: "GET",
          params,
        };
      },
      providesTags: ["admin"],
    }),
    // Remove member form community
    removeMemberFromCommunity: builder.mutation({
      query: (id) => ({
        url: `admin/remove-from-the-community/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["admin"],
    }),
    // Pause a Member from community
    pauseMemberFromCommunity: builder.mutation({
      query: ({ id, data }) => ({
        url: `admin/pause-membership/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["admin"],
    }),
    // Get All Events By Admin
    getAllEventsByAdmin: builder.query({
      query: (data) => {
        const params = new URLSearchParams();
        if (data?.queryObj) {
          data?.queryObj.forEach((item: any) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: `admin/get-all-events-for-admin`,
          method: "GET",
          params: params,
        };
      },
      providesTags: ["admin"],
    }),
    // Approve or Reject Event
    approveOrRejectEvent: builder.mutation({
      query: ({ data, id }) => ({
        url: `admin/approve-events/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["admin"],
    }),
  }),
});

export const {
  useGetAdminRevenueQuery,
  useGetAdminCardsDataQuery,
  useGetAllVendorsQuery,
  useApproveOrRejectVendorMutation,
  useGetAllEventsOfVendorQuery,
  useGetAllCommunityByAdminQuery,
  useGetAllCommunityTitlesQuery,
  useGetAllMembersByCommunityIdQuery,
  useRemoveMemberFromCommunityMutation,
  usePauseMemberFromCommunityMutation,
  useGetAllEventsByAdminQuery,
  useApproveOrRejectEventMutation,
} = adminApi;

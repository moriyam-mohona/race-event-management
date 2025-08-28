/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../api/baseApi";

const chatApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get-user-list-for-chat
    getAllUserListForChat: builder.query({
      query: ({ id, data }) => {
        const params = new URLSearchParams();
        if (data?.queryObj) {
          data?.queryObj.forEach((item: any) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: `chat/get-user-list-for-chat/${id}`,
          method: "GET",
          params,
        };
      },
      providesTags: ["chat"],
    }),
    // Send Connection request
    sendConnectionRequest: builder.mutation({
      query: (id) => ({
        url: `chat/sent-connection-request/${id}`,
        method: "POST",
        // body: data,
      }),
      invalidatesTags: ["chat"],
    }),
    getAllConnectionRequest: builder.query({
      query: (data) => {
        const params = new URLSearchParams();
        if (data?.queryObj) {
          data?.queryObj.forEach((item: any) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: `chat/get-all-connection-request`,
          method: "GET",
          params,
        };
      },
      providesTags: ["chat"],
    }),
    // accept/reject connection request
    acceptOrRejectConnection: builder.mutation({
      query: (data) => ({
        url: `chat/respond-to-connection-request`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["chat"],
    }),
    getAllConversationList: builder.query({
      query: (data) => {
        const params = new URLSearchParams();
        if (data?.queryObj) {
          data?.queryObj.forEach((item: any) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: `chat/conversion-list`,
          method: "GET",
          params,
        };
      },
      providesTags: ["chat"],
    }),
    getAllCommunityList: builder.query({
      query: (data) => {
        const params = new URLSearchParams();
        if (data?.queryObj) {
          data?.queryObj.forEach((item: any) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: `chat/get-all-community-for-message`,
          method: "GET",
          params,
        };
      },
      providesTags: ["chat"],
    }),
    getSingleMessageByUser: builder.query({
      query: ({ data, id }) => {
        const params = new URLSearchParams();
        if (data?.queryObj) {
          data?.queryObj.forEach((item: any) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: `chat/get-single-message/${id}`,
          method: "GET",
          params,
        };
      },
      providesTags: ["chat"],
    }),
  }),
});

export const {
  useGetAllUserListForChatQuery,
  useSendConnectionRequestMutation,
  useGetAllConnectionRequestQuery,
  useAcceptOrRejectConnectionMutation,
  useGetAllConversationListQuery,
  useGetAllCommunityListQuery,
  useGetSingleMessageByUserQuery,
} = chatApi;

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
  }),
});

export const {
  useGetAllUserListForChatQuery,
  useSendConnectionRequestMutation,
} = chatApi;

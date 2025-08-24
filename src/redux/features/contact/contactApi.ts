import { baseApi } from "../../api/baseApi";

const contactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createContact: builder.mutation({
      query: (data) => {
        return {
          url: "user/create-support-message",
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});

export const { useCreateContactMutation } = contactApi;

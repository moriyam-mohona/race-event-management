import { baseApi } from "../../api/baseApi";

const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBooking: builder.mutation({
      query: (data) => {
        return {
          url: "payment/create-payment",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["booking"],
    }),
  }),
});

export const { useCreateBookingMutation } = bookingApi;

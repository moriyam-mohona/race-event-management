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
    getMyPaymentInfo: builder.query({
      query: (id) => {
        return {
          url: `payment/get-my-payment-info/${id}`,
          method: "GET",
        };
      },
      providesTags: ["booking"],
    }),
  }),
});

export const { useCreateBookingMutation, useGetMyPaymentInfoQuery } =
  bookingApi;

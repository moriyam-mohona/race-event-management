import {
  AddOnsState,
  BookingState,
  PaymentState,
  PersonalDetailsState,
  TicketState,
} from "@/types/Common";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


const initialState: BookingState = {
  currentStep: 1,
  ticket: {},
  personalDetails: {},
  addOns: {},
  payment: { stripeId: "" },
};

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    nextStep: (state) => {
      state.currentStep += 1;
    },
    prevStep: (state) => {
      state.currentStep -= 1;
    },
    setStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    setTicket: (state, action: PayloadAction<TicketState>) => {
      state.ticket = action.payload;
    },
    setPersonalDetails: (
      state,
      action: PayloadAction<PersonalDetailsState>
    ) => {
      state.personalDetails = action.payload;
    },
    setAddOns: (state, action: PayloadAction<AddOnsState>) => {
      state.addOns = action.payload;
    },
    setPayment: (state, action: PayloadAction<PaymentState>) => {
      state.payment = action.payload;
    },
    resetBooking: (state) => {
      state.currentStep = 1;
      state.ticket = {};
      state.personalDetails = {};
      state.addOns = {};
      state.payment = { stripeId: "" };
    },
  },
});

export const {
  nextStep,
  prevStep,
  setStep,
  setTicket,
  setPersonalDetails,
  setAddOns,
  setPayment,
  resetBooking,
} = bookingSlice.actions;

export default bookingSlice.reducer;

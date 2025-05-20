import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface TicketState {
  eventType?: string;
  distance?: string;
  date?: string;
  time?: string;
  price?: number;
  quantity?: number;
}

interface PersonalDetailsState {
  gender?: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  nationality?: string;
  email?: string;
  address?: string;
  continent?: string;
  country?: string;
  region?: string;
  zipCode?: string;
  phoneNumber?: string;
  emergencyContact?: string;
}

interface AddOnItem {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  quantity: number;
}

interface AddOnsState {
  selectedItems?: AddOnItem[];
}

interface PaymentState {
  paymentMethod?: string;
  cardName?: string;
  cardNumber?: string;
  cvv?: string;
  expiryDate?: string;
  agreeToTerms?: boolean;
  country?: string;
}

interface BookingState {
  currentStep: number;
  ticket: TicketState;
  personalDetails: PersonalDetailsState;
  addOns: AddOnsState;
  payment: PaymentState;
}

const initialState: BookingState = {
  currentStep: 1,
  ticket: {},
  personalDetails: {},
  addOns: {},
  payment: {},
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
      state.payment = {};
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

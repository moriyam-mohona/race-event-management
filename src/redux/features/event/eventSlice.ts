import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface GearItem {
  id: string;
  title: string;
  category: string;
  price: string;
  image?: string;
}
interface Faq {
  question: string;
  answer: string;
}

interface ImagePreview {
  file: File;
  preview: string;
}

export interface EventState {
  eventId: string | null;
  // Step 1: Event Details
  title: string;
  description: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  timezone: string;

  // Location
  continent: string;
  region: string;
  city: string;
  country: string;

  // Race Category
  category: string;
  event_type: string;
  venue: string;
  season: string;
  size: string;
  prize: string;

  // Race Data
  startAddress: string;
  finishAddress: string;
  distance: string;

  // Age Limit
  ageLimit: string;

  //faqs
  faqs: Faq[];
  images: ImagePreview[];
  // Step 2: Gear
  gearItems: GearItem[];

  // Step 3: Completed
  isCompleted: boolean;

  // Current step
  currentStep: number;
}

const initialState: EventState = {
  eventId: null,

  // Step 1: Event Details
  title: "",
  description: "",
  startDate: "",
  startTime: "",
  endDate: "",
  endTime: "",
  timezone: "",

  // Location
  continent: "",
  country: "",
  region: "",
  city: "",

  // Race Category
  category: "",
  event_type: "",
  venue: "",
  season: "",
  size: "",
  prize: "",

  // Race Data
  startAddress: "",
  finishAddress: "",
  distance: "",

  // Age Limit
  ageLimit: "",

  //faqs
  faqs: [],
  images: [],

  // Step 2: Gear
  gearItems: [],

  // Step 3: Completed
  isCompleted: false,

  // Current step
  currentStep: 1,
};

export const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    setEventDetails: (state, action: PayloadAction<Partial<EventState>>) => {
      return { ...state, ...action.payload };
    },
    addGearItem: (state, action: PayloadAction<GearItem>) => {
      state.gearItems.push(action.payload);
    },
    removeGearItem: (state, action: PayloadAction<string>) => {
      state.gearItems = state.gearItems.filter(
        (item) => item.id !== action.payload
      );
    },
    setEventId: (state, action: PayloadAction<string>) => {
      state.eventId = action.payload;
    },
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    nextStep: (state) => {
      state.currentStep += 1;
    },
    prevStep: (state) => {
      if (state.currentStep > 1) {
        state.currentStep -= 1;
      }
    },
    completeEvent: (state) => {
      state.isCompleted = true;
    },
    resetEvent: () => initialState,
  },
});

export const {
  setEventDetails,
  addGearItem,
  removeGearItem,
  setEventId,
  setCurrentStep,
  nextStep,
  prevStep,
  completeEvent,
  resetEvent,
} = eventSlice.actions;

export default eventSlice.reducer;

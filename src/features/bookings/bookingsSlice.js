// bookingsSlice.js

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { auth } from "../../firebase";

const BASE_URL =
  "https://9ed25687-f3d5-4e4a-803d-018a47ca64f5-00-164ouryxp6q4w.kirk.replit.dev";

// Async thunk for fetching a user's bookings
export const fetchBookingsbyUser = createAsyncThunk(
  "bookings/fetchByUser",
  async (userId) => {
    const response = await fetch(`${BASE_URL}/bookings/user/${userId}`);
    return response.json();
  }
);

export const submitBooking = createAsyncThunk(
  "bookings/submitBooking",
  async ({ customerName, email, description, date, hours, sportCategory, sportArea, currentUser }) => {
    return new Promise((resolve, reject) => {
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          const userId = user.uid;

          const data = {
            name: customerName,
            email: email,
            description: description,
            date: new Date(date).toISOString().split("T")[0],
            duration_hours: hours,
            sportCategory: sportCategory,
            sportArea: sportArea,
            user_uid: currentUser.uid
          };

          try {
            const response = await axios.post(`${BASE_URL}/bookings`, data);
            resolve(response.data);
          } catch (error) {
            reject(error);
          }

          console.log(`The type of user.uid:`, typeof userId);
        }
      });
    });
  }
);

export const deleteBooking = createAsyncThunk(
  "bookings/deleteBooking",
  async (bookingId) => {
    await axios.delete(`${BASE_URL}/delete/${bookingId}`);
    return bookingId;
  }
);

// Slice
const bookingsSlice = createSlice({
  name: "bookings",
  initialState: { bookings: [], loading: true },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBookingsbyUser.fulfilled, (state, action) => {
      state.bookings = action.payload;
      state.loading = false;
    });
    builder.addCase(submitBooking.fulfilled, (state, action) => {
      state.bookings.push(action.payload);
    });
    builder.addCase(deleteBooking.fulfilled, (state, action) => {
      state.bookings = state.bookings.filter(booking => booking.id !== action.payload);
    });
  },
});

export default bookingsSlice.reducer;

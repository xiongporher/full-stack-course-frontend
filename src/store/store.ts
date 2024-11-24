"use client";
// store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./counterSlice";

export const store = configureStore({
  reducer: { counter: counterSlice },
});

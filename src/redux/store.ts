import { configureStore } from "@reduxjs/toolkit";
import appSlice from "@/redux/appSlice";

export const store = configureStore({
  reducer: {
    easyquiz: appSlice,
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

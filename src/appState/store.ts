import { configureStore } from "@reduxjs/toolkit";
import cocktailsSlice from "./cocktails/cocktails.reducer";
import { useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    [cocktailsSlice.name]: cocktailsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector = useSelector.withTypes<RootState>()

import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./features/AuthSlice";

const store = configureStore({
  reducer: {
    Auth: AuthReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // This disables the serializable check
    }).concat(),
});

export default store;

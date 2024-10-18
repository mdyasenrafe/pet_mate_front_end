"use client";

import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import themeSlice from "./features/theme/themeSlice";
import storage from "redux-persist/lib/storage";
import authSlice from "./features/auth/authSlice";
import { baseApi } from "@/api/baseApi";

// Persist config for theme slice
const themePersistConfig = {
  key: "themeMode",
  storage,
};

const authPersistConfig = {
  key: "auth",
  storage,
};

const persistedAuthReducer = persistReducer(authPersistConfig, authSlice);
const persistedThemeReducer = persistReducer(themePersistConfig, themeSlice);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    themeMode: persistedThemeReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      baseApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);

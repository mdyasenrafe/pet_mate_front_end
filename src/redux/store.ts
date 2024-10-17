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

// Persist config for theme slice
const themePersistConfig = {
  key: "themeMode",
  storage,
};

const persistedThemeReducer = persistReducer(themePersistConfig, themeSlice);

export const store = configureStore({
  reducer: {
    themeMode: persistedThemeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);

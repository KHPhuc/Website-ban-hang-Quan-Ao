import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import Device from "./Device/Device";
import Sidebar from "./Admin/Sidebar/Sidebar";
import Auth from "./API/Auth/Auth";

const persistConfig = {
  key: "root",
  storage,
  whitelist: [],
};

const reducer = combineReducers({
  device: Device,
  sidebar: Sidebar,
  auth: Auth,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export const persistor = persistStore(store);

export default store;

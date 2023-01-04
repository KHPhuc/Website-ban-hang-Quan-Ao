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
import Header from "./Admin/Header/Header";

import ProductType from "./API/ProductType/ProductType";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const reducer = combineReducers({
  device: Device,
  sidebar: Sidebar,
  auth: Auth,
  header: Header,

  productType: ProductType,
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

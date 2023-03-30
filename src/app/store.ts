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
import Product from "./API/Product/Product";
import Promotion from "./API/Promotion/Promotion";
import Payment from "./API/Payment/Payment";
import Customer from "./API/Customer/Customer";
import Cart from "./API/Cart/Cart";
import Address from "./API/Address/Address";
import Order from "./API/Order/Order";
import Statistic from "./API/Statistic/Statistic";

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
  product: Product,
  promotion: Promotion,
  payment: Payment,
  customer: Customer,
  cart: Cart,
  address: Address,
  order: Order,
  statistic: Statistic,
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

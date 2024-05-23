import { configureStore } from "@reduxjs/toolkit";
import reduxReducer from "./reducers";

export const store = configureStore({reducer: {reduxStore: reduxReducer,},});

  
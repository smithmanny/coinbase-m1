import { combineReducers, configureStore } from "@reduxjs/toolkit";

import cart from "./reducers/cartReducer";
import user from "./reducers/userReducer";

const store = configureStore({
  reducer: combineReducers({ cart, user }),
});

export default store;

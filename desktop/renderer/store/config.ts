import { auth } from "./../utils/firebase";
import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";

import logger from "redux-logger";

import counterReducer from "./features/counterSlice";
import authReducer, { getCurrentUser } from "./features/authSlice";

const rootReducer = combineReducers({
  counter: counterReducer,
  auth: authReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(logger),
  devTools: process.env.NODE_ENV !== "production",
});

auth.onAuthStateChanged((user) => {
  console.log({ user });
  store.dispatch(getCurrentUser());
  if (user !== null && auth.currentUser !== null) {
    store.dispatch(getCurrentUserApps(auth.currentUser.uid));
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
function getCurrentUserApps(uid: string): any {
  throw new Error("Function not implemented.");
}

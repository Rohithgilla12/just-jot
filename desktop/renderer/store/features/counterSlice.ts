import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../config";

const sendCounterUpdate = (data: any) => {
  global.ipcRenderer.send("COUNTER_UPDATED", data);
};

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
      sendCounterUpdate(state.value);
    },
    decrement: (state) => {
      state.value -= 1;
      sendCounterUpdate(state.value);
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export const getCount = (state: RootState) => state.counter.value;

export default counterSlice.reducer;

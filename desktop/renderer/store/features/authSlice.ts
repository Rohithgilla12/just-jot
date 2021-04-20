import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../config";
import Router from "next/router";
import { supabase } from "../../utils/database";

interface AuthState {
  readonly loading: boolean;
  readonly user?: User;
}

interface User {
  readonly displayName: string;
  readonly email: string;
  readonly uid: string;
  readonly photoURL?: string;
}

const initialState: AuthState = {
  loading: false,
  user: undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = authSlice.actions;

export const logout = (): AppThunk => async (_dispatch, _getState) => {
  const { error } = await supabase.auth.signOut();
  console.log(error);
  Router.push("/");
};

// TODO: Complete the create user.
// export const createUser = (
//   displayName: string,
//   uid: string,
//   email: string
// ): AppThunk => async (dispatch, _getState) => {
//   const user: User = {
//     uid,
//     email,
//     displayName,
//   };
//   // await firestore.doc(`users/${uid}`).set(user);

//   dispatch(setUser(user));
//   Router.push("/app");
// };

export default authSlice.reducer;

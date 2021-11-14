import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../config";
import Router from "next/router";
import { supabase } from "../../utils/database";

interface AuthState {
  readonly loading: boolean;
  readonly user?: User;
}

// user {
//   id: '47e4b390-3d09-4b28-8c61-6a06ba25b960',
//   aud: 'authenticated',
//   role: 'authenticated',
//   email: 'sherlock@grr.la',
//   email_confirmed_at: '2021-11-13T20:56:33.871504Z',
//   phone: '',
//   confirmed_at: '2021-11-13T20:56:33.871504Z',
//   last_sign_in_at: '2021-11-14T12:37:33.662448Z',
//   app_metadata: { provider: 'email', providers: [ 'email' ] },
//   user_metadata: {},
//   identities: [],
//   created_at: '2021-11-13T20:56:33.865824Z',
//   updated_at: '2021-11-13T20:56:33.865824Z'
// }

interface User {
  readonly id: string;
  readonly email: string;
  readonly name?: string;
  readonly photoURL?: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
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

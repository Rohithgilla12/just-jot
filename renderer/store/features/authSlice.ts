import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../config";
import Router from "next/router";
import { auth, googleProvider, firestore } from "../../utils/firebase";

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

export const signUpWithEmail = (
  name: string,
  email: string,
  password: string
): AppThunk => async (dispatch, _getState) => {
  const user = await auth.createUserWithEmailAndPassword(email, password);
  const firebaseUser = user.user;
  // TODO: Send verification and stuff
  if (firebaseUser?.uid && firebaseUser.email) {
    dispatch(createUser(name, firebaseUser.uid, firebaseUser.email));
  }
};

export const loginWithEmail = (
  email: string,
  password: string
): AppThunk => async (dispatch, _getState) => {
  await auth.signInWithEmailAndPassword(email, password);
  dispatch(getCurrentUser());
  Router.push("/app");
};

export const login = (): AppThunk => (dispatch, _getState) => {
  auth.signInWithRedirect(googleProvider).then(() => {
    auth.getRedirectResult().then((result) => {
      const firebaseUser = result.user;
      if (
        firebaseUser != null &&
        firebaseUser.displayName &&
        firebaseUser.email
      ) {
        dispatch(
          createUser(
            firebaseUser.displayName,
            firebaseUser.uid,
            firebaseUser.email
          )
        );
      }
    });
  });
};

export const logout = (): AppThunk => async (_dispatch, _getState) => {
  await auth.signOut();
  Router.push("/");
};

export const createUser = (
  displayName: string,
  uid: string,
  email: string
): AppThunk => async (dispatch, _getState) => {
  const user: User = {
    uid,
    email,
    displayName,
  };
  await firestore.doc(`users/${uid}`).set(user);

  dispatch(setUser(user));
  Router.push("/app");
};

export const getCurrentUser = (): AppThunk => async (dispatch, _getState) => {
  const uid = auth.currentUser?.uid;
  if (uid) {
    const user = await firestore.doc(`users/${uid}`).get();
    if (user.exists) {
      const data = user.data() as User;
      dispatch(setUser(data));
    }
  }
};

export const selectUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;

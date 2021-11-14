import React from "react";
import { Provider } from "react-redux";
import { Auth } from "@supabase/ui";

import "../styles/globals.css";
import { store } from "../store/config";
import { supabase } from "../utils/database";

function MyApp({ Component, pageProps }: any) {
  return (
    <Provider store={store}>
      <Auth.UserContextProvider supabaseClient={supabase}>
        <React.Fragment>
          <Component {...pageProps} />
        </React.Fragment>
      </Auth.UserContextProvider>
    </Provider>
  );
}

export default MyApp;

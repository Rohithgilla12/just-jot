import { Auth } from "@supabase/ui";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch } from "react-redux";
import useSWR from "swr";
import { logout } from "../store/features/authSlice";
import { supabase } from "../utils/database";
import { fetcher } from "../utils/fetcher";
import { useEffect } from "react";

interface AuthenticationProps {}

export const Authentication: React.FC<AuthenticationProps> = ({}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, session } = Auth.useUser();

  const { data, error } = useSWR(
    session ? ["/api/getUser", session.access_token] : null,
    fetcher
  );

  if (error) {
    // todo: Handle it
  }

  if (user !== null) {
    // todo: set in redux store and supabse also please
    router.push("/app");
  }

  useEffect(() => {
    async function upsertData() {
      if (data) {
        const { data: insertedData, error: insertedError } = await supabase
          .from("User")
          .upsert([
            {
              id: data.id,
              email: data.email,
              createdAt: data.created_at,
              updatedAt: data.updated_at,
            },
          ]);
      }
    }
    upsertData();
  }, [data]);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "PASSWORD_RECOVERY") {
          //todo: when app matures, implement password recovery
        }
        if (event === "USER_UPDATED" || event === "SIGNED_IN") {
          // Send session to /api/auth route to set the auth cookie.
          // NOTE: this is only needed if you're doing SSR (getServerSideProps)!
          fetch("/api/auth", {
            method: "POST",
            headers: new Headers({ "Content-Type": "application/json" }),
            credentials: "same-origin",
            body: JSON.stringify({ event, session }),
          }).then((res) => res.json());
        }
      }
    );

    return () => {
      authListener.unsubscribe();
    };
  }, []);

  return (
    <div className="w-full h-screen bg-gray-300">
      {!user ? (
        <div className="flex flex-col">
          <div className="w-full h-1/2 flex justify-center items-center p-4">
            <Auth supabaseClient={supabase} />
          </div>
          <div className="w-full h-1/2 flex justify-center items-center p-4">
            Eaisest simple way to take notes with cross platform support.
          </div>
        </div>
      ) : (
        <div
          className="w-full h-full flex flex-col justify-center items-center p-4"
          style={{ minWidth: 250, maxWidth: 600, margin: "auto" }}
        >
          Redirecting to application page.
          <button
            className="btn-black w-full mt-12"
            onClick={async () => {
              dispatch(logout());
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

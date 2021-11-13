import { Auth } from "@supabase/ui";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../store/features/authSlice";
import { supabase } from "../utils/database";

interface AuthenticationProps {}

export const Authentication: React.FC<AuthenticationProps> = ({}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = Auth.useUser();
  if (user !== null) {
    router.push("/app");
  }

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

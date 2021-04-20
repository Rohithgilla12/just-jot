import React from "react";
import { Auth } from "@supabase/ui";

interface AppProps {}

const App: React.FC<AppProps> = ({}) => {
  const { user } = Auth.useUser();
  return (
    <div className="flex flex-row">
      <div className="w-1/3 h-full">Left bar</div>
      <div className="w-2/3 h-full ">Right bar</div>
    </div>
  );
};

export default App;

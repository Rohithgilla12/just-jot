import React, { useState } from "react";
import { Auth } from "@supabase/ui";
import Head from "next/head";
import { supabase } from "../utils/database";

interface AppProps {}

const App: React.FC<AppProps> = ({}) => {
  const { user } = Auth.useUser();
  const [note, setNote] = useState("");

  const addTodo = async (noteText) => {
    let note = noteText.trim();
    if (note.length) {
      let { data: todo, error } = await supabase
        .from("notes")
        .insert({ note, user_id: user.id })
        .single();
      console.log(todo);
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      <Head>
        <title>Just Jot | App</title>
      </Head>
      <div className="flex flex-row">
        <div className="w-1/3 h-full">Left bar</div>
        <div className="w-2/3 h-screen flex justify-center  flex-col">
          <textarea
            onChange={(event) => {
              setNote(event.target.value);
            }}
            className="w-5/6 rounded-md bg-gray-300 h-4/5 p-2 my-8 mx-2"
          ></textarea>
          <button
            onClick={() => addTodo(note)}
            className="bg-blue-500 w-5/6 hover:bg-blue-400 text-white font-bold py-2  my-4 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
          >
            Button
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default App;

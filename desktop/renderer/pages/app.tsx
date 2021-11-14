import React, { useState, useEffect } from "react";
import { Auth } from "@supabase/ui";
import Head from "next/head";
import { supabase } from "../utils/database";
import { useDispatch, useSelector } from "react-redux";
import { PrismaClient } from "@prisma/client";
import { fetchNotes } from "../store/features/noteSlice";
import { useRouter } from "next/router";

interface AppProps {
  notes: any[];
}

export async function getServerSideProps({ req }) {
  console.log("ServerSideProps");

  const { data: user, error: userError } =
    await supabase.auth.api.getUserByCookie(req);

  console.log(user);

  if (userError) {
    // todo: handle the case when status is 401 and we need to refresh the session
    // Maybe we can redirect to /api/refresh server side
    return {
      redirect: {
        destination: "/home",
        permanent: false,
      },
      props: {
        notes: [],
      },
    };
  }
  const { data: notes, error: notesError } = await supabase
    .from("Note")
    .select("*")
    .eq("user_id", user.id);

  console.log("Notes", notes);
  return {
    props: {
      notes: notes === null ? [] : notes,
    },
  };
}

const App: React.FC<AppProps> = ({ notes }) => {
  const { user } = Auth.useUser();
  const [note, setNote] = useState("");
  const router = useRouter();

  const dispatch = useDispatch();
  // Do we need this?
  // useEffect(() => {
  //   if (user) {
  //     dispatch(fetchNotes(user.id));
  //   } else {
  //     console.log(user);
  //   }
  // }, []);

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
        <div className="w-1/3 h-full">
          {notes.map((note) => (
            <div key={note.id}>{note.title ?? note.note}</div>
          ))}
        </div>
        <div className="w-2/3 h-screen flex justify-center  flex-col">
          <textarea
            onChange={(event) => {
              setNote(event.target.value);
            }}
            className="w-5/6 rounded-md bg-gray-300 h-4/5 p-2 my-8 mx-2"
          ></textarea>
          <button
            onClick={
              async () => {
                //  await supabase.auth.signOut();
                router.push("/");
              }
              // addTodo(note)
            }
            className="bg-blue-500 w-5/6 hover:bg-blue-400 text-white font-bold py-2  my-4 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
          >
            Logout
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default App;

import { Tab } from "@headlessui/react";
import { Auth } from "@supabase/ui";
import Head from "next/head";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { Note } from "../store/features/noteSlice";
import { supabase } from "../utils/database";

interface AppProps {
  notes: Note[];
}

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export async function getServerSideProps({ req }) {
  console.log("ServerSideProps");

  const { data: user, error: userError } =
    await supabase.auth.api.getUserByCookie(req);

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
    .eq("userId", user.id);

  var noteArray: Note[] = [];

  console.log(notes, notesError);
  notes.forEach((note) => {
    const currentNote = note as Note;
    noteArray.push(currentNote);
  });
  return {
    props: {
      notes: notes === null ? [] : noteArray,
    },
  };
}

const App: React.FC<AppProps> = ({ notes }) => {
  const { user } = Auth.useUser();
  const [note, setNote] = useState(
    "![GitHub Logo](https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png)"
  );

  const addTodo = async (noteText) => {
    let note = noteText.trim();
    if (note.length) {
      let { data: todo, error: todoError } = await supabase
        .from("notes")
        .insert({ content: note, userId: user.id })
        .single();
      console.log(todo);
      console.log(todoError);
    }
  };

  return (
    <React.Fragment>
      <Head>
        <title>Just Jot | App</title>
      </Head>
      <div className="flex flex-row">
        {/* <div className="w-full h-1/3">
          {notes.map((note) => (
            <div key={note.id}>{note.title ?? note.content}</div>
          ))}
        </div> */}
        <div className="w-full h-2/3 flex justify-center  flex-col">
          <Tab.Group>
            <Tab.List className="flex p-1 space-x-1 bg-blue-900/20 rounded-xl">
              <Tab
                className={({ selected }) =>
                  classNames(
                    "w-full py-2.5 text-sm leading-5 font-medium text-green-100 rounded-lg",
                    "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60",
                    selected
                      ? "bg-gray-700 shadow"
                      : "text-blue-100 hover:bg-white/[0.12] hover:text-green-300"
                  )
                }
              >
                Content
              </Tab>
              <Tab
                className={({ selected }) =>
                  classNames(
                    "w-full py-2.5 text-sm leading-5 font-medium text-green-100 rounded-lg",
                    "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60",
                    selected
                      ? "bg-gray-700 shadow"
                      : "text-blue-100 hover:bg-white/[0.12] hover:text-green-300"
                  )
                }
              >
                Preview
              </Tab>
            </Tab.List>
            <Tab.Panels className="mt-2">
              <Tab.Panel
                className={classNames(
                  "bg-white rounded-xl p-3",
                  "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60"
                )}
              >
                <textarea
                  value={note}
                  onChange={(event) => {
                    setNote(event.target.value);
                  }}
                  className="w-full rounded-md h-80"
                ></textarea>
              </Tab.Panel>
              <Tab.Panel
                className={classNames(
                  "bg-white rounded-xl p-3",
                  "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60"
                )}
              >
                <article className="prose lg:prose-xl">
                  <ReactMarkdown
                    children={note}
                    rehypePlugins={[rehypeRaw]}
                    remarkPlugins={[remarkGfm]}
                  />
                </article>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>

          <button
            onClick={async () => {
              await addTodo(note);
            }}
            className="bg-blue-500 w-5/6 hover:bg-blue-400 text-white font-bold py-2  my-4 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default App;

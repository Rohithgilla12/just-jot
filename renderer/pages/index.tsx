import { useEffect } from "react";
import Link from "next/link";
import { Provider } from "react-redux";

import Layout from "../components/Layout";
import { store } from "../store/config";
import { Counter } from "../components/Counter";

const IndexPage = () => {
  useEffect(() => {
    // add a listener to 'message' channel
    global.ipcRenderer.addListener("message", (_event, args) => {
      alert(args);
    });
  }, []);

  const onSayHiClick = () => {
    global.ipcRenderer.send("message", "hi from next");
  };

  return (
    <Provider store={store}>
      <Layout title="Home | Next.js + TypeScript + Electron Example">
        <h1>Hello Next.js 👋</h1>
        <Counter />
        <button onClick={onSayHiClick}>Say hi to electron</button>
        <p>
          <Link href="/menubar">
            <a>Menubar</a>
          </Link>
        </p>
      </Layout>
    </Provider>
  );
};

export default IndexPage;

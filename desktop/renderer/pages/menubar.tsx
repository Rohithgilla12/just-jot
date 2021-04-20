import { useEffect, useState } from "react";
import Layout from "../components/Layout";

const AboutPage = () => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    global.ipcRenderer.on("INITIALIZE_COUNTER", (_event, counter) => {
      setCounter(counter);
    });
  }, []);
  return (
    <Layout title="About | Next.js + TypeScript + Electron Example">
      <p>Hello this is just me testing menubar {counter} </p>
    </Layout>
  );
};

export default AboutPage;

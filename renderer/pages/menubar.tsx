import { Provider } from "react-redux";
import { Counter } from "../components/Counter";
import Layout from "../components/Layout";
import { store } from "../store/config";

const AboutPage = () => {
  return (
    <Provider store={store}>
      <Layout title="About | Next.js + TypeScript + Electron Example">
        <Counter />
      </Layout>
    </Provider>
  );
};

export default AboutPage;

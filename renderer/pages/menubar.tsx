import Link from "next/link";
import Layout from "../components/Layout";

const AboutPage = () => (
  <Layout title="About | Next.js + TypeScript + Electron Example">
    <p>
      <Link href="/">
        <a>This is Menubar</a>
      </Link>
    </p>
  </Layout>
);

export default AboutPage;

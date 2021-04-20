import React from "react";
import Head from "next/head";
import Link from "next/link";
import { Authentication } from "../components/Authentication";

function Home() {
  return (
    <React.Fragment>
      <Authentication />
    </React.Fragment>
  );
}

export default Home;

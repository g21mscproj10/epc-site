import React, { ReactNode } from "react";
import Head from "next/head";
import Link from "next/link";
import Footer from "./footer";

type Props = {
  children: ReactNode;
  title?: string;
};

export default function Layout({
  children,
  title = "MSc Proj Test App",
}: Props) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>{children}</main>

      <footer>
        <Footer />
      </footer>
    </>
  );
}

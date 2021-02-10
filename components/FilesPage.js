import React from "react";
import Head from "next/head";
import "../styles/main.scss";

const FilesPage = ({ children }) => {
  return (
    <div className="files-page flex flex-auto items-center justify-center">
      <Head>
        <title>Snackable - File browser</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
    </div>
  );
};

export default FilesPage;

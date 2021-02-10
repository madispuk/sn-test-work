import React from "react";
import Router from "next/router";

const Index = () => <div />;

Index.getInitialProps = async ({ res, req }) => {
  if (res) {
    res.writeHead(302, {
      Location: "/files"
    });
    res.end();
  } else {
    Router.push("/files");
  }
  return {};
};

export default Index;

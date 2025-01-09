import React from "react";
import Layout from "../components/Layout";

export const withRootLayout = (Component) => {
  return (props) => {
    return (
      <Layout>
        <Component {...props} />
      </Layout>
    );
  };
};

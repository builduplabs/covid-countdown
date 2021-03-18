import React, { useState, useEffect } from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";
import RiskMatrix from "../containers/risk_matrix";

const Matrix = () => {
  const [state, setState] = useState({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);

      const color = urlParams.get("color") || "black";
      const background = urlParams.get("bg") || "white";
      const urlTitle = urlParams.get("title") || null;
      const animate = urlParams.get("animate") || null;
      const title = urlTitle
        ? `Covid Countdown | ${urlTitle}`
        : "Covid Countdown";
      const url = window.location.href;

      console.log("urlTitle ? ", urlTitle);
      console.log("title = ", title);

      setState({ color, background, title, urlTitle, url, animate });
    }
  }, []);

  const { color, background, title, animate, urlTitle } = state;

  return (
    <Layout key={title} share color={color} background={background}>
      <SEO title={title} />
      <div className="h-screen w-full flex flex-col">
        <div
          className={`w-full flex flex-col h-full justify-center animate__fadeIn ${
            animate ? "animate__animated" : ""
          }`}
        >
          {urlTitle ? (
            <h1
              style={{ fontSize: "min(7vw, 12vh, 55px)" }}
              className={`${color} text-center font-bold py-1 px-4 leading-tight`}
            >
              {urlTitle}
            </h1>
          ) : null}
          <div
            className={`my-8 w-full flex flex-1 flex-row justify-around items-center ${
              urlTitle && "sm:flex-none"
            }`}
          >
            <RiskMatrix share />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Matrix;

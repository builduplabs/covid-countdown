import React, { useState, useEffect } from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";
import RiskMatrix from "../containers/risk_matrix";

const INDIVIDUAL_COLORS = ["black", "white"];

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

  const { color, background, title, animate, urlTitle, url } = state;

  const textColor =
    INDIVIDUAL_COLORS.indexOf(color) !== -1
      ? `text-${color}`
      : `text-${color}-700`;

  const buttonText =
    INDIVIDUAL_COLORS.indexOf(background) !== -1
      ? `${background}`
      : `${background}-700`;
  const buttonBackground =
    INDIVIDUAL_COLORS.indexOf(color) !== -1 ? `${color}` : `${color}-700`;

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
              className={`${textColor} text-center font-bold py-1 px-4 leading-tight`}
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
          <div className="flex flex-col xxs:flex-row pt-6 justify-center items-center text-center mb-8 xxs:px-2 px-8 animate__fadeIn animate__animated">
            <a
              href="https://covidcountdown.today/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: "min(4vw, 5vh, 17px)" }}
              className={`flex items-center justify-center h-full w-full xs:w-auto focus:outline-none border font-bold hover:border-${buttonBackground} border-${buttonText} text-${buttonText} bg-${buttonBackground} hover:text-${buttonBackground} hover:bg-${buttonText} py-2 px-2 xs:px-4 xxs:mx-2 mx-0 xs:mx-2 my-1 xxs:my-0`}
            >
              Criar a minha matriz
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: "min(4vw, 5vh, 17px)" }}
              className={`flex items-center justify-center h-full w-full xs:w-auto focus:outline-none border font-bold hover:border-${buttonBackground} border-${buttonText} text-${buttonText} bg-${buttonBackground} hover:text-${buttonBackground} hover:bg-${buttonText} py-2 px-2 xs:px-4 xxs:mx-2 mx-0 xs:mx-2 my-1 xxs:my-0 hidden xs:flex`}
            >
              Partilhar Facebook
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${url}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: "min(4vw, 5vh, 17px)" }}
              className={`flex items-center justify-center h-full w-full xs:w-auto focus:outline-none border font-bold hover:border-${buttonBackground} border-${buttonText} text-${buttonText} bg-${buttonBackground} hover:text-${buttonBackground} hover:bg-${buttonText} py-2 px-2 xs:px-4 xxs:mx-2 mx-0 xs:mx-2 my-1 xxs:my-0 hidden xs:flex`}
            >
              Partilhar Twitter
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Matrix;

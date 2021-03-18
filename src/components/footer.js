import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import moment from "moment";

function Footer() {
  const {
    allDataUpdates: [
      {
        fields: { modifiedMs },
      },
    ],
  } = useStaticQuery(graphql`
    query {
      allDataUpdates {
        ... on QuadranteCsv {
          fields {
            modifiedMs
          }
        }
        ... on PredictionCsv {
          fields {
            modifiedMs
          }
        }
      }
    }
  `);

  const lastUpdateDate = modifiedMs;

  return (
    <footer className="bg-accent">
      <nav className="flex flex-col max-w-5xl py-3 sm:py-6 px-4 sm:px-12 mx-auto text-xs text-white font-thin">
        <div className="w-full flex flex-col items-center">
          <a
            href="https://covid.who-cares.pt/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className="w-24 h-auto mb-6"
              src="../../images/whocares_logo.png"
              alt="Who Cares"
            />
          </a>
          <p className="text-center">
            Este contador foi criado com agilidade e boa vontade pela equipa de
            Data Science da{" "}
            <a
              className="font-bold hover:underline"
              href="https://www.comon.pt/"
              target="_blank"
              rel="noopener noreferrer"
            >
              COMON
            </a>{" "}
            no âmbito do projeto{" "}
            <a
              className="font-bold hover:underline"
              href="https://covid.who-cares.pt/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Who Cares
            </a>
            , cuja missão é aumentar a empatia no marketing através de estudos,
            conteúdos e eventos. Desde março que funciona como comunidade
            digital onde gestores e marketeers partilham conhecimento sobre o
            impacto da COVID-19 nas marcas e no comportamento do consumidor.{" "}
            <a
              className="underline font-bold block"
              href="https://covid.who-cares.pt/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Clique aqui para aderir à comunidade.
            </a>
          </p>
        </div>
        <div className="flex flex-1 flex-col md:flex-row w-full justify-between mt-8">
          <div className="hidden sm:block flex-1 space-x-3 items-center text-center md:text-left py-1">
            Última atualização:
            <div className="font-bold inline ml-1">
              {` ${moment(lastUpdateDate).format("HH:mm DD/MM")}`}
            </div>
          </div>
          <div className="flex-1 flex flex-col text-center py-1">
            <a
              className="hover:underline"
              href="https://www.comon.pt/"
              target="_blank"
              rel="noopener noreferrer"
            >
              COMON
            </a>
          </div>
          <a
            className="flex-1 text-center md:text-right py-1 hover:underline"
            href="mailto:whocares@comon.pt"
          >
            whocares@comon.pt
          </a>
          <div className="block sm:hidden flex-1 space-x-3 items-center text-center md:text-left py-1">
            Última atualização:
            <div className="font-bold inline ml-1">
              {` ${moment(lastUpdateDate).format("HH:mm DD/MM")}`}
            </div>
          </div>
        </div>
      </nav>
    </footer>
  );
}

export default Footer;

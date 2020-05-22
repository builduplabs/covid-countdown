import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import moment from 'moment';

function Footer() {
  const {
    allFile: { edges },
  } = useStaticQuery(graphql`
    query {
      allFile(filter: { name: { eq: "prediction" } }) {
        edges {
          node {
            modifiedTime
            name
          }
        }
      }
    }
  `);

  const lastUpdateDate = edges[0].node.modifiedTime;

  return (
    <footer className="bg-black">
      <nav className="flex flex-col max-w-5xl py-3 sm:py-6 px-4 sm:px-12 mx-auto text-xs text-white font-thin">
        <div className="w-full flex flex-col items-center">
          <a href="http://comon.pt/" target="_blank" rel="noopener noreferrer">
            <img
              className="w-16 h-auto mb-8"
              src="../../images/comon_logo.png"
              alt="COMON"
            />
          </a>
          <p className="text-center">
            Este contador foi criado com agilidade e boa vontade pela equipa de
            Data Science da COMON, uma agência independente que quebra
            diariamente as fronteiras entre criatividade, estratégia e
            tecnologia. Ajudamos diariamente todo o tipo de empresas a desenhar
            e desenvolver soluções de marketing verdadeiramente integradas, que
            vão do início ao fim da user journey. Para consultoria estratégica
            mais específica sobre como responder à COVID-19, entre em contato
            através deste{' '}
            <a
              className="underline"
              href="http://bit.ly/empathysession"
              rel="noopener noreferrer"
              target="_blank"
            >
              formulário
            </a>
            .
          </p>
        </div>
        <div className="flex flex-1 flex-col md:flex-row w-full justify-between mt-8">
          <div className="hidden sm:block flex-1 space-x-3 items-center text-center md:text-left py-1">
            Última atualização:
            <div className="font-bold inline ml-1">
              {` ${moment(lastUpdateDate).format('HH:mm DD/MM')}`}
            </div>
          </div>
          <div className="flex-1 flex flex-col text-center py-1">
            <a
              className="pb-2"
              href="http://comon.pt/"
              target="_blank"
              rel="noopener noreferrer"
            >
              COMON
            </a>
            <a href="mailto:marketing@comon.pt">marketing@comon.pt</a>
          </div>
          <a
            className="flex-1 text-center md:text-right py-1"
            href="https://github.com/builduplabs/covid-countdown"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
          <div className="block sm:hidden flex-1 space-x-3 items-center text-center md:text-left py-1">
            Última atualização:
            <div className="font-bold inline ml-1">
              {` ${moment(lastUpdateDate).format('HH:mm DD/MM')}`}
            </div>
          </div>
        </div>
      </nav>
    </footer>
  );
}

export default Footer;

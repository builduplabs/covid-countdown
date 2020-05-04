import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import moment from 'moment';

function Footer() {
  const {
    allFile: { edges },
  } = useStaticQuery(graphql`
    query {
      allFile(filter: { name: { eq: "previsao_covid_portugal" } }) {
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
    <footer className="bg-gray-700">
      <nav className="flex justify-between max-w-5xl p-1 mx-auto text-sm">
        <p className="flex text-gray-400 hover:text-gray-100 text-xs items-center">
          Última atualização:
          <p className="font-bold inline ml-1">
            {` ${moment(lastUpdateDate).format('HH:mm DD/MM')}`}
          </p>
        </p>

        <p className="text-gray-400 hover:text-gray-100">
          <a
            className="font-bold no-underline text-xs"
            href="https://github.com/taylorbryant/gatsby-starter-tailwind"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </p>
      </nav>
    </footer>
  );
}

export default Footer;

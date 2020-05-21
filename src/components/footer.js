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
      <nav className="flex justify-between max-w-5xl py-3 sm:py-6 px-4 sm:px-12 mx-auto text-sm">
        <div className="flex text-white text-xs items-center">
          Última atualização:
          <div className="font-bold inline ml-1">
            {` ${moment(lastUpdateDate).format('HH:mm DD/MM')}`}
          </div>
        </div>

        <p className="text-white">
          <a
            className="font-bold no-underline text-xs"
            href="https://github.com/builduplabs/covid-countdown"
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

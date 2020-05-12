import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

function Footer({ color }) {
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
    <footer className="absolute inset-x-0 bottom-0">
      <nav className="flex justify-between max-w-5xl py-2 px-2 mx-auto text-sm">
        <div className={`flex text-${color}-700 text-xs items-center`}>
          Atualização:
          <div className="font-bold inline ml-1">
            {` ${moment(lastUpdateDate).format('HH:mm DD/MM')}`}
          </div>
        </div>

        <p className={`text-${color}-700`}>
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

Footer.propTypes = {
  color: PropTypes.string,
};

export default Footer;

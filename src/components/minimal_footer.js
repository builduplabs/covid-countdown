import React from 'react';
import PropTypes from 'prop-types';

function Footer({ color }) {
  return (
    <footer className="absolute inset-x-0 bottom-0">
      <nav className="flex justify-between max-w-5xl py-2 px-2 mx-auto text-sm">
        <div />

        <p style={{ fontSize: 'min(2.5vw, 4vh, 12px)' }} className={`${color}`}>
          <a
            className={`font-bold no-underline`}
            href="https://covidcountdown.today/"
            target="_blank"
            rel="noopener noreferrer"
          >
            covidcountdown.today
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

import PropTypes from 'prop-types';
import React from 'react';

// import Header from './header';
import Footer from './footer';
// import MinimalFooter from './minimal_footer';

const INDIVIDUAL_COLORS = ['black', 'white'];

function Layout({ children, share, background }) {
  let backgroundColor = 'bg-background';
  if (background) {
    backgroundColor =
      INDIVIDUAL_COLORS.indexOf(background) !== -1
        ? `bg-${background}`
        : `bg-${background}-500`;
  }
  // const textColor =
  //   INDIVIDUAL_COLORS.indexOf(color) !== -1
  //     ? `text-${color}`
  //     : `text-${color}-700`;
  return (
    <div
      className={`flex flex-col min-h-screen font-montserrat text-gray-900 ${backgroundColor}`}
    >
      {/* <Header /> */}

      <main
        className={`flex flex-1 flex-col w-full h-full max-w-5xl mx-auto md:px-8 ${
          !share && 'px-4'
        }`}
      >
        {children}
      </main>

      {!share && <Footer />}
      {/* {share ? <MinimalFooter color={textColor} /> : <Footer />} */}
    </div>
  );
}

Layout.defaultProps = {
  share: false,
  background: 'white',
};

Layout.propTypes = {
  background: PropTypes.string,
  color: PropTypes.string,
  share: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default Layout;

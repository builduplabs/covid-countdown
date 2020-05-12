import PropTypes from 'prop-types';
import React from 'react';

// import Header from './header';
import Footer from './footer';
import MinimalFooter from './minimal_footer';

const INDIVIDUAL_COLORS = ['black', 'white'];

function Layout({ children, share, color, background }) {
  const backgroundColor =
    INDIVIDUAL_COLORS.indexOf(background) !== -1
      ? `bg-${background}`
      : `bg-${background}-200`;
  return (
    <div
      className={`flex flex-col min-h-screen font-sans text-gray-900 ${backgroundColor}`}
    >
      {/* <Header /> */}

      <main className="flex flex-1 flex-col w-full h-full max-w-5xl px-4 mx-auto md:px-8">
        {children}
      </main>

      {share ? <MinimalFooter color={color} /> : <Footer />}
    </div>
  );
}

Layout.defaultProps = {
  background: 'white',
};

Layout.propTypes = {
  background: PropTypes.string,
  color: PropTypes.string,
  share: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export default Layout;

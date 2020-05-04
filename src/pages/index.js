import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Countdown from '../containers/countdown';

function IndexPage() {
  return (
    <Layout>
      <SEO
        keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
        title="Home"
      />
      <div className="w-full flex flex-col justify-center">
        <Countdown />
      </div>
    </Layout>
  );
}

export default IndexPage;

import React from 'react';
import moment from 'moment';
import 'moment/locale/pt';
import 'animate.css';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Countdown from '../containers/countdown';

function Share() {
  moment.locale('pt');
  const urlParams = new URLSearchParams(window.location.search);
  const color = urlParams.get('color') || 'gray';
  const background = urlParams.get('bg') || 'white';
  const urlTitle = urlParams.get('title') || null;
  const title = urlTitle ? `Covid Countdown | ${urlTitle}` : 'Covid Countdown';
  return (
    <Layout share color={color} background={background}>
      <SEO
        title={title}
        keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
      />
      <div className="h-screen w-full flex flex-col justify-center">
        <Countdown title={urlTitle} color={color} />
      </div>
    </Layout>
  );
}

export default Share;

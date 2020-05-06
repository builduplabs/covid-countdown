import React from 'react';
import moment from 'moment';
import 'moment/locale/pt';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Countdown from '../containers/countdown';
import Graph from '../containers/graph';

function IndexPage() {
  moment.locale('pt');
  return (
    <Layout>
      <SEO keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]} />
      <div className="h-screen w-full flex flex-col justify-center">
        <Countdown />
      </div>
      <div className="w-full flex flex-col justify-center">
        <Graph />
      </div>
      <div className="w-full flex flex-col justify-center py-16">
        <h2 className="text-3xl text-gray-600 text-center py-2 px-4">Título</h2>
        <p className="text-base text-gray-800 text-justify px-4">
          Culpa ullamco esse minim velit consectetur nisi eiusmod commodo
          nostrud do ea ullamco aliquip ad. Dolore qui dolor eiusmod minim ea
          minim et ex anim exercitation sit nulla mollit ad. Qui velit ullamco
          do id deserunt dolore amet est velit velit reprehenderit consectetur
          aliquip.
        </p>
      </div>
      <div className="w-full flex flex-col sm:flex-row justify-center pb-16 px-4 sm:px-0">
        <div className="w-full flex flex-col justify-center py-4 sm:py-0">
          <h2 className="text-3xl text-gray-600 text-center py-2 px-4">
            Título
          </h2>
          <p className="text-base text-gray-800 text-justify px-4">
            Culpa ullamco esse minim velit consectetur nisi eiusmod commodo
            nostrud do ea ullamco aliquip ad. Dolore qui dolor eiusmod minim ea
            minim et ex anim exercitation sit nulla mollit ad. Qui velit ullamco
            do id deserunt dolore amet est velit velit reprehenderit consectetur
            aliquip.
          </p>
        </div>
        <div className="w-full flex flex-col justify-center py-4 sm:py-0">
          <h2 className="text-3xl text-gray-600 text-center py-2 px-4">
            Título
          </h2>
          <p className="text-base text-gray-800 text-justify px-4">
            Culpa ullamco esse minim velit consectetur nisi eiusmod commodo
            nostrud do ea ullamco aliquip ad. Dolore qui dolor eiusmod minim ea
            minim et ex anim exercitation sit nulla mollit ad. Qui velit ullamco
            do id deserunt dolore amet est velit velit reprehenderit consectetur
            aliquip.
          </p>
        </div>
        <div className="w-full flex flex-col justify-center py-4 sm:py-0">
          <h2 className="text-3xl text-gray-600 text-center py-2 px-4">
            Título
          </h2>
          <p className="text-base text-gray-800 text-justify px-4">
            Culpa ullamco esse minim velit consectetur nisi eiusmod commodo
            nostrud do ea ullamco aliquip ad. Dolore qui dolor eiusmod minim ea
            minim et ex anim exercitation sit nulla mollit ad. Qui velit ullamco
            do id deserunt dolore amet est velit velit reprehenderit consectetur
            aliquip.
          </p>
        </div>
      </div>
    </Layout>
  );
}

export default IndexPage;

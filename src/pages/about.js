import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';

function AboutPage() {
  return (
    <Layout>
      <SEO
        keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
        title="About"
      />

      <section className="flex flex-col items-center md:flex-row">
        <div className="md:w-2/3 md:mr-8">
          <blockquote className="pl-4 font-serif leading-loose text-justify border-l-4 border-gray-900">
            Reprehenderit amet qui voluptate cillum consequat sit quis fugiat id
            minim. Deserunt nulla dolore nostrud ut consectetur ipsum laborum
            labore voluptate enim adipisicing. Fugiat non in ullamco qui sit.
            Nulla ad est aute anim sit cillum consectetur cillum ea. Mollit ea
            irure sint ut amet esse incididunt proident. Minim anim culpa ipsum
            officia adipisicing reprehenderit dolor id ex minim.
          </blockquote>

          <cite className="block mt-4 text-xs font-bold text-right uppercase">
            – COMON Group
          </cite>
        </div>
      </section>
    </Layout>
  );
}

export default AboutPage;

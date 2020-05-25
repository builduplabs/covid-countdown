import React, { Component } from 'react';
import moment from 'moment';
import 'moment/locale/pt';
import 'animate.css';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Countdown from '../containers/countdown';

class Share extends Component {
  state = {
    color: 'black',
    background: 'white',
    title: '',
    urlTitle: 'Covid Countdown',
  };

  componentDidMount() {
    moment.locale('pt');

    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const color = urlParams.get('color') || 'black';
      const background = urlParams.get('bg') || 'white';
      const urlTitle = urlParams.get('title') || null;
      const title = urlTitle
        ? `Covid Countdown | ${urlTitle}`
        : 'Covid Countdown';

      this.setState({ color, background, title, urlTitle });
    }
  }

  render() {
    const { color, background, title, urlTitle } = this.state;
    console.log(background);

    return (
      <Layout key={title} share color={color} background={background}>
        <SEO title={title} />
        <div className="h-screen w-full flex flex-col justify-center">
          <Countdown
            key={title}
            title={urlTitle}
            color={color}
            background={background}
            share
          />
        </div>
      </Layout>
    );
  }
}

export default Share;

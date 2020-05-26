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
    url: 'https://covidcountdown.today/',
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
      const url = window.location.href;

      this.setState({ color, background, title, urlTitle, url });
    }
  }

  render() {
    const { color, background, title, urlTitle, url } = this.state;

    return (
      <Layout key={title} share color={color} background={background}>
        <SEO title={title} />
        <div className="h-screen w-full flex flex-col justify-center">
          <Countdown
            key={title}
            title={urlTitle}
            color={color}
            background={background}
            url={url}
            share
          />
        </div>
      </Layout>
    );
  }
}

export default Share;

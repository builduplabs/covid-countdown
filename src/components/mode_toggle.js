import React, { Component } from 'react';

class ModeToggle extends Component {
  state = {
    mode: 'light',
  };

  componentDidMount() {
    if (typeof window !== 'undefined') {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        this.toggleMode();
      }
    }
  }

  toggleMode = () => {
    console.log('toggleMode');
    const { mode } = this.state;
    switch (mode) {
      case 'light':
        this.setState({ mode: 'dark' }, () => {
          document.getElementsByTagName('body')[0].style.filter =
            'invert(100%)';
        });
        break;
      default:
        this.setState({ mode: 'light' }, () => {
          document.getElementsByTagName('body')[0].style.filter = 'invert(0%)';
        });
        break;
    }
  };

  render() {
    return (
      <button
        onClick={this.toggleMode}
        className="fixed right-0 top-0 m-4 outline-none w-8 h-8"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64"
          aria-labelledby="title"
          aria-describedby="desc"
          role="img"
        >
          <title>Dark/Light Toggle</title>
          <path
            data-name="layer1"
            d="M47.5 32.4a14 14 0 0 1-16.8 17.2"
            fill="none"
            stroke="#202020"
            strokeMiterlimit="10"
            strokeWidth="4"
            strokeLinejoin="round"
            strokeLinecap="round"
          ></path>
          <path
            data-name="layer2"
            d="M24.1 45.9a14 14 0 0 1 19.8-19.8M34 6v8M12 36H4m8-22l7 7"
            fill="none"
            stroke="#202020"
            strokeMiterlimit="10"
            strokeWidth="4"
            strokeLinejoin="round"
            strokeLinecap="round"
          ></path>
          <path
            data-name="layer1"
            fill="none"
            stroke="#202020"
            strokeMiterlimit="10"
            strokeWidth="4"
            d="M55 15L13 57"
            strokeLinejoin="round"
            strokeLinecap="round"
          ></path>
        </svg>
      </button>
    );
  }
}

export default ModeToggle;

import React from 'react';
import PropTypes from 'prop-types';

const addZero = (value) => (value < 10 ? `0${value}` : value);

const INDIVIDUAL_COLORS = ['black', 'white'];
const SEQUENCE = true;

const Block = ({ value, type, index, animate, color }) => {
  let name = type;

  if ((type === 'dias' || type === 'horas') && value === 1) {
    name = type.slice(0, -1);
  }
  if (type === 'meses' && value === 1) {
    name = 'mês';
  }

  return (
    <div
      className={`${color} py-1 flex-1 flex items-center flex-col animate__fadeIn animate__delay-${
        SEQUENCE ? index : 1
      }s ${animate && 'animate__animated'}`}
    >
      <p
        style={{ fontSize: 'min(10vw, 16vh, 75px)' }}
        className="leading-10 leading-none font-black"
      >
        {addZero(value)}
      </p>
      <p style={{ fontSize: 'min(3vw, 6vh, 18px)' }} className="font-light">
        {name}
      </p>
    </div>
  );
};

Block.propTypes = {
  value: PropTypes.number,
  color: PropTypes.string,
  type: PropTypes.string,
  index: PropTypes.number,
  animate: PropTypes.bool,
};

const Iframe = ({
  animate,
  loading,
  timeLeft,
  endDate,
  title,
  color,
  url,
  background,
}) => {
  if (loading) return null;

  const textColor =
    INDIVIDUAL_COLORS.indexOf(color) !== -1
      ? `text-${color}`
      : `text-${color}-700`;

  const buttonText =
    INDIVIDUAL_COLORS.indexOf(background) !== -1
      ? `${background}`
      : `${background}-700`;
  const buttonBackground =
    INDIVIDUAL_COLORS.indexOf(color) !== -1 ? `${color}` : `${color}-700`;

  return (
    <div
      className={`w-full flex flex-col h-full animate__fadeIn ${
        animate && 'animate__animated'
      }`}
    >
      {title ? (
        <div className="flex w-full flex-1 justify-around items-end">
          <h1
            style={{ fontSize: 'min(7vw, 12vh, 55px)' }}
            className={`${textColor} text-center font-bold py-1 px-4 leading-tight`}
          >
            {title}
          </h1>
        </div>
      ) : (
        <div className="flex w-full flex-1" />
      )}
      <div
        className={`my-8 w-full flex flex-row justify-around items-end ${
          title && 'sm:flex-none'
        }`}
      >
        {timeLeft.map(({ type, value }, index) => (
          <Block
            animate={animate}
            color={textColor}
            key={type}
            index={index}
            value={value}
            type={type}
          />
        ))}
      </div>
      <div className="w-full flex flex-1 items-start justify-center relative">
        <div className="w-full flex flex-1 justify-end px-2 py-1 xs:pr-4 sm:pr-8 md:pr-12 flex-row">
          <p
            style={{ fontSize: 'min(4vw, 7vh, 24px)' }}
            className={`${textColor} text-center font-thin animate__fadeIn animate__delay-${
              SEQUENCE ? timeLeft.length - 1 : 1
            }s ${animate && 'animate__animated'}`}
          >
            De acordo com o{' '}
            <a className="underline" href="https://covidcountdown.today">
              Covid Countdown
            </a>
            , o fim das medidas de distanciamento físico e social acontecerá no
            dia <span className="font-bold">{endDate}</span>.
          </p>
        </div>
      </div>
      <div
        className={`flex flex-col xxs:flex-row pt-6 justify-center items-center text-center mb-8 xxs:px-2 px-8 animate__fadeIn animate__delay-${
          SEQUENCE ? timeLeft.length - 1 : 1
        }s ${animate && 'animate__animated'}`}
      >
        <a
          href="https://covidcountdown.today/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: 'min(4vw, 5vh, 17px)' }}
          className={`flex items-center justify-center h-full w-full xs:w-auto focus:outline-none border font-bold hover:border-${buttonBackground} border-${buttonText} text-${buttonText} bg-${buttonBackground} hover:text-${buttonBackground} hover:bg-${buttonText} py-2 px-2 xs:px-4 xxs:mx-2 mx-0 xs:mx-2 my-1 xxs:my-0`}
        >
          Criar o meu contador
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: 'min(4vw, 5vh, 17px)' }}
          className={`flex items-center justify-center h-full w-full xs:w-auto focus:outline-none border font-bold hover:border-${buttonBackground} border-${buttonText} text-${buttonText} bg-${buttonBackground} hover:text-${buttonBackground} hover:bg-${buttonText} py-2 px-2 xs:px-4 xxs:mx-2 mx-0 xs:mx-2 my-1 xxs:my-0 hidden xs:flex`}
        >
          Partilhar Facebook
        </a>
        <a
          href={`https://twitter.com/intent/tweet?url=${url}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: 'min(4vw, 5vh, 17px)' }}
          className={`flex items-center justify-center h-full w-full xs:w-auto focus:outline-none border font-bold hover:border-${buttonBackground} border-${buttonText} text-${buttonText} bg-${buttonBackground} hover:text-${buttonBackground} hover:bg-${buttonText} py-2 px-2 xs:px-4 xxs:mx-2 mx-0 xs:mx-2 my-1 xxs:my-0 hidden xs:flex`}
        >
          Partilhar Twitter
        </a>
      </div>
    </div>
  );
};

Iframe.propTypes = {
  url: PropTypes.string,
  color: PropTypes.string,
  background: PropTypes.string,
  title: PropTypes.string,
  endDate: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  animate: PropTypes.bool.isRequired,
  timeLeft: PropTypes.arrayOf(PropTypes.shape({})),
};

export default Iframe;

import React from 'react';
import PropTypes from 'prop-types';

const addZero = (value) => (value < 10 ? `0${value}` : value);

const INDIVIDUAL_COLORS = ['black', 'white'];
const SEQUENCE = true;

const Block = ({ value, type, index, animate, color }) => {
  let name = type;

  if (
    (type === 'meses' || type === 'dias' || type === 'horas') &&
    value === 1
  ) {
    name = type.slice(0, -1);
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

const Iframe = ({ animate, loading, timeLeft, endDate, title, color }) => {
  if (loading) return null;

  const textColor =
    INDIVIDUAL_COLORS.indexOf(color) !== -1
      ? `text-${color}`
      : `text-${color}-700`;

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
        className={`w-full flex flex-row justify-around items-end ${
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
      <div className="w-full flex flex-1 items-start justify-center relative right-0">
        <div className="w-full flex flex-1 justify-end px-2 py-1 flex-row">
          <p
            style={{ fontSize: 'min(5vw, 8vh, 24px)' }}
            className={`${textColor} text-right font-thin animate__fadeIn animate__delay-${
              SEQUENCE ? timeLeft.length - 1 : 1
            }s ${animate && 'animate__animated'}`}
          >
            {endDate}
          </p>
        </div>
      </div>
    </div>
  );
};

Iframe.propTypes = {
  color: PropTypes.string,
  title: PropTypes.string,
  endDate: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  animate: PropTypes.bool.isRequired,
  timeLeft: PropTypes.arrayOf(PropTypes.shape({})),
};

export default Iframe;

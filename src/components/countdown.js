import React from 'react';
import PropTypes from 'prop-types';

const addZero = (value) => (value < 10 ? `0${value}` : value);

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
      className={`text-${color}-700 py-4 sm:py-2 sm:flex-1 flex sm:items-center flex-col animate__fadeIn animate__delay-${
        SEQUENCE ? index : 1
      }s ${animate && 'animate__animated'}`}
    >
      <p className="text-5.5xl leading-10 sm:leading-none sm:text-6xl md:text-7xl lg:text-8xl font-black">
        {addZero(value)}
      </p>
      <p className="text-sm">{name}</p>
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

const Countdown = ({ animate, loading, timeLeft, endDate, title, color }) => {
  if (loading) return null;

  return (
    <div
      className={`w-full flex flex-col h-full animate__fadeIn ${
        animate && 'animate__animated'
      }`}
    >
      {title && (
        <div
          className={`hidden sm:flex w-full flex-1 justify-center sm:justify-around items-start sm:items-end`}
        >
          <h1
            className={`text-7xl text-${color}-600 text-center py-2 px-4 leading-tight`}
          >
            {title}
          </h1>
        </div>
      )}
      <div
        className={`w-full flex flex-1 flex-col sm:flex-row justify-center sm:justify-around items-start sm:items-end ${
          title && 'sm:flex-none'
        }`}
      >
        {timeLeft.map(({ type, value }, index) => (
          <Block
            animate={animate}
            color={color}
            key={type}
            index={index}
            value={value}
            type={type}
          />
        ))}
      </div>
      <div className="sm:w-full flex flex-1 items-center sm:items-start justify-center absolute sm:relative inset-y-0 sm:inset-auto right-0">
        <div className="w-full max-w-vw75 flex flex-1 justify-end px-2 sm:px-8 py-12 flex-col sm:flex-row">
          {title && (
            <h1
              className={`block sm:hidden text-4xl text-${color}-600 text-center text-right animate__fadeIn animate__delay-${
                SEQUENCE ? timeLeft.length - 1 : 1
              }s ${animate && 'animate__animated'}`}
            >
              {title}
            </h1>
          )}
          <p
            className={`text-${color}-600 text-xl text-right animate__fadeIn animate__delay-${
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

Countdown.propTypes = {
  color: PropTypes.string,
  title: PropTypes.string,
  endDate: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  animate: PropTypes.bool.isRequired,
  timeLeft: PropTypes.arrayOf(PropTypes.shape({})),
};

export default Countdown;

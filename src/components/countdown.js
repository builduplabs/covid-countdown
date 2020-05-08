import React from 'react';
import PropTypes from 'prop-types';

const addZero = (value) => (value < 10 ? `0${value}` : value);

const SEQUENCE = true;

const Block = ({ value, type, index }) => {
  let name = type;

  if (
    (type === 'meses' || type === 'dias' || type === 'horas') &&
    value === 1
  ) {
    name = type.slice(0, -1);
  }

  return (
    <div
      className={`text-gray-700 py-4 sm:py-2 sm:flex-1 flex sm:items-center flex-col animate__animated animate__fadeIn animate__delay-${
        SEQUENCE ? index : 1
      }s`}
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
  type: PropTypes.string,
  index: PropTypes.number,
};

const Countdown = ({ loading, timeLeft, endDate }) => {
  if (loading) return null;

  return (
    <div className="w-full flex flex-col h-full animate__animated animate__fadeIn">
      <div className="w-full flex flex-1 flex-col sm:flex-row md:flex-row lg:flex-row justify-center sm:justify-around items-start sm:items-end">
        {timeLeft.map(({ type, value }, index) => (
          <Block key={type} index={index} value={value} type={type} />
        ))}
      </div>
      <div className="sm:w-full flex flex-1 items-center sm:items-start justify-center absolute sm:relative inset-y-0 sm:inset-auto right-0">
        <div className="w-full flex flex-1 justify-end px-2 sm:px-8 py-12">
          <p
            className={`text-gray-600 text-xl animate__animated animate__fadeIn animate__delay-${
              SEQUENCE ? timeLeft.length - 1 : 1
            }s`}
          >
            {endDate}
          </p>
        </div>
      </div>
    </div>
  );
};

Countdown.propTypes = {
  endDate: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  timeLeft: PropTypes.arrayOf(PropTypes.shape({})),
};

export default Countdown;

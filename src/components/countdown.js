import React from 'react';
import PropTypes from 'prop-types';

const addZero = (value) => (value < 10 ? `0${value}` : value);

const Block = ({ value, type }) => {
  let name = type;

  if (
    (type === 'meses' || type === 'dias' || type === 'horas') &&
    value === 1
  ) {
    name = type.slice(0, -1);
  }

  return (
    <div className="text-gray-700 py-4 sm:py-2 sm:flex-1 flex sm:items-center flex-col">
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
};

const Countdown = ({ loading, timeLeft }) => {
  if (loading) return null;

  return (
    <div className="w-full flex flex-col sm:flex-row md:flex-row lg:flex-row justify-center sm:justify-around items-start sm:items-center">
      {timeLeft.map(({ type, value }) => (
        <Block key={type} value={value} type={type} />
      ))}
    </div>
  );
};

Countdown.propTypes = {
  loading: PropTypes.bool.isRequired,
  timeLeft: PropTypes.arrayOf(PropTypes.shape({})),
};

export default Countdown;

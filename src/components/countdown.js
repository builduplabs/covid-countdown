import React from "react";
import PropTypes from "prop-types";

const addZero = (value) => (value < 10 ? `0${value}` : value);

const SEQUENCE = true;

const Block = ({ value, type, index, animate, color }) => {
  let name = type;

  if ((type === "dias" || type === "horas") && value === 1) {
    name = type.slice(0, -1);
  }
  if (type === "meses" && value === 1) {
    name = "mês";
  }

  return (
    <div
      className={`text-${color}-700 py-4 sm:py-2 landscape:py-0 sm:flex-1 flex sm:items-center flex-col animate__fadeIn animate__delay-${
        SEQUENCE ? index : 1
      }s ${animate && "animate__animated"}`}
    >
      <p className="leading-10 sm:leading-none text-4xl xxs:text-5xl xs:text-5.5xl landscape:text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black">
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

const Countdown = ({
  animate,
  loading,
  timeLeft,
  endDate,
  title,
  color,
  setShowModal,
  lastUpdateDate,
}) => {
  if (loading) return null;

  return (
    <div className="relative w-full flex flex-col h-full">
      <div
        className={`w-full max-w-vw65 xxs:max-w-vw70 text-right sm:text-center justify-center flex flex-col flex-1 absolute right-0 xxs:mt-16 landscape:mt-2 sm:mt-auto sm:relative sm:max-w-none animate__fadeIn animate__delay-${
          SEQUENCE ? timeLeft.length - 1 : 1
        }s ${animate && "animate__animated"}`}
      >
        <h1 className="text-3xl xs:text-4xl sm:text-6xl landscape:text-3xl uppercase font-black text-accent">
          Covid Countdown
        </h1>
        {title ? (
          <h2 className="text-base xs:text-xl landscape:text-lg sm:text-2xl">
            {title}
          </h2>
        ) : (
          <h3 className="text-base xs:text-xl landscape:text-lg sm:text-2xl hidden xs:block">
            Quanto tempo falta para isto acabar?
          </h3>
        )}
      </div>
      <div className="w-full flex flex-1 flex-col justify-center">
        <div className="flex flex-col sm:flex-row justify-center sm:justify-around items-start sm:items-end">
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
        <p
          className={`text-${color}-600 absolute sm:relative max-w-vw65 xxs:max-w-vw70 sm:max-w-none right-0 sm:right-auto text-xs xxs:text-base xs:text-xl landscape:text-sm text-right sm:text-center animate__fadeIn animate__delay-${
            SEQUENCE ? timeLeft.length - 1 : 1
          }s ${animate && "animate__animated"}`}
        >
          Com base nos dados oficiais de{" "}
          <span className="font-bold">{lastUpdateDate}</span>, calculamos que o
          fim das medidas de distanciamento físico e social acontecerá no dia{" "}
          <span className="font-bold">{endDate}</span>.
        </p>
      </div>
      <div
        className={`max-w-vw65 xxs:max-w-vw70 w-full flex flex-1 flex-col items-end sm:items-center justify-end text-right sm:text-center absolute bottom-0 right-0 sm:relative sm:bottom-auto sm:right-auto sm:max-w-none animate__fadeIn animate__delay-${
          SEQUENCE ? timeLeft.length - 1 : 1
        }s ${animate && "animate__animated"}`}
      >
        <p className="text-xs xxs:text-base xs:text-xl landscape:text-sm hidden xs:block">
          O que vais fazer quando este dia chegar?
        </p>
        <p className="text-xs xxs:text-base xs:text-xl landscape:text-sm pb-4">
          Personaliza o contador com o teu objetivo pós-pandemia e partilha-o.
        </p>
        <button
          onClick={() => setShowModal(true)}
          className="text-xs xxs:text-base xs:text-xl landscape:text-sm focus:outline-none w-auto border border-black bg-accent text-white hover:border-white hover:text-white hover:bg-black py-1 px-3 xs:px-12 mb-2 xxs:mb-16 landscape:mb-2"
        >
          Personalizar Contador
        </button>
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
  setShowModal: PropTypes.func.isRequired,
  timeLeft: PropTypes.arrayOf(PropTypes.shape({})),
  lastUpdateDate: PropTypes.string,
};

export default Countdown;

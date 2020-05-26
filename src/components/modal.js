import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment/locale/pt';
import 'animate.css';

const INDIVIDUAL_COLORS = ['black', 'white'];
const COLORS = [
  'black',
  'white',
  'gray',
  'red',
  'orange',
  'yellow',
  'green',
  'teal',
  'blue',
  'indigo',
  'purple',
  'pink',
];

const buildUrl = (title, color, bg) => {
  if (typeof window === 'undefined')
    return 'https://covidcountdown.today/share/';

  const url = new URL('https://covidcountdown.today/share/');

  if (title) {
    url.searchParams.append('title', title);
  }
  if (color) {
    url.searchParams.append('color', color);
  }
  if (bg) {
    url.searchParams.append('bg', bg);
  }

  return url.href;
};

function Modal({ show, setShowModal }) {
  const [copied, setCopied] = React.useState(false);
  const [title, setTitle] = React.useState(null);
  const [textColor, setTextColor] = React.useState(null);
  const [backgroundColor, setBackgroundColor] = React.useState(null);
  if (!show) return null;
  const url = buildUrl(title, textColor, backgroundColor);
  moment.locale('pt');
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative my-6 w-11/12 sm:w-4/6 lg:w-1/2 max-w-5xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="hidden xs:flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
              <h3 className="text-2xl font-semibold">Criar Contador</h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setShowModal(false)}
              >
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  <svg viewBox="0 0 512 512">
                    <path d="M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4  L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1  c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1  c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z" />
                  </svg>
                </span>
              </button>
            </div>
            <div className="relative p-6 flex-auto">
              <button
                className="xs:hidden absolute top-0 right-0 mt-3 mr-3 p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setShowModal(false)}
              >
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  <svg viewBox="0 0 512 512">
                    <path d="M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4  L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1  c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1  c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z" />
                  </svg>
                </span>
              </button>
              <div className="mb-4">
                <label className="block text-xs xs:text-sm font-bold mb-2 mr-4 xs:mr-0">
                  Título: o que vais fazer quando o contador chegar ao fim e a
                  pandemia acabar?
                </label>
                <input
                  onChange={(event) => {
                    setTitle(event.target.value);
                    setCopied(false);
                  }}
                  className="text-xxs xs:text-xs appearance-none border border-black w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="title"
                  type="text"
                  placeholder="Como vai ser o primeiro dia do resto da tua vida? Ir ao futebol, a um concerto ou a uma discoteca?"
                />
              </div>
              <div className="mb-4">
                <label className="block text-xs xs:text-sm font-bold mb-2">
                  Cor do texto
                </label>
                <div className="flex flex-row flex-wrap items-center justify-around">
                  {COLORS.map((color) => {
                    const finalColor =
                      INDIVIDUAL_COLORS.indexOf(color) !== -1
                        ? `${color}`
                        : `${color}-700`;

                    return (
                      <button
                        onClick={() => {
                          if (textColor === color) {
                            setTextColor('');
                          } else {
                            setTextColor(color);
                          }
                          setCopied(false);
                        }}
                        key={color}
                        className={`focus:outline-none opacity-75 w-6 h-6 md:w-8 md:h-8 rounded-full mr-2 mb-2 bg-${finalColor} ${
                          color === 'white' ? 'border-black border' : ''
                        } ${textColor === color ? 'opacity-100' : ''}`}
                      />
                    );
                  })}
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-xs xs:text-sm font-bold mb-2">
                  Cor de fundo
                </label>
                <div className="flex flex-row flex-wrap items-center justify-around">
                  {COLORS.map((color) => {
                    const finalColor =
                      INDIVIDUAL_COLORS.indexOf(color) !== -1
                        ? `${color}`
                        : `${color}-700`;

                    return (
                      <button
                        onClick={() => {
                          if (backgroundColor === color) {
                            setBackgroundColor('');
                          } else {
                            setBackgroundColor(color);
                          }
                          setCopied(false);
                        }}
                        key={color}
                        className={`focus:outline-none opacity-75 w-6 h-6 md:w-8 md:h-8 rounded-full mr-2 mb-2 bg-${finalColor} ${
                          color === 'white' ? 'border-black border' : ''
                        } ${backgroundColor === color ? 'opacity-100' : ''}`}
                      />
                    );
                  })}
                </div>
              </div>
              <div className="hidden xs:block">
                <label className="block text-xs xs:text-sm font-bold mb-2">
                  Url de partilha
                </label>
                <p className="text-sm">{url}</p>
                <button
                  className={`${
                    !copied ? 'hover:border-black hover:bg-accent' : ''
                  } mt-2 focus:outline-none w-auto border font-bold border-white bg-black text-white py-1 px-3 text-xs`}
                  type="button"
                  style={{ transition: 'all .15s ease' }}
                  onClick={() => {
                    navigator.clipboard.writeText(url);
                    setCopied(true);
                  }}
                >
                  {!copied ? 'Copiar URL' : 'Copiado!'}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-end p-2 sm:p-6 border-t border-solid border-gray-300 rounded-b">
              <button
                className="hidden xs:flex background-transparent font-bold px-3 py-1 outline-none focus:outline-none mr-1 hover:underline text-xs sm:text-base"
                type="button"
                style={{ transition: 'all .15s ease' }}
                onClick={() => setShowModal(false)}
              >
                Fechar
              </button>
              <div className="w-full xs:w-auto flex flex-row justify-center justify-center">
                <button
                  className={`${
                    !copied ? 'hover:border-black hover:bg-accent' : ''
                  } xs:hidden focus:outline-none w-auto border font-bold border-white bg-black text-white py-1 px-3 text-xs`}
                  type="button"
                  style={{ transition: 'all .15s ease' }}
                  onClick={() => {
                    navigator.clipboard.writeText(url);
                    setCopied(true);
                  }}
                >
                  {!copied ? 'Copiar URL' : 'Copiado!'}
                </button>
                {/* <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center ml-2 mr-2 text-xs focus:outline-none sm:w-auto border hover:border-black border-white text-white hover:bg-accent bg-black py-1 px-3 sm:text-base"
                >
                  Facebook
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-xs focus:outline-none sm:w-auto border hover:border-black border-white text-white hover:bg-accent bg-black py-1 px-3 sm:text-base"
                >
                  Twitter
                </a> */}
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center ml-2 mr-2 text-xs focus:outline-none sm:w-auto border hover:border-black border-white text-white hover:bg-accent bg-black py-1 px-3 sm:text-base"
                >
                  Ver contador
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}

Modal.defaultProps = {
  show: false,
  setShowModal: () => {},
};

Modal.propTypes = {
  show: PropTypes.bool,
  setShowModal: PropTypes.func,
};

export default Modal;

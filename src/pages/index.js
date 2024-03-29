import React, { useState } from "react";
import moment from "moment";
import "moment/locale/pt";
import "animate.css";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Countdown from "../containers/countdown";
import Modal from "../components/modal";
import Graph from "../containers/graph";
import RiskMatrix from "../containers/risk_matrix";
//import RiskMatrix from "../components/risk_matrix";
// import ModeToggle from '../components/mode_toggle';

function IndexPage() {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");

  const handleOpenModal = (value, type) => {
    setModalType(type);
    setShowModal(value);
  };

  const scrollToRiskMatrix = (e) => {
    e.preventDefault();

    const getOffset = (el) => {
      const rect = el.getBoundingClientRect();
      return {
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY,
      };
    };

    const element = document.getElementById("riskMatrix");
    const offset = 50;

    window.scrollTo({
      top: getOffset(element).top - offset,
      behavior: "smooth",
    });
  };

  moment.locale("pt");
  return (
    <Layout>
      <SEO />
      {/* <ModeToggle /> */}

      <div className="flex justify-center items-center m-1 font-medium mt-10 py-1 px-2 bg-white rounded-md text-red-700 bg-red-100 border border-accent">
        <div className="text-sm font-normal text-accent max-w-full flex-initial">
          Adicionamos a nova matriz de risco, clica{" "}
          <a href="#" className="underline" onClick={scrollToRiskMatrix}>
            aqui
          </a>{" "}
          para visualizares.
        </div>
      </div>
      <div className="h-screen w-full flex flex-col justify-center">
        <Countdown
          setShowModal={(value) => handleOpenModal(value, "countdown")}
        />
      </div>
      <div className="w-full flex flex-col justify-center py-16">
        <h2 className="text-3xl font-black text-left py-2 pb-8 px-1 sm:px-4">
          Esta pandemia tem os dias contados
        </h2>
        <p className="text-sm text-grey-dark text-justify px-1 sm:px-4 py-1">
          Há uma pergunta que todos temos na cabeça:{" "}
          <span className="font-black">
            quanto tempo falta para isto acabar?
          </span>
        </p>
        <p className="text-sm text-grey-dark text-justify px-1 sm:px-4 py-1">
          A pandemia da <span className="font-black">COVID-19</span> é um alvo
          em movimento. É um vírus que não entendemos completamente, e que
          nenhum cientista consegue ainda garantir como vai evoluir - ou quando
          regressaremos à normalidade. As medidas rígidas de distanciamento
          físico e social podem continuar em vigor durante vários meses, ou até
          mais de um ano. Mas pior que o distanciamento é a incerteza. O
          desconforto da distância é ainda mais difícil de suportar quando não
          há um fim à vista.
        </p>
        <p className="text-sm text-grey-dark text-justify px-1 sm:px-4 py-1">
          É mais difícil sermos optimistas se não sabemos quando as coisas
          voltarão ao normal. É certo que nem tudo vai ser como dantes, e que
          este normal será um{" "}
          <span className="italic">&quot;novo normal&quot;</span>. Ainda assim,
          precisamos de uma luz ao fundo do túnel, por mais pequena e simbólica
          que seja.
        </p>
        <p className="text-sm text-grey-dark text-justify px-1 sm:px-4 py-1">
          Foi por isso que nasceu o{" "}
          <span className="font-black">COVID COUNTDOWN</span>. Um contador para
          o fim do distanciamento social, que todos dias recalcula a data final,
          com base em diversas fontes de dados oficiais. Todos os dias teremos
          uma nova previsão de quanto tempo falta para podermos voltar a vibrar
          num estádio de futebol, gritar num concerto ou dançar numa discoteca.
        </p>
        <p className="text-sm text-grey-dark text-justify px-1 sm:px-4 py-1">
          Apesar de ter sido desenvolvida por aspirantes a Data Scientists, esta
          ideia não pretende ser uma previsão 100% certa, mas sim uma
          aproximação do dia pelo qual todos ansiamos. Um{" "}
          <span className="italic">&quot;bitaite&quot;</span> bem informado que
          passa uma mensagem de esperança e optimismo, que nos ajuda olhar para
          as oportunidades do futuro e não só para os problemas de hoje. Porque
          nada dura para sempre, e até esta pandemia tem os dias contados.
        </p>
        <p className="text-sm text-grey-dark text-justify px-1 sm:px-4 py-1">
          O que vais fazer quando o contador chegar ao fim? Como vai ser o
          primeiro dia do resto da tua vida? Personaliza o contador com o teu
          objetivo pós-pandemia, escolha as cores e partilha onde quiseres ou
          coloca no teu site
        </p>
        <div className="flex flex-col xs:flex-row justify-center pt-6 justify-center text-center">
          <a
            href="https://www.facebook.com/sharer/sharer.php?u=https://covidcountdown.today/"
            target="_blank"
            rel="noopener noreferrer"
            className="xs:mr-2 w-full xs:w-auto focus:outline-none w-full sm:w-auto border font-bold hover:border-black border-white text-white hover:bg-accent bg-black py-2 px-8"
          >
            Partilhar Facebook
          </a>
          <a
            href="https://twitter.com/intent/tweet?url=https://covidcountdown.today/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 xs:mt-0 xs:ml-2 w-full xs:w-auto focus:outline-none w-full sm:w-auto border font-bold hover:border-black border-white text-white hover:bg-accent bg-black py-2 px-8"
          >
            Partilhar Twitter
          </a>
        </div>
      </div>
      <div id="riskMatrix" className="w-full flex flex-col justify-center">
        <h2 className="text-xl font-black text-left px-1 sm:px-4">
          Matriz de Risco
        </h2>
        <RiskMatrix />
        <div
          className={`flex flex-col xs:flex-row justify-center pt-6 justify-center text-center`}
        >
          <button
            onClick={() => handleOpenModal(true, "matrix")}
            className="text-xs xxs:text-base xs:text-xl landscape:text-sm focus:outline-none w-auto border border-black bg-accent text-white hover:border-white hover:text-white hover:bg-black py-1 px-3 mt-2 xs:px-12 mb-0 xxs:mb-16 landscape:mb-0"
          >
            Personalizar Matriz
          </button>
        </div>
        <h2 className="text-2xl font-black text-left py-0 px-1 sm:px-4">
          O que é a matriz de risco?
        </h2>
        <p className="text-sm text-grey-dark text-justify px-1 sm:px-4 py-1 pt-8">
          Quando foi anunciado o desconfinamento a 11 de março de 2021, foi
          introduzida uma matriz de risco que serve como papel fundamental para
          o processo de desconfinamento. Esta matriz é composta por dois
          indicadores, o famoso R(t) indicado no eixo (x) e a média de novos
          casos por 100 mil habitantes a 14 dias.
        </p>

        <p className="text-sm text-grey-dark text-justify px-1 sm:px-4 py-1 pt-2">
          Por sua vez, a matriz encontra-se dívidia em 4 secções, em que cada
          uma representa um determinado nível, sendo esta divisão feita de
          acordo com os valores de Incidência e R(t) como demonstrado de
          seguida:
        </p>

        <ul className="text-sm text-grey-dark text-justify px-1 sm:px-4 py-1 mx-10 list-decimal flex flex-wrap">
          <li className="flex-1 font-bold mt-4">
            Nível
            <ul className="mx-2 font-normal">
              <li>Rt: [0, 1]</li>
              <li>Incidência: [0, 120]</li>
            </ul>
          </li>
          <li className="flex-1 font-bold mt-4">
            Nível:
            <ul className="mx-2 font-normal">
              <li>Rt: [1, 2]</li>
              <li>Incidência: [0, 120]</li>
            </ul>
          </li>
          <li className="flex-1 font-bold mt-4">
            Nível:
            <ul className="mx-2 font-normal">
              <li>Rt: [0, 1]</li>
              <li>Incidência: [120, 240]</li>
            </ul>
          </li>
          <li className="flex-1 font-bold mt-4">
            Nível:
            <ul className="mx-2 font-normal">
              <li>Rt: [1, 2]</li>
              <li>Incidência: [120, 240]</li>
            </ul>
          </li>
        </ul>

        <p className="text-sm text-grey-dark text-justify px-1 sm:px-4 py-1 pt-2 pb-6">
          Cada nível dará a possibilidade ao governo de estabelecer medidas
          relativas ao desconfinamento, estas medidas podem ser tanto de avanço
          ou de recuo, isto é, caso nos encontremos no nível 1 o desconfinamento
          poderá prosseguir como planeado, caso por exemplo, nos encontremos no
          nível 4 o desconfinamento terá de ser parado e terão de ser colocadas
          medidas em pratica que vise a redução dos casos e da
          transmissibilidade.
        </p>
      </div>
      <div className="w-full flex flex-col justify-center">
        <h2 className="text-2xl font-black text-left py-2 px-1 sm:px-4">
          Como é feita a previsão?
        </h2>
        <p className="text-sm text-grey-dark text-justify px-1 sm:px-4 py-1">
          Por vezes ouvimos nas notícias ou briefings da DGS, o termo R0.
        </p>
        <p className="text-base font-bold text-grey-dark text-left px-1 sm:px-4 py-3">
          O R0 é o número básico de reprodução de uma epidemia, é definido como
          o número de infeções secundárias produzidas por uma única pessoa
          infetada, se o R0 for maior que 1, a epidemia espalha-se rapidamente,
          se R0 for menor que 1, a epidemia espalha-se de forma lenta.
        </p>
        <p className="text-sm text-grey-dark text-justify px-1 sm:px-4 py-1 pb-8">
          Embora o R0 seja uma medida útil, tem como defeito o facto de ser um
          número estático.
        </p>
        <h2 className="text-xl font-black text-left px-1 sm:px-4">
          Evolução Rt
        </h2>
        <Graph />
        <p className="text-sm text-grey-dark text-justify px-1 sm:px-4 py-1 pt-8">
          Como humanos, somos adaptáveis, o nosso comportamento muda, e isso
          altera o valor efetivo do R a qualquer momento. Como o valor muda tão
          rapidamente, o Rt (o valor R para um determinado tempo t) será um
          valor mais próximo da realidade. Para sermos ainda mais próximos da
          realidade, não precisamos apenas conhecer Rt, precisamos conhecer Rt
          por região. A epidemia na região Norte é muito diferente da do
          Alentejo, por exemplo.
        </p>
        <p className="text-sm text-grey-dark text-justify px-1 sm:px-4 py-1">
          Para tentarmos calcular o Rt para cada região de Portugal, estamos a
          utilizar uma adaptação do método específico que Bettencourt & Ribeiro
          descreveram no seu artigo de 2008:{" "}
          <a
            href="https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0002185"
            rel="noopener noreferrer"
            target="_blank"
            className="underline"
          >
            &quot;Real Time Bayesian Estimation of the Epidemic Potential of
            Emerging Infectious Diseases&quot;
          </a>{" "}
          e que está descrito neste{" "}
          <a
            href="http://systrom.com/blog/the-metric-we-need-to-manage-covid-19/"
            rel="noopener noreferrer"
            target="_blank"
            className="underline"
          >
            post
          </a>{" "}
          no blog de{" "}
          <a
            href="http://systrom.com/"
            rel="noopener noreferrer"
            target="_blank"
            className="underline"
          >
            Kevin Systrom
          </a>
          , co-fundador do Instagram.
        </p>
        <p className="text-sm text-grey-dark text-justify px-1 sm:px-4 py-1">
          Utilizámos o{" "}
          <a
            href="https://github.com/k-sys/covid-19/blob/master/Realtime%20R0.ipynb"
            rel="noopener noreferrer"
            target="_blank"
            className="underline"
          >
            Jupiter Notebook
          </a>{" "}
          de Kevin Systrom.
        </p>
        <h2 className="text-sm font-bold font-black text-left pt-16 px-1 sm:px-4">
          Algumas alterações:
        </h2>
        <ul className="list-disc ml-6 sm:ml-12">
          <li className="text-xs text-grey-dark pr-4 py-1">
            Utilizámos como fonte de dados o dataset covid19pt-data da Data
            Science for Social Good Portugal:{" "}
            <a
              href="https://github.com/dssg-pt/covid19pt-data/blob/master/data.csv"
              rel="noopener noreferrer"
              target="_blank"
              className="underline"
            >
              https://github.com/dssg-pt/covid19pt-data/blob/master/data.csv
            </a>
          </li>
          <li className="text-xs text-grey-dark pr-4 py-1">
            Adaptamos o notebook para que se adequasse às regiões de Portugal
          </li>
          <li className="text-xs text-grey-dark pr-4 py-1">
            Fizemos pequenas alterações no algoritmo, de modo a que a se
            ajustasse à menor variação de novos casos diários em Portugal (em
            comparação com os EUA)
          </li>
        </ul>
        <h2 className="text-sm font-bold font-black text-left pt-3 px-1 sm:px-4">
          Previsão da data de regresso:
        </h2>
        <ul className="list-disc ml-6 sm:ml-12">
          <li className="text-xs text-grey-dark pr-4 py-1">
            Definimos uma data &quot;baseline&quot;, 1 de Outubro de 2020, com o
            Rt do dia 7 de Maio de 2020, tendo em conta o anúncio do
            cancelamento dos Festivais de Música até 30 de Setembro de 2020,
            feito pelo Governo neste dia.
          </li>
          <li className="text-xs text-grey-dark pr-4 py-1">
            Nova data &quot;baseline&quot;, 1 de Janeiro 2021, com o Rt do dia
            24 de Setembro de 2020, tendo em conta o anúncio do prolongamento do
            cancelamento dos Festivais de Música até 31 de Dezembro de 2020,
            feito pelo Governo neste dia.
          </li>
          <li className="text-xs text-grey-dark pr-4 py-1">
            Nova data &quot;baseline&quot;, 25 de Setembro 2021, com o Rt do dia
            6 de Julho de 2020, tendo em conta o anúncio do alcance da imunidade de grupo na terceira semana de setembro,
            feito pela Taskforce de vacinação neste dia.
          </li>

          <li className="text-xs text-grey-dark pr-4 py-1">
            Por cada variação do Rt, a data de regresso é ajustada, de forma
            positiva ou negativa, sendo que por cada 0,01 que o valor aumenta ou
            diminui, a data varia 3h.
          </li>
        </ul>
        <h2 className="text-sm font-bold font-black text-left pt-3 px-1 sm:px-4">
          Ficheiros de dados
        </h2>
        <ul className="list-disc ml-6 sm:ml-12">
          <li className="text-xs text-grey-dark pr-4 py-1">
            <a
              className="underline"
              href="https://github.com/builduplabs/covid-countdown/blob/master/src/data/notebook.ipynb"
              target="_blank"
              rel="noopener noreferrer"
            >
              Jupyter Notebook
            </a>
          </li>
          <li className="text-xs text-grey-dark pr-4 py-1">
            <a
              className="underline"
              href="https://github.com/builduplabs/covid-countdown/blob/master/src/data/cases.csv"
              target="_blank"
              rel="noopener noreferrer"
            >
              CSV com número de casos por região
            </a>
          </li>
          <li className="text-xs text-grey-dark pr-4 py-1">
            <a
              className="underline"
              href="https://github.com/builduplabs/covid-countdown/blob/master/src/data/prediction.csv"
              target="_blank"
              rel="noopener noreferrer"
            >
              CSV com Rt por região
            </a>
          </li>
        </ul>
        <h2 className="text-sm font-bold font-black text-left pt-3 px-1 sm:px-4">
          Queres contribuir?
        </h2>
        <ul className="list-disc ml-6 sm:ml-12 pb-8">
          <li className="text-xs text-grey-dark pr-4 py-1">
            Deixa os teus comentátios, sugestões, otimizações, críticas,
            correções, etc em:{" "}
            <a
              href="https://github.com/builduplabs/covid-countdown/issues"
              rel="noopener noreferrer"
              target="_blank"
              className="underline"
            >
              https://github.com/builduplabs/covid-countdown/issues
            </a>
          </li>
        </ul>
      </div>
      <Modal show={showModal} setShowModal={setShowModal} type={modalType} />
    </Layout>
  );
}

export default IndexPage;

import React from 'react';
import moment from 'moment';
import 'moment/locale/pt';
import 'animate.css';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Countdown from '../containers/countdown';
import Graph from '../containers/graph';
// import ModeToggle from '../components/mode_toggle';

function IndexPage() {
  moment.locale('pt');
  return (
    <Layout>
      <SEO keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]} />
      {/* <ModeToggle /> */}
      <div className="h-screen w-full flex flex-col justify-center">
        <Countdown />
      </div>
      <div className="w-full flex flex-col justify-center py-16">
        <h2 className="text-3xl font-black text-center py-2 pb-8 px-4">
          Menos um dia para estarmos juntos outra vez.
        </h2>
        <p className="text-sm text-grey-dark text-justify px-4 py-1">
          Há uma pergunta que todos temos na cabeça:{' '}
          <span className="font-black">
            quanto tempo falta para isto acabar?
          </span>
        </p>
        <p className="text-sm text-grey-dark text-justify px-4 py-1">
          A pandemia da COVID-19 é um alvo em movimento. É um vírus que não
          entendemos completamente, e que nenhum cientista consegue ainda
          garantir como vai evoluir - ou quando regressaremos à normalidade. As
          medidas rígidas de distanciamento físico e social podem continuar em
          vigor durante vários meses, ou até mais de um ano. Mas pior que o
          distanciamento é a incerteza. O desconforto da distância é ainda mais
          difícil de suportar quando não há um fim à vista.
        </p>
        <p className="text-sm text-grey-dark text-justify px-4 py-1">
          É mais difícil sermos optimistas se não sabemos quando as coisas
          voltarão ao normal. É certo que nem tudo vai ser como dantes, e que
          este normal será um &quot;novo normal&quot;. Ainda assim, precisamos
          de uma luz ao fundo do túnel, por mais pequena e simbólica que seja.
        </p>
        <p className="text-sm text-grey-dark text-justify px-4 py-1">
          Foi por isso que nasceu o COVID COUNTDOWN. Um contador para o fim do
          distanciamento social, que todos dias recalcula a data final, com base
          em diversas fontes de dados oficiais. Todos os dias teremos uma nova
          previsão de quanto tempo falta para podermos voltar a vibrar num
          estádio de futebol, gritar num concerto ou dançar numa discoteca.
        </p>
        <p className="text-sm text-grey-dark text-justify px-4 py-1">
          Apesar de ter sido desenvolvida por aspirantes a Data Scientists, esta
          ideia não pretende ser uma previsão 100% certa, mas sim uma
          aproximação do dia pelo qual todos ansiamos. Um &quot;bitaite&quot;
          bem informado que passa uma mensagem de esperança e optimismo, que nos
          ajuda olhar para as oportunidades do futuro e não só para os problemas
          de hoje. Porque nada dura para sempre, e até esta pandemia tem os dias
          contados.
        </p>
        <p className="text-sm text-grey-dark text-justify px-4 py-1">
          O que vais fazer quando o contador chegar ao fim? Como vai ser o
          primeiro dia do resto da tua vida? Personaliza o contador com o teu
          objetivo pós-pandemia, escolha as cores e partilha onde quiseres ou
          coloca no teu site
        </p>
      </div>
      <div className="w-full flex flex-col justify-center">
        <h2 className="text-2xl font-black text-left py-2 px-4">
          Como é feita a previsão
        </h2>
        <p className="text-sm text-grey-dark text-justify px-4 py-1">
          Por vezes ouvimos nas notícias ou briefings da DGS, o termo R0.
        </p>
        <p className="text-base font-bold text-grey-dark text-center px-24 py-3">
          O R0 é o número básico de reprodução de uma epidemia, é definido como
          o número de infeções secundárias produzidas por uma única pessoa
          infetada, se o R0 for maior que 1, a epidemia espalha-se rapidamente,
          se R0 for menor que 1, a epidemia espalha-se de forma lenta.
        </p>
        <p className="text-sm text-grey-dark text-justify px-4 py-1 pb-8">
          Embora o R0 seja uma medida útil, tem como defeito o facto de ser um
          número estático.
        </p>
        <h2 className="text-xl font-black text-left px-4">Evolução Rt</h2>
        <Graph />
        <p className="text-sm text-grey-dark text-justify px-4 py-1 pt-8">
          Como humanos, somos adaptáveis, o nosso comportamento muda, e isso
          altera o valor efetivo do R a qualquer momento. Como o valor muda tão
          rapidamente, o Rt (o valor R para um determinado tempo t) será um
          valor mais próximo da realidade. Para sermos ainda mais próximos da
          realidade, não precisamos apenas conhecer Rt, precisamos conhecer Rt
          por região. A epidemia na região Norte é muito diferente da do
          Alentejo, por exemplo.
        </p>
        <p className="text-sm text-grey-dark text-justify px-4 py-1">
          Para tentarmos calcular o Rt para cada região de Portugal, estamos a
          utilizar uma adaptação do método específico que Bettencourt & Ribeiro
          descreveram no seu artigo de 2008:{' '}
          <a
            href="https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0002185"
            rel="noopener noreferrer"
            target="_blank"
            className="underline"
          >
            &quot;Real Time Bayesian Estimation of the Epidemic Potential of
            Emerging Infectious Diseases&quot;
          </a>{' '}
          e que está descrito neste{' '}
          <a
            href="http://systrom.com/blog/the-metric-we-need-to-manage-covid-19/"
            rel="noopener noreferrer"
            target="_blank"
            className="underline"
          >
            post
          </a>{' '}
          no blog de{' '}
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
        <p className="text-sm text-grey-dark text-justify px-4 py-1">
          Utilizámos o{' '}
          <a
            href="https://github.com/k-sys/covid-19/blob/master/Realtime%20R0.ipynb"
            rel="noopener noreferrer"
            target="_blank"
            className="underline"
          >
            Jupiter Notebook
          </a>{' '}
          de Kevin Systrom.
        </p>
        <h2 className="text-sm font-bold font-black text-left pt-16 px-4">
          Algumas alterações:
        </h2>
        <ul className="list-disc ml-12">
          <li className="text-xs text-grey-dark pr-4 py-1">
            Utilizámos como fonte de dados o dataset covid19pt-data da Data
            Science for Social Good Portugal:{' '}
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
        <h2 className="text-sm font-bold font-black text-left pt-3 px-4">
          Previsão da data de regresso:
        </h2>
        <ul className="list-disc ml-12">
          <li className="text-xs text-grey-dark pr-4 py-1">
            Definimos uma data &quot;baseline&quot;, 1 de Outubro de 2020, com o
            Rt do dia 7 de Maio de 2020, tendo em conta o anúncio do
            cancelamento dos Festivais de Música até 30 de Setembro de 2020,
            feito pelo Governo neste dia.
          </li>
          <li className="text-xs text-grey-dark pr-4 py-1">
            Por cada variação do Rt, a data de regresso é ajustada, de forma
            positiva ou negativa, por cada variação do Rt, sendo que por cada
            0,01 que o valor do Rt aumenta ou diminui, a data varia 5h.
          </li>
        </ul>
        <h2 className="text-sm font-bold font-black text-left pt-3 px-4">
          Transparência e contribuições:{' '}
          <span className="font-normal text-xs">
            (links para repositórios, notebook, csv, etc)
          </span>
        </h2>
        <ul className="list-disc ml-12 pb-8">
          <li className="text-xs text-grey-dark pr-4 py-1">
            Proident esse quis eu qui aliquip non pariatur id aute incididunt.
            Laboris dolor eiusmod ullamco quis. Consequat occaecat in aliquip
            voluptate nulla reprehenderit.
          </li>
          <li className="text-xs text-grey-dark pr-4 py-1">
            Velit tempor ut sit elit eiusmod dolor Lorem anim velit proident
            nisi reprehenderit. Dolor adipisicing qui incididunt laborum eu elit
            ut non laborum ullamco amet mollit commodo ea. Proident labore
            consequat enim nisi et duis et commodo pariatur.
          </li>
          <li className="text-xs text-grey-dark pr-4 py-1">
            Veniam amet sit proident magna velit exercitation anim id in dolor
            quis adipisicing. Elit do sint aliquip ut enim veniam magna quis
            labore cupidatat nulla consequat irure. Pariatur excepteur eu dolore
            mollit eu amet officia Lorem. Amet consectetur consectetur ullamco
            qui aliquip ad cupidatat occaecat.
          </li>
        </ul>
      </div>
    </Layout>
  );
}

export default IndexPage;

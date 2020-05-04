import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import moment from 'moment';
import Countdown from '../components/countdown';

const CountdownContainer = ({ data }) => {
  const [state, setTimeLeft] = useState({
    loading: true,
    timeLeft: [],
  });

  useEffect(() => {
    const {
      allPrevisaoCovidPortugalCsv: { nodes },
    } = data;
    const { prevista } = nodes[0];

    const interval = setInterval(() => {
      setTimeLeft(() => {
        const now = moment();
        const end = moment(prevista);
        const ended = now.isSameOrAfter(end);

        if (ended) {
          clearInterval(interval);
          return {
            loading: false,
          };
        }

        const timeLeft = [];

        const months = end.diff(now, 'months');
        if (months) {
          timeLeft.push({
            value: months,
            type: 'meses',
          });
        }
        const days = end.subtract(months, 'months').diff(now, 'days');
        timeLeft.push({
          value: days,
          type: 'dias',
        });
        const hours = end.subtract(days, 'days').diff(now, 'hours');
        timeLeft.push({
          value: hours,
          type: 'horas',
        });
        const minutes = end.subtract(hours, 'hours').diff(now, 'minutes');
        timeLeft.push({
          value: minutes,
          type: 'minutos',
        });
        const seconds = end.subtract(minutes, 'minutes').diff(now, 'seconds');
        timeLeft.push({
          value: seconds,
          type: 'segundos',
        });

        return {
          loading: false,
          timeLeft,
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [state]);

  const { loading, timeLeft } = state;
  return <Countdown timeLeft={timeLeft} loading={loading} />;
};

CountdownContainer.propTypes = {
  data: PropTypes.shape({
    allPrevisaoCovidPortugalCsv: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          prevista: PropTypes.string,
        })
      ),
    }),
  }).isRequired,
};

export default function Timer(props) {
  return (
    <StaticQuery
      query={graphql`
        query {
          allPrevisaoCovidPortugalCsv(
            sort: { order: DESC, fields: Date }
            limit: 1
          ) {
            nodes {
              ML
              Country
              Date
              prevista
            }
          }
        }
      `}
      render={(data) => <CountdownContainer data={data} {...props} />}
    />
  );
}

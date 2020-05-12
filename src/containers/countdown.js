import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import moment from 'moment';
import Countdown from '../components/countdown';
import Share from '../components/share';

const CountdownContainer = ({ csvData, title, color, share }) => {
  const [timeLeft, setTimeLeft] = useState([]);
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const {
      global: { entries },
    } = csvData;
    const { date } = entries[0];
    const end = moment(date);

    const interval = setInterval(() => {
      setTimeLeft(() => {
        const now = moment();
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

        return timeLeft;
      });
      if (loading) {
        setLoading(false);
      }
    }, 1000);
    setEndDate(moment(date).format('DD [de] MMMM [de] YYYY'));

    return () => clearInterval(interval);
  }, [timeLeft]);

  if (share) {
    return (
      <Share
        title={title}
        color={color}
        animate
        timeLeft={timeLeft}
        loading={loading}
        endDate={endDate}
      />
    );
  }

  return (
    <Countdown
      title={title}
      color={color}
      animate
      timeLeft={timeLeft}
      loading={loading}
      endDate={endDate}
    />
  );
};

CountdownContainer.defaultProps = {
  share: false,
  color: 'gray',
};

CountdownContainer.propTypes = {
  share: PropTypes.bool,
  title: PropTypes.string,
  color: PropTypes.string,
  csvData: PropTypes.shape({
    global: PropTypes.shape({
      entries: PropTypes.arrayOf(
        PropTypes.shape({
          date: PropTypes.string,
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
          global: allPredictionCsv(
            sort: { order: DESC, fields: Date }
            filter: { Region: { eq: "Portugal" }, Prediction_Date: { nin: "" } }
            limit: 1
          ) {
            entries: nodes {
              date: Prediction_Date
            }
          }
        }
      `}
      render={(data) => <CountdownContainer csvData={data} {...props} />}
    />
  );
}

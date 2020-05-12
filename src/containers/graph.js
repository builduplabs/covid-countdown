import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import Graph from '../components/graph';

const INITIAL_FILTER = ['Portugal'];

const reset = (data) => data.map(({ x }) => ({ x, y: null }));

const GraphContainer = ({ csvData }) => {
  const [graph, setData] = useState({
    all: [],
    selected: [],
    xAxisLegend: [],
    regions: [],
  });
  const [loading, setLoading] = useState(true);

  const toggleLegend = (id) => {
    setData(() => {
      const { all, regions } = graph;
      const newRegions = regions.includes(id)
        ? regions.filter((el) => el !== id)
        : [...regions, id];
      const selected = all.map((d) => {
        const shouldShow = newRegions.indexOf(d.id) !== -1;
        if (shouldShow) {
          return { ...d };
        }
        return { ...d, data: reset(d.data) };
      });
      return {
        ...graph,
        selected,
        regions: newRegions,
      };
    });
  };

  useEffect(() => {
    const {
      data: { grouped },
      dates: { values },
    } = csvData;

    const all = grouped.map(({ region, values }) => ({
      id: region,
      data: values.map(({ r, date }) => ({
        x: date,
        y: isNaN(r) ? null : Number(r).toFixed(2),
      })),
    }));

    const selected = all.map(({ id, data }) => {
      if (INITIAL_FILTER.indexOf(id) !== -1) {
        return { id, data };
      }

      return { id, data: reset(data) };
    });

    const regions = INITIAL_FILTER;

    const xAxisLegend = values
      .map(({ date }, index) => {
        if (index % Math.floor(selected[0].data.length / 10) === 0) return date;

        return null;
      })
      .filter(Boolean);

    setData({
      ...graph,
      all,
      selected,
      xAxisLegend,
      regions,
    });
    setLoading(false);
  }, []);

  const { selected, xAxisLegend } = graph;
  return (
    <Graph
      loading={loading}
      graphData={selected}
      xAxisLegend={xAxisLegend}
      toggleLegend={toggleLegend}
    />
  );
};

GraphContainer.propTypes = {
  csvData: PropTypes.shape({
    data: PropTypes.shape({
      grouped: PropTypes.arrayOf(
        PropTypes.shape({
          region: PropTypes.string,
          values: PropTypes.arrayOf(
            PropTypes.shape({
              r: PropTypes.string,
              date: PropTypes.string,
            })
          ),
        })
      ),
    }),
    dates: PropTypes.shape({
      values: PropTypes.arrayOf(
        PropTypes.shape({
          date: PropTypes.string,
        })
      ),
    }),
  }).isRequired,
};

export default function GraphData(props) {
  return (
    <StaticQuery
      query={graphql`
        query {
          data: allPredictionCsv(sort: { fields: Date, order: ASC }) {
            grouped: group(field: Region) {
              region: fieldValue
              values: nodes {
                r: ML
                date: Date(locale: "pt", formatString: "MMMM DD")
              }
            }
          }
          dates: allPredictionCsv(
            sort: { fields: Date, order: ASC }
            filter: { Region: { eq: "Portugal" } }
          ) {
            values: nodes {
              date: Date(locale: "pt", formatString: "MMMM DD")
            }
          }
        }
      `}
      render={(data) => <GraphContainer csvData={data} {...props} />}
    />
  );
}

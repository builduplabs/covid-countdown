import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import Graph from '../components/graph';

const INITIAL_FILTER = ['Portugal'];

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
        return { ...d, data: d.data.map(({ x }) => ({ x, y: null })) };
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
    } = csvData;

    const all = grouped.map(({ region, values }) => ({
      id: region,
      data: values.map(({ r, date }) => ({ x: date, y: Number(r) || null })),
    }));

    const selected = all.filter(({ region }) =>
      INITIAL_FILTER.indexOf(region !== -1)
    );
    const regions = INITIAL_FILTER;

    const xAxisLegend = selected[0].data
      .map(({ x }, index) => {
        if (index % Math.floor(selected[0].data.length / 10) === 0) return x;

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
  }).isRequired,
};

export default function GraphData(props) {
  return (
    <StaticQuery
      query={graphql`
        query {
          data: allPredictionCsv(sort: { fields: Date, order: ASC }) {
            grouped: group(field: Regions) {
              region: fieldValue
              values: nodes {
                r: ML
                date: Date(locale: "pt", formatString: "MMMM DD")
              }
            }
          }
        }
      `}
      render={(data) => <GraphContainer csvData={data} {...props} />}
    />
  );
}

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import Graph from '../components/graph';

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
      global: { entries: countryData },
      regions: { entries: localData },
    } = csvData;

    const selected = countryData;
    const all = [...countryData, ...localData];
    const regions = [countryData[0].id];

    const xAxisLegend = countryData[0].data
      .map(({ x }, index) => {
        if (index % Math.floor(countryData[0].data.length / 10) === 0) return x;

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
    global: PropTypes.shape({
      entries: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string,
          data: PropTypes.arrayOf(
            PropTypes.shape({
              x: PropTypes.string,
              y: PropTypes.string,
            })
          ),
        })
      ),
    }),
    regions: PropTypes.shape({
      entries: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string,
          data: PropTypes.arrayOf(
            PropTypes.shape({
              x: PropTypes.string,
              y: PropTypes.string,
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
          global: allPredictionCsv(
            sort: { fields: Date, order: ASC }
            filter: { Regions: { eq: "Portugal" } }
          ) {
            entries: group(field: Regions) {
              id: fieldValue
              data: nodes {
                y: ML
                x: Date(locale: "pt", formatString: "MMMM DD")
              }
            }
          }
          regions: allPredictionCsv(
            sort: { fields: Date, order: ASC }
            filter: { Regions: { ne: "Portugal" } }
          ) {
            entries: group(field: Regions) {
              id: fieldValue
              data: nodes {
                y: ML
                x: Date(locale: "pt", formatString: "MMMM DD")
              }
            }
          }
        }
      `}
      render={(data) => <GraphContainer csvData={data} {...props} />}
    />
  );
}

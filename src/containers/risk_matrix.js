import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";
import Graph from "../components/risk_matrix";

const reset = (data) => data.map(({ x }) => ({ x, y: null }));

const GraphContainer = ({ csvData }) => {
  const [graph, setData] = useState({
    all: [],
    selected: [],
  });

  const [loading, setLoading] = useState(true);

  const toggleLegend = (id) => {
    setData(() => {
      const { all } = graph;

      const selected = all.map((d) => {
        const shouldHide = d.id === id;
        if (shouldHide) {
          return { ...d, data: reset(d.data) };
        }

        return { ...d };
      });
      return {
        ...graph,
        selected,
      };
    });
  };

  useEffect(() => {
    const {
      data: { values: data },
    } = csvData;

    const dataPoints = data.slice(1).map((entry) => ({
      x: entry.rt_real,
      y: entry.cases_by_100k_real,
      date: entry.date,
    }));

    const all = [
      {
        id: "Histórico",
        data: dataPoints,
      },
      {
        id: "Atual",
        data: [
          {
            x: data[0].rt_real,
            y: data[0].cases_by_100k_real,
            date: data[0].date,
          },
        ],
      },
    ];

    /* const all = data.map((entry, index) => ({
      id: entry.date,
      data: [
        {
          x: entry.rt_real,
          y: entry.cases_by_100k_real,
        },
      ],
    })); */

    const selected = all;

    setData({
      ...graph,
      all,
      selected,
    });
    setLoading(false);
  }, []);

  const { selected } = graph;
  return (
    <Graph loading={loading} graphData={selected} toggleLegend={toggleLegend} />
  );
};

GraphContainer.propTypes = {
  csvData: PropTypes.shape({
    data: PropTypes.shape({
      values: PropTypes.arrayOf(
        PropTypes.shape({
          date: PropTypes.string,
          rt_real: PropTypes.number,
          cases_by_100k_real: PropTypes.number,
        })
      ),
    }),
  }),
};

export default function RiskMatrix(props) {
  return (
    <StaticQuery
      query={graphql`
        query {
          data: allQuadranteCsv(
            filter: {
              rt_real: { gte: 0, lte: 2 }
              cases_by_100k_real: { lte: 240 }
            }
            sort: { fields: date, order: DESC }
          ) {
            values: nodes {
              date
              rt_real
              cases_by_100k_real
            }
          }
        }
      `}
      render={(data) => <GraphContainer csvData={data} {...props} />}
    />
  );
}

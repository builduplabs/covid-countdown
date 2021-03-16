/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import { area } from "d3-shape";
import { ResponsiveScatterPlot } from "@nivo/scatterplot";

const RiskAreas = ({ yScale, xScale, height }) => {
  const areaGenerator = (level) => {
    const offset = 120;
    const areaHeight = (height - offset) / (level.upper ? 2 : 1);

    const generator = area()
      .x((d) => xScale(d.x))
      .y0(() => areaHeight)
      .y1((d) => yScale(d.y));

    return generator(level.data);
  };

  const areas = [
    {
      data: [
        { x: 0.5, y: 0 },
        { x: 0.5, y: 120 },
        { x: 1, y: 120 },
        { x: 1, y: 0 },
      ],
      color: "#01c782",
    },
    {
      data: [
        { x: 1.0, y: 0 },
        { x: 1.0, y: 120 },
        { x: 1.5, y: 120 },
        { x: 1.5, y: 0 },
      ],
      color: "#ffaa16",
    },
    {
      data: [
        { x: 0.5, y: 120 },
        { x: 0.5, y: 240 },
        { x: 1, y: 240 },
        { x: 1, y: 120 },
      ],
      color: "#ff9616",
      upper: true,
    },
    {
      data: [
        { x: 1.0, y: 120 },
        { x: 1.0, y: 240 },
        { x: 1.5, y: 240 },
        { x: 1.5, y: 120 },
      ],
      color: "#ff3f3f",
      upper: true,
    },
  ];

  return areas.map((level, index) => (
    <path
      key={index}
      d={areaGenerator(level)}
      fill={level.color}
      style={{ mixBlendMode: "multiply", pointerEvents: "none" }}
    />
  ));
};

RiskAreas.propTypes = {
  yScale: PropTypes.func,
  xScale: PropTypes.func,
  height: PropTypes.number,
};

const Tooltip = ({ slice }) => {
  const { points } = slice;
  const date = points[0].data.x;

  return (
    <div className="bg-white p-2 border">
      <div className="text-sm text-center">{date}</div>
      {(date === "Maio 04" || date === "maio 04") && (
        <div className="text-xs font-bold mb-2 text-center">
          1ª fase de desconfinamento
        </div>
      )}
      {(date === "Maio 07" || date === "maio 07") && (
        <div className="text-xs font-bold mb-2 text-center">Data baseline</div>
      )}
      {(date === "Maio 18" || date === "maio 18") && (
        <div className="text-xs font-bold mb-2 text-center">
          2ª fase de desconfinamento
        </div>
      )}
      {(date === "Junho 01" || date === "junho 01") && (
        <div className="text-xs font-bold mb-2 text-center">
          3ª fase de desconfinamento
        </div>
      )}
      {(date === "Setembro 15" || date === "setembro 15") && (
        <div className="text-xs font-bold mb-2 text-center">
          Portugal entra em Situação de Contingência
        </div>
      )}
      {(date === "Setembro 24" || date === "setembro 24") && (
        <div className="text-xs font-bold mb-2 text-center">
          Nova Data baseline
        </div>
      )}

      {slice.points.map((point) => (
        <div
          key={point.id}
          className="py-1"
          style={{ color: point.serieColor }}
        >
          <p className="text-sm">
            <strong>Rt {point.serieId}:</strong> {point.data.yFormatted}
          </p>
        </div>
      ))}
    </div>
  );
};

Tooltip.propTypes = {
  slice: PropTypes.shape({
    points: PropTypes.arrayOf(
      PropTypes.shape({
        data: PropTypes.shape({
          x: PropTypes.string,
        }),
      })
    ),
  }).isRequired,
};

const RiskMatrix = ({
  loading,
  graphData,
  maxYValue,
  maxXValue,
  toggleLegend,
}) => {
  if (loading) return null;

  const mobile = window.innerWidth <= 640;
  const legend = {
    anchor: "right",
    direction: "column",
    translateY: 0,
    translateX: mobile ? 60 : 80,
    itemHeight: 25,
    itemWidth: mobile ? 45 : 50,
    // anchor: mobile ? 'right' : 'top',
    // direction: mobile ? 'column' : 'row',
    // translateY: mobile ? 0 : -50,
    // translateX: mobile ? 55 : 0,
    // itemHeight: mobile ? 25 : 30,
    // itemWidth: mobile ? 50 : 70,
  };

  const fontSize = mobile ? 8 : 12;

  const margin = {
    top: 40,
    right: mobile ? 60 : 80,
    bottom: mobile ? 50 : 80,
    left: mobile ? 40 : 50,
    // top: mobile ? 50 : 60,
    // right: mobile ? 55 : 10,
    // bottom: 50,
    // left: mobile ? 35 : 50,
  };

  return (
    <div className="w-full flex-1 sm:h-screen flex flex-col h-full justify-center">
      <div className="w-full flex h-px min-h-1/2 landscape:min-h-3/4 max-h-1/2 sm:max-h-3/4">
        <ResponsiveScatterPlot
          enableSlices="x"
          sliceTooltip={Tooltip}
          colors={{ scheme: "dark2" }}
          theme={{
            fontSize,
            fontFamily: "Montserrat",
            axis: {
              legend: {
                text: {
                  fontSize,
                  fontFamily: "Montserrat",
                },
              },
            },
          }}
          data={graphData}
          margin={margin}
          useMesh
          animate
          axisTop={null}
          axisRight={null}
          yFormat={(e) => e}
          yScale={{
            type: "linear",
            min: 0,
            max: maxYValue,
          }}
          xFormat={(e) => e}
          xScale={{
            type: "linear",
            min: 0.5,
            max: maxXValue,
          }}
          axisLeft={{
            orient: "left",
            tickValues: [0, 40, 80, 120, 160, 200, 240],
            tickSize: 0,
            tickPadding: 10,
            legend: "Incidência",
            legendPosition: "middle",
            legendOffset: mobile ? -30 : -40,
          }}
          axisBottom={{
            orient: "middle",
            tickSize: 0,
            tickPadding: 10,
            legendPosition: "middle",
            legendOffset: 40,
            legend: "Transmissibilidade R(t)",
          }}
          legends={[
            {
              onClick: (d) => {
                toggleLegend(d.id);
              },
              justify: false,
              itemsSpacing: 0,
              itemDirection: "right-to-left",
              itemOpacity: 0.75,
              symbolSize: 10,
              symbolShape: "circle",
              ...legend,
            },
          ]}
          layers={[
            "grid",
            "axes",
            RiskAreas,
            "nodes",
            "markers",
            "mesh",
            "legends",
          ]}
        />
      </div>
    </div>
  );
};

RiskMatrix.defaultProps = {
  graphData: [],
  xAxisLegend: [],
  maxYValue: 240,
  maxXValue: 1.5,
};

RiskMatrix.propTypes = {
  toggleLegend: PropTypes.func,
  xAxisLegend: PropTypes.arrayOf(PropTypes.string),
  graphData: PropTypes.arrayOf(PropTypes.shape({})),
  loading: PropTypes.bool,
  maxYValue: PropTypes.number,
  maxXValue: PropTypes.number,
};

export default RiskMatrix;

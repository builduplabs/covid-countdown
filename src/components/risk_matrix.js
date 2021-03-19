/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import { area, line } from "d3-shape";
import { ResponsiveScatterPlot } from "@nivo/scatterplot";
import moment from "moment";

const RiskAreas = ({ yScale, xScale, height }) => {
  const mobile = window.innerWidth <= 640;
  const areaGenerator = (level) => {
    const offset = mobile ? 90 : 120;
    const areaHeight = (height - offset) / (level.upper ? 2 : 1);

    const generator = area()
      .x((d) => xScale(d.x))
      .y0(() => areaHeight)
      .y1((d) => yScale(d.y));

    return generator(level.data);
  };

  const lineGenerator = (start, end) => {
    const scaleValues = (arr) => {
      if (arr.length > 2) return arr;

      return arr.map((value, index) =>
        index % 2 ? yScale(value) : xScale(value)
      );
    };

    start = scaleValues(start);
    end = scaleValues(end);

    return line()([start, end]);
  };

  const areas = [
    {
      data: [
        { x: 0, y: 0 },
        { x: 0, y: 120 },
        { x: 1, y: 120 },
        { x: 1, y: 0 },
      ],
      color: "#01c782",
    },
    {
      data: [
        { x: 1.0, y: 0 },
        { x: 1.0, y: 120 },
        { x: 2, y: 120 },
        { x: 2, y: 0 },
      ],
      color: "#ffaa16",
    },
    {
      data: [
        { x: 0, y: 120 },
        { x: 0, y: 240 },
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
        { x: 2, y: 240 },
        { x: 2, y: 120 },
      ],
      color: "#ff3f3f",
      upper: true,
    },
  ];

  const lines = [
    {
      start: [0, 120],
      end: [2, 120],
    },
    {
      start: [1, 0],
      end: [1, 240],
    },
  ];

  return (
    <>
      {lines.map((line, index) => (
        <path
          key={`line-${index}`}
          d={lineGenerator(line.start, line.end)}
          fill="none"
          stroke="black"
        />
      ))}
      {areas.map((level, index) => (
        <path
          key={index}
          d={areaGenerator(level)}
          fill={level.color}
          style={{ mixBlendMode: "multiply", pointerEvents: "none" }}
        />
      ))}
    </>
  );
};

RiskAreas.propTypes = {
  yScale: PropTypes.func,
  xScale: PropTypes.func,
  height: PropTypes.number,
};

const Tooltip = ({ node }) => {
  const {
    data: { date, formattedX: rt, formattedY: cases_by_100k },
  } = node;

  const roundBy = (number, decimal) =>
    Math.round((number + Number.EPSILON) * Math.pow(10, decimal)) /
    Math.pow(10, decimal);

  return (
    <div className="bg-white p-2 border">
      <div className="text-xs text-center">{date}</div>

      <div className="py-1">
        <p className="text-xs">
          <strong>Rt:</strong> {roundBy(rt, 3)}
        </p>
      </div>
      <div className="py-1">
        <p className="text-xs">
          <strong>Incidência:</strong> {roundBy(cases_by_100k, 2)}
        </p>
      </div>
    </div>
  );
};

Tooltip.propTypes = {
  node: PropTypes.shape({
    data: PropTypes.shape({
      formattedX: PropTypes.number,
      formattedY: PropTypes.number,
      date: PropTypes.string,
    }),
    style: PropTypes.shape({
      color: PropTypes.string,
    }),
  }).isRequired,
};

const CustomNode = ({
  node,
  x,
  y,
  size,
  color,
  blendMode,
  onMouseEnter,
  onMouseMove,
  onMouseLeave,
  onClick,
}) => {
  const age = moment().diff(moment(node.data.date), "days");

  const opacity = -1 * Math.pow(age / 20, 2) + 1;

  console.log("opacity = ", opacity);

  if (node.data.serieId === "Atual") {
    return (
      <g transform={`translate(${x},${y}) rotate(45)`}>
        <rect
          x={size * -0.5}
          y={size * -0.5}
          width={size}
          height={size}
          fill={color}
          style={{ mixBlendMode: blendMode, opacity }}
          onMouseEnter={onMouseEnter}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          onClick={onClick}
        />
      </g>
    );
  }

  return (
    <g transform={`translate(${x},${y})`}>
      <circle
        r={size / 2}
        fill={color}
        style={{ mixBlendMode: blendMode, opacity }}
        onMouseEnter={onMouseEnter}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
      />
    </g>
  );
};

CustomNode.propTypes = {
  node: PropTypes.shape({
    data: PropTypes.shape({
      serieId: PropTypes.string,
      date: PropTypes.string,
    }),
  }),
  x: PropTypes.number,
  y: PropTypes.number,
  size: PropTypes.number,
  color: PropTypes.string,
  blendMode: PropTypes.string,
  onMouseEnter: PropTypes.func,
  onMouseMove: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onClick: PropTypes.func,
};

const RiskMatrix = ({
  loading,
  graphData,
  maxYValue,
  maxXValue,
  toggleLegend,
  share,
}) => {
  if (loading) return null;

  const mobile = window.innerWidth <= 640;
  const legend = {
    anchor: "right",
    direction: "column",
    translateY: 0,
    translateX: mobile ? 50 : 10,
    itemHeight: 25,
    itemWidth: mobile ? 45 : 0,
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
    right: mobile ? 80 : 100,
    bottom: mobile ? 50 : 80,
    left: mobile ? 40 : 50,
    // top: mobile ? 50 : 60,
    // right: mobile ? 55 : 10,
    // bottom: 50,
    // left: mobile ? 35 : 50,
  };

  return (
    <div
      className={`w-full flex-1 ${share ? "" : "sm:h-screen"} flex flex-col ${
        share ? "" : "h-full"
      } justify-center`}
    >
      <div className="w-full flex h-px min-h-1/2 landscape:min-h-1/2 max-h-1/2 sm:max-h-3/4">
        <ResponsiveScatterPlot
          colors={["#e0e0e0", "black"]}
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
          tooltip={Tooltip}
          data={graphData}
          margin={margin}
          enableGridX={false}
          enableGridY={false}
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
            min: 0,
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
              itemDirection: "left-to-right",
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
          renderNode={CustomNode}
        />
      </div>
    </div>
  );
};

RiskMatrix.defaultProps = {
  graphData: [],
  xAxisLegend: [],
  maxYValue: 240,
  maxXValue: 2,
};

RiskMatrix.propTypes = {
  toggleLegend: PropTypes.func,
  xAxisLegend: PropTypes.arrayOf(PropTypes.string),
  graphData: PropTypes.arrayOf(PropTypes.shape({})),
  loading: PropTypes.bool,
  maxYValue: PropTypes.number,
  maxXValue: PropTypes.number,
  share: PropTypes.bool,
};

export default RiskMatrix;

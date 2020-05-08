import React from 'react';
import PropTypes from 'prop-types';
import { ResponsiveLine } from '@nivo/line';

// const COLORS = [
//   '#1A202C',
//   '#2D3748',
//   '#4A5568',
//   '#718096',
//   '#A0AEC0',
//   '#CBD5E0',
// ];

const Tooltip = ({ slice }) => {
  const { points } = slice;
  return (
    <div className="bg-white p-2 border">
      <div className="text-sm mb-2 text-center">{points[0].data.x}</div>
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

const Graph = ({ loading, graphData, xAxisLegend, toggleLegend, maxValue }) => {
  if (loading || !graphData.length) return null;

  return (
    <div className="w-full flex-1 sm:h-screen flex flex-col h-full justify-center">
      <h2 className="flex w-full text-3xl text-gray-600 text-center px-4">
        Evolução Rt
      </h2>
      <div className="w-full flex h-px min-h-1/2 max-h-1/2 sm:max-h-3/4">
        <ResponsiveLine
          colors={{ scheme: 'category10' }}
          data={graphData}
          margin={{ top: 60, right: 10, bottom: 50, left: 50 }}
          axisTop={null}
          axisRight={null}
          yScale={{
            type: 'linear',
            min: 0,
            max: maxValue,
          }}
          enableSlices="x"
          sliceTooltip={Tooltip}
          useMesh
          animate
          axisBottom={{
            tickValues: xAxisLegend,
            orient: 'bottom',
            tickSize: 0,
            tickPadding: 10,
            tickRotation: -55,
          }}
          axisLeft={{
            orient: 'left',
            tickSize: 0,
            tickPadding: 10,
            legend: 'Rt',
            legendOffset: -40,
            legendPosition: 'middle',
          }}
          enableGridX={false}
          markers={[
            {
              axis: 'y',
              value: 1,
              lineStyle: { stroke: 'black', strokeWidth: 2 },
            },
          ]}
          legends={[
            {
              onClick: (d) => {
                toggleLegend(d.id);
              },
              anchor: 'top',
              direction: 'row',
              justify: false,
              translateX: 0,
              translateY: -50,
              itemsSpacing: 0,
              itemDirection: 'right-to-left',
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: 'circle',
            },
          ]}
        />
      </div>
    </div>
  );
};

Graph.defaultProps = {
  graphData: [],
  xAxisLegend: [],
  maxValue: 5,
};

Graph.propTypes = {
  toggleLegend: PropTypes.func.isRequired,
  xAxisLegend: PropTypes.arrayOf(PropTypes.string),
  graphData: PropTypes.arrayOf(PropTypes.shape({})),
  loading: PropTypes.bool.isRequired,
  maxValue: PropTypes.number,
};

export default Graph;

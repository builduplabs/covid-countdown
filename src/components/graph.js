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
  const date = points[0].data.x;
  return (
    <div className="bg-white p-2 border">
      <div className="text-sm text-center">{date}</div>
      {(date === 'Maio 04' || date === 'maio 04') && (
        <div className="text-xs font-bold mb-2 text-center">
          1ª fase de desconfinamento
        </div>
      )}
      {(date === 'Maio 07' || date === 'maio 07') && (
        <div className="text-xs font-bold mb-2 text-center">Data baseline</div>
      )}
      {(date === 'Maio 18' || date === 'maio 18') && (
        <div className="text-xs font-bold mb-2 text-center">
          2ª fase de desconfinamento
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

const Graph = ({ loading, graphData, xAxisLegend, toggleLegend, maxValue }) => {
  if (loading || !graphData.length) return null;

  // const mobile = window.innerWidth <= 640;
  const mobile = true;
  const legend = {
    anchor: mobile ? 'right' : 'top',
    direction: mobile ? 'column' : 'row',
    translateY: mobile ? 0 : -50,
    translateX: mobile ? 80 : 0,
    itemHeight: mobile ? 35 : 20,
  };

  return (
    <div className="w-full flex-1 sm:h-screen flex flex-col h-full justify-center">
      <div className="w-full flex h-px min-h-1/2 max-h-1/2 sm:max-h-3/4">
        <ResponsiveLine
          colors={{ scheme: 'category10' }}
          data={graphData}
          margin={{
            top: mobile ? 50 : 60,
            right: mobile ? 80 : 10,
            bottom: 50,
            left: 50,
          }}
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
            {
              axis: 'x',
              value: 'maio 04',
              lineStyle: { stroke: 'black', strokeWidth: 1 },
            },
            {
              axis: 'x',
              value: 'maio 07',
              lineStyle: { stroke: '#bdbdbd', strokeWidth: 1 },
            },
            {
              axis: 'x',
              value: 'maio 18',
              lineStyle: { stroke: 'black', strokeWidth: 1 },
            },
            {
              axis: 'x',
              value: 'Maio 04',
              lineStyle: { stroke: 'black', strokeWidth: 1 },
            },
            {
              axis: 'x',
              value: 'Maio 07',
              lineStyle: { stroke: '#bdbdbd', strokeWidth: 1 },
            },
            {
              axis: 'x',
              value: 'Maio 18',
              lineStyle: { stroke: 'black', strokeWidth: 1 },
            },
          ]}
          legends={[
            {
              onClick: (d) => {
                toggleLegend(d.id);
              },
              ...legend,
              justify: false,
              itemsSpacing: 0,
              itemDirection: 'right-to-left',
              itemWidth: 70,
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

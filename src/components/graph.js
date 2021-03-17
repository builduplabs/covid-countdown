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
      {(date === 'Junho 01' || date === 'junho 01') && (
        <div className="text-xs font-bold mb-2 text-center">
          3ª fase de desconfinamento
        </div>
      )}
      {(date === 'Setembro 15' || date === 'setembro 15') && (
        <div className="text-xs font-bold mb-2 text-center">
          Portugal entra em Situação de Contingência
        </div>
      )}
      {(date === 'Setembro 24' || date === 'setembro 24') && (
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
      }),
    ),
  }).isRequired,
};

const Graph = ({ loading, graphData, xAxisLegend, toggleLegend, maxValue }) => {
  if (loading || !graphData.length) return null;
  const mobile = window.innerWidth <= 640;
  const legend = {
    anchor: 'right',
    direction: 'column',
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
  const fontSize = mobile ? 8 : 12;

  return (
    <div className="w-full flex-1 sm:h-screen flex flex-col h-full justify-center">
      <div className="w-full flex h-px min-h-1/2 landscape:min-h-3/4 max-h-1/2 sm:max-h-3/4">
        <ResponsiveLine
          colors={{ scheme: 'category10' }}
          theme={{
            fontSize,
            fontFamily: 'Montserrat',
            axis: {
              legend: {
                text: {
                  fontSize,
                  fontFamily: 'Montserrat',
                },
              },
            },
          }}
          data={graphData}
          margin={margin}
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
            legendOffset: mobile ? -30 : -40,
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
            {
              axis: 'x',
              value: 'Junho 01',
              lineStyle: { stroke: 'black', strokeWidth: 1 },
            },
            {
              axis: 'x',
              value: 'junho 01',
              lineStyle: { stroke: 'black', strokeWidth: 1 },
            },
            {
              axis: 'x',
              value: 'Setembro 15',
              lineStyle: { stroke: 'black', strokeWidth: 1 },
            },
            {
              axis: 'x',
              value: 'setembro 15',
              lineStyle: { stroke: 'black', strokeWidth: 1 },
            },
            {
              axis: 'x',
              value: 'Setembro 24',
              lineStyle: { stroke: '#bdbdbd', strokeWidth: 1 },
            },
            {
              axis: 'x',
              value: 'setembro 24',
              lineStyle: { stroke: '#bdbdbd', strokeWidth: 1 },
            },
          ]}
          legends={[
            {
              onClick: (d) => {
                toggleLegend(d.id);
              },
              justify: false,
              itemsSpacing: 0,
              itemDirection: 'right-to-left',
              itemOpacity: 0.75,
              symbolSize: 10,
              symbolShape: 'circle',
              ...legend,
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

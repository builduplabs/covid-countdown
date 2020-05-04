import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import { ResponsiveBar } from '@nivo/bar';

import Layout from '../components/layout';
import SEO from '../components/seo';

const barData = [
  {
    country: 'AD',
    'hot dog': 79,
    'hot dogColor': 'hsl(140, 70%, 50%)',
    burger: 60,
    burgerColor: 'hsl(237, 70%, 50%)',
    sandwich: 155,
    sandwichColor: 'hsl(276, 70%, 50%)',
    kebab: 42,
    kebabColor: 'hsl(59, 70%, 50%)',
    fries: 10,
    friesColor: 'hsl(53, 70%, 50%)',
    donut: 161,
    donutColor: 'hsl(83, 70%, 50%)',
  },
  {
    country: 'AE',
    'hot dog': 93,
    'hot dogColor': 'hsl(141, 70%, 50%)',
    burger: 141,
    burgerColor: 'hsl(67, 70%, 50%)',
    sandwich: 2,
    sandwichColor: 'hsl(186, 70%, 50%)',
    kebab: 49,
    kebabColor: 'hsl(200, 70%, 50%)',
    fries: 14,
    friesColor: 'hsl(197, 70%, 50%)',
    donut: 161,
    donutColor: 'hsl(107, 70%, 50%)',
  },
  {
    country: 'AF',
    'hot dog': 181,
    'hot dogColor': 'hsl(150, 70%, 50%)',
    burger: 49,
    burgerColor: 'hsl(297, 70%, 50%)',
    sandwich: 4,
    sandwichColor: 'hsl(129, 70%, 50%)',
    kebab: 95,
    kebabColor: 'hsl(287, 70%, 50%)',
    fries: 86,
    friesColor: 'hsl(31, 70%, 50%)',
    donut: 13,
    donutColor: 'hsl(283, 70%, 50%)',
  },
  {
    country: 'AG',
    'hot dog': 7,
    'hot dogColor': 'hsl(161, 70%, 50%)',
    burger: 135,
    burgerColor: 'hsl(195, 70%, 50%)',
    sandwich: 51,
    sandwichColor: 'hsl(281, 70%, 50%)',
    kebab: 67,
    kebabColor: 'hsl(260, 70%, 50%)',
    fries: 146,
    friesColor: 'hsl(154, 70%, 50%)',
    donut: 67,
    donutColor: 'hsl(40, 70%, 50%)',
  },
  {
    country: 'AI',
    'hot dog': 57,
    'hot dogColor': 'hsl(9, 70%, 50%)',
    burger: 170,
    burgerColor: 'hsl(226, 70%, 50%)',
    sandwich: 11,
    sandwichColor: 'hsl(75, 70%, 50%)',
    kebab: 80,
    kebabColor: 'hsl(263, 70%, 50%)',
    fries: 83,
    friesColor: 'hsl(52, 70%, 50%)',
    donut: 34,
    donutColor: 'hsl(145, 70%, 50%)',
  },
  {
    country: 'AL',
    'hot dog': 134,
    'hot dogColor': 'hsl(71, 70%, 50%)',
    burger: 70,
    burgerColor: 'hsl(102, 70%, 50%)',
    sandwich: 155,
    sandwichColor: 'hsl(31, 70%, 50%)',
    kebab: 53,
    kebabColor: 'hsl(87, 70%, 50%)',
    fries: 191,
    friesColor: 'hsl(38, 70%, 50%)',
    donut: 126,
    donutColor: 'hsl(281, 70%, 50%)',
  },
  {
    country: 'AM',
    'hot dog': 151,
    'hot dogColor': 'hsl(120, 70%, 50%)',
    burger: 129,
    burgerColor: 'hsl(72, 70%, 50%)',
    sandwich: 162,
    sandwichColor: 'hsl(21, 70%, 50%)',
    kebab: 161,
    kebabColor: 'hsl(234, 70%, 50%)',
    fries: 186,
    friesColor: 'hsl(89, 70%, 50%)',
    donut: 41,
    donutColor: 'hsl(38, 70%, 50%)',
  },
];

const MyResponsiveBar = () => (
  <ResponsiveBar
    data={barData}
    keys={['hot dog', 'burger', 'sandwich', 'kebab', 'fries', 'donut']}
    indexBy="country"
    margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
    padding={0.3}
    colors={{ scheme: 'nivo' }}
    defs={[
      {
        id: 'dots',
        type: 'patternDots',
        background: 'inherit',
        color: '#38bcb2',
        size: 4,
        padding: 1,
        stagger: true,
      },
      {
        id: 'lines',
        type: 'patternLines',
        background: 'inherit',
        color: '#eed312',
        rotation: -45,
        lineWidth: 6,
        spacing: 10,
      },
    ]}
    fill={[
      {
        match: {
          id: 'fries',
        },
        id: 'dots',
      },
      {
        match: {
          id: 'sandwich',
        },
        id: 'lines',
      },
    ]}
    borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
    axisTop={null}
    axisRight={null}
    axisBottom={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'country',
      legendPosition: 'middle',
      legendOffset: 32,
    }}
    axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'food',
      legendPosition: 'middle',
      legendOffset: -40,
    }}
    labelSkipWidth={12}
    labelSkipHeight={12}
    labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
    legends={[
      {
        dataFrom: 'keys',
        anchor: 'bottom-right',
        direction: 'column',
        justify: false,
        translateX: 120,
        translateY: 0,
        itemsSpacing: 2,
        itemWidth: 100,
        itemHeight: 20,
        itemDirection: 'left-to-right',
        itemOpacity: 0.85,
        symbolSize: 20,
        effects: [
          {
            on: 'hover',
            style: {
              itemOpacity: 1,
            },
          },
        ],
      },
    ]}
    animate
    motionStiffness={90}
    motionDamping={15}
  />
);

const lineData = [
  {
    id: 'japan',
    color: 'hsl(237, 70%, 50%)',
    data: [
      {
        x: 'plane',
        y: 282,
      },
      {
        x: 'helicopter',
        y: 139,
      },
      {
        x: 'boat',
        y: 125,
      },
      {
        x: 'train',
        y: 95,
      },
      {
        x: 'subway',
        y: 291,
      },
      {
        x: 'bus',
        y: 24,
      },
      {
        x: 'car',
        y: 299,
      },
      {
        x: 'moto',
        y: 256,
      },
      {
        x: 'bicycle',
        y: 143,
      },
      {
        x: 'horse',
        y: 179,
      },
      {
        x: 'skateboard',
        y: 20,
      },
      {
        x: 'others',
        y: 21,
      },
    ],
  },
  {
    id: 'france',
    color: 'hsl(34, 70%, 50%)',
    data: [
      {
        x: 'plane',
        y: 0,
      },
      {
        x: 'helicopter',
        y: 264,
      },
      {
        x: 'boat',
        y: 171,
      },
      {
        x: 'train',
        y: 160,
      },
      {
        x: 'subway',
        y: 145,
      },
      {
        x: 'bus',
        y: 157,
      },
      {
        x: 'car',
        y: 202,
      },
      {
        x: 'moto',
        y: 63,
      },
      {
        x: 'bicycle',
        y: 75,
      },
      {
        x: 'horse',
        y: 244,
      },
      {
        x: 'skateboard',
        y: 186,
      },
      {
        x: 'others',
        y: 46,
      },
    ],
  },
  {
    id: 'us',
    color: 'hsl(301, 70%, 50%)',
    data: [
      {
        x: 'plane',
        y: 262,
      },
      {
        x: 'helicopter',
        y: 180,
      },
      {
        x: 'boat',
        y: 172,
      },
      {
        x: 'train',
        y: 215,
      },
      {
        x: 'subway',
        y: 45,
      },
      {
        x: 'bus',
        y: 190,
      },
      {
        x: 'car',
        y: 121,
      },
      {
        x: 'moto',
        y: 49,
      },
      {
        x: 'bicycle',
        y: 257,
      },
      {
        x: 'horse',
        y: 126,
      },
      {
        x: 'skateboard',
        y: 3,
      },
      {
        x: 'others',
        y: 164,
      },
    ],
  },
  {
    id: 'germany',
    color: 'hsl(110, 70%, 50%)',
    data: [
      {
        x: 'plane',
        y: 193,
      },
      {
        x: 'helicopter',
        y: 38,
      },
      {
        x: 'boat',
        y: 88,
      },
      {
        x: 'train',
        y: 104,
      },
      {
        x: 'subway',
        y: 48,
      },
      {
        x: 'bus',
        y: 134,
      },
      {
        x: 'car',
        y: 107,
      },
      {
        x: 'moto',
        y: 267,
      },
      {
        x: 'bicycle',
        y: 273,
      },
      {
        x: 'horse',
        y: 45,
      },
      {
        x: 'skateboard',
        y: 140,
      },
      {
        x: 'others',
        y: 135,
      },
    ],
  },
  {
    id: 'norway',
    color: 'hsl(349, 70%, 50%)',
    data: [
      {
        x: 'plane',
        y: 293,
      },
      {
        x: 'helicopter',
        y: 231,
      },
      {
        x: 'boat',
        y: 37,
      },
      {
        x: 'train',
        y: 34,
      },
      {
        x: 'subway',
        y: 195,
      },
      {
        x: 'bus',
        y: 254,
      },
      {
        x: 'car',
        y: 161,
      },
      {
        x: 'moto',
        y: 73,
      },
      {
        x: 'bicycle',
        y: 233,
      },
      {
        x: 'horse',
        y: 122,
      },
      {
        x: 'skateboard',
        y: 200,
      },
      {
        x: 'others',
        y: 230,
      },
    ],
  },
];

const MyResponsiveLine = () => (
  <ResponsiveLine
    data={lineData}
    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
    xScale={{ type: 'point' }}
    yScale={{
      type: 'linear',
      min: 'auto',
      max: 'auto',
      stacked: true,
      reverse: false,
    }}
    axisTop={null}
    axisRight={null}
    axisBottom={{
      orient: 'bottom',
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'transportation',
      legendOffset: 36,
      legendPosition: 'middle',
    }}
    axisLeft={{
      orient: 'left',
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'count',
      legendOffset: -40,
      legendPosition: 'middle',
    }}
    colors={{ scheme: 'nivo' }}
    pointSize={10}
    pointColor={{ theme: 'background' }}
    pointBorderWidth={2}
    pointBorderColor={{ from: 'serieColor' }}
    pointLabel="y"
    pointLabelYOffset={-12}
    enableArea
    areaOpacity={0.15}
    useMesh
    legends={[
      {
        anchor: 'bottom-right',
        direction: 'column',
        justify: false,
        translateX: 100,
        translateY: 0,
        itemsSpacing: 0,
        itemDirection: 'left-to-right',
        itemWidth: 80,
        itemHeight: 20,
        itemOpacity: 0.75,
        symbolSize: 12,
        symbolShape: 'circle',
        symbolBorderColor: 'rgba(0, 0, 0, .5)',
        effects: [
          {
            on: 'hover',
            style: {
              itemBackground: 'rgba(0, 0, 0, .03)',
              itemOpacity: 1,
            },
          },
        ],
      },
    ]}
  />
);

function GraphsPage() {
  return (
    <Layout>
      <SEO
        keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
        title="About"
      />

      <div className="w-full flex flex-col justify-center">
        <MyResponsiveLine />
        <MyResponsiveBar />
      </div>
    </Layout>
  );
}

export default GraphsPage;

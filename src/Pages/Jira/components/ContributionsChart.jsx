import React from 'react';
import ReactCalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

const ContributionsChart = ({ data ,tooltipDataAttrs ,titleForValue}) => {
  return (
    <ReactCalendarHeatmap
      startDate={new Date('2023-01-01')}
      endDate={new Date('2023-12-30')}
      values={data}
      tooltipDataAttrs={tooltipDataAttrs}
      titleForValue ={titleForValue}
      gutterSize={10}
    />
  );
};

export default ContributionsChart;

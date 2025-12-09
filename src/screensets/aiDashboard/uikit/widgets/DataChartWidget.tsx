/**
 * DataChartWidget
 * Line/area chart for time series data
 */

import React from 'react';
import type { DataChartWidget as DataChartWidgetType } from '../../types';
import { WidgetContainer } from './WidgetContainer';

interface DataChartWidgetProps {
  widget: DataChartWidgetType;
  className?: string;
}

export const DataChartWidget: React.FC<DataChartWidgetProps> = ({
  widget,
  className = '',
}) => {
  const { title, data, chartType = 'line', color = '#2668c5' } = widget;

  if (data.length === 0) {
    return (
      <WidgetContainer title={title} className={className}>
        <div className="flex h-32 items-center justify-center text-muted-foreground">
          No data available
        </div>
      </WidgetContainer>
    );
  }

  const maxValue = Math.max(...data.map((d) => d.value));
  const minValue = Math.min(...data.map((d) => d.value));
  const range = maxValue - minValue || 1;
  const padding = 10;
  const width = 100;
  const height = 60;

  const points = data.map((d, i) => {
    const x = padding + (i / (data.length - 1 || 1)) * (width - 2 * padding);
    const y = height - padding - ((d.value - minValue) / range) * (height - 2 * padding);
    return { x, y };
  });

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`;

  return (
    <WidgetContainer title={title} className={className}>
      <div className="h-32 w-full">
        <svg className="h-full w-full" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
          {chartType === 'area' && (
            <path
              d={areaPath}
              fill={color}
              fillOpacity={0.1}
            />
          )}
          <path
            d={linePath}
            fill="none"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {points.map((p, i) => (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r="2"
              fill={color}
            />
          ))}
        </svg>
      </div>
    </WidgetContainer>
  );
};

DataChartWidget.displayName = 'DataChartWidget';

export default DataChartWidget;

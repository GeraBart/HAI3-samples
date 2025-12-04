import React from 'react';

interface BarChartWidgetProps {
  data?: number[];
  colors?: string[];
  height?: number;
}

const DEFAULT_COLORS = [
  '#2668C5',
  '#408BEA',
  '#6BA3F0',
  '#9CBDF5',
  '#C5D7FA',
];

/**
 * BarChartWidget - Simple bar chart visualization matching Figma design
 * Displays multiple colored vertical bars
 */
export const BarChartWidget: React.FC<BarChartWidgetProps> = ({
  data = [60, 80, 45, 90, 70, 55, 85, 40, 75, 65],
  colors = DEFAULT_COLORS,
  height = 60,
}) => {
  const maxValue = Math.max(...data);

  return (
    <div className="flex items-end gap-1 w-full" style={{ height }}>
      {data.map((value, index) => {
        const barHeight = (value / maxValue) * 100;
        const color = colors[index % colors.length];
        return (
          <div
            key={index}
            className="flex-1 rounded-t-sm"
            style={{
              height: `${barHeight}%`,
              backgroundColor: color,
              minWidth: 4,
            }}
          />
        );
      })}
    </div>
  );
};

BarChartWidget.displayName = 'BarChartWidget';

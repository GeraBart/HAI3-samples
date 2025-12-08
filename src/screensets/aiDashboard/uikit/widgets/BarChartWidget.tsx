/**
 * BarChartWidget
 * Vertical/horizontal bar chart
 */

import React from 'react';
import type { BarChartWidget as BarChartWidgetType } from '../../types';
import { WidgetContainer } from './WidgetContainer';

interface BarChartWidgetProps {
  widget: BarChartWidgetType;
  className?: string;
}

const DEFAULT_COLORS = [
  '#ef4444', // red
  '#f97316', // orange
  '#eab308', // yellow
  '#22c55e', // green
  '#3b82f6', // blue
];

export const BarChartWidget: React.FC<BarChartWidgetProps> = ({
  widget,
  className = '',
}) => {
  const { title, data, orientation = 'vertical', showLegend = false, legendItems } = widget;

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

  return (
    <WidgetContainer title={title} className={className}>
      <div className="flex flex-col gap-4">
        {showLegend && legendItems && legendItems.length > 0 && (
          <div className="flex flex-wrap gap-4 text-xs">
            {legendItems.map((item, index) => (
              <div key={index} className="flex items-center gap-1">
                <div
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-muted-foreground">{item.label}</span>
              </div>
            ))}
          </div>
        )}
        <div
          className={`flex ${
            orientation === 'vertical'
              ? 'h-32 items-end gap-1'
              : 'flex-col gap-2'
          }`}
        >
          {data.map((item, index) => {
            const percentage = maxValue > 0 ? (item.value / maxValue) * 100 : 0;
            const color = item.color || DEFAULT_COLORS[index % DEFAULT_COLORS.length];

            if (orientation === 'horizontal') {
              return (
                <div key={index} className="flex items-center gap-2">
                  <span className="w-16 truncate text-xs text-muted-foreground">
                    {item.label}
                  </span>
                  <div className="flex-1 h-4 rounded bg-muted/20">
                    <div
                      className="h-full rounded"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: color,
                      }}
                    />
                  </div>
                  <span className="w-8 text-right text-xs font-medium">
                    {item.value}
                  </span>
                </div>
              );
            }

            return (
              <div
                key={index}
                className="flex flex-1 flex-col items-center gap-1"
              >
                <div
                  className="w-full rounded-t"
                  style={{
                    height: `${percentage}%`,
                    backgroundColor: color,
                    minHeight: '4px',
                  }}
                />
                <span className="text-[10px] text-muted-foreground">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </WidgetContainer>
  );
};

BarChartWidget.displayName = 'BarChartWidget';

export default BarChartWidget;

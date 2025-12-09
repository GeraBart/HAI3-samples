/**
 * StatusChartWidget
 * Donut/ring chart for status distribution
 */

import React from 'react';
import type { StatusChartWidget as StatusChartWidgetType } from '../../types';
import { WidgetContainer } from './WidgetContainer';

interface StatusChartWidgetProps {
  widget: StatusChartWidgetType;
  className?: string;
}

export const StatusChartWidget: React.FC<StatusChartWidgetProps> = ({
  widget,
  className = '',
}) => {
  const { title, data, legend } = widget;
  const percentage = data.total > 0 ? (data.value / data.total) * 100 : 0;
  const circumference = 2 * Math.PI * 40;
  const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;
  const color = data.color || 'hsl(var(--primary))';

  return (
    <WidgetContainer title={title} className={className}>
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex h-24 w-24 items-center justify-center">
          <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              className="text-muted/20"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke={color}
              strokeWidth="8"
              strokeDasharray={strokeDasharray}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute flex flex-col items-center justify-center">
            <span className="text-lg font-bold">{data.value}</span>
            <span className="text-xs text-muted-foreground">{data.label}</span>
          </div>
        </div>
        {legend && legend.length > 0 && (
          <div className="flex flex-col gap-2">
            {legend.map((item, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <div
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-muted-foreground">{item.label}:</span>
                <span className="font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </WidgetContainer>
  );
};

StatusChartWidget.displayName = 'StatusChartWidget';

export default StatusChartWidget;

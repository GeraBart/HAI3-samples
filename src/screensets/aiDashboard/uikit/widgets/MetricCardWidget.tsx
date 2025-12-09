/**
 * MetricCardWidget
 * Single KPI display with value and optional trend indicator
 */

import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import type { MetricCardWidget as MetricCardWidgetType } from '../../types';
import { WidgetContainer } from './WidgetContainer';

interface MetricCardWidgetProps {
  widget: MetricCardWidgetType;
  className?: string;
}

export const MetricCardWidget: React.FC<MetricCardWidgetProps> = ({
  widget,
  className = '',
}) => {
  const { title, value, trend, subtitle } = widget;

  const getTrendIcon = () => {
    if (!trend) return null;
    switch (trend.direction) {
      case 'up':
        return <TrendingUp className="h-3 w-3 text-green-500" />;
      case 'down':
        return <TrendingDown className="h-3 w-3 text-red-500" />;
      default:
        return <Minus className="h-3 w-3 text-muted-foreground" />;
    }
  };

  const getTrendColor = () => {
    if (!trend) return '';
    switch (trend.direction) {
      case 'up':
        return 'text-green-500';
      case 'down':
        return 'text-red-500';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <WidgetContainer title={title} className={className}>
      <div className="flex flex-col gap-1">
        <div className="text-2xl font-bold">{value}</div>
        {trend && (
          <div className={`flex items-center gap-1 text-xs ${getTrendColor()}`}>
            {getTrendIcon()}
            <span>{trend.value}</span>
          </div>
        )}
        {subtitle && (
          <div className="text-xs text-muted-foreground">{subtitle}</div>
        )}
      </div>
    </WidgetContainer>
  );
};

MetricCardWidget.displayName = 'MetricCardWidget';

export default MetricCardWidget;

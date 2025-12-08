/**
 * WidgetGrid
 * Responsive grid layout for dashboard widgets
 */

import React from 'react';
import type { Widget } from '../../../../types';
import {
  StatusChartWidget,
  DataChartWidget,
  BarChartWidget,
  TableWidget,
  MetricCardWidget,
} from '../../../../uikit/widgets';

interface WidgetGridProps {
  widgets: Widget[];
}

export const WidgetGrid: React.FC<WidgetGridProps> = ({ widgets }) => {
  const renderWidget = (widget: Widget) => {
    switch (widget.type) {
      case 'status-chart':
        return <StatusChartWidget key={widget.id} widget={widget} />;
      case 'data-chart':
        return <DataChartWidget key={widget.id} widget={widget} />;
      case 'bar-chart':
        return <BarChartWidget key={widget.id} widget={widget} />;
      case 'table':
        return <TableWidget key={widget.id} widget={widget} className="col-span-full" />;
      case 'metric-card':
        return <MetricCardWidget key={widget.id} widget={widget} />;
      default:
        return null;
    }
  };

  const statusCharts = widgets.filter((w) => w.type === 'status-chart');
  const barCharts = widgets.filter((w) => w.type === 'bar-chart');
  const tables = widgets.filter((w) => w.type === 'table');

  return (
    <div className="flex flex-col gap-6">
      {statusCharts.length > 0 && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {statusCharts.map(renderWidget)}
        </div>
      )}
      {barCharts.length > 0 && (
        <div className="grid grid-cols-1 gap-6">
          {barCharts.map(renderWidget)}
        </div>
      )}
      {tables.length > 0 && (
        <div className="grid grid-cols-1 gap-6">
          {tables.map(renderWidget)}
        </div>
      )}
    </div>
  );
};

WidgetGrid.displayName = 'WidgetGrid';

export default WidgetGrid;

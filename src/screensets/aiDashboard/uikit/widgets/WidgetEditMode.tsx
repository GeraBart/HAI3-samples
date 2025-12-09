/**
 * WidgetEditModeView
 * Pure presentational component that displays a widget centered when in edit mode
 * with settings sidebar on the right
 * UIKit pattern: value/onChange, no hooks, no side effects
 */

import React from 'react';
import type { Widget } from '../../types';
import { StatusChartWidget } from './StatusChartWidget';
import { DataChartWidget } from './DataChartWidget';
import { BarChartWidget } from './BarChartWidget';
import { TableWidget } from './TableWidget';
import { MetricCardWidget } from './MetricCardWidget';

export interface WidgetEditModeViewProps {
  /** All available widgets */
  widgets: Widget[];
  /** ID of the widget currently being edited (null if not in edit mode) */
  activeWidgetId: string | null;
  /** Sidebar content */
  children?: React.ReactNode;
}

const renderWidget = (widget: Widget): React.ReactNode => {
  switch (widget.type) {
    case 'status-chart':
      return <StatusChartWidget key={widget.id} widget={widget} />;
    case 'data-chart':
      return <DataChartWidget key={widget.id} widget={widget} />;
    case 'bar-chart':
      return <BarChartWidget key={widget.id} widget={widget} />;
    case 'table':
      return <TableWidget key={widget.id} widget={widget} />;
    case 'metric-card':
      return <MetricCardWidget key={widget.id} widget={widget} />;
    default:
      return null;
  }
};

/**
 * WidgetEditModeView - Presentational widget edit mode container
 * Receives activeWidgetId as prop instead of reading from Redux
 */
export const WidgetEditModeView: React.FC<WidgetEditModeViewProps> = ({
  widgets,
  activeWidgetId,
  children,
}) => {
  const activeWidget = widgets.find((w) => w.id === activeWidgetId);

  if (!activeWidgetId || !activeWidget) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-full w-full">
      <div className="flex flex-1 items-center justify-center bg-muted/30 p-8">
        <div className="max-w-lg">
          {renderWidget(activeWidget)}
        </div>
      </div>
      {children}
    </div>
  );
};

WidgetEditModeView.displayName = 'WidgetEditModeView';

export default WidgetEditModeView;

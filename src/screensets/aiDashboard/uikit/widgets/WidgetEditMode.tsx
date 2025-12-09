/**
 * WidgetEditMode
 * Container that displays a widget centered when in edit mode
 * with settings sidebar on the right
 */

import React from 'react';
import { useAppSelector } from '@hai3/uicore';
import { selectAiDashboardState } from '../../slices/aiDashboardSlice';
import type { Widget } from '../../types';
import { StatusChartWidget } from './StatusChartWidget';
import { DataChartWidget } from './DataChartWidget';
import { BarChartWidget } from './BarChartWidget';
import { TableWidget } from './TableWidget';
import { MetricCardWidget } from './MetricCardWidget';

interface WidgetEditModeProps {
  widgets: Widget[];
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

export const WidgetEditMode: React.FC<WidgetEditModeProps> = ({
  widgets,
  children,
}) => {
  const { activeSettingsWidgetId } = useAppSelector(selectAiDashboardState);

  const activeWidget = widgets.find((w) => w.id === activeSettingsWidgetId);

  if (!activeSettingsWidgetId || !activeWidget) {
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

WidgetEditMode.displayName = 'WidgetEditMode';

export default WidgetEditMode;

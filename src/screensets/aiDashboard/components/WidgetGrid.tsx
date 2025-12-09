/**
 * WidgetGrid Container
 * Business logic layer connecting Redux state to presentational component
 */

import React from 'react';
import { useAppSelector } from '@hai3/uicore';
import { selectAiDashboardState } from '../slices/aiDashboardSlice';
import { openWidgetSettings, updateWidgetPosition } from '../actions/aiDashboardActions';
import type { Widget } from '../types';
import { WidgetGridView, WidgetLayout } from '../uikit/widgets';

interface WidgetGridProps {
  widgets: Widget[];
  onReorder?: (widgets: Widget[]) => void;
  className?: string;
}

/**
 * WidgetGrid - Container component with business logic
 * Connects to Redux store and dispatches actions
 */
export const WidgetGrid: React.FC<WidgetGridProps> = ({
  widgets,
  onReorder,
  className,
}) => {
  const { widgetLayouts, activeSettingsWidgetId } = useAppSelector(selectAiDashboardState);

  const handleEditWidget = (widgetId: string) => {
    openWidgetSettings(widgetId);
  };

  const handleUpdatePosition = (widgetId: string, layout: WidgetLayout) => {
    updateWidgetPosition(widgetId, layout);
  };

  return (
    <WidgetGridView
      widgets={widgets}
      widgetLayouts={widgetLayouts}
      isHidden={activeSettingsWidgetId !== null}
      onReorder={onReorder}
      onEditWidget={handleEditWidget}
      onUpdatePosition={handleUpdatePosition}
      className={className}
    />
  );
};

WidgetGrid.displayName = 'WidgetGrid';

export default WidgetGrid;

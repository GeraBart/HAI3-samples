/**
 * WidgetEditMode Container
 * Business logic layer connecting Redux state to presentational component
 */

import React from 'react';
import { useAppSelector } from '@hai3/uicore';
import { selectAiDashboardState } from '../slices/aiDashboardSlice';
import type { Widget } from '../types';
import { WidgetEditModeView } from '../uikit/widgets';

interface WidgetEditModeProps {
  widgets: Widget[];
  children?: React.ReactNode;
}

/**
 * WidgetEditMode - Container component with business logic
 * Connects to Redux store and passes activeSettingsWidgetId to view
 */
export const WidgetEditMode: React.FC<WidgetEditModeProps> = ({
  widgets,
  children,
}) => {
  const { activeSettingsWidgetId } = useAppSelector(selectAiDashboardState);

  return (
    <WidgetEditModeView
      widgets={widgets}
      activeWidgetId={activeSettingsWidgetId}
    >
      {children}
    </WidgetEditModeView>
  );
};

WidgetEditMode.displayName = 'WidgetEditMode';

export default WidgetEditMode;

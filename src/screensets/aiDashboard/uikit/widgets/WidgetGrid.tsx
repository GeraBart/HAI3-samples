/**
 * WidgetGrid
 * 3-column grid layout for dashboard widgets with drag-and-drop reordering
 */

import React, { useCallback, useState } from 'react';
import { useAppSelector } from '@hai3/uicore';
import { selectAiDashboardState } from '../../slices/aiDashboardSlice';
import { openWidgetSettings, updateWidgetPosition } from '../../actions/aiDashboardActions';
import type { Widget, WidgetColumnSpan } from '../../types';
import { StatusChartWidget } from './StatusChartWidget';
import { DataChartWidget } from './DataChartWidget';
import { BarChartWidget } from './BarChartWidget';
import { TableWidget } from './TableWidget';
import { MetricCardWidget } from './MetricCardWidget';
import { WidgetContainer } from './WidgetContainer';

interface WidgetGridProps {
  widgets: Widget[];
  onReorder?: (widgets: Widget[]) => void;
  className?: string;
}

const renderWidgetContent = (widget: Widget): React.ReactNode => {
  switch (widget.type) {
    case 'status-chart':
      return <StatusChartWidget widget={widget} />;
    case 'data-chart':
      return <DataChartWidget widget={widget} />;
    case 'bar-chart':
      return <BarChartWidget widget={widget} />;
    case 'table':
      return <TableWidget widget={widget} />;
    case 'metric-card':
      return <MetricCardWidget widget={widget} />;
    default:
      return null;
  }
};

export const WidgetGrid: React.FC<WidgetGridProps> = ({
  widgets,
  onReorder,
  className = '',
}) => {
  const { widgetLayouts, activeSettingsWidgetId } = useAppSelector(selectAiDashboardState);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);

  const handleEditWidget = useCallback((widgetId: string) => {
    openWidgetSettings(widgetId);
  }, []);

  const getColumnSpanClass = (widgetId: string): string => {
    const span: WidgetColumnSpan = widgetLayouts[widgetId]?.columnSpan || 1;
    switch (span) {
      case 2:
        return 'col-span-2';
      case 3:
        return 'col-span-3';
      default:
        return 'col-span-1';
    }
  };

  const handleDragStart = useCallback((e: React.DragEvent, widgetId: string) => {
    setDraggedId(widgetId);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', widgetId);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent, widgetId: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (draggedId && widgetId !== draggedId) {
      setDragOverId(widgetId);
    }
  }, [draggedId]);

  const handleDragLeave = useCallback(() => {
    setDragOverId(null);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    setDragOverId(null);
    
    if (!draggedId || draggedId === targetId) {
      setDraggedId(null);
      return;
    }

    const draggedIndex = widgets.findIndex((w) => w.id === draggedId);
    const targetIndex = widgets.findIndex((w) => w.id === targetId);

    if (draggedIndex === -1 || targetIndex === -1) {
      setDraggedId(null);
      return;
    }

    const newWidgets = [...widgets];
    const [removed] = newWidgets.splice(draggedIndex, 1);
    newWidgets.splice(targetIndex, 0, removed);

    onReorder?.(newWidgets);

    newWidgets.forEach((widget, index) => {
      updateWidgetPosition(widget.id, {
        row: Math.floor(index / 3),
        column: index % 3,
        columnSpan: widgetLayouts[widget.id]?.columnSpan || 1,
      });
    });

    setDraggedId(null);
  }, [draggedId, widgets, onReorder, widgetLayouts]);

  const handleDragEnd = useCallback(() => {
    setDraggedId(null);
    setDragOverId(null);
  }, []);

  if (activeSettingsWidgetId) {
    return null;
  }

  return (
    <div className={`grid grid-cols-3 gap-4 ${className}`}>
      {widgets.map((widget) => (
        <div
          key={widget.id}
          draggable
          onDragStart={(e) => handleDragStart(e, widget.id)}
          onDragOver={(e) => handleDragOver(e, widget.id)}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, widget.id)}
          onDragEnd={handleDragEnd}
          className={`${getColumnSpanClass(widget.id)} transition-all duration-200 ${
            draggedId === widget.id ? 'opacity-50' : ''
          } ${
            dragOverId === widget.id ? 'ring-2 ring-primary ring-offset-2' : ''
          }`}
        >
          <WidgetContainer
            title={widget.title}
            widgetId={widget.id}
            onEdit={handleEditWidget}
          >
            {renderWidgetContent(widget)}
          </WidgetContainer>
        </div>
      ))}
    </div>
  );
};

WidgetGrid.displayName = 'WidgetGrid';

export default WidgetGrid;

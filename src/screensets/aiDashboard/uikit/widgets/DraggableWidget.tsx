/**
 * DraggableWidget
 * Wrapper component that enables drag-and-drop for widgets
 */

import React, { useRef, useState } from 'react';
import { GripVertical } from 'lucide-react';
import type { WidgetColumnSpan } from '../../types';

interface DraggableWidgetProps {
  widgetId: string;
  columnSpan?: WidgetColumnSpan;
  children: React.ReactNode;
  onDragStart?: (widgetId: string) => void;
  onDragEnd?: (widgetId: string, targetIndex: number) => void;
  className?: string;
}

export const DraggableWidget: React.FC<DraggableWidgetProps> = ({
  widgetId,
  columnSpan = 1,
  children,
  onDragStart,
  onDragEnd: _onDragEnd,
  className = '',
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<HTMLDivElement>(null);

  const handleDragStart = (e: React.DragEvent) => {
    setIsDragging(true);
    e.dataTransfer.setData('widgetId', widgetId);
    e.dataTransfer.effectAllowed = 'move';
    onDragStart?.(widgetId);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const getColumnSpanClass = () => {
    switch (columnSpan) {
      case 1:
        return 'col-span-1';
      case 2:
        return 'col-span-2';
      case 3:
        return 'col-span-3';
      default:
        return 'col-span-1';
    }
  };

  return (
    <div
      ref={dragRef}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={`group relative ${getColumnSpanClass()} ${isDragging ? 'opacity-50' : ''} ${className}`}
    >
      <div className="absolute left-2 top-1/2 z-10 -translate-y-1/2 cursor-grab opacity-0 transition-opacity group-hover:opacity-100 active:cursor-grabbing">
        <GripVertical className="h-5 w-5 text-muted-foreground" />
      </div>
      {children}
    </div>
  );
};

DraggableWidget.displayName = 'DraggableWidget';

export default DraggableWidget;

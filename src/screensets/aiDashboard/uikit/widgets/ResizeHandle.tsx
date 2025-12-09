/**
 * ResizeHandle
 * Handles for resizing widgets by dragging borders or corners
 */

import React, { useState, useCallback } from 'react';
import type { WidgetColumnSpan } from '../../types';

type ResizeDirection = 'left' | 'right' | 'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

interface ResizeHandleProps {
  direction: ResizeDirection;
  onResize: (deltaX: number, deltaY: number, direction: ResizeDirection) => void;
  onResizeEnd: () => void;
  className?: string;
}

const getDirectionStyles = (direction: ResizeDirection): string => {
  switch (direction) {
    case 'left':
      return 'left-0 top-0 h-full w-1 cursor-ew-resize';
    case 'right':
      return 'right-0 top-0 h-full w-1 cursor-ew-resize';
    case 'top':
      return 'top-0 left-0 w-full h-1 cursor-ns-resize';
    case 'bottom':
      return 'bottom-0 left-0 w-full h-1 cursor-ns-resize';
    case 'top-left':
      return 'top-0 left-0 h-3 w-3 cursor-nwse-resize';
    case 'top-right':
      return 'top-0 right-0 h-3 w-3 cursor-nesw-resize';
    case 'bottom-left':
      return 'bottom-0 left-0 h-3 w-3 cursor-nesw-resize';
    case 'bottom-right':
      return 'bottom-0 right-0 h-3 w-3 cursor-nwse-resize';
    default:
      return '';
  }
};

export const ResizeHandle: React.FC<ResizeHandleProps> = ({
  direction,
  onResize,
  onResizeEnd,
  className = '',
}) => {
  const [isResizing, setIsResizing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
    setStartPos({ x: e.clientX, y: e.clientY });

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - startPos.x;
      const deltaY = moveEvent.clientY - startPos.y;
      onResize(deltaX, deltaY, direction);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      onResizeEnd();
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [direction, onResize, onResizeEnd, startPos]);

  return (
    <div
      onMouseDown={handleMouseDown}
      className={`absolute z-20 opacity-0 transition-opacity hover:bg-primary/50 group-hover:opacity-100 ${getDirectionStyles(direction)} ${isResizing ? 'bg-primary' : ''} ${className}`}
    />
  );
};

interface ResizableWidgetProps {
  widgetId: string;
  columnSpan: WidgetColumnSpan;
  onColumnSpanChange: (widgetId: string, columnSpan: WidgetColumnSpan) => void;
  children: React.ReactNode;
  className?: string;
}

export const ResizableWidget: React.FC<ResizableWidgetProps> = ({
  widgetId,
  columnSpan,
  onColumnSpanChange,
  children,
  className = '',
}) => {
  const [tempWidth, setTempWidth] = useState<number | null>(null);

  const handleResize = useCallback((deltaX: number, _deltaY: number, direction: ResizeDirection) => {
    if (direction === 'left' || direction === 'right' || direction.includes('left') || direction.includes('right')) {
      setTempWidth(deltaX);
    }
  }, []);

  const handleResizeEnd = useCallback(() => {
    if (tempWidth !== null) {
      const containerWidth = 300;
      const newSpan = Math.round(Math.abs(tempWidth) / containerWidth) as WidgetColumnSpan;
      const clampedSpan = Math.max(1, Math.min(3, newSpan)) as WidgetColumnSpan;
      if (clampedSpan !== columnSpan) {
        onColumnSpanChange(widgetId, clampedSpan);
      }
    }
    setTempWidth(null);
  }, [tempWidth, columnSpan, widgetId, onColumnSpanChange]);

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
    <div className={`group relative ${getColumnSpanClass()} ${className}`}>
      <ResizeHandle direction="left" onResize={handleResize} onResizeEnd={handleResizeEnd} />
      <ResizeHandle direction="right" onResize={handleResize} onResizeEnd={handleResizeEnd} />
      <ResizeHandle direction="top" onResize={handleResize} onResizeEnd={handleResizeEnd} />
      <ResizeHandle direction="bottom" onResize={handleResize} onResizeEnd={handleResizeEnd} />
      <ResizeHandle direction="top-left" onResize={handleResize} onResizeEnd={handleResizeEnd} />
      <ResizeHandle direction="top-right" onResize={handleResize} onResizeEnd={handleResizeEnd} />
      <ResizeHandle direction="bottom-left" onResize={handleResize} onResizeEnd={handleResizeEnd} />
      <ResizeHandle direction="bottom-right" onResize={handleResize} onResizeEnd={handleResizeEnd} />
      {children}
    </div>
  );
};

ResizeHandle.displayName = 'ResizeHandle';
ResizableWidget.displayName = 'ResizableWidget';

export default ResizeHandle;

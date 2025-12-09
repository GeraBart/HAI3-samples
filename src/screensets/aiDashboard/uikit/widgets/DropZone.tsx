/**
 * DropZone
 * Visual indicator for valid drop positions during drag-and-drop
 */

import React, { useState } from 'react';

interface DropZoneProps {
  index: number;
  onDrop: (widgetId: string, targetIndex: number) => void;
  className?: string;
}

export const DropZone: React.FC<DropZoneProps> = ({
  index,
  onDrop,
  className = '',
}) => {
  const [isOver, setIsOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setIsOver(true);
  };

  const handleDragLeave = () => {
    setIsOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsOver(false);
    const widgetId = e.dataTransfer.getData('widgetId');
    if (widgetId) {
      onDrop(widgetId, index);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`transition-all ${
        isOver
          ? 'h-20 border-2 border-dashed border-primary bg-primary/10'
          : 'h-2'
      } ${className}`}
    />
  );
};

DropZone.displayName = 'DropZone';

export default DropZone;

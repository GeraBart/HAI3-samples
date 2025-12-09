/**
 * WidgetContainer
 * Common wrapper for all widget types matching Figma design
 * Simple card with border, header with title, and content area
 */

import React from 'react';
import { Pencil } from 'lucide-react';

interface WidgetContainerProps {
  title?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  isLoading?: boolean;
  className?: string;
  widgetId?: string;
  onEdit?: (widgetId: string) => void;
}

export const WidgetContainer: React.FC<WidgetContainerProps> = ({
  title,
  children,
  actions,
  isLoading = false,
  className = '',
  widgetId,
  onEdit,
}) => {
  const handleEdit = () => {
    if (widgetId && onEdit) {
      onEdit(widgetId);
    }
  };

  return (
    <div className={`group flex h-full flex-col rounded border border-primary/30 bg-background ${className}`}>
      {(title || actions || (widgetId && onEdit)) && (
        <div className="flex items-center gap-4 pb-1 pl-6 pr-4 pt-3">
          <div className="flex flex-1 items-center gap-2 py-1">
            {title && (
              <span className="text-sm font-semibold text-foreground">
                {title}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {actions}
            {widgetId && onEdit && (
              <button
                type="button"
                onClick={handleEdit}
                className="rounded p-1 opacity-0 transition-opacity hover:bg-muted group-hover:opacity-100"
              >
                <Pencil className="h-4 w-4 text-muted-foreground" />
              </button>
            )}
          </div>
        </div>
      )}
      <div className="flex flex-1 items-center justify-center gap-4 px-6 pb-6 pt-4">
        {isLoading ? (
          <div className="flex h-full items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
};

WidgetContainer.displayName = 'WidgetContainer';

export default WidgetContainer;

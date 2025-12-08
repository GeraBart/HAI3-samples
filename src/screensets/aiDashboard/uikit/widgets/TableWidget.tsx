/**
 * TableWidget
 * Data table with columns
 */

import React from 'react';
import type { TableWidget as TableWidgetType } from '../../types';
import { WidgetContainer } from './WidgetContainer';

interface TableWidgetProps {
  widget: TableWidgetType;
  className?: string;
}

export const TableWidget: React.FC<TableWidgetProps> = ({
  widget,
  className = '',
}) => {
  const { title, columns, data } = widget;

  if (data.length === 0) {
    return (
      <WidgetContainer title={title} className={className}>
        <div className="flex h-32 items-center justify-center text-muted-foreground">
          No data available
        </div>
      </WidgetContainer>
    );
  }

  return (
    <WidgetContainer title={title} className={className}>
      <div className="max-h-64 overflow-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              {columns.map((column) => (
                <th
                  key={column.key}
                  style={{ width: column.width }}
                  className="px-2 py-2 text-left text-xs font-medium text-muted-foreground"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b last:border-0">
                {columns.map((column) => (
                  <td key={column.key} className="px-2 py-2 text-xs">
                    {row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </WidgetContainer>
  );
};

TableWidget.displayName = 'TableWidget';

export default TableWidget;

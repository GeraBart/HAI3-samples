/**
 * WidgetTypeSelector
 * Icon-based widget type selection
 */

import React from 'react';
import { PieChart, Table2, BarChart3, List, ScatterChart } from 'lucide-react';
import type { WidgetType } from '../../types';

interface WidgetTypeSelectorProps {
  value?: WidgetType;
  onChange: (type: WidgetType) => void;
}

const WIDGET_TYPES: Array<{ type: WidgetType; icon: React.ReactNode; label: string }> = [
  { type: 'status-chart', icon: <PieChart className="h-6 w-6" />, label: 'Donut Chart' },
  { type: 'table', icon: <Table2 className="h-6 w-6" />, label: 'Table' },
  { type: 'bar-chart', icon: <BarChart3 className="h-6 w-6" />, label: 'Bar Chart' },
  { type: 'metric-card', icon: <List className="h-6 w-6" />, label: 'List' },
  { type: 'data-chart', icon: <ScatterChart className="h-6 w-6" />, label: 'Scatter Plot' },
];

export const WidgetTypeSelector: React.FC<WidgetTypeSelectorProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className="flex gap-2 py-4">
      {WIDGET_TYPES.map(({ type, icon, label }) => (
        <button
          key={type}
          type="button"
          onClick={() => onChange(type)}
          className={`flex h-12 w-12 items-center justify-center rounded border transition-colors ${
            value === type
              ? 'border-primary bg-primary/10 text-primary'
              : 'border-border hover:border-primary/50 hover:bg-muted'
          }`}
          title={label}
        >
          {icon}
        </button>
      ))}
    </div>
  );
};

WidgetTypeSelector.displayName = 'WidgetTypeSelector';

export default WidgetTypeSelector;

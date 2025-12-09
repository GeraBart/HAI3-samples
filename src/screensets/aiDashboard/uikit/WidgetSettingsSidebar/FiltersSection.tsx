/**
 * FiltersSectionView
 * Pure presentational expandable filters with multiple filter rows
 * UIKit pattern: value/onChange, no hooks, no side effects
 */

import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@hai3/uikit';

interface Filter {
  id: string;
  field: string;
  operator: string;
  value: string;
}

interface FilterField {
  id: string;
  label: string;
}

export interface FiltersSectionViewProps {
  filters: Filter[];
  /** Section header text */
  sectionTitle?: React.ReactNode;
  /** Field placeholder */
  fieldPlaceholder?: string;
  /** Available filter fields */
  filterFields?: FilterField[];
  onFiltersChange: (filters: Filter[]) => void;
}

const DEFAULT_FILTER_FIELDS: FilterField[] = [
  { id: 'status', label: 'Status' },
  { id: 'type', label: 'Type' },
  { id: 'date', label: 'Date' },
  { id: 'value', label: 'Value' },
  { id: 'category', label: 'Category' },
];

/**
 * FiltersSectionView - Presentational filters section
 * Receives all data and callbacks as props
 */
export const FiltersSectionView: React.FC<FiltersSectionViewProps> = ({
  filters,
  sectionTitle = 'Filters',
  fieldPlaceholder = 'Select field',
  filterFields = DEFAULT_FILTER_FIELDS,
  onFiltersChange,
}) => {
  const [isExpanded, setIsExpanded] = React.useState(true);

  const handleFilterChange = (index: number, field: keyof Filter, value: string) => {
    const newFilters = [...filters];
    newFilters[index] = { ...newFilters[index], [field]: value };
    onFiltersChange(newFilters);
  };

  return (
    <div className="border-b border-border">
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex w-full items-center justify-between px-5 py-4 text-sm font-medium"
      >
        {sectionTitle}
        <ChevronUp className={`h-4 w-4 transition-transform ${isExpanded ? '' : 'rotate-180'}`} />
      </button>
      {isExpanded && (
        <div className="flex flex-col gap-4 px-5 pb-4">
          {filters.map((filter, index) => (
            <div key={filter.id} className="rounded border border-border">
              <button
                type="button"
                className="flex w-full items-center justify-between p-3 text-sm"
              >
                <span>Filter #{index + 1}</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              <div className="border-t border-border p-3">
                <Select
                  value={filter.field}
                  onValueChange={(v) => handleFilterChange(index, 'field', v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={fieldPlaceholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {filterFields.map((field) => (
                      <SelectItem key={field.id} value={field.id}>
                        {field.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

FiltersSectionView.displayName = 'FiltersSectionView';

export default FiltersSectionView;

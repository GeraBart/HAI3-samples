/**
 * FiltersSection
 * Expandable filters with multiple filter rows
 */

import React from 'react';
import { useTranslation, TextLoader } from '@hai3/uicore';
import { ChevronUp, ChevronDown } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@hai3/uikit';
import { AI_DASHBOARD_SCREENSET_ID, HOME_SCREEN_ID } from '../../ids';

interface Filter {
  id: string;
  field: string;
  operator: string;
  value: string;
}

interface FiltersSectionProps {
  filters: Filter[];
  onFiltersChange: (filters: Filter[]) => void;
}

const FILTER_FIELDS = ['Status', 'Type', 'Date', 'Value', 'Category'];

export const FiltersSection: React.FC<FiltersSectionProps> = ({
  filters,
  onFiltersChange,
}) => {
  const { t } = useTranslation();
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
        <TextLoader>
          {t(`screen.${AI_DASHBOARD_SCREENSET_ID}.${HOME_SCREEN_ID}:widget_settings_filters`)}
        </TextLoader>
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
                    <SelectValue placeholder="Select field" />
                  </SelectTrigger>
                  <SelectContent>
                    {FILTER_FIELDS.map((field) => (
                      <SelectItem key={field} value={field.toLowerCase()}>
                        {field}
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

FiltersSection.displayName = 'FiltersSection';

export default FiltersSection;

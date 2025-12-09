/**
 * PropertiesSectionView
 * Pure presentational component for Label, Value, Sort, Sort order, Colour scheme, Show summary, Show legend
 * UIKit pattern: value/onChange, no hooks, no side effects
 */

import React from 'react';
import { Input } from '@hai3/uikit';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@hai3/uikit';
import { ChevronUp } from 'lucide-react';

interface SelectOption {
  id: string;
  label: string;
}

export interface PropertiesSectionViewProps {
  label: string;
  value: string;
  sort: string;
  sortOrder: 'asc' | 'desc';
  colorScheme: string;
  showSummary: boolean;
  showLegend: boolean;
  /** Section header text */
  sectionTitle?: React.ReactNode;
  /** Label placeholder */
  labelPlaceholder?: string;
  /** Value placeholder */
  valuePlaceholder?: string;
  /** Sort placeholder */
  sortPlaceholder?: string;
  /** Sort order placeholder */
  sortOrderPlaceholder?: string;
  /** Color scheme placeholder */
  colorSchemePlaceholder?: string;
  /** Show summary label */
  showSummaryLabel?: React.ReactNode;
  /** Show legend label */
  showLegendLabel?: React.ReactNode;
  /** Sort options */
  sortOptions?: SelectOption[];
  /** Color scheme options */
  colorSchemeOptions?: SelectOption[];
  onLabelChange: (label: string) => void;
  onValueChange: (value: string) => void;
  onSortChange: (sort: string) => void;
  onSortOrderChange: (sortOrder: 'asc' | 'desc') => void;
  onColorSchemeChange: (colorScheme: string) => void;
  onShowSummaryChange: (show: boolean) => void;
  onShowLegendChange: (show: boolean) => void;
}

const DEFAULT_SORT_OPTIONS: SelectOption[] = [
  { id: 'default', label: 'Default' },
  { id: 'alphabetical', label: 'Alphabetical' },
  { id: 'numeric', label: 'Numeric' },
  { id: 'date', label: 'Date' },
];

const DEFAULT_COLOR_SCHEMES: SelectOption[] = [
  { id: 'default', label: 'Default' },
  { id: 'blue', label: 'Blue' },
  { id: 'green', label: 'Green' },
  { id: 'red', label: 'Red' },
  { id: 'purple', label: 'Purple' },
  { id: 'orange', label: 'Orange' },
];

/**
 * PropertiesSectionView - Presentational properties section
 * Receives all data and callbacks as props
 */
export const PropertiesSectionView: React.FC<PropertiesSectionViewProps> = ({
  label,
  value,
  sort,
  sortOrder,
  colorScheme,
  showSummary,
  showLegend,
  sectionTitle = 'Properties',
  labelPlaceholder = 'Label',
  valuePlaceholder = 'Value',
  sortPlaceholder = 'Sort',
  sortOrderPlaceholder = 'Sort order',
  colorSchemePlaceholder = 'Colour scheme',
  showSummaryLabel = 'Show summary',
  showLegendLabel = 'Show legend',
  sortOptions = DEFAULT_SORT_OPTIONS,
  colorSchemeOptions = DEFAULT_COLOR_SCHEMES,
  onLabelChange,
  onValueChange,
  onSortChange,
  onSortOrderChange,
  onColorSchemeChange,
  onShowSummaryChange,
  onShowLegendChange,
}) => {
  const [isExpanded, setIsExpanded] = React.useState(true);

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
          <Input
            placeholder={labelPlaceholder}
            value={label}
            onChange={(e) => onLabelChange(e.target.value)}
          />
          <Select value={value} onValueChange={onValueChange}>
            <SelectTrigger>
              <SelectValue placeholder={valuePlaceholder} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="count">Count</SelectItem>
              <SelectItem value="sum">Sum</SelectItem>
              <SelectItem value="average">Average</SelectItem>
              <SelectItem value="min">Min</SelectItem>
              <SelectItem value="max">Max</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sort} onValueChange={onSortChange}>
            <SelectTrigger>
              <SelectValue placeholder={sortPlaceholder} />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.id} value={option.id}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sortOrder} onValueChange={(v) => onSortOrderChange(v as 'asc' | 'desc')}>
            <SelectTrigger>
              <SelectValue placeholder={sortOrderPlaceholder} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">Ascending</SelectItem>
              <SelectItem value="desc">Descending</SelectItem>
            </SelectContent>
          </Select>
          <Select value={colorScheme} onValueChange={onColorSchemeChange}>
            <SelectTrigger>
              <SelectValue placeholder={colorSchemePlaceholder} />
            </SelectTrigger>
            <SelectContent>
              {colorSchemeOptions.map((scheme) => (
                <SelectItem key={scheme.id} value={scheme.id}>
                  {scheme.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="show-summary"
              checked={showSummary}
              onChange={(e) => onShowSummaryChange(e.target.checked)}
              className="h-4 w-4 rounded border-border"
            />
            <label htmlFor="show-summary" className="text-sm">
              {showSummaryLabel}
            </label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="show-legend"
              checked={showLegend}
              onChange={(e) => onShowLegendChange(e.target.checked)}
              className="h-4 w-4 rounded border-border"
            />
            <label htmlFor="show-legend" className="text-sm">
              {showLegendLabel}
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

PropertiesSectionView.displayName = 'PropertiesSectionView';

export default PropertiesSectionView;

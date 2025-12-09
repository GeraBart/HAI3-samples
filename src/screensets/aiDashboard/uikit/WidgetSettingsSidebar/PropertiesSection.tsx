/**
 * PropertiesSection
 * Label, Value, Sort, Sort order, Colour scheme, Show summary, Show legend
 */

import React from 'react';
import { useTranslation, TextLoader } from '@hai3/uicore';
import { Input } from '@hai3/uikit';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@hai3/uikit';
import { ChevronUp } from 'lucide-react';
import { AI_DASHBOARD_SCREENSET_ID, HOME_SCREEN_ID } from '../../ids';

interface PropertiesSectionProps {
  label: string;
  value: string;
  sort: string;
  sortOrder: 'asc' | 'desc';
  colorScheme: string;
  showSummary: boolean;
  showLegend: boolean;
  onLabelChange: (label: string) => void;
  onValueChange: (value: string) => void;
  onSortChange: (sort: string) => void;
  onSortOrderChange: (sortOrder: 'asc' | 'desc') => void;
  onColorSchemeChange: (colorScheme: string) => void;
  onShowSummaryChange: (show: boolean) => void;
  onShowLegendChange: (show: boolean) => void;
}

const SORT_OPTIONS = ['Default', 'Alphabetical', 'Numeric', 'Date'];
const COLOR_SCHEMES = ['Default', 'Blue', 'Green', 'Red', 'Purple', 'Orange'];

export const PropertiesSection: React.FC<PropertiesSectionProps> = ({
  label,
  value,
  sort,
  sortOrder,
  colorScheme,
  showSummary,
  showLegend,
  onLabelChange,
  onValueChange,
  onSortChange,
  onSortOrderChange,
  onColorSchemeChange,
  onShowSummaryChange,
  onShowLegendChange,
}) => {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = React.useState(true);

  return (
    <div className="border-b border-border">
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex w-full items-center justify-between px-5 py-4 text-sm font-medium"
      >
        <TextLoader>
          {t(`screen.${AI_DASHBOARD_SCREENSET_ID}.${HOME_SCREEN_ID}:widget_settings_properties`)}
        </TextLoader>
        <ChevronUp className={`h-4 w-4 transition-transform ${isExpanded ? '' : 'rotate-180'}`} />
      </button>
      {isExpanded && (
        <div className="flex flex-col gap-4 px-5 pb-4">
          <Input
            placeholder={t(`screen.${AI_DASHBOARD_SCREENSET_ID}.${HOME_SCREEN_ID}:widget_settings_label`)}
            value={label}
            onChange={(e) => onLabelChange(e.target.value)}
          />
          <Select value={value} onValueChange={onValueChange}>
            <SelectTrigger>
              <SelectValue placeholder={t(`screen.${AI_DASHBOARD_SCREENSET_ID}.${HOME_SCREEN_ID}:widget_settings_value`)} />
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
              <SelectValue placeholder={t(`screen.${AI_DASHBOARD_SCREENSET_ID}.${HOME_SCREEN_ID}:widget_settings_sort`)} />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map((option) => (
                <SelectItem key={option} value={option.toLowerCase()}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sortOrder} onValueChange={(v) => onSortOrderChange(v as 'asc' | 'desc')}>
            <SelectTrigger>
              <SelectValue placeholder={t(`screen.${AI_DASHBOARD_SCREENSET_ID}.${HOME_SCREEN_ID}:widget_settings_sort_order`)} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">Ascending</SelectItem>
              <SelectItem value="desc">Descending</SelectItem>
            </SelectContent>
          </Select>
          <Select value={colorScheme} onValueChange={onColorSchemeChange}>
            <SelectTrigger>
              <SelectValue placeholder={t(`screen.${AI_DASHBOARD_SCREENSET_ID}.${HOME_SCREEN_ID}:widget_settings_color_scheme`)} />
            </SelectTrigger>
            <SelectContent>
              {COLOR_SCHEMES.map((scheme) => (
                <SelectItem key={scheme} value={scheme.toLowerCase()}>
                  {scheme}
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
              <TextLoader>
                {t(`screen.${AI_DASHBOARD_SCREENSET_ID}.${HOME_SCREEN_ID}:widget_settings_show_summary`)}
              </TextLoader>
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
              <TextLoader>
                {t(`screen.${AI_DASHBOARD_SCREENSET_ID}.${HOME_SCREEN_ID}:widget_settings_show_legend`)}
              </TextLoader>
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

PropertiesSection.displayName = 'PropertiesSection';

export default PropertiesSection;

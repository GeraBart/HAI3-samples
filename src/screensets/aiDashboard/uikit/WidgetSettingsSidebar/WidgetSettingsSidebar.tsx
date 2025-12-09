/**
 * WidgetSettingsSidebarView
 * Pure presentational slide-out panel for configuring widget settings
 * UIKit pattern: value/onChange, no Redux hooks, no side effects
 * Based on Figma design 123-23622
 */

import React from 'react';
import { Button } from '@hai3/uikit';
import { ButtonVariant } from '@hai3/uikit-contracts';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@hai3/uikit';
import { X } from 'lucide-react';
import type { WidgetConfig, WidgetType } from '../../types';
import { WidgetTypeSelector } from './WidgetTypeSelector';
import { GeneralSectionView } from './GeneralSection';
import { PropertiesSectionView } from './PropertiesSection';
import { FiltersSectionView } from './FiltersSection';

interface DataSource {
  id: string;
  label: string;
}

export interface WidgetSettingsSidebarViewProps {
  /** Whether the sidebar is visible */
  isOpen: boolean;
  /** Current widget configuration */
  config: WidgetConfig;
  /** Available data sources */
  dataSources: DataSource[];
  /** Title text */
  title: React.ReactNode;
  /** Data source placeholder text */
  dataSourcePlaceholder: string;
  /** Cancel button text */
  cancelText: React.ReactNode;
  /** Apply button text */
  applyText: React.ReactNode;
  /** Called when close button clicked */
  onClose: () => void;
  /** Called when apply button clicked */
  onApply: () => void;
  /** Called when data source changes */
  onDataSourceChange: (value: string) => void;
  /** Called when widget type changes */
  onWidgetTypeChange: (type: WidgetType | undefined) => void;
  /** Called when name changes */
  onNameChange: (value: string) => void;
  /** Called when description changes */
  onDescriptionChange: (value: string) => void;
  /** Called when save to catalog changes */
  onSaveToCustomCatalogChange: (value: boolean) => void;
  /** Called when label changes */
  onLabelChange: (value: string) => void;
  /** Called when value changes */
  onValueChange: (value: string) => void;
  /** Called when sort changes */
  onSortChange: (value: string) => void;
  /** Called when sort order changes */
  onSortOrderChange: (value: 'asc' | 'desc') => void;
  /** Called when color scheme changes */
  onColorSchemeChange: (value: string) => void;
  /** Called when show summary changes */
  onShowSummaryChange: (value: boolean) => void;
  /** Called when show legend changes */
  onShowLegendChange: (value: boolean) => void;
  /** Called when filters change */
  onFiltersChange: (filters: WidgetConfig['filters']) => void;
}

/**
 * WidgetSettingsSidebarView - Presentational widget settings panel
 * Receives all data and callbacks as props
 */
export const WidgetSettingsSidebarView: React.FC<WidgetSettingsSidebarViewProps> = ({
  isOpen,
  config,
  dataSources,
  title,
  dataSourcePlaceholder,
  cancelText,
  applyText,
  onClose,
  onApply,
  onDataSourceChange,
  onWidgetTypeChange,
  onNameChange,
  onDescriptionChange,
  onSaveToCustomCatalogChange,
  onLabelChange,
  onValueChange,
  onSortChange,
  onSortOrderChange,
  onColorSchemeChange,
  onShowSummaryChange,
  onShowLegendChange,
  onFiltersChange,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="flex h-full w-96 flex-col border-l border-border bg-background">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <h2 className="text-lg font-semibold">
          {title}
        </h2>
        <Button variant={ButtonVariant.Ghost} onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="px-5 py-4">
          <Select
            value={config.dataSource}
            onValueChange={onDataSourceChange}
          >
            <SelectTrigger>
              <SelectValue placeholder={dataSourcePlaceholder} />
            </SelectTrigger>
            <SelectContent>
              {dataSources.map((source) => (
                <SelectItem key={source.id} value={source.id}>
                  {source.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <WidgetTypeSelector
            value={config.widgetType}
            onChange={onWidgetTypeChange}
          />
        </div>

        <GeneralSectionView
          name={config.name || ''}
          description={config.description || ''}
          saveToCustomCatalog={config.saveToCustomCatalog || false}
          onNameChange={onNameChange}
          onDescriptionChange={onDescriptionChange}
          onSaveToCustomCatalogChange={onSaveToCustomCatalogChange}
        />

        <PropertiesSectionView
          label={config.label || ''}
          value={config.value || ''}
          sort={config.sort || ''}
          sortOrder={config.sortOrder || 'asc'}
          colorScheme={config.colorScheme || ''}
          showSummary={config.showSummary || false}
          showLegend={config.showLegend || false}
          onLabelChange={onLabelChange}
          onValueChange={onValueChange}
          onSortChange={onSortChange}
          onSortOrderChange={onSortOrderChange}
          onColorSchemeChange={onColorSchemeChange}
          onShowSummaryChange={onShowSummaryChange}
          onShowLegendChange={onShowLegendChange}
        />

        <FiltersSectionView
          filters={config.filters || []}
          onFiltersChange={onFiltersChange}
        />
      </div>

      <div className="flex gap-3 border-t border-border px-5 py-4">
        <Button variant={ButtonVariant.Secondary} onClick={onClose} className="flex-1">
          {cancelText}
        </Button>
        <Button variant={ButtonVariant.Default} onClick={onApply} className="flex-1">
          {applyText}
        </Button>
      </div>
    </div>
  );
};

WidgetSettingsSidebarView.displayName = 'WidgetSettingsSidebarView';

export default WidgetSettingsSidebarView;

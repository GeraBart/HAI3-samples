/**
 * WidgetSettingsSidebar
 * Slide-out panel for configuring widget settings
 * Based on Figma design 123-23622
 */

import React from 'react';
import { useTranslation, TextLoader, useAppSelector } from '@hai3/uicore';
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
import { AI_DASHBOARD_SCREENSET_ID, HOME_SCREEN_ID } from '../../ids';
import { selectAiDashboardState } from '../../slices/aiDashboardSlice';
import { closeWidgetSettings, updateWidgetConfig } from '../../actions/aiDashboardActions';
import type { WidgetConfig } from '../../types';
import { WidgetTypeSelector } from './WidgetTypeSelector';
import { GeneralSection } from './GeneralSection';
import { PropertiesSection } from './PropertiesSection';
import { FiltersSection } from './FiltersSection';

const DATA_SOURCES = ['All data', 'Protected machines', 'Alerts', 'Activities', 'Backups'];

export const WidgetSettingsSidebar: React.FC = () => {
  const { t } = useTranslation();
  const { activeSettingsWidgetId, widgetConfigs } = useAppSelector(selectAiDashboardState);

  const [localConfig, setLocalConfig] = React.useState<WidgetConfig>({
    dataSource: '',
    widgetType: undefined,
    name: '',
    description: '',
    saveToCustomCatalog: false,
    label: '',
    value: '',
    sort: '',
    sortOrder: 'asc',
    colorScheme: '',
    showSummary: false,
    showLegend: false,
    filters: [
      { id: '1', field: '', operator: '', value: '' },
      { id: '2', field: '', operator: '', value: '' },
    ],
  });

  React.useEffect(() => {
    if (activeSettingsWidgetId && widgetConfigs[activeSettingsWidgetId]) {
      setLocalConfig((prev) => ({
        ...prev,
        ...widgetConfigs[activeSettingsWidgetId],
      }));
    }
  }, [activeSettingsWidgetId, widgetConfigs]);

  if (!activeSettingsWidgetId) {
    return null;
  }

  const handleClose = () => {
    closeWidgetSettings();
  };

  const handleApply = () => {
    if (activeSettingsWidgetId) {
      updateWidgetConfig(activeSettingsWidgetId, localConfig);
      closeWidgetSettings();
    }
  };

  const updateConfig = <K extends keyof WidgetConfig>(key: K, value: WidgetConfig[K]) => {
    setLocalConfig((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="flex h-full w-96 flex-col border-l border-border bg-background">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <h2 className="text-lg font-semibold">
          <TextLoader>
            {t(`screen.${AI_DASHBOARD_SCREENSET_ID}.${HOME_SCREEN_ID}:widget_settings_title`)}
          </TextLoader>
        </h2>
        <Button variant={ButtonVariant.Ghost} onClick={handleClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="px-5 py-4">
          <Select
            value={localConfig.dataSource}
            onValueChange={(v) => updateConfig('dataSource', v)}
          >
            <SelectTrigger>
              <SelectValue placeholder={t(`screen.${AI_DASHBOARD_SCREENSET_ID}.${HOME_SCREEN_ID}:widget_settings_data_source`)} />
            </SelectTrigger>
            <SelectContent>
              {DATA_SOURCES.map((source) => (
                <SelectItem key={source} value={source.toLowerCase().replace(' ', '-')}>
                  {source}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <WidgetTypeSelector
            value={localConfig.widgetType}
            onChange={(type) => updateConfig('widgetType', type)}
          />
        </div>

        <GeneralSection
          name={localConfig.name || ''}
          description={localConfig.description || ''}
          saveToCustomCatalog={localConfig.saveToCustomCatalog || false}
          onNameChange={(v) => updateConfig('name', v)}
          onDescriptionChange={(v) => updateConfig('description', v)}
          onSaveToCustomCatalogChange={(v) => updateConfig('saveToCustomCatalog', v)}
        />

        <PropertiesSection
          label={localConfig.label || ''}
          value={localConfig.value || ''}
          sort={localConfig.sort || ''}
          sortOrder={localConfig.sortOrder || 'asc'}
          colorScheme={localConfig.colorScheme || ''}
          showSummary={localConfig.showSummary || false}
          showLegend={localConfig.showLegend || false}
          onLabelChange={(v) => updateConfig('label', v)}
          onValueChange={(v) => updateConfig('value', v)}
          onSortChange={(v) => updateConfig('sort', v)}
          onSortOrderChange={(v) => updateConfig('sortOrder', v)}
          onColorSchemeChange={(v) => updateConfig('colorScheme', v)}
          onShowSummaryChange={(v) => updateConfig('showSummary', v)}
          onShowLegendChange={(v) => updateConfig('showLegend', v)}
        />

        <FiltersSection
          filters={localConfig.filters || []}
          onFiltersChange={(v) => updateConfig('filters', v)}
        />
      </div>

      <div className="flex gap-3 border-t border-border px-5 py-4">
        <Button variant={ButtonVariant.Secondary} onClick={handleClose} className="flex-1">
          <TextLoader>
            {t(`screen.${AI_DASHBOARD_SCREENSET_ID}.${HOME_SCREEN_ID}:widget_settings_cancel`)}
          </TextLoader>
        </Button>
        <Button variant={ButtonVariant.Default} onClick={handleApply} className="flex-1">
          <TextLoader>
            {t(`screen.${AI_DASHBOARD_SCREENSET_ID}.${HOME_SCREEN_ID}:widget_settings_add_widget`)}
          </TextLoader>
        </Button>
      </div>
    </div>
  );
};

WidgetSettingsSidebar.displayName = 'WidgetSettingsSidebar';

export default WidgetSettingsSidebar;

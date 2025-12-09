/**
 * WidgetSettingsSidebar Container
 * Business logic layer connecting Redux state to presentational component
 */

import React from 'react';
import { useTranslation, TextLoader, useAppSelector } from '@hai3/uicore';
import { AI_DASHBOARD_SCREENSET_ID, HOME_SCREEN_ID } from '../ids';
import { selectAiDashboardState } from '../slices/aiDashboardSlice';
import { closeWidgetSettings, updateWidgetConfig } from '../actions/aiDashboardActions';
import type { WidgetConfig, WidgetType } from '../types';
import { WidgetSettingsSidebarView } from '../uikit/WidgetSettingsSidebar';

const DATA_SOURCES = [
  { id: 'all-data', label: 'All data' },
  { id: 'protected-machines', label: 'Protected machines' },
  { id: 'alerts', label: 'Alerts' },
  { id: 'activities', label: 'Activities' },
  { id: 'backups', label: 'Backups' },
];

/**
 * WidgetSettingsSidebar - Container component with business logic
 * Connects to Redux store and dispatches actions
 */
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
    <WidgetSettingsSidebarView
      isOpen={activeSettingsWidgetId !== null}
      config={localConfig}
      dataSources={DATA_SOURCES}
      title={
        <TextLoader>
          {t(`screen.${AI_DASHBOARD_SCREENSET_ID}.${HOME_SCREEN_ID}:widget_settings_title`)}
        </TextLoader>
      }
      dataSourcePlaceholder={t(`screen.${AI_DASHBOARD_SCREENSET_ID}.${HOME_SCREEN_ID}:widget_settings_data_source`)}
      cancelText={
        <TextLoader>
          {t(`screen.${AI_DASHBOARD_SCREENSET_ID}.${HOME_SCREEN_ID}:widget_settings_cancel`)}
        </TextLoader>
      }
      applyText={
        <TextLoader>
          {t(`screen.${AI_DASHBOARD_SCREENSET_ID}.${HOME_SCREEN_ID}:widget_settings_add_widget`)}
        </TextLoader>
      }
      onClose={handleClose}
      onApply={handleApply}
      onDataSourceChange={(v) => updateConfig('dataSource', v)}
      onWidgetTypeChange={(type: WidgetType | undefined) => updateConfig('widgetType', type)}
      onNameChange={(v) => updateConfig('name', v)}
      onDescriptionChange={(v) => updateConfig('description', v)}
      onSaveToCustomCatalogChange={(v) => updateConfig('saveToCustomCatalog', v)}
      onLabelChange={(v) => updateConfig('label', v)}
      onValueChange={(v) => updateConfig('value', v)}
      onSortChange={(v) => updateConfig('sort', v)}
      onSortOrderChange={(v) => updateConfig('sortOrder', v)}
      onColorSchemeChange={(v) => updateConfig('colorScheme', v)}
      onShowSummaryChange={(v) => updateConfig('showSummary', v)}
      onShowLegendChange={(v) => updateConfig('showLegend', v)}
      onFiltersChange={(v) => updateConfig('filters', v)}
    />
  );
};

WidgetSettingsSidebar.displayName = 'WidgetSettingsSidebar';

export default WidgetSettingsSidebar;

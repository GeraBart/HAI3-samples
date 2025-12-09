/**
 * useWidgetConfig Hook
 * Provides access to widget configuration system for building custom widgets
 */

import { useState, useCallback, useMemo } from 'react';
import {
  datasources,
  templates,
  widgets,
  getDatasourceByName,
  getTemplateByIcon,
  getMockData,
  getAvailableFields,
  buildPreviewData,
  getDatasourceNames,
  getTemplateNames,
} from '../config';
import type {
  Datasource,
  Template,
  Widget,
  WidgetTemplateConfig,
  WidgetPreviewData,
  TemplateIcon,
} from '../config/types';

export interface UseWidgetConfigReturn {
  // Data
  datasources: Datasource[];
  templates: Template[];
  catalogWidgets: Widget[];
  datasourceNames: string[];
  templateNames: string[];
  
  // State
  selectedDatasource: string | null;
  selectedTemplate: TemplateIcon | null;
  config: WidgetTemplateConfig;
  widgetName: string;
  widgetDescription: string;
  
  // Computed
  previewData: WidgetPreviewData;
  availableFields: string[];
  mockData: Record<string, unknown>[];
  
  // Actions
  setSelectedDatasource: (name: string | null) => void;
  setSelectedTemplate: (icon: TemplateIcon | null) => void;
  setConfig: (config: WidgetTemplateConfig) => void;
  updateConfig: (key: keyof WidgetTemplateConfig, value: unknown) => void;
  setWidgetName: (name: string) => void;
  setWidgetDescription: (description: string) => void;
  resetBuilder: () => void;
  
  // Helpers
  getDatasource: (name: string) => Datasource | undefined;
  getTemplate: (icon: TemplateIcon) => Template | undefined;
}

const defaultConfig: WidgetTemplateConfig = {
  title: '',
  label_field: '',
  value_field: '',
  sort_field: 'value',
  sort_order: 'desc',
  color_scheme: 'default',
  summary: true,
  legend: true,
};

export function useWidgetConfig(): UseWidgetConfigReturn {
  // State
  const [selectedDatasource, setSelectedDatasource] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateIcon | null>(null);
  const [config, setConfig] = useState<WidgetTemplateConfig>(defaultConfig);
  const [widgetName, setWidgetName] = useState('');
  const [widgetDescription, setWidgetDescription] = useState('');

  // Computed values
  const datasourceNames = useMemo(() => getDatasourceNames(), []);
  const templateNames = useMemo(() => getTemplateNames(), []);
  
  const availableFields = useMemo(() => {
    if (!selectedDatasource) return [];
    return getAvailableFields(selectedDatasource);
  }, [selectedDatasource]);

  const mockData = useMemo(() => {
    if (!selectedDatasource) return [];
    return getMockData(selectedDatasource);
  }, [selectedDatasource]);

  const previewData = useMemo(() => {
    return buildPreviewData(selectedDatasource, selectedTemplate, config);
  }, [selectedDatasource, selectedTemplate, config]);

  // Actions
  const updateConfig = useCallback((key: keyof WidgetTemplateConfig, value: unknown) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  }, []);

  const resetBuilder = useCallback(() => {
    setSelectedDatasource(null);
    setSelectedTemplate(null);
    setConfig(defaultConfig);
    setWidgetName('');
    setWidgetDescription('');
  }, []);

  const getDatasource = useCallback((name: string) => {
    return getDatasourceByName(name);
  }, []);

  const getTemplate = useCallback((icon: TemplateIcon) => {
    return getTemplateByIcon(icon);
  }, []);

  return {
    // Data
    datasources,
    templates,
    catalogWidgets: widgets,
    datasourceNames,
    templateNames,
    
    // State
    selectedDatasource,
    selectedTemplate,
    config,
    widgetName,
    widgetDescription,
    
    // Computed
    previewData,
    availableFields,
    mockData,
    
    // Actions
    setSelectedDatasource,
    setSelectedTemplate,
    setConfig,
    updateConfig,
    setWidgetName,
    setWidgetDescription,
    resetBuilder,
    
    // Helpers
    getDatasource,
    getTemplate,
  };
}

export default useWidgetConfig;

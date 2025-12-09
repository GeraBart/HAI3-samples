/**
 * Widget Configuration System
 * Exports all config data and types
 */

import datasourcesConfig from './datasources.config.json';
import templatesConfig from './templates.config.json';
import widgetsConfig from './widgets.config.json';

import type {
  Datasource,
  DatasourcesConfig,
  Template,
  TemplatesConfig,
  Widget,
  WidgetsConfig,
  WidgetTemplateConfig,
  WidgetPreviewData,
  TemplateIcon,
  WidgetSettings,
  ColumnConfig,
  WidgetSize,
  SchemaProperty,
  TemplateConfigSchema,
  WidgetBuilderState,
} from './types';

// ============================================
// CONFIG DATA
// ============================================

export const datasources = (datasourcesConfig as DatasourcesConfig).datasources;
export const templates = (templatesConfig as TemplatesConfig).templates;
export const widgets = (widgetsConfig as WidgetsConfig).widgets;

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get a datasource by name
 */
export function getDatasourceByName(name: string): Datasource | undefined {
  return datasources.find((ds) => ds.name === name);
}

/**
 * Get a datasource by function ID
 */
export function getDatasourceByFuncId(funcId: string): Datasource | undefined {
  return datasources.find((ds) => ds.func.id === funcId);
}

/**
 * Get a template by ID
 */
export function getTemplateById(id: string): Template | undefined {
  return templates.find((t) => t.id === id);
}

/**
 * Get a template by icon/type name
 */
export function getTemplateByIcon(icon: TemplateIcon): Template | undefined {
  return templates.find((t) => t.icon === icon);
}

/**
 * Get a widget by ID
 */
export function getWidgetById(id: string): Widget | undefined {
  return widgets.find((w) => w.id === id);
}

/**
 * Get all datasource names for dropdown
 */
export function getDatasourceNames(): string[] {
  return datasources.map((ds) => ds.name);
}

/**
 * Get all template names for dropdown
 */
export function getTemplateNames(): string[] {
  return templates.map((t) => t.name);
}

/**
 * Get mock data for a datasource
 */
export function getMockData(datasourceName: string): Record<string, unknown>[] {
  const ds = getDatasourceByName(datasourceName);
  return ds?.mock.items ?? [];
}

/**
 * Get available fields from mock data
 */
export function getAvailableFields(datasourceName: string): string[] {
  const mockData = getMockData(datasourceName);
  if (mockData.length === 0) return [];
  return Object.keys(mockData[0]);
}

/**
 * Build preview data for widget builder
 */
export function buildPreviewData(
  datasourceName: string | null,
  templateIcon: TemplateIcon | null,
  config: WidgetTemplateConfig
): WidgetPreviewData {
  const datasource = datasourceName ? getDatasourceByName(datasourceName) ?? null : null;
  const template = templateIcon ? getTemplateByIcon(templateIcon) ?? null : null;
  const mockData = datasourceName ? getMockData(datasourceName) : [];

  return {
    datasource,
    template,
    config,
    mockData,
  };
}

/**
 * Map our chart types to template icons
 */
export function chartTypeToTemplateIcon(chartType: string): TemplateIcon {
  const mapping: Record<string, TemplateIcon> = {
    donut: 'donut',
    bar: 'bar',
    table: 'table',
    list: 'list',
    legend: 'legend',
    treemap: 'treemap',
  };
  return mapping[chartType] ?? 'donut';
}

// ============================================
// RE-EXPORT TYPES
// ============================================

export type {
  Datasource,
  DatasourcesConfig,
  Template,
  TemplatesConfig,
  Widget,
  WidgetsConfig,
  WidgetTemplateConfig,
  WidgetPreviewData,
  WidgetSettings,
  ColumnConfig,
  TemplateIcon,
  WidgetSize,
  SchemaProperty,
  TemplateConfigSchema,
  WidgetBuilderState,
};

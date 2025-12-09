/**
 * Widget Configuration Types
 * Types for datasources, templates, and widgets configuration
 */

// ============================================
// DATASOURCE TYPES
// ============================================

export interface DatasourceFunc {
  id: string;
  params: Record<string, unknown>;
  returns: {
    items: unknown[];
    cursor?: {
      before: string | null;
      after: string | null;
      total: number;
    };
  };
}

export interface Datasource {
  name: string;
  func: DatasourceFunc;
  mock: {
    items: Record<string, unknown>[];
  };
}

export interface DatasourcesConfig {
  datasources: Datasource[];
}

// ============================================
// TEMPLATE TYPES
// ============================================

export type TemplateIcon = 'table' | 'donut' | 'bar' | 'list' | 'legend' | 'treemap';

export interface SchemaProperty {
  type: 'string' | 'number' | 'boolean' | 'array' | 'object';
  description?: string;
  enum?: string[];
  default?: unknown;
  items?: SchemaProperty;
  properties?: Record<string, SchemaProperty>;
  required?: string[];
}

export interface TemplateConfigSchema {
  title?: SchemaProperty;
  columns?: SchemaProperty;
  label_field?: SchemaProperty;
  value_field?: SchemaProperty;
  sort_field?: SchemaProperty;
  sort_order?: SchemaProperty;
  color_scheme?: SchemaProperty;
  summary?: SchemaProperty;
  legend?: SchemaProperty;
  group_field?: SchemaProperty;
  alignment?: SchemaProperty;
  striped?: SchemaProperty;
  bar_thickness?: SchemaProperty;
  stacked?: SchemaProperty;
  x_grid?: SchemaProperty;
  y_grid?: SchemaProperty;
  stepped?: SchemaProperty;
  color_field?: SchemaProperty;
  max_items?: SchemaProperty;
}

export interface Template {
  id: string;
  name: string;
  icon: TemplateIcon;
  configSchema: TemplateConfigSchema;
  dataSchema: {
    items: unknown[];
  };
}

export interface TemplatesConfig {
  templates: Template[];
}

// ============================================
// WIDGET TYPES
// ============================================

export type WidgetSize = 'SMALL' | 'MEDIUM' | 'LARGE';

export interface ColumnConfig {
  field: string;
  label?: string;
  width?: number;
  sortable?: boolean;
  hidden?: boolean;
}

export interface WidgetTemplateConfig {
  title?: string;
  columns?: ColumnConfig[];
  label_field?: string;
  value_field?: string;
  sort_field?: 'value' | 'label';
  sort_order?: 'asc' | 'desc';
  color_scheme?: string;
  summary?: boolean;
  legend?: boolean;
  group_field?: string;
  alignment?: 'left' | 'center' | 'right';
  striped?: boolean;
  bar_thickness?: number;
  stacked?: boolean;
  x_grid?: boolean;
  y_grid?: boolean;
  stepped?: boolean;
  color_field?: string;
  max_items?: number;
}

export interface WidgetSettings {
  datasource: {
    func: string;
  };
  template: {
    id: string;
    config: WidgetTemplateConfig;
  };
}

export interface Widget {
  id: string;
  icon: string;
  title: string;
  description: string;
  hsize: WidgetSize;
  vsize: WidgetSize;
  categories: string[];
  settings: WidgetSettings;
}

export interface WidgetsConfig {
  widgets: Widget[];
}

// ============================================
// COMBINED CONFIG TYPE
// ============================================

export interface WidgetSystemConfig {
  datasources: DatasourcesConfig;
  templates: TemplatesConfig;
  widgets: WidgetsConfig;
}

// ============================================
// RUNTIME TYPES (for Add Widget panel)
// ============================================

export interface WidgetBuilderState {
  selectedDatasource: string | null;
  selectedTemplate: string | null;
  config: WidgetTemplateConfig;
  name: string;
  description: string;
}

export interface WidgetPreviewData {
  datasource: Datasource | null;
  template: Template | null;
  config: WidgetTemplateConfig;
  mockData: Record<string, unknown>[];
}

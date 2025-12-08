/**
 * Dashboard Types
 * Type definitions for dashboard tabs and widgets
 */

/**
 * Dashboard tab
 */
export interface DashboardTab {
  id: string;
  name: string;
  isNew?: boolean;
}

/**
 * Dashboard state (empty, generating, or with widgets)
 */
export type DashboardState = 'empty' | 'generating' | 'preview';

/**
 * Widget type enumeration
 */
export type WidgetType = 
  | 'status-chart'
  | 'data-chart'
  | 'bar-chart'
  | 'table'
  | 'metric-card';

/**
 * Widget column span (1, 2, or 3 columns in a 3-column grid)
 */
export type WidgetColumnSpan = 1 | 2 | 3;

/**
 * Widget position in the grid
 */
export interface WidgetPosition {
  row: number;
  column: number;
  columnSpan: WidgetColumnSpan;
  height?: number;
}

/**
 * Grid layout for 3-column dashboard
 */
export interface GridLayout {
  columns: 3;
  gap: number;
  widgets: Record<string, WidgetPosition>;
}

/**
 * Widget configuration for settings sidebar
 */
export interface WidgetConfig {
  dataSource?: string;
  widgetType?: WidgetType;
  name?: string;
  description?: string;
  saveToCustomCatalog?: boolean;
  label?: string;
  value?: string;
  sort?: string;
  sortOrder?: 'asc' | 'desc';
  colorScheme?: string;
  showSummary?: boolean;
  showLegend?: boolean;
  filters?: Array<{
    id: string;
    field: string;
    operator: string;
    value: string;
  }>;
}

/**
 * Base widget configuration
 */
export interface BaseWidget {
  id: string;
  type: WidgetType;
  title: string;
  gridArea?: string;
  position?: WidgetPosition;
  config?: WidgetConfig;
}

/**
 * Status chart widget (donut/ring)
 */
export interface StatusChartWidget extends BaseWidget {
  type: 'status-chart';
  data: {
    value: number;
    total: number;
    label: string;
    color?: string;
  };
  legend?: Array<{
    label: string;
    value: number;
    color: string;
  }>;
}

/**
 * Data chart widget (line/area)
 */
export interface DataChartWidget extends BaseWidget {
  type: 'data-chart';
  data: Array<{
    label: string;
    value: number;
  }>;
  chartType?: 'line' | 'area';
  color?: string;
}

/**
 * Bar chart widget
 */
export interface BarChartWidget extends BaseWidget {
  type: 'bar-chart';
  data: Array<{
    label: string;
    value: number;
    color?: string;
  }>;
  orientation?: 'vertical' | 'horizontal';
  showLegend?: boolean;
  legendItems?: Array<{
    label: string;
    color: string;
  }>;
}

/**
 * Table widget
 */
export interface TableWidget extends BaseWidget {
  type: 'table';
  columns: Array<{
    key: string;
    label: string;
    width?: string;
  }>;
  data: Array<Record<string, string | number>>;
}

/**
 * Metric card widget
 */
export interface MetricCardWidget extends BaseWidget {
  type: 'metric-card';
  value: string | number;
  trend?: {
    direction: 'up' | 'down' | 'neutral';
    value: string;
  };
  subtitle?: string;
}

/**
 * Union type for all widgets
 */
export type Widget = 
  | StatusChartWidget 
  | DataChartWidget 
  | BarChartWidget 
  | TableWidget 
  | MetricCardWidget;

/**
 * Dashboard template
 */
export interface DashboardTemplate {
  id: string;
  titleKey: string;
  descriptionKey: string;
  category: string;
  widgets: Widget[];
}

/**
 * AI Insight item
 */
export interface AiInsight {
  id: string;
  type: 'warning' | 'positive' | 'info';
  text: string;
}

/**
 * Dashboard with widgets
 */
export interface Dashboard {
  id: string;
  name: string;
  state: DashboardState;
  widgets: Widget[];
  aiInsights?: AiInsight[];
}

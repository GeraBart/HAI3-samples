/**
 * Dashboard API Types
 */

export interface DashboardMetric {
  value: string;
  changePercent: number;
  label: string;
}

export interface LegendItem {
  label: string;
  percent: number;
  color: string;
}

export interface ProgressItem {
  label: string;
  percent: number;
}

export type ChartType = 'bar' | 'area' | 'progress';

export interface DashboardTemplate {
  id: string;
  title: string;
  description: string;
  category: string;
  chartType: ChartType;
  metrics: DashboardMetric[];
  chartData?: number[];
  legend?: LegendItem[];
  progressItems?: ProgressItem[];
  healthScore?: number;
}

export interface GetDashboardTemplatesResponse {
  templates: DashboardTemplate[];
  categories: string[];
}

// Widget data types
export interface WidgetDataPoint {
  label: string;
  value: number;
  color?: string;
}

export type WidgetType = 'bar' | 'line' | 'area' | 'pie' | 'table';

export interface WidgetConfig {
  id: string;
  type: WidgetType;
  title: string;
  period?: string;
  data: WidgetDataPoint[];
  yAxisMax?: number;
}

export interface GetWidgetDataResponse {
  widget: WidgetConfig;
}

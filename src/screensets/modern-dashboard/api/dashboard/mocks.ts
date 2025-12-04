/**
 * Mock data for dashboard API service
 */

import type { MockMap } from '@hai3/uicore';
import type { GetDashboardTemplatesResponse, DashboardTemplate, WidgetConfig } from './types';

const standardTemplate: DashboardTemplate = {
  id: 'standard',
  title: 'Standard',
  description: 'Track website traffic, user behavior, and conversion rates',
  category: 'All',
  chartType: 'bar',
  metrics: [
    { value: '24.5K', changePercent: 12.5, label: 'Total Visitors' },
    { value: '98.2K', changePercent: 8.0, label: 'Page Views' },
    { value: '42.8%', changePercent: -3.2, label: 'Bounce Rate' },
    { value: '3m 24s', changePercent: 5.1, label: 'Avg. Session' },
  ],
  chartData: [60, 80, 45, 90, 70, 55, 85, 40, 75, 65, 50, 70],
  legend: [
    { label: 'Google', percent: 45, color: '#2668C5' },
    { label: 'Social', percent: 23, color: '#408BEA' },
  ],
};

const salesTemplate: DashboardTemplate = {
  id: 'sales',
  title: 'Sales',
  description: 'Monitor revenue, pipeline, and sales team performance',
  category: 'Category 1',
  chartType: 'area',
  metrics: [
    { value: '142', changePercent: 12, label: 'Open Tickets' },
    { value: '2.4h', changePercent: -8, label: 'Avg Response' },
    { value: '94%', changePercent: 3, label: 'CSAT Score' },
    { value: '8.2h', changePercent: -15, label: 'Resolution' },
  ],
  chartData: [],
};

const customerSupportTemplate: DashboardTemplate = {
  id: 'customer-support',
  title: 'Customer support',
  description: 'Track tickets, response times, and satisfaction scores',
  category: 'Category 2',
  chartType: 'progress',
  metrics: [
    { value: '12.4K', changePercent: 5, label: 'Active Users' },
    { value: '87%', changePercent: 2, label: 'Features Used' },
    { value: '82%', changePercent: -1, label: 'Retention' },
    { value: '68', changePercent: 8, label: 'NPS' },
  ],
  progressItems: [
    { label: 'Dashboard', percent: 92 },
    { label: 'Reports', percent: 78 },
    { label: 'Analytics', percent: 85 },
  ],
  healthScore: 85,
};

const mockTemplates: DashboardTemplate[] = [
  standardTemplate,
  salesTemplate,
  customerSupportTemplate,
];

const mockCategories = ['All', 'Category 1', 'Category 2', 'Category 3'];

/**
 * Widget builder mock data
 */
const widgetSuggestions = [
  { id: '1', label: 'Show me a chart of monthly sales' },
  { id: '2', label: 'Patch compliance status' },
  { id: '3', label: 'Display device backup status' },
];

const widgetOptions = [
  {
    id: 'custom',
    icon: 'custom' as const,
    title: 'Create custom widget',
    description: 'Build your own widget from scratch with full control over design and data',
  },
  {
    id: 'catalog',
    icon: 'catalog' as const,
    title: 'Widget catalog',
    description: 'Browse and select from predefined widgets and your custom saved widgets',
  },
];

/**
 * Generated widget mock data
 */
const generatedActivitiesWidget: WidgetConfig = {
  id: 'activities-widget',
  type: 'bar',
  title: 'Activities',
  period: '7 days',
  yAxisMax: 135,
  data: [
    { label: '8 Jul', value: 95, color: '#22C55E' },
    { label: '', value: 115, color: '#22C55E' },
    { label: '10 Jul', value: 70, color: '#EAB308' },
    { label: '', value: 105, color: '#22C55E' },
    { label: '12 Jul', value: 85, color: '#EF4444' },
    { label: '', value: 110, color: '#22C55E' },
    { label: '14 Jul', value: 95, color: '#EAB308' },
  ],
};

/**
 * Mock responses for dashboard service endpoints
 */
export const dashboardMockMap = {
  'GET /dashboard/templates': () => ({
    templates: mockTemplates,
    categories: mockCategories,
  } satisfies GetDashboardTemplatesResponse),
  'GET /dashboard/widget-builder': () => ({
    suggestions: widgetSuggestions,
    options: widgetOptions,
  }),
  'POST /dashboard/widget': (body) => ({
    widgetId: `widget-${Date.now()}`,
    status: 'created' as const,
    message: `Widget created from prompt: "${(body as { prompt?: string })?.prompt ?? ''}"`,
  }),
  'GET /dashboard/widget/:id': () => ({
    widget: generatedActivitiesWidget,
  }),
} satisfies MockMap;

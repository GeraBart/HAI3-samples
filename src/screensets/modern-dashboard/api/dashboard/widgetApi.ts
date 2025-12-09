/**
 * Widget Builder API Types and Service
 */

export interface WidgetSuggestion {
  id: string;
  label: string;
}

export interface WidgetOption {
  id: string;
  icon: 'custom' | 'catalog';
  title: string;
  description: string;
}

export interface GetWidgetBuilderDataResponse {
  suggestions: WidgetSuggestion[];
  options: WidgetOption[];
}

export interface CreateWidgetRequest {
  prompt: string;
}

export interface CreateWidgetResponse {
  widgetId: string;
  status: 'created' | 'pending';
  message: string;
}

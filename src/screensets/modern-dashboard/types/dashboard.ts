/**
 * Dashboard domain types
 */

import type { WidgetConfig } from '../api/dashboard/types';

export type DashboardViewState = 'initial' | 'creating' | 'preview';

export type CreationStep = 'analyzing' | 'identifying' | 'generating';

export interface DashboardState {
  viewState: DashboardViewState;
  creationStep: CreationStep;
  isAddWidgetOpen: boolean;
  isGenerationComplete: boolean;
  generatedWidget: WidgetConfig | null;
  error: string | null;
}

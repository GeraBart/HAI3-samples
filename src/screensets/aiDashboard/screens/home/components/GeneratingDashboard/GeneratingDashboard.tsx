/**
 * GeneratingDashboard
 * Dashboard generation progress view with animated steps
 */

import React, { useEffect, useRef } from 'react';
import { useAppSelector, useTranslation, TextLoader } from '@hai3/uicore';
import { selectAiDashboardState } from '../../../../slices/aiDashboardSlice';
import { advanceGenerationStep, completeGeneration } from '../../../../actions/aiDashboardActions';
import { AI_DASHBOARD_SCREENSET_ID, HOME_SCREEN_ID } from '../../../../ids';
import type { Widget, AiInsight, GenerationStep as GenerationStepType } from '../../../../types';
import { GenerationStep } from './GenerationStep';

const STEP_DELAY_MS = 1500;

const MOCK_WIDGETS: Widget[] = [
  {
    id: 'status-1',
    type: 'status-chart',
    title: 'Status chart',
    data: { value: 200, total: 200, label: 'Total' },
    legend: [{ label: 'Success', value: 200, color: 'hsl(var(--success, 142 71% 45%))' }],
  },
  {
    id: 'data-1',
    type: 'status-chart',
    title: 'Data chart',
    data: { value: 200, total: 200, label: 'GB Total', color: 'hsl(var(--primary))' },
    legend: [{ label: 'First', value: 10, color: 'hsl(var(--primary))' }],
  },
  {
    id: 'status-2',
    type: 'status-chart',
    title: 'Status chart',
    data: { value: 200, total: 200, label: 'Total' },
    legend: [{ label: 'Success', value: 200, color: 'hsl(var(--success, 142 71% 45%))' }],
  },
  {
    id: 'bar-1',
    type: 'bar-chart',
    title: 'Activities',
    data: [
      { label: '1', value: 45, color: 'hsl(var(--destructive))' },
      { label: '2', value: 55, color: 'hsl(var(--warning, 24 95% 53%))' },
      { label: '3', value: 50, color: 'hsl(var(--warning, 48 96% 53%))' },
      { label: '4', value: 35, color: 'hsl(var(--success, 142 71% 45%))' },
      { label: '5', value: 48, color: 'hsl(var(--primary))' },
    ],
    showLegend: true,
    legendItems: [
      { label: 'Danger', color: 'hsl(var(--destructive))' },
      { label: 'Critical', color: 'hsl(var(--warning, 24 95% 53%))' },
      { label: 'Warning', color: 'hsl(var(--warning, 48 96% 53%))' },
      { label: 'Success', color: 'hsl(var(--success, 142 71% 45%))' },
    ],
  },
  {
    id: 'table-1',
    type: 'table',
    title: 'Table data',
    columns: [
      { key: 'status', label: 'Status', width: '80px' },
      { key: 'activity', label: 'Activity name' },
      { key: 'startTime', label: 'Start time', width: '120px' },
      { key: 'finishTime', label: 'Finish time', width: '120px' },
      { key: 'duration', label: 'Duration', width: '100px' },
      { key: 'startedBy', label: 'Started by', width: '120px' },
    ],
    data: [],
  },
];

const MOCK_INSIGHTS: AiInsight[] = [
  {
    id: '1',
    type: 'warning',
    text: '88% protection coverage with 2,079 machines still unprotected',
  },
  {
    id: '2',
    type: 'warning',
    text: '119 active alerts, primarily from 43 offline machines (36% of all alerts)',
  },
  {
    id: '3',
    type: 'warning',
    text: 'Combination of unprotected machines and offline devices creates compound risk',
  },
];

export const GeneratingDashboard: React.FC = () => {
  const { t } = useTranslation();
  const { generationSteps, currentStepIndex, generationPrompt } = useAppSelector(selectAiDashboardState);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (currentStepIndex >= 0 && currentStepIndex < generationSteps.length - 1) {
      timerRef.current = setTimeout(() => {
        advanceGenerationStep();
      }, STEP_DELAY_MS);
    } else if (currentStepIndex === generationSteps.length - 1) {
      timerRef.current = setTimeout(() => {
        completeGeneration(MOCK_WIDGETS, MOCK_INSIGHTS);
      }, STEP_DELAY_MS);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [currentStepIndex, generationSteps.length]);

  return (
    <div className="flex flex-col items-center gap-8 p-12">
      <div className="text-center">
        <h1 className="mb-2 text-2xl font-normal text-foreground">
          <TextLoader>
            {t(`screen.${AI_DASHBOARD_SCREENSET_ID}.${HOME_SCREEN_ID}:generating_title`)}
          </TextLoader>
        </h1>
        <p className="max-w-md text-sm text-foreground">
          {generationPrompt}
        </p>
      </div>

      <div className="flex w-full max-w-md flex-col gap-4">
        {generationSteps.map((step: GenerationStepType) => (
          <GenerationStep key={step.id} step={step} />
        ))}
      </div>
    </div>
  );
};

GeneratingDashboard.displayName = 'GeneratingDashboard';

export default GeneratingDashboard;

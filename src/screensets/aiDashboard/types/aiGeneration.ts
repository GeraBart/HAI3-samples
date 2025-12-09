/**
 * AI Generation Types
 * Type definitions for AI dashboard generation flow
 */

/**
 * Generation step status
 */
export type GenerationStepStatus = 'pending' | 'active' | 'completed';

/**
 * Generation step
 */
export interface GenerationStep {
  id: string;
  titleKey: string;
  descriptionKey: string;
  status: GenerationStepStatus;
}

/**
 * Generation state
 */
export interface GenerationState {
  isGenerating: boolean;
  prompt: string;
  currentStepIndex: number;
  steps: GenerationStep[];
  error?: string;
}

/**
 * Default generation steps
 */
export const DEFAULT_GENERATION_STEPS: GenerationStep[] = [
  {
    id: 'analyzing',
    titleKey: 'generation_step_analyzing_title',
    descriptionKey: 'generation_step_analyzing_description',
    status: 'pending',
  },
  {
    id: 'identifying',
    titleKey: 'generation_step_identifying_title',
    descriptionKey: 'generation_step_identifying_description',
    status: 'pending',
  },
  {
    id: 'selecting',
    titleKey: 'generation_step_selecting_title',
    descriptionKey: 'generation_step_selecting_description',
    status: 'pending',
  },
  {
    id: 'generating',
    titleKey: 'generation_step_generating_title',
    descriptionKey: 'generation_step_generating_description',
    status: 'pending',
  },
];

/**
 * Initial generation state
 */
export const INITIAL_GENERATION_STATE: GenerationState = {
  isGenerating: false,
  prompt: '',
  currentStepIndex: -1,
  steps: DEFAULT_GENERATION_STEPS,
};

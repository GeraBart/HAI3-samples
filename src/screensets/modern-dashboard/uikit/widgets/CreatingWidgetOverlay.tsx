import React from 'react';

type CreationStep = 'analyzing' | 'identifying' | 'generating';

interface CreatingWidgetOverlayProps {
  currentStep: CreationStep;
}

/**
 * Creation step item component
 */
const CreationStepItem: React.FC<{
  label: string;
  status: 'completed' | 'active' | 'pending';
}> = ({ label, status }) => (
  <div className={`
    flex items-center gap-3 px-6 py-4 rounded-md min-w-[280px]
    ${status === 'completed' ? 'bg-[#00204D] text-white' : ''}
    ${status === 'active' ? 'bg-white border border-[#2668C5] text-[#243143] shadow-sm' : ''}
    ${status === 'pending' ? 'bg-[#F4F7FC] text-[#243143]/50' : ''}
  `}>
    {status === 'completed' && (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M16 5L7.5 13.5L4 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )}
    {status === 'active' && (
      <div className="w-5 h-5 border-2 border-[#2668C5] border-t-transparent rounded-full animate-spin" />
    )}
    {status === 'pending' && <div className="w-5 h-5 rounded-full border-2 border-current opacity-30" />}
    <span className="text-sm font-medium">{label}</span>
  </div>
);

/**
 * CreatingWidgetOverlay - Shows creation progress in main area
 * Matches Figma design with centered steps
 */
export const CreatingWidgetOverlay: React.FC<CreatingWidgetOverlayProps> = ({
  currentStep,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      {/* Title */}
      <h2 className="text-2xl font-normal text-[#243143] mb-2">Creating your widget</h2>
      <p className="text-sm text-[#243143]/70 mb-8">Analyzing your data to create the perfect widget</p>

      {/* Steps */}
      <div className="flex flex-col gap-3">
        <CreationStepItem 
          label="Analyzing your request" 
          status={currentStep === 'analyzing' ? 'active' : 'completed'} 
        />
        <CreationStepItem 
          label="Identifying data sources" 
          status={
            currentStep === 'analyzing' ? 'pending' : 
            currentStep === 'identifying' ? 'active' : 'completed'
          } 
        />
        <CreationStepItem 
          label="Generating dashboard" 
          status={
            currentStep === 'generating' ? 'active' : 
            (currentStep === 'analyzing' || currentStep === 'identifying') ? 'pending' : 'completed'
          } 
        />
      </div>
    </div>
  );
};

CreatingWidgetOverlay.displayName = 'CreatingWidgetOverlay';

export type { CreationStep };

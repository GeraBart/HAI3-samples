/**
 * EmptyDashboard
 * Main component for empty dashboard state, composes all sections
 */

import React from 'react';
import { AiPromptSection } from './AiPromptSection';
import { TemplatesSection } from './TemplatesSection';
import { AdditionalOptions } from './AdditionalOptions';

export const EmptyDashboard: React.FC = () => {
  return (
    <div className="flex flex-col items-center gap-12 p-12">
      <AiPromptSection />
      <TemplatesSection />
      <AdditionalOptions />
    </div>
  );
};

EmptyDashboard.displayName = 'EmptyDashboard';

export default EmptyDashboard;

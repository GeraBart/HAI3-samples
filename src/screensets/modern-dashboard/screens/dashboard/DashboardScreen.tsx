import React, { useState, useEffect } from 'react';
import { I18nRegistry, useTranslation, useScreenTranslations, Language } from '@hai3/uicore';
import { MODERN_DASHBOARD_SCREENSET_ID, DASHBOARD_SCREEN_ID } from '../../ids';
import { AIPromptSection } from '../../uikit/widgets/AIPromptSection';
import { CategoryFilter } from '../../uikit/widgets/CategoryFilter';
import { DashboardTemplateCard } from '../../uikit/widgets/DashboardTemplateCard';
import { OptionCard } from '../../uikit/widgets/OptionCard';
import { AddWidgetPanel } from '../../uikit/widgets/AddWidgetPanel';
import { CreatingWidgetOverlay, type CreationStep } from '../../uikit/widgets/CreatingWidgetOverlay';
import { GeneratedWidgetPreview } from '../../uikit/widgets/GeneratedWidgetPreview';
import { dashboardMockMap } from '../../api/dashboard/mocks';
import type { DashboardTemplate } from '../../api/dashboard/types';

// Lazy-load screen-level translations
const translations = I18nRegistry.createLoader({
  [Language.English]: () => import('./i18n/en.json'),
  [Language.Arabic]: () => import('./i18n/ar.json'),
  [Language.Bengali]: () => import('./i18n/bn.json'),
  [Language.Czech]: () => import('./i18n/cs.json'),
  [Language.Danish]: () => import('./i18n/da.json'),
  [Language.German]: () => import('./i18n/de.json'),
  [Language.Greek]: () => import('./i18n/el.json'),
  [Language.Spanish]: () => import('./i18n/es.json'),
  [Language.Persian]: () => import('./i18n/fa.json'),
  [Language.Finnish]: () => import('./i18n/fi.json'),
  [Language.French]: () => import('./i18n/fr.json'),
  [Language.Hebrew]: () => import('./i18n/he.json'),
  [Language.Hindi]: () => import('./i18n/hi.json'),
  [Language.Hungarian]: () => import('./i18n/hu.json'),
  [Language.Indonesian]: () => import('./i18n/id.json'),
  [Language.Italian]: () => import('./i18n/it.json'),
  [Language.Japanese]: () => import('./i18n/ja.json'),
  [Language.Korean]: () => import('./i18n/ko.json'),
  [Language.Malay]: () => import('./i18n/ms.json'),
  [Language.Dutch]: () => import('./i18n/nl.json'),
  [Language.Norwegian]: () => import('./i18n/no.json'),
  [Language.Polish]: () => import('./i18n/pl.json'),
  [Language.Portuguese]: () => import('./i18n/pt.json'),
  [Language.Romanian]: () => import('./i18n/ro.json'),
  [Language.Russian]: () => import('./i18n/ru.json'),
  [Language.Swedish]: () => import('./i18n/sv.json'),
  [Language.Swahili]: () => import('./i18n/sw.json'),
  [Language.Tamil]: () => import('./i18n/ta.json'),
  [Language.Thai]: () => import('./i18n/th.json'),
  [Language.Tagalog]: () => import('./i18n/tl.json'),
  [Language.Turkish]: () => import('./i18n/tr.json'),
  [Language.Ukrainian]: () => import('./i18n/uk.json'),
  [Language.Urdu]: () => import('./i18n/ur.json'),
  [Language.Vietnamese]: () => import('./i18n/vi.json'),
  [Language.ChineseSimplified]: () => import('./i18n/zh.json'),
  [Language.ChineseTraditional]: () => import('./i18n/zh-TW.json'),
});

/**
 * DashboardScreen - Main analytics dashboard view matching Figma design
 */
export const DashboardScreen: React.FC = () => {
  // Register translations for this screen
  useScreenTranslations(MODERN_DASHBOARD_SCREENSET_ID, DASHBOARD_SCREEN_ID, translations);

  const { t } = useTranslation();
  const [templates, setTemplates] = useState<DashboardTemplate[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [isAddWidgetOpen, setIsAddWidgetOpen] = useState(false);
  const [isCreatingWidget, setIsCreatingWidget] = useState(false);
  const [creationStep, setCreationStep] = useState<CreationStep>('analyzing');
  const [isGenerationComplete, setIsGenerationComplete] = useState(false);

  // Load mock data
  useEffect(() => {
    const data = dashboardMockMap['GET /dashboard/templates']();
    setTemplates(data.templates);
    setCategories(data.categories);
  }, []);

  // Filter templates by category
  const filteredTemplates = activeCategory === 'All'
    ? templates
    : templates.filter((tmpl) => tmpl.category === activeCategory || tmpl.category === 'All');

  const handleAIPromptSubmit = (prompt: string) => {
    console.log('AI Prompt submitted:', prompt);
    // TODO: Implement AI dashboard generation
  };

  const handleTemplateSelect = (template: DashboardTemplate) => {
    console.log('Template selected:', template.id);
    // TODO: Implement template selection
  };

  const handleManualBuildClick = () => {
    setIsAddWidgetOpen(true);
  };

  const handleWidgetCreate = (widgetId: string) => {
    console.log('Widget created:', widgetId);
    setIsAddWidgetOpen(false);
    setIsCreatingWidget(false);
  };

  const handleStepChange = (step: CreationStep, isCreating: boolean) => {
    setCreationStep(step);
    setIsCreatingWidget(isCreating);
    // Mark generation complete when step is 'generating' and we're still creating
    // The actual completion is detected when isThinking becomes false in the panel
    if (step === 'generating' && isCreating) {
      // Set a timer to mark generation complete after the animation
      setTimeout(() => setIsGenerationComplete(true), 2000);
    }
    if (!isCreating) {
      setIsGenerationComplete(false);
    }
  };

  // Translation key prefix for this screen
  const tKey = (key: string) => `screen.${MODERN_DASHBOARD_SCREENSET_ID}.${DASHBOARD_SCREEN_ID}:${key}`;

  // Show placeholder when panel is open but not creating
  const showPlaceholder = isAddWidgetOpen && !isCreatingWidget && !isGenerationComplete;
  // Show generated widget preview after generation is complete
  const showGeneratedPreview = isAddWidgetOpen && isGenerationComplete;

  return (
    <div className="flex flex-col gap-8 p-8 max-w-5xl mx-auto">
      {/* Show Creating Widget Overlay when creating */}
      {isCreatingWidget && !isGenerationComplete ? (
        <div className="flex items-center justify-start min-h-[60vh]">
          <div className="w-full pr-[200px] flex justify-center">
            <CreatingWidgetOverlay currentStep={creationStep} />
          </div>
        </div>
      ) : showGeneratedPreview ? (
        /* Generated widget preview after generation complete */
        <div className="flex items-center justify-start min-h-[60vh]">
          <div className="w-full pr-[200px] flex justify-center">
            <GeneratedWidgetPreview />
          </div>
        </div>
      ) : showPlaceholder ? (
        /* Placeholder when Add Widget panel is open */
        <div className="flex items-center justify-start min-h-[60vh]">
          <div className="w-full pr-[200px] flex justify-center">
            <div className="w-[400px] h-[250px] bg-[#F0E6FA] rounded-lg flex items-center justify-center">
              <span className="text-[#243143]/50 text-sm">Placeholder</span>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* AI Prompt Section */}
          <section className="py-8">
            <AIPromptSection onSubmit={handleAIPromptSubmit} />
          </section>

          {/* Templates Section */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <h3 className="text-sm font-medium text-[#243143]">
                  {t(tKey('templates.title'))}
                </h3>
                <CategoryFilter
                  categories={categories}
                  activeCategory={activeCategory}
                  onCategoryChange={setActiveCategory}
                />
              </div>
              <button className="text-sm text-[#2668C5] hover:underline">
                {t(tKey('templates.see_more'))}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {filteredTemplates.map((template) => (
                <DashboardTemplateCard
                  key={template.id}
                  title={template.title}
                  description={template.description}
                  metrics={template.metrics}
                  chartType={template.chartType}
                  chartData={template.chartData}
                  legend={template.legend}
                  progressItems={template.progressItems}
                  healthScore={template.healthScore}
                  onClick={() => handleTemplateSelect(template)}
                />
              ))}
            </div>
          </section>

          {/* Options Section */}
          <section>
            <h3 className="text-sm font-medium text-[#243143] mb-4">
              {t(tKey('options.title'))}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <OptionCard type="upload" />
              <OptionCard type="manual" onClick={handleManualBuildClick} />
            </div>
          </section>
        </>
      )}

      {/* Add Widget Panel */}
      <AddWidgetPanel
        isOpen={isAddWidgetOpen}
        onClose={() => { setIsAddWidgetOpen(false); setIsCreatingWidget(false); }}
        onWidgetCreate={handleWidgetCreate}
        onStepChange={handleStepChange}
      />
    </div>
  );
};

DashboardScreen.displayName = 'DashboardScreen';

export default DashboardScreen;

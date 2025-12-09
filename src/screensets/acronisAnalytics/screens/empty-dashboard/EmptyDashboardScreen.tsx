/**
 * Empty Dashboard Screen
 * Provides empty state for dashboards with AI generation, templates, and import options
 */

import React, { useState } from 'react';
import {
  useTranslation,
  TextLoader,
  useScreenTranslations,
  I18nRegistry,
  Language,
} from '@hai3/uicore';
import {
  Button,
  Card,
  CardContent,
  Textarea,
} from '@hai3/uikit';
import { ButtonVariant, ButtonSize } from '@hai3/uikit-contracts';
import { Send, Upload, Grid2x2 } from 'lucide-react';
import { ACRONIS_ANALYTICS_SCREENSET_ID, EMPTY_DASHBOARD_SCREEN_ID } from '../../ids';
import {
  StandardTemplatePreview,
  SalesTemplatePreview,
  CustomerSupportTemplatePreview,
} from '../../uikit/components/TemplatePreview';

/**
 * Screen-level translations (loaded lazily when screen mounts)
 */
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
 * Dashboard template data
 */
interface DashboardTemplate {
  id: string;
  titleKey: string;
  descriptionKey: string;
  preview: React.ReactNode;
}

const templates: DashboardTemplate[] = [
  {
    id: 'standard',
    titleKey: 'template_standard_title',
    descriptionKey: 'template_standard_description',
    preview: <StandardTemplatePreview />,
  },
  {
    id: 'sales',
    titleKey: 'template_sales_title',
    descriptionKey: 'template_sales_description',
    preview: <SalesTemplatePreview />,
  },
  {
    id: 'customer-support',
    titleKey: 'template_customer_support_title',
    descriptionKey: 'template_customer_support_description',
    preview: <CustomerSupportTemplatePreview />,
  },
];

/**
 * Empty Dashboard Screen Component
 */
export const EmptyDashboardScreen: React.FC = () => {
  useScreenTranslations(ACRONIS_ANALYTICS_SCREENSET_ID, EMPTY_DASHBOARD_SCREEN_ID, translations);
  const { t } = useTranslation();
  const [aiPrompt, setAiPrompt] = useState('');

  const handleAiGenerate = () => {
    if (aiPrompt.trim()) {
      console.log('Generate dashboard with AI:', aiPrompt);
    }
  };

  const handleTemplateSelect = (templateId: string) => {
    console.log('Selected template:', templateId);
  };

  const handleImportJson = () => {
    console.log('Import JSON dashboard');
  };

  const handleAddWidget = () => {
    console.log('Add widget manually');
  };

  return (
    <div className="mx-auto flex max-w-5xl flex-col items-center gap-12 px-6 py-12">
      {/* AI Generation Section */}
      <div className="flex w-full max-w-[912px] flex-col items-center gap-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M16 3L16 29M3 16L29 16" className="stroke-primary" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>

        <div className="text-center">
          <h1 className="mb-2 text-2xl font-normal leading-8 text-foreground">
            <TextLoader>{t(`screen.${ACRONIS_ANALYTICS_SCREENSET_ID}.${EMPTY_DASHBOARD_SCREEN_ID}:ai_heading`)}</TextLoader>
          </h1>
          <p className="text-sm leading-6 text-foreground">
            <TextLoader>{t(`screen.${ACRONIS_ANALYTICS_SCREENSET_ID}.${EMPTY_DASHBOARD_SCREEN_ID}:ai_description`)}</TextLoader>
          </p>
        </div>

        <div className="relative w-full">
          <Textarea
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            placeholder={t(`screen.${ACRONIS_ANALYTICS_SCREENSET_ID}.${EMPTY_DASHBOARD_SCREEN_ID}:ai_placeholder`)}
            className="min-h-12 w-full resize-none pr-12"
          />
          <Button
            variant={ButtonVariant.Ghost}
            size={ButtonSize.Icon}
            onClick={handleAiGenerate}
            disabled={!aiPrompt.trim()}
            className="absolute right-2 top-2 h-8 w-8"
          >
            <Send size={16} />
          </Button>
        </div>
      </div>

      {/* Templates Section */}
      <div className="flex w-full flex-col gap-6">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium leading-6 text-foreground">
            <TextLoader>{t(`screen.${ACRONIS_ANALYTICS_SCREENSET_ID}.${EMPTY_DASHBOARD_SCREEN_ID}:templates_heading`)}</TextLoader>
          </h2>
          <Button variant={ButtonVariant.Link} size={ButtonSize.Sm}>
            <TextLoader>{t(`screen.${ACRONIS_ANALYTICS_SCREENSET_ID}.${EMPTY_DASHBOARD_SCREEN_ID}:templates_see_more`)}</TextLoader>
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {templates.map((template) => (
            <Card 
              key={template.id}
              onClick={() => handleTemplateSelect(template.id)}
              className="flex h-[203px] cursor-pointer flex-col"
            >
              <CardContent className="flex flex-1 flex-col p-0">
                <div className="h-[120px] overflow-hidden rounded-t bg-muted">
                  {template.preview}
                </div>
                <div className="flex flex-1 flex-col gap-1 p-4">
                  <h3 className="text-sm font-medium leading-6 text-foreground">
                    <TextLoader>{t(`screen.${ACRONIS_ANALYTICS_SCREENSET_ID}.${EMPTY_DASHBOARD_SCREEN_ID}:${template.titleKey}`)}</TextLoader>
                  </h3>
                  <p className="text-xs leading-4 text-muted-foreground">
                    <TextLoader>{t(`screen.${ACRONIS_ANALYTICS_SCREENSET_ID}.${EMPTY_DASHBOARD_SCREEN_ID}:${template.descriptionKey}`)}</TextLoader>
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Additional Options Section */}
      <div className="flex w-full flex-col gap-6">
        <h2 className="text-center text-sm font-medium leading-6 text-foreground">
          <TextLoader>{t(`screen.${ACRONIS_ANALYTICS_SCREENSET_ID}.${EMPTY_DASHBOARD_SCREEN_ID}:options_heading`)}</TextLoader>
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Import JSON */}
          <Card 
            onClick={handleImportJson}
            className="cursor-pointer border-dashed border-primary/30 bg-transparent"
          >
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-primary/10">
                <Upload size={24} className="text-primary" />
              </div>
              <div>
                <p className="text-sm leading-6 text-foreground">
                  <TextLoader>{t(`screen.${ACRONIS_ANALYTICS_SCREENSET_ID}.${EMPTY_DASHBOARD_SCREEN_ID}:import_title`)}</TextLoader>
                  {' '}
                  <span className="font-semibold text-primary">
                    <TextLoader>{t(`screen.${ACRONIS_ANALYTICS_SCREENSET_ID}.${EMPTY_DASHBOARD_SCREEN_ID}:import_browse`)}</TextLoader>
                  </span>
                  {' '}
                  <TextLoader>{t(`screen.${ACRONIS_ANALYTICS_SCREENSET_ID}.${EMPTY_DASHBOARD_SCREEN_ID}:import_description`)}</TextLoader>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Manual Widget Addition */}
          <Card 
            onClick={handleAddWidget}
            className="cursor-pointer border-primary/30"
          >
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-primary/10">
                <Grid2x2 size={24} className="text-primary" />
              </div>
              <div>
                <p className="text-sm leading-6 text-foreground">
                  <TextLoader>{t(`screen.${ACRONIS_ANALYTICS_SCREENSET_ID}.${EMPTY_DASHBOARD_SCREEN_ID}:manual_title`)}</TextLoader>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

EmptyDashboardScreen.displayName = 'EmptyDashboardScreen';

export default EmptyDashboardScreen;

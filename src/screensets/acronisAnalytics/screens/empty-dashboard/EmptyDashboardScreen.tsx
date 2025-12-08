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
    preview: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', height: '100%', padding: '6px', background: '#ffffff' }}>
        {/* Top row - 4 metric cards */}
        <div style={{ display: 'flex', gap: '3px' }}>
          <div style={{ flex: 1, background: '#ffffff', border: '0.5px solid #e5e7eb', borderRadius: '2px', padding: '4px' }}>
            <div style={{ fontSize: '6px', color: '#6b7280', marginBottom: '2px' }}>Total Visitors</div>
            <div style={{ fontSize: '9px', fontWeight: 600, color: '#243143' }}>24.5K</div>
          </div>
          <div style={{ flex: 1, background: '#ffffff', border: '0.5px solid #e5e7eb', borderRadius: '2px', padding: '4px' }}>
            <div style={{ fontSize: '6px', color: '#6b7280', marginBottom: '2px' }}>Page Views</div>
            <div style={{ fontSize: '9px', fontWeight: 600, color: '#243143' }}>98.2K</div>
          </div>
          <div style={{ flex: 1, background: '#ffffff', border: '0.5px solid #e5e7eb', borderRadius: '2px', padding: '4px' }}>
            <div style={{ fontSize: '6px', color: '#6b7280', marginBottom: '2px' }}>Bounce Rate</div>
            <div style={{ fontSize: '9px', fontWeight: 600, color: '#243143' }}>42.8%</div>
          </div>
          <div style={{ flex: 1, background: '#ffffff', border: '0.5px solid #e5e7eb', borderRadius: '2px', padding: '4px' }}>
            <div style={{ fontSize: '6px', color: '#6b7280', marginBottom: '2px' }}>Avg. Session</div>
            <div style={{ fontSize: '9px', fontWeight: 600, color: '#243143' }}>3m 24s</div>
          </div>
        </div>
        {/* Bottom - Bar chart */}
        <div style={{ flex: 1, background: '#ffffff', border: '0.5px solid #e5e7eb', borderRadius: '2px', padding: '4px', display: 'flex', alignItems: 'flex-end', gap: '1.5px' }}>
          {[45, 55, 50, 65, 48, 70, 52, 75, 58, 68, 62, 72, 55, 80].map((height, i) => (
            <div key={i} style={{ flex: 1, background: '#3b82f6', borderRadius: '1px 1px 0 0', height: `${height}%` }} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'sales',
    titleKey: 'template_sales_title',
    descriptionKey: 'template_sales_description',
    preview: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', height: '100%', padding: '6px', background: '#ffffff' }}>
        {/* Top row - 4 metric cards */}
        <div style={{ display: 'flex', gap: '3px' }}>
          <div style={{ flex: 1, background: '#ffffff', border: '0.5px solid #e5e7eb', borderRadius: '2px', padding: '4px' }}>
            <div style={{ fontSize: '6px', color: '#6b7280', marginBottom: '2px' }}>Open Tickets</div>
            <div style={{ fontSize: '9px', fontWeight: 600, color: '#243143' }}>142</div>
          </div>
          <div style={{ flex: 1, background: '#ffffff', border: '0.5px solid #e5e7eb', borderRadius: '2px', padding: '4px' }}>
            <div style={{ fontSize: '6px', color: '#6b7280', marginBottom: '2px' }}>Avg Response</div>
            <div style={{ fontSize: '9px', fontWeight: 600, color: '#243143' }}>2.4h</div>
          </div>
          <div style={{ flex: 1, background: '#ffffff', border: '0.5px solid #e5e7eb', borderRadius: '2px', padding: '4px' }}>
            <div style={{ fontSize: '6px', color: '#6b7280', marginBottom: '2px' }}>CSAT Score</div>
            <div style={{ fontSize: '9px', fontWeight: 600, color: '#243143' }}>94%</div>
          </div>
          <div style={{ flex: 1, background: '#ffffff', border: '0.5px solid #e5e7eb', borderRadius: '2px', padding: '4px' }}>
            <div style={{ fontSize: '6px', color: '#6b7280', marginBottom: '2px' }}>Resolution</div>
            <div style={{ fontSize: '9px', fontWeight: 600, color: '#243143' }}>8.2h</div>
          </div>
        </div>
        {/* Bottom row - Line chart and Bar chart */}
        <div style={{ flex: 1, display: 'flex', gap: '3px' }}>
          {/* Line chart */}
          <div style={{ flex: 1, background: '#ffffff', border: '0.5px solid #e5e7eb', borderRadius: '2px', padding: '4px', position: 'relative' }}>
            <div style={{ fontSize: '6px', color: '#6b7280', marginBottom: '2px' }}>Ticket Volume</div>
            <svg width="100%" height="85%" viewBox="0 0 100 40" preserveAspectRatio="none" style={{ position: 'absolute', bottom: '4px', left: '4px', right: '4px' }}>
              <path d="M 0,30 L 10,25 L 20,28 L 30,20 L 40,22 L 50,18 L 60,15 L 70,20 L 80,12 L 90,15 L 100,10" stroke="#93c5fd" strokeWidth="1" fill="none" />
              <path d="M 0,30 L 10,25 L 20,28 L 30,20 L 40,22 L 50,18 L 60,15 L 70,20 L 80,12 L 90,15 L 100,10 L 100,40 L 0,40 Z" fill="#dbeafe" opacity="0.5" />
            </svg>
          </div>
          {/* Bar chart */}
          <div style={{ flex: 1, background: '#ffffff', border: '0.5px solid #e5e7eb', borderRadius: '2px', padding: '4px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: '6px', color: '#6b7280', marginBottom: '2px' }}>By Priority</div>
            <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', gap: '3px', justifyContent: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                <div style={{ width: '12px', background: '#3b82f6', borderRadius: '1px 1px 0 0', height: '30px' }} />
                <div style={{ fontSize: '5px', color: '#6b7280' }}>Low</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                <div style={{ width: '12px', background: '#3b82f6', borderRadius: '1px 1px 0 0', height: '40px' }} />
                <div style={{ fontSize: '5px', color: '#6b7280' }}>Med</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                <div style={{ width: '12px', background: '#1e40af', borderRadius: '1px 1px 0 0', height: '35px' }} />
                <div style={{ fontSize: '5px', color: '#6b7280' }}>High</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'customer-support',
    titleKey: 'template_customer_support_title',
    descriptionKey: 'template_customer_support_description',
    preview: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', height: '100%', padding: '6px', background: '#ffffff' }}>
        {/* Top row - 4 metric cards */}
        <div style={{ display: 'flex', gap: '3px' }}>
          <div style={{ flex: 1, background: '#ffffff', border: '0.5px solid #e5e7eb', borderRadius: '2px', padding: '4px' }}>
            <div style={{ fontSize: '6px', color: '#6b7280', marginBottom: '2px' }}>Active Users</div>
            <div style={{ fontSize: '9px', fontWeight: 600, color: '#243143' }}>12.4K</div>
          </div>
          <div style={{ flex: 1, background: '#ffffff', border: '0.5px solid #e5e7eb', borderRadius: '2px', padding: '4px' }}>
            <div style={{ fontSize: '6px', color: '#6b7280', marginBottom: '2px' }}>Features Used</div>
            <div style={{ fontSize: '9px', fontWeight: 600, color: '#243143' }}>87%</div>
          </div>
          <div style={{ flex: 1, background: '#ffffff', border: '0.5px solid #e5e7eb', borderRadius: '2px', padding: '4px' }}>
            <div style={{ fontSize: '6px', color: '#6b7280', marginBottom: '2px' }}>Retention</div>
            <div style={{ fontSize: '9px', fontWeight: 600, color: '#243143' }}>82%</div>
          </div>
          <div style={{ flex: 1, background: '#ffffff', border: '0.5px solid #e5e7eb', borderRadius: '2px', padding: '4px' }}>
            <div style={{ fontSize: '6px', color: '#6b7280', marginBottom: '2px' }}>NPS</div>
            <div style={{ fontSize: '9px', fontWeight: 600, color: '#243143' }}>68</div>
          </div>
        </div>
        {/* Bottom row - Horizontal bars and Donut chart */}
        <div style={{ flex: 1, display: 'flex', gap: '3px' }}>
          {/* Horizontal bars */}
          <div style={{ flex: 1, background: '#ffffff', border: '0.5px solid #e5e7eb', borderRadius: '2px', padding: '4px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <div style={{ fontSize: '6px', color: '#6b7280', marginBottom: '1px' }}>Feature Adoption</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
              <div style={{ fontSize: '5px', color: '#6b7280', width: '20px' }}>Search</div>
              <div style={{ flex: 1, background: '#e5e7eb', height: '4px', borderRadius: '2px', position: 'relative' }}>
                <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '92%', background: '#3b82f6', borderRadius: '2px' }} />
              </div>
              <div style={{ fontSize: '5px', color: '#6b7280' }}>92%</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
              <div style={{ fontSize: '5px', color: '#6b7280', width: '20px' }}>Reports</div>
              <div style={{ flex: 1, background: '#e5e7eb', height: '4px', borderRadius: '2px', position: 'relative' }}>
                <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '78%', background: '#3b82f6', borderRadius: '2px' }} />
              </div>
              <div style={{ fontSize: '5px', color: '#6b7280' }}>78%</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
              <div style={{ fontSize: '5px', color: '#6b7280', width: '20px' }}>Export</div>
              <div style={{ flex: 1, background: '#e5e7eb', height: '4px', borderRadius: '2px', position: 'relative' }}>
                <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '65%', background: '#3b82f6', borderRadius: '2px' }} />
              </div>
              <div style={{ fontSize: '5px', color: '#6b7280' }}>65%</div>
            </div>
          </div>
          {/* Donut chart */}
          <div style={{ flex: 1, background: '#ffffff', border: '0.5px solid #e5e7eb', borderRadius: '2px', padding: '4px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ fontSize: '6px', color: '#6b7280', marginBottom: '4px', alignSelf: 'flex-start' }}>Health</div>
            <div style={{ position: 'relative', width: '40px', height: '40px' }}>
              <svg width="40" height="40" viewBox="0 0 40 40">
                <circle cx="20" cy="20" r="16" fill="none" stroke="#e5e7eb" strokeWidth="6" />
                <circle cx="20" cy="20" r="16" fill="none" stroke="#3b82f6" strokeWidth="6" strokeDasharray="75.4 100.5" strokeDashoffset="0" transform="rotate(-90 20 20)" />
              </svg>
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '8px', fontWeight: 600, color: '#243143' }}>85</div>
            </div>
            <div style={{ fontSize: '5px', color: '#6b7280', marginTop: '2px' }}>Excellent</div>
          </div>
        </div>
      </div>
    ),
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
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      padding: '48px 24px',
      maxWidth: '1200px',
      margin: '0 auto',
      gap: '48px'
    }}>
      {/* AI Generation Section */}
      <div style={{ width: '100%', maxWidth: '912px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
        <div style={{ 
          width: '48px', 
          height: '48px', 
          background: '#ecf3fd', 
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M16 3L16 29M3 16L29 16" stroke="#2668c5" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>

        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '24px', lineHeight: '32px', color: '#243143', marginBottom: '8px', fontWeight: 400 }}>
            <TextLoader>{t(`screen.${ACRONIS_ANALYTICS_SCREENSET_ID}.${EMPTY_DASHBOARD_SCREEN_ID}:ai_heading`)}</TextLoader>
          </h1>
          <p style={{ fontSize: '14px', lineHeight: '24px', color: '#243143' }}>
            <TextLoader>{t(`screen.${ACRONIS_ANALYTICS_SCREENSET_ID}.${EMPTY_DASHBOARD_SCREEN_ID}:ai_description`)}</TextLoader>
          </p>
        </div>

        <div style={{ width: '100%', position: 'relative' }}>
          <Textarea
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            placeholder={t(`screen.${ACRONIS_ANALYTICS_SCREENSET_ID}.${EMPTY_DASHBOARD_SCREEN_ID}:ai_placeholder`)}
            style={{ 
              width: '100%', 
              minHeight: '48px',
              paddingRight: '48px',
              resize: 'none'
            }}
          />
          <Button
            variant={ButtonVariant.Ghost}
            size={ButtonSize.Icon}
            onClick={handleAiGenerate}
            disabled={!aiPrompt.trim()}
            style={{ 
              position: 'absolute', 
              right: '8px', 
              top: '8px',
              width: '32px',
              height: '32px'
            }}
          >
            <Send size={16} />
          </Button>
        </div>
      </div>

      {/* Templates Section */}
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '14px', lineHeight: '24px', fontWeight: 500, color: '#243143' }}>
            <TextLoader>{t(`screen.${ACRONIS_ANALYTICS_SCREENSET_ID}.${EMPTY_DASHBOARD_SCREEN_ID}:templates_heading`)}</TextLoader>
          </h2>
          <Button variant={ButtonVariant.Link} size={ButtonSize.Sm}>
            <TextLoader>{t(`screen.${ACRONIS_ANALYTICS_SCREENSET_ID}.${EMPTY_DASHBOARD_SCREEN_ID}:templates_see_more`)}</TextLoader>
          </Button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          {templates.map((template) => (
            <Card 
              key={template.id}
              onClick={() => handleTemplateSelect(template.id)}
              style={{ cursor: 'pointer', height: '203px', display: 'flex', flexDirection: 'column' }}
            >
              <CardContent style={{ padding: 0, flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ 
                  height: '120px', 
                  background: '#f5f7fb',
                  borderRadius: '4px 4px 0 0',
                  overflow: 'hidden'
                }}>
                  {template.preview}
                </div>
                <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <h3 style={{ fontSize: '14px', lineHeight: '24px', fontWeight: 500, color: '#243143' }}>
                    <TextLoader>{t(`screen.${ACRONIS_ANALYTICS_SCREENSET_ID}.${EMPTY_DASHBOARD_SCREEN_ID}:${template.titleKey}`)}</TextLoader>
                  </h3>
                  <p style={{ fontSize: '12px', lineHeight: '16px', color: '#243143', opacity: 0.7 }}>
                    <TextLoader>{t(`screen.${ACRONIS_ANALYTICS_SCREENSET_ID}.${EMPTY_DASHBOARD_SCREEN_ID}:${template.descriptionKey}`)}</TextLoader>
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Additional Options Section */}
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <h2 style={{ fontSize: '14px', lineHeight: '24px', fontWeight: 500, color: '#243143', textAlign: 'center' }}>
          <TextLoader>{t(`screen.${ACRONIS_ANALYTICS_SCREENSET_ID}.${EMPTY_DASHBOARD_SCREEN_ID}:options_heading`)}</TextLoader>
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
          {/* Import JSON */}
          <Card 
            onClick={handleImportJson}
            style={{ 
              cursor: 'pointer', 
              border: '1px dashed rgba(38, 104, 197, 0.3)',
              background: 'transparent'
            }}
          >
            <CardContent style={{ padding: '16px', display: 'flex', gap: '16px', alignItems: 'center' }}>
              <div style={{ 
                width: '48px', 
                height: '48px', 
                background: '#ecf3fd', 
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Upload size={24} color="#2668c5" />
              </div>
              <div>
                <p style={{ fontSize: '14px', lineHeight: '24px', color: '#243143' }}>
                  <TextLoader>{t(`screen.${ACRONIS_ANALYTICS_SCREENSET_ID}.${EMPTY_DASHBOARD_SCREEN_ID}:import_title`)}</TextLoader>
                  {' '}
                  <span style={{ fontWeight: 600, color: '#2668c5' }}>
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
            style={{ 
              cursor: 'pointer',
              border: '1px solid rgba(38, 104, 197, 0.3)'
            }}
          >
            <CardContent style={{ padding: '16px', display: 'flex', gap: '16px', alignItems: 'center' }}>
              <div style={{ 
                width: '48px', 
                height: '48px', 
                background: '#ecf3fd', 
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Grid2x2 size={24} color="#2668c5" />
              </div>
              <div>
                <p style={{ fontSize: '14px', lineHeight: '24px', color: '#243143' }}>
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

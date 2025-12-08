/**
 * TemplatesSection
 * Template cards grid with category tabs
 */

import React, { useState } from 'react';
import { useTranslation, TextLoader } from '@hai3/uicore';
import { Button } from '@hai3/uikit';
import { ButtonVariant, ButtonSize } from '@hai3/uikit-contracts';
import { AI_DASHBOARD_SCREENSET_ID, HOME_SCREEN_ID } from '../../../../ids';
import { selectTemplate } from '../../../../actions/aiDashboardActions';
import { TemplateCard } from './TemplateCard';

const CATEGORIES = ['all', 'category1', 'category2', 'category3'] as const;

const TEMPLATES = [
  {
    id: 'standard',
    titleKey: 'template_standard_title',
    descriptionKey: 'template_standard_description',
    previewType: 'standard' as const,
    category: 'all',
  },
  {
    id: 'sales',
    titleKey: 'template_sales_title',
    descriptionKey: 'template_sales_description',
    previewType: 'sales' as const,
    category: 'all',
  },
  {
    id: 'customer-support',
    titleKey: 'template_customer_support_title',
    descriptionKey: 'template_customer_support_description',
    previewType: 'customer-support' as const,
    category: 'all',
  },
];

export const TemplatesSection: React.FC = () => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState<typeof CATEGORIES[number]>('all');

  const handleTemplateSelect = (templateId: string) => {
    selectTemplate(templateId);
  };

  const filteredTemplates = activeCategory === 'all'
    ? TEMPLATES
    : TEMPLATES.filter((template) => template.category === activeCategory);

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-sm font-medium text-foreground">
            <TextLoader>
              {t(`screen.${AI_DASHBOARD_SCREENSET_ID}.${HOME_SCREEN_ID}:templates_heading`)}
            </TextLoader>
          </h2>
          <div className="flex gap-2">
            {CATEGORIES.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? ButtonVariant.Secondary : ButtonVariant.Ghost}
                size={ButtonSize.Sm}
                onClick={() => setActiveCategory(category)}
                className="text-xs"
              >
                {category === 'all' ? 'All' : `Category ${category.replace('category', '')}`}
              </Button>
            ))}
          </div>
        </div>
        <Button variant={ButtonVariant.Link} size={ButtonSize.Sm}>
          <TextLoader>
            {t(`screen.${AI_DASHBOARD_SCREENSET_ID}.${HOME_SCREEN_ID}:templates_see_more`)}
          </TextLoader>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredTemplates.map((template) => (
          <TemplateCard
            key={template.id}
            id={template.id}
            titleKey={template.titleKey}
            descriptionKey={template.descriptionKey}
            previewType={template.previewType}
            onClick={() => handleTemplateSelect(template.id)}
          />
        ))}
      </div>
    </div>
  );
};

TemplatesSection.displayName = 'TemplatesSection';

export default TemplatesSection;

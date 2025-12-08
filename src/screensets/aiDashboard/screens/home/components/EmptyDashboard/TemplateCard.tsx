/**
 * TemplateCard
 * Individual template card with preview, title, and description
 */

import React from 'react';
import { useTranslation, TextLoader } from '@hai3/uicore';
import { Card, CardContent } from '@hai3/uikit';
import { AI_DASHBOARD_SCREENSET_ID, HOME_SCREEN_ID } from '../../../../ids';
import { TemplatePreview } from './TemplatePreview';

interface TemplateCardProps {
  id: string;
  titleKey: string;
  descriptionKey: string;
  previewType: 'standard' | 'sales' | 'customer-support';
  onClick: () => void;
}

export const TemplateCard: React.FC<TemplateCardProps> = ({
  titleKey,
  descriptionKey,
  previewType,
  onClick,
}) => {
  const { t } = useTranslation();

  return (
    <Card
      onClick={onClick}
      className="h-[203px] cursor-pointer transition-shadow hover:shadow-md"
    >
      <CardContent className="flex h-full flex-col p-0">
        <div className="h-[120px] overflow-hidden rounded-t bg-gray-50">
          <TemplatePreview type={previewType} />
        </div>
        <div className="flex flex-1 flex-col gap-1 p-4">
          <h3 className="text-sm font-medium text-foreground">
            <TextLoader>
              {t(`screen.${AI_DASHBOARD_SCREENSET_ID}.${HOME_SCREEN_ID}:${titleKey}`)}
            </TextLoader>
          </h3>
          <p className="text-xs text-muted-foreground">
            <TextLoader>
              {t(`screen.${AI_DASHBOARD_SCREENSET_ID}.${HOME_SCREEN_ID}:${descriptionKey}`)}
            </TextLoader>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

TemplateCard.displayName = 'TemplateCard';

export default TemplateCard;

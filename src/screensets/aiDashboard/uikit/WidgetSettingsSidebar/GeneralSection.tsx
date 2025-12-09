/**
 * GeneralSection
 * Name, Description, and Save to catalog checkbox
 */

import React from 'react';
import { useTranslation, TextLoader } from '@hai3/uicore';
import { Input, Textarea } from '@hai3/uikit';
import { ChevronUp } from 'lucide-react';
import { AI_DASHBOARD_SCREENSET_ID, HOME_SCREEN_ID } from '../../ids';

interface GeneralSectionProps {
  name: string;
  description: string;
  saveToCustomCatalog: boolean;
  onNameChange: (name: string) => void;
  onDescriptionChange: (description: string) => void;
  onSaveToCustomCatalogChange: (save: boolean) => void;
}

export const GeneralSection: React.FC<GeneralSectionProps> = ({
  name,
  description,
  saveToCustomCatalog,
  onNameChange,
  onDescriptionChange,
  onSaveToCustomCatalogChange,
}) => {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = React.useState(true);

  return (
    <div className="border-b border-border">
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex w-full items-center justify-between px-5 py-4 text-sm font-medium"
      >
        <TextLoader>
          {t(`screen.${AI_DASHBOARD_SCREENSET_ID}.${HOME_SCREEN_ID}:widget_settings_general`)}
        </TextLoader>
        <ChevronUp className={`h-4 w-4 transition-transform ${isExpanded ? '' : 'rotate-180'}`} />
      </button>
      {isExpanded && (
        <div className="flex flex-col gap-4 px-5 pb-4">
          <Input
            placeholder={t(`screen.${AI_DASHBOARD_SCREENSET_ID}.${HOME_SCREEN_ID}:widget_settings_name`)}
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
          />
          <Textarea
            placeholder={t(`screen.${AI_DASHBOARD_SCREENSET_ID}.${HOME_SCREEN_ID}:widget_settings_description`)}
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            rows={3}
          />
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="save-to-catalog"
              checked={saveToCustomCatalog}
              onChange={(e) => onSaveToCustomCatalogChange(e.target.checked)}
              className="h-4 w-4 rounded border-border"
            />
            <label htmlFor="save-to-catalog" className="text-sm">
              <TextLoader>
                {t(`screen.${AI_DASHBOARD_SCREENSET_ID}.${HOME_SCREEN_ID}:widget_settings_save_to_catalog`)}
              </TextLoader>
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

GeneralSection.displayName = 'GeneralSection';

export default GeneralSection;

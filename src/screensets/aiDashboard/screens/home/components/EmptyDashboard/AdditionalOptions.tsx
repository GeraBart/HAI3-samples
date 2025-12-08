/**
 * AdditionalOptions
 * Import JSON and Add widget manually cards
 */

import React from 'react';
import { useTranslation, TextLoader } from '@hai3/uicore';
import { Card, CardContent } from '@hai3/uikit';
import { Upload, Grid2x2 } from 'lucide-react';
import { AI_DASHBOARD_SCREENSET_ID, HOME_SCREEN_ID } from '../../../../ids';

export const AdditionalOptions: React.FC = () => {
  const { t } = useTranslation();

  const handleImportJson = () => {
    console.log('Import JSON clicked');
  };

  const handleAddWidget = () => {
    console.log('Add widget clicked');
  };

  return (
    <div className="flex w-full flex-col gap-6">
      <h2 className="text-center text-sm font-medium text-foreground">
        <TextLoader>
          {t(`screen.${AI_DASHBOARD_SCREENSET_ID}.${HOME_SCREEN_ID}:options_heading`)}
        </TextLoader>
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card
          onClick={handleImportJson}
          className="cursor-pointer border-dashed border-primary/30 bg-transparent transition-colors hover:border-primary/50"
        >
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-blue-50">
              <Upload className="h-6 w-6 text-primary" />
            </div>
            <p className="text-sm text-foreground">
              <TextLoader>
                {t(`screen.${AI_DASHBOARD_SCREENSET_ID}.${HOME_SCREEN_ID}:import_title`)}
              </TextLoader>
              {' '}
              <span className="font-semibold text-primary">
                <TextLoader>
                  {t(`screen.${AI_DASHBOARD_SCREENSET_ID}.${HOME_SCREEN_ID}:import_browse`)}
                </TextLoader>
              </span>
              {' '}
              <TextLoader>
                {t(`screen.${AI_DASHBOARD_SCREENSET_ID}.${HOME_SCREEN_ID}:import_description`)}
              </TextLoader>
            </p>
          </CardContent>
        </Card>

        <Card
          onClick={handleAddWidget}
          className="cursor-pointer border-primary/30 transition-colors hover:border-primary/50"
        >
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-blue-50">
              <Grid2x2 className="h-6 w-6 text-primary" />
            </div>
            <p className="text-sm text-foreground">
              <TextLoader>
                {t(`screen.${AI_DASHBOARD_SCREENSET_ID}.${HOME_SCREEN_ID}:manual_title`)}
              </TextLoader>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

AdditionalOptions.displayName = 'AdditionalOptions';

export default AdditionalOptions;

/**
 * AiInsightsPanel
 * Collapsible panel showing AI-generated insights
 */

import React from 'react';
import { useTranslation, TextLoader } from '@hai3/uicore';
import { Card, CardContent, CardHeader, CardTitle, Button } from '@hai3/uikit';
import { ButtonVariant, ButtonSize } from '@hai3/uikit-contracts';
import { Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { AI_DASHBOARD_SCREENSET_ID, HOME_SCREEN_ID } from '../../../../ids';
import type { AiInsight } from '../../../../types';
import { InsightItem } from './InsightItem';

interface AiInsightsPanelProps {
  insights: AiInsight[];
  isExpanded: boolean;
  onToggle: () => void;
}

export const AiInsightsPanel: React.FC<AiInsightsPanelProps> = ({
  insights,
  isExpanded,
  onToggle,
}) => {
  const { t } = useTranslation();

  const warningInsights = insights.filter((i) => i.type === 'warning');
  const positiveInsights = insights.filter((i) => i.type === 'positive');

  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <CardTitle className="text-base font-medium">
            <TextLoader>
              {t(`screen.${AI_DASHBOARD_SCREENSET_ID}.${HOME_SCREEN_ID}:insights_title`)}
            </TextLoader>
          </CardTitle>
          <span className="text-xs text-primary">
            <TextLoader>
              {t(`screen.${AI_DASHBOARD_SCREENSET_ID}.${HOME_SCREEN_ID}:insights_powered_by`)}
            </TextLoader>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant={ButtonVariant.Ghost} size={ButtonSize.Sm}>
            <TextLoader>
              {t(`screen.${AI_DASHBOARD_SCREENSET_ID}.${HOME_SCREEN_ID}:insights_custom_prompt`)}
            </TextLoader>
          </Button>
          <Button variant={ButtonVariant.Ghost} size={ButtonSize.Sm} onClick={onToggle}>
            <TextLoader>
              {t(`screen.${AI_DASHBOARD_SCREENSET_ID}.${HOME_SCREEN_ID}:insights_show_more`)}
            </TextLoader>
            {isExpanded ? (
              <ChevronUp className="ml-1 h-4 w-4" />
            ) : (
              <ChevronDown className="ml-1 h-4 w-4" />
            )}
          </Button>
        </div>
      </CardHeader>
      {isExpanded && (
        <CardContent className="pt-4">
          <div className="flex flex-col gap-4">
            {warningInsights.length > 0 && (
              <div>
                <h4 className="mb-2 text-sm font-semibold text-foreground">
                  <TextLoader>
                    {t(`screen.${AI_DASHBOARD_SCREENSET_ID}.${HOME_SCREEN_ID}:insights_security_gaps`)}
                  </TextLoader>
                </h4>
                <ul className="flex flex-col gap-2">
                  {warningInsights.map((insight) => (
                    <InsightItem key={insight.id} insight={insight} />
                  ))}
                </ul>
              </div>
            )}
            {positiveInsights.length > 0 && (
              <div>
                <h4 className="mb-2 text-sm font-semibold text-foreground">
                  <TextLoader>
                    {t(`screen.${AI_DASHBOARD_SCREENSET_ID}.${HOME_SCREEN_ID}:insights_positive`)}
                  </TextLoader>
                </h4>
                <ul className="flex flex-col gap-2">
                  {positiveInsights.map((insight) => (
                    <InsightItem key={insight.id} insight={insight} />
                  ))}
                </ul>
              </div>
            )}
          </div>
        </CardContent>
      )}
    </Card>
  );
};

AiInsightsPanel.displayName = 'AiInsightsPanel';

export default AiInsightsPanel;

/**
 * DashboardPreview
 * Dashboard view with AI insights and widget grid
 * Includes edit mode with centered widget and settings sidebar
 */

import React, { useState } from 'react';
import { useAppSelector, useTranslation, TextLoader } from '@hai3/uicore';
import { Switch, Button } from '@hai3/uikit';
import { ButtonVariant, ButtonSize } from '@hai3/uikit-contracts';
import { Plus, Send, MoreHorizontal } from 'lucide-react';
import { selectAiDashboardState } from '../../../../slices/aiDashboardSlice';
import { toggleAiInsights } from '../../../../actions/aiDashboardActions';
import { AI_DASHBOARD_SCREENSET_ID, HOME_SCREEN_ID } from '../../../../ids';
import { AiInsightsPanel } from './AiInsightsPanel';
import { WidgetGrid, WidgetEditMode } from '../../../../uikit/widgets';
import { WidgetSettingsSidebar } from '../../../../uikit/WidgetSettingsSidebar';

export const DashboardPreview: React.FC = () => {
  const { t } = useTranslation();
  const { activeTabId, widgets, aiInsights, showAiInsights, activeSettingsWidgetId } = useAppSelector(selectAiDashboardState);
  const [insightsExpanded, setInsightsExpanded] = useState(true);

  const currentWidgets = widgets[activeTabId] || [];
  const currentInsights = aiInsights[activeTabId] || [];

  const handleToggleAiInsights = () => {
    toggleAiInsights();
  };

  if (activeSettingsWidgetId) {
    return (
      <div className="flex h-full">
        <WidgetEditMode widgets={currentWidgets}>
          <WidgetSettingsSidebar />
        </WidgetEditMode>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Switch
              id="ai-insights"
              checked={showAiInsights}
              onCheckedChange={handleToggleAiInsights}
            />
            <label htmlFor="ai-insights" className="text-sm">
              <TextLoader>
                {t(`screen.${AI_DASHBOARD_SCREENSET_ID}.${HOME_SCREEN_ID}:ai_insights_toggle`)}
              </TextLoader>
            </label>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant={ButtonVariant.Outline} size={ButtonSize.Sm}>
            <Plus className="mr-1 h-4 w-4" />
            <TextLoader>
              {t(`screen.${AI_DASHBOARD_SCREENSET_ID}.${HOME_SCREEN_ID}:add_widget`)}
            </TextLoader>
          </Button>
          <Button variant={ButtonVariant.Outline} size={ButtonSize.Sm}>
            <Plus className="mr-1 h-4 w-4" />
            <TextLoader>
              {t(`screen.${AI_DASHBOARD_SCREENSET_ID}.${HOME_SCREEN_ID}:add_section`)}
            </TextLoader>
          </Button>
          <Button variant={ButtonVariant.Outline} size={ButtonSize.Sm}>
            <Send className="mr-1 h-4 w-4" />
            <TextLoader>
              {t(`screen.${AI_DASHBOARD_SCREENSET_ID}.${HOME_SCREEN_ID}:send`)}
            </TextLoader>
          </Button>
          <Button variant={ButtonVariant.Ghost} size={ButtonSize.Icon}>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {showAiInsights && currentInsights.length > 0 && (
        <AiInsightsPanel
          insights={currentInsights}
          isExpanded={insightsExpanded}
          onToggle={() => setInsightsExpanded(!insightsExpanded)}
        />
      )}

      <WidgetGrid widgets={currentWidgets} />
    </div>
  );
};

DashboardPreview.displayName = 'DashboardPreview';

export default DashboardPreview;

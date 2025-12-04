import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@hai3/uikit';
import { dashboardMockMap } from '../../api/dashboard/mocks';
import type { WidgetConfig, WidgetDataPoint } from '../../api/dashboard/types';

interface WidgetChartProps {
  config: WidgetConfig;
}

/**
 * BarChart - Reusable bar chart component matching Figma design
 */
const BarChart: React.FC<{ data: WidgetDataPoint[]; yAxisMax: number }> = ({ data, yAxisMax }) => {
  // Generate Y axis labels (135, 120, 105, 90, 75, 60, 45, 30, 15, 0)
  const yAxisLabels = [135, 120, 105, 90, 75, 60, 45, 30, 15, 0];
  const chartHeight = 180;

  return (
    <div className="relative">
      <div className="flex">
        {/* Y Axis */}
        <div 
          className="flex flex-col justify-between text-right pr-2 text-[11px] text-[#243143]/60 shrink-0"
          style={{ height: `${chartHeight}px` }}
        >
          {yAxisLabels.map((label, i) => (
            <span key={i}>{label}</span>
          ))}
        </div>

        {/* Chart Area */}
        <div className="flex-1 relative" style={{ height: `${chartHeight}px` }}>
          {/* Grid lines */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
            {yAxisLabels.map((_, i) => (
              <div key={i} className="border-t border-[#E5E7EB]/50 w-full" />
            ))}
          </div>

          {/* Bars */}
          <div className="absolute inset-0 flex items-end justify-around px-2">
            {data.map((item, i) => {
              const heightPercent = (item.value / yAxisMax) * 100;
              return (
                <div
                  key={i}
                  className="w-[30px] rounded-t-[3px] transition-all hover:opacity-90"
                  style={{
                    height: `${heightPercent}%`,
                    backgroundColor: item.color || '#22C55E',
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* X Axis Labels */}
      <div className="flex ml-8 mt-2">
        {data.map((item, i) => (
          <div key={i} className="flex-1 text-center text-[11px] text-[#243143]/60">
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * WidgetChart - Renders different chart types based on config
 */
const WidgetChart: React.FC<WidgetChartProps> = ({ config }) => {
  switch (config.type) {
    case 'bar':
      return <BarChart data={config.data} yAxisMax={config.yAxisMax || 100} />;
    // Add more chart types as needed
    default:
      return <BarChart data={config.data} yAxisMax={config.yAxisMax || 100} />;
  }
};

interface GeneratedWidgetPreviewProps {
  widgetId?: string;
  config?: WidgetConfig;
}

/**
 * GeneratedWidgetPreview - Reusable widget component with API data
 * Can receive config directly or fetch by widgetId
 */
export const GeneratedWidgetPreview: React.FC<GeneratedWidgetPreviewProps> = ({
  widgetId,
  config: propConfig,
}) => {
  const [config, setConfig] = useState<WidgetConfig | null>(propConfig || null);
  const [loading, setLoading] = useState(!propConfig);

  // Fetch widget data from API if widgetId provided
  useEffect(() => {
    if (propConfig) {
      setConfig(propConfig);
      setLoading(false);
      return;
    }

    if (widgetId) {
      // Simulate API call
      setLoading(true);
      const data = dashboardMockMap['GET /dashboard/widget/:id']();
      setConfig(data.widget);
      setLoading(false);
    } else {
      // Default: fetch generated widget
      const data = dashboardMockMap['GET /dashboard/widget/:id']();
      setConfig(data.widget);
      setLoading(false);
    }
  }, [widgetId, propConfig]);

  if (loading || !config) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-pulse bg-[#F4F7FC] w-[500px] h-[300px] rounded-lg" />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <Card className="w-[450px] bg-white border border-[#E5E7EB] shadow-lg rounded-lg">
        <CardContent className="p-5">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-[#243143]">{config.title}</h3>
            {config.period && (
              <span className="text-xs text-[#243143]/50">{config.period}</span>
            )}
          </div>

          {/* Chart */}
          <WidgetChart config={config} />
        </CardContent>
      </Card>
    </div>
  );
};

GeneratedWidgetPreview.displayName = 'GeneratedWidgetPreview';

// Export types for external use
export type { WidgetConfig, WidgetDataPoint };

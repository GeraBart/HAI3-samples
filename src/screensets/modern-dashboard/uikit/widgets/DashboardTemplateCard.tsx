import React from 'react';
import { Card, CardContent } from '@hai3/uikit';

interface TemplateMetric {
  value: string;
  changePercent: number;
  label: string;
}

interface LegendItem {
  label: string;
  percent: number;
  color?: string;
}

interface ProgressItem {
  label: string;
  percent: number;
}

type ChartType = 'bar' | 'area' | 'progress' | 'health';

interface DashboardTemplateCardProps {
  title: string;
  description: string;
  metrics: TemplateMetric[];
  chartType?: ChartType;
  chartData?: number[];
  legend?: LegendItem[];
  progressItems?: ProgressItem[];
  healthScore?: number;
  onClick?: () => void;
}

/**
 * StatCardMini inline - compact metric display matching Figma
 */
const StatCardMini: React.FC<{ metric: TemplateMetric }> = ({ metric }) => {
  const isPositive = metric.changePercent >= 0;
  return (
    <div className="flex flex-col min-w-0">
      <span className="text-[10px] text-foreground/60 truncate leading-tight">{metric.label}</span>
      <div className="flex items-baseline gap-1 flex-wrap">
        <span className="text-base font-semibold text-foreground leading-tight">{metric.value}</span>
        <span className={`text-[10px] leading-tight ${isPositive ? 'text-green-500' : 'text-destructive'}`}>
          {isPositive ? '+' : ''}{metric.changePercent}%
        </span>
      </div>
    </div>
  );
};

/**
 * Bar chart with legend (Standard template) - matching Figma exactly
 */
// Default legend colors derived from theme
const LEGEND_COLORS = [
  'hsl(var(--primary))',
  'hsl(var(--primary) / 0.7)',
  'hsl(var(--primary) / 0.5)',
  'hsl(var(--primary) / 0.3)',
];

const BarChartWithLegend: React.FC<{ data?: number[]; legend?: LegendItem[] }> = ({ 
  data = [40, 55, 35, 65, 50, 40, 60, 45, 55, 50, 35, 45, 60, 70, 55],
  legend = [{ label: 'Google', percent: 45 }, { label: 'Social', percent: 23 }]
}) => {
  const maxValue = Math.max(...data);
  return (
    <div className="flex gap-3">
      <div className="flex-1 flex items-end gap-[2px] h-[60px]">
        {data.map((value, i) => (
          <div
            key={i}
            className="flex-1 bg-primary rounded-t-[2px] min-w-[4px]"
            style={{ height: `${(value / maxValue) * 100}%` }}
          />
        ))}
      </div>
      <div className="flex flex-col justify-end gap-1.5 text-[11px] shrink-0">
        {legend.map((item, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <div 
              className="w-2 h-2 rounded-full shrink-0" 
              style={{ backgroundColor: item.color || LEGEND_COLORS[i % LEGEND_COLORS.length] }} 
            />
            <span className="text-foreground">{item.label}</span>
            <span className="text-foreground/60">{item.percent}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Area chart with labels (Sales template) - matching Figma
 */
const AreaChart: React.FC = () => (
  <div className="flex flex-col">
    <div className="text-[11px] text-foreground/60 mb-2">Ticket Volume</div>
    <div className="relative h-[50px] flex items-end">
      <svg viewBox="0 0 120 50" className="w-full h-full text-primary" preserveAspectRatio="none">
        <defs>
          <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.2" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        <path
          d="M0,45 C20,42 30,38 45,35 S60,30 75,25 S95,15 105,10 L120,5 L120,50 L0,50 Z"
          fill="url(#areaGradient)"
        />
        <path
          d="M0,45 C20,42 30,38 45,35 S60,30 75,25 S95,15 105,10 L120,5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    </div>
    <div className="flex justify-between text-[11px] text-foreground/60 mt-2 px-1">
      <span>Low</span>
      <span>Med</span>
      <span>High</span>
    </div>
  </div>
);

/**
 * Progress bars with health score (Customer Support template) - matching Figma
 */
const ProgressWithHealth: React.FC<{ items?: ProgressItem[]; healthScore?: number }> = ({
  items = [
    { label: 'Dashboard', percent: 92 },
    { label: 'Reports', percent: 78 },
    { label: 'Analytics', percent: 85 },
  ],
  healthScore = 85
}) => (
  <div className="flex gap-4">
    <div className="flex-1">
      <div className="text-[11px] text-foreground/60 mb-2">Feature Adoption</div>
      <div className="flex flex-col gap-2">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="text-[11px] text-foreground w-16 truncate">{item.label}</span>
            <div className="flex-1 h-2 bg-border rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary rounded-full transition-all" 
                style={{ width: `${item.percent}%` }} 
              />
            </div>
            <span className="text-[11px] text-foreground/60 w-10 text-right">{item.percent}%</span>
          </div>
        ))}
      </div>
    </div>
    <div className="flex flex-col items-center justify-center shrink-0">
      <div className="text-[11px] text-foreground/60 mb-1">Health</div>
      <div className="relative w-12 h-12">
        <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
          <circle cx="18" cy="18" r="15" fill="none" className="stroke-border" strokeWidth="3" />
          <circle 
            cx="18" cy="18" r="15" fill="none" className="stroke-green-500" strokeWidth="3"
            strokeDasharray={`${healthScore} 100`}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-bold text-green-500">{healthScore}</span>
        </div>
      </div>
      <span className="text-[10px] text-foreground/60 mt-0.5">Excellent</span>
    </div>
  </div>
);

/**
 * DashboardTemplateCard - Template preview card matching Figma design
 * Supports different chart types: bar, area, progress/health
 */
export const DashboardTemplateCard: React.FC<DashboardTemplateCardProps> = ({
  title,
  description,
  metrics,
  chartType = 'bar',
  chartData,
  legend,
  progressItems,
  healthScore,
  onClick,
}) => {
  return (
    <Card
      className="cursor-pointer hover:border-primary hover:shadow-lg hover:-translate-y-1 transition-all duration-200 bg-background border border-border"
      onClick={onClick}
    >
      <CardContent className="p-4">
        {/* Metrics Row - matching Figma layout */}
        <div className="grid grid-cols-4 gap-3 mb-4 pb-3 border-b border-border">
          {metrics.slice(0, 4).map((metric, index) => (
            <StatCardMini key={index} metric={metric} />
          ))}
        </div>

        {/* Chart Area */}
        <div className="mb-5 min-h-[70px]">
          {chartType === 'bar' && <BarChartWithLegend data={chartData} legend={legend} />}
          {chartType === 'area' && <AreaChart />}
          {chartType === 'progress' && <ProgressWithHealth items={progressItems} healthScore={healthScore} />}
        </div>

        {/* Title & Description */}
        <div className="space-y-1.5">
          <h3 className="text-base font-medium text-foreground">{title}</h3>
          <p className="text-sm text-foreground/70 leading-relaxed">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

DashboardTemplateCard.displayName = 'DashboardTemplateCard';

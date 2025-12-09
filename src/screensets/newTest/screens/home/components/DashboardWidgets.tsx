/**
 * Dashboard Widgets
 * Predefined widgets for the dashboard report view
 * Based on Figma: Ai dashboards - widgets (node 1167-15667)
 */

import React, { useState } from 'react';
import { useTranslation } from '@hai3/uicore';
import { Sparkles, BarChart2, Pencil, X, ChevronDown, ChevronUp, Plus } from 'lucide-react';
import { Input, Button, ButtonVariant } from '@hai3/uikit';
import { NEW_TEST_SCREENSET_ID, OVERVIEW_SCREEN_ID } from '../../../ids';
import { useWidgetConfigData } from '../../../hooks/useWidgetConfigData';

/**
 * Translation key helper
 */
const tk = (key: string) => `screen.${NEW_TEST_SCREENSET_ID}.${OVERVIEW_SCREEN_ID}:${key}`;

/**
 * Widget Card wrapper component
 * Shows hover actions in the header row (top-right)
 * Based on Figma: node 1167-15500
 */
interface WidgetCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode | ((chartType: ChartType) => React.ReactNode);
  className?: string;
  onAiClick?: () => void;
  onClose?: () => void;
}

/**
 * Chart type options for the chart selector dialog
 */
type ChartType = 'donut' | 'bar' | 'table' | 'list' | 'legend' | 'treemap';

interface ChartOption {
  type: ChartType;
  label: string;
}

const chartOptions: ChartOption[] = [
  { type: 'donut', label: 'Donut Chart' },
  { type: 'bar', label: 'Bar Chart' },
  { type: 'table', label: 'Table' },
  { type: 'list', label: 'List' },
  { type: 'legend', label: 'Legend' },
  { type: 'treemap', label: 'Treemap' },
];

/**
 * Chart icon component - renders the appropriate chart visualization
 */
const ChartIcon: React.FC<{ type: ChartType }> = ({ type }) => {
  switch (type) {
    case 'donut':
      return (
        <div className="w-14 h-14 flex items-center justify-center gap-1">
          <div className="relative w-8 h-8">
            <svg className="w-8 h-8" viewBox="0 0 32 32">
              <circle cx="16" cy="16" r="12" fill="none" className="stroke-green-500" strokeWidth="8" strokeDasharray="25.13 75.4" strokeDashoffset="0" transform="rotate(-90 16 16)" />
              <circle cx="16" cy="16" r="12" fill="none" className="stroke-orange-500" strokeWidth="8" strokeDasharray="25.13 75.4" strokeDashoffset="-25.13" transform="rotate(-90 16 16)" />
              <circle cx="16" cy="16" r="12" fill="none" className="stroke-red-500" strokeWidth="8" strokeDasharray="25.13 75.4" strokeDashoffset="-50.26" transform="rotate(-90 16 16)" />
            </svg>
            <div className="absolute inset-2 bg-white rounded-full" />
          </div>
          <div className="flex flex-col gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
            <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
            <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
          </div>
        </div>
      );
    case 'bar':
      return (
        <div className="w-14 h-14 flex items-end justify-center gap-1 pb-2 pt-1">
          <div className="w-2.5 h-4 bg-lime-400 rounded-sm" />
          <div className="w-2.5 h-7 bg-orange-400 rounded-sm" />
          <div className="w-2.5 h-5 bg-lime-400 rounded-sm" />
          <div className="w-2.5 h-9 bg-orange-400 rounded-sm" />
        </div>
      );
    case 'table':
      return (
        <div className="w-14 h-14 flex flex-col p-1.5 gap-0.5">
          <div className="flex gap-0.5">
            <div className="flex-1 h-2.5 bg-blue-500 rounded-sm" />
            <div className="flex-1 h-2.5 bg-blue-500 rounded-sm" />
            <div className="flex-1 h-2.5 bg-blue-500 rounded-sm" />
          </div>
          <div className="flex gap-0.5">
            <div className="flex-1 h-2 bg-gray-200 rounded-sm" />
            <div className="flex-1 h-2 bg-gray-200 rounded-sm" />
            <div className="flex-1 h-2 bg-gray-200 rounded-sm" />
          </div>
          <div className="flex gap-0.5">
            <div className="flex-1 h-2 bg-gray-200 rounded-sm" />
            <div className="flex-1 h-2 bg-gray-200 rounded-sm" />
            <div className="flex-1 h-2 bg-gray-200 rounded-sm" />
          </div>
          <div className="flex gap-0.5">
            <div className="flex-1 h-2 bg-gray-200 rounded-sm" />
            <div className="flex-1 h-2 bg-gray-200 rounded-sm" />
            <div className="flex-1 h-2 bg-gray-200 rounded-sm" />
          </div>
        </div>
      );
    case 'list':
      return (
        <div className="w-14 h-14 flex flex-col gap-1.5 p-2 justify-center">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            <div className="flex-1 h-1 bg-gray-300 rounded" />
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-orange-400" />
            <div className="flex-1 h-1 bg-gray-300 rounded" />
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
            <div className="flex-1 h-1 bg-gray-300 rounded" />
          </div>
        </div>
      );
    case 'legend':
      return (
        <div className="w-14 h-14 p-1.5 flex gap-2">
          <div className="flex flex-col gap-1.5 flex-1">
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              <div className="flex-1 h-1 bg-gray-300 rounded" />
            </div>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-orange-400" />
              <div className="flex-1 h-1 bg-gray-300 rounded" />
            </div>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
              <div className="flex-1 h-1 bg-gray-300 rounded" />
            </div>
          </div>
          <div className="flex flex-col gap-1.5 flex-1">
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              <div className="flex-1 h-1 bg-gray-300 rounded" />
            </div>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-orange-400" />
              <div className="flex-1 h-1 bg-gray-300 rounded" />
            </div>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
              <div className="flex-1 h-1 bg-gray-300 rounded" />
            </div>
          </div>
        </div>
      );
    case 'treemap':
      return (
        <div className="w-14 h-14 p-1.5">
          <div className="w-full h-full flex gap-0.5">
            <div className="w-7 h-full bg-amber-300 rounded-sm" />
            <div className="flex-1 flex flex-col gap-0.5">
              <div className="flex-1 bg-lime-400 rounded-sm" />
              <div className="flex-1 bg-red-400 rounded-sm" />
            </div>
          </div>
        </div>
      );
    default:
      return null;
  }
};

const WidgetCard: React.FC<WidgetCardProps> = ({ title, subtitle, children, className = '', onAiClick, onClose }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isChartDialogOpen, setIsChartDialogOpen] = useState(false);
  const [selectedChartType, setSelectedChartType] = useState<ChartType>('bar');

  const handleChartSelect = (type: ChartType) => {
    setSelectedChartType(type);
    setIsChartDialogOpen(false);
  };

  return (
    <div 
      className={`group relative rounded-lg border border-border bg-card p-4 transition-shadow hover:shadow-md ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Widget Header with Actions */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium">{title}</h3>
          {subtitle && <span className="text-xs text-muted-foreground">{subtitle}</span>}
        </div>
        
        {/* Header Actions - visible on hover */}
        <div 
          className={`flex items-center gap-1 transition-opacity ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <button 
            className="rounded p-1 text-primary hover:bg-primary/10"
            title="AI Chat"
            onClick={onAiClick}
          >
            <Sparkles className="h-4 w-4 fill-primary" />
          </button>
          
          {/* Chart Icon with Dialog */}
          <div className="relative">
            <button 
              className={`rounded p-1 text-primary hover:bg-primary/10 ${isChartDialogOpen ? 'bg-primary/10' : ''}`}
              title="View Chart"
              onClick={() => setIsChartDialogOpen(!isChartDialogOpen)}
            >
              <BarChart2 className="h-4 w-4" />
            </button>
            
          </div>
          
          <button 
            className="rounded p-1 text-primary hover:bg-primary/10"
            title="Edit"
          >
            <Pencil className="h-4 w-4 fill-primary" />
          </button>
          <button 
            className="rounded p-1 text-primary hover:bg-primary/10"
            title="Close"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
      {typeof children === 'function' ? children(selectedChartType) : children}
      
      {/* Chart Type Selector Dialog - centered on widget */}
      {isChartDialogOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsChartDialogOpen(false)} 
          />
          <div 
            className="absolute left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 w-52 rounded-xl border-2 border-primary bg-white p-3 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3 text-sm font-semibold text-gray-900">
              Charts
            </div>
            <div className="grid grid-cols-3 gap-2">
              {chartOptions.map((option) => (
                <button
                  key={option.type}
                  onClick={() => handleChartSelect(option.type)}
                  className={`flex items-center justify-center rounded-lg transition-all hover:bg-gray-50 ${
                    selectedChartType === option.type
                      ? 'bg-gray-50'
                      : 'bg-white'
                  }`}
                  title={option.label}
                >
                  <ChartIcon type={option.type} />
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

/**
 * Donut Chart component (simplified visual representation)
 */
interface DonutChartProps {
  value: number;
  label: string;
  color?: string;
}

const DonutChart: React.FC<DonutChartProps> = ({ value, label, color = 'primary' }) => (
  <div className="flex flex-col items-center">
    <div className={`relative flex h-24 w-24 items-center justify-center rounded-full border-8 border-${color}/20`}>
      <div className="text-center">
        <div className="text-2xl font-bold">{value}</div>
        <div className="text-xs text-muted-foreground">{label}</div>
      </div>
    </div>
  </div>
);

/**
 * Legend Item component
 */
interface LegendItemProps {
  color: string;
  label: string;
  value: number;
}

const LegendItem: React.FC<LegendItemProps> = ({ color, label, value }) => (
  <div className="flex items-center justify-between gap-2 text-xs">
    <div className="flex items-center gap-2">
      <div className={`h-2 w-2 rounded-full ${color}`} />
      <span className="text-muted-foreground">{label}</span>
    </div>
    <span className="font-medium">{value}</span>
  </div>
);

/**
 * Data item for chart visualizations
 */
interface DataItem {
  color: string;
  label: string;
  value: number;
}

/**
 * Table column definition
 */
interface TableColumn {
  key: string;
  label: string;
}

/**
 * Bar Chart Visualization
 */
const BarChartVisualization: React.FC<{ data: DataItem[]; total: number; totalLabel: string }> = ({ data, total, totalLabel }) => {
  const maxValue = Math.max(...data.map(d => d.value), 1);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-end justify-center gap-2 h-32">
        {data.slice(0, 6).map((item, index) => (
          <div key={index} className="flex flex-col items-center gap-1">
            <div 
              className={`w-6 rounded-t ${item.color}`} 
              style={{ height: `${Math.max((item.value / maxValue) * 100, 8)}%` }}
            />
            <span className="text-[8px] text-muted-foreground truncate w-8 text-center">{item.value}</span>
          </div>
        ))}
      </div>
      <div className="text-center text-sm text-muted-foreground">
        {totalLabel}: {total}
      </div>
    </div>
  );
};

/**
 * Table Visualization - Shows detailed table with dynamic columns
 */
const TableVisualization: React.FC<{ data: DataItem[]; total: number; totalLabel: string; columns?: TableColumn[] }> = ({ columns }) => {
  // Default columns if none provided - use generic columns based on data context
  const defaultColumns: TableColumn[] = [
    { key: 'name', label: 'Name' },
    { key: 'status', label: 'Status' },
    { key: 'value', label: 'Value' },
    { key: 'date', label: 'Date' },
  ];
  
  const tableColumns = columns || defaultColumns;
  
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs">
        <thead>
          <tr className="text-left text-muted-foreground">
            {tableColumns.map((col, index) => (
              <th key={col.key} className={`pb-2 font-medium ${index < tableColumns.length - 1 ? 'pr-4' : ''}`}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-muted-foreground">
          {[1, 2, 3].map((row) => (
            <tr key={row} className="border-t border-gray-100">
              {tableColumns.map((col, index) => (
                <td key={col.key} className={`py-2 ${index < tableColumns.length - 1 ? 'pr-4' : ''}`}>-</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

/**
 * List Visualization
 */
const ListVisualization: React.FC<{ data: DataItem[]; total: number; totalLabel: string }> = ({ data, total, totalLabel }) => (
  <div className="flex flex-col gap-2">
    {data.map((item, index) => (
      <div key={index} className="flex items-center gap-2 text-xs">
        <div className={`h-2 w-2 rounded-full ${item.color}`} />
        <span className="text-muted-foreground flex-1">{item.label}</span>
        <span className="font-medium">{item.value}</span>
      </div>
    ))}
    <div className="border-t pt-2 flex items-center justify-between text-xs font-semibold">
      <span>{totalLabel}</span>
      <span>{total}</span>
    </div>
  </div>
);

/**
 * Treemap Visualization
 */
const TreemapVisualization: React.FC<{ data: DataItem[]; total: number; totalLabel: string }> = ({ data }) => {
  const sortedData = [...data].sort((a, b) => b.value - a.value).slice(0, 6);
  return (
    <div className="grid grid-cols-3 gap-1 h-32">
      {sortedData.map((item, index) => (
        <div 
          key={index} 
          className={`${item.color} rounded flex items-center justify-center text-white text-xs font-medium ${index === 0 ? 'col-span-2 row-span-2' : ''}`}
        >
          {item.value}
        </div>
      ))}
    </div>
  );
};

/**
 * Chart Visualization Wrapper - renders the appropriate chart based on type
 */
interface ChartVisualizationProps {
  chartType: ChartType;
  data: DataItem[];
  total: number;
  totalLabel: string;
  tableColumns?: TableColumn[];
}

const ChartVisualization: React.FC<ChartVisualizationProps> = ({ chartType, data, total, totalLabel, tableColumns }) => {
  switch (chartType) {
    case 'donut':
      return (
        <div className="flex items-center gap-6">
          <DonutChart value={total} label={totalLabel} />
          <div className="flex flex-1 flex-col gap-1">
            {data.map((item, index) => (
              <LegendItem key={index} color={item.color} label={item.label} value={item.value} />
            ))}
          </div>
        </div>
      );
    case 'bar':
      return <BarChartVisualization data={data} total={total} totalLabel={totalLabel} />;
    case 'table':
      return <TableVisualization data={data} total={total} totalLabel={totalLabel} columns={tableColumns} />;
    case 'list':
      return <ListVisualization data={data} total={total} totalLabel={totalLabel} />;
    case 'legend':
      return (
        <div className="grid grid-cols-2 gap-2">
          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-2 text-xs">
              <div className={`h-2 w-2 rounded-full ${item.color}`} />
              <span className="text-muted-foreground">{item.label}</span>
              <span className="ml-auto font-medium">{item.value}</span>
            </div>
          ))}
        </div>
      );
    case 'treemap':
      return <TreemapVisualization data={data} total={total} totalLabel={totalLabel} />;
    default:
      return null;
  }
};

/**
 * Common widget props
 */
interface WidgetProps {
  onAiClick?: () => void;
  onClose?: () => void;
}

/**
 * Protection Status Widget
 */
export const ProtectionStatusWidget: React.FC<WidgetProps> = ({ onAiClick, onClose }) => {
  const { t } = useTranslation();
  
  const data: DataItem[] = [
    { color: 'bg-green-500', label: t(tk('widgets.protection_status.protected')), value: 0 },
    { color: 'bg-red-500', label: t(tk('widgets.protection_status.unprotected')), value: 0 },
    { color: 'bg-blue-500', label: t(tk('widgets.protection_status.managed')), value: 0 },
    { color: 'bg-gray-400', label: t(tk('widgets.protection_status.discovered')), value: 0 },
  ];
  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  const tableColumns: TableColumn[] = [
    { key: 'device', label: 'Device name' },
    { key: 'status', label: 'Status' },
    { key: 'agent', label: 'Agent version' },
    { key: 'lastSeen', label: 'Last seen' },
  ];
  
  return (
    <WidgetCard title={t(tk('widgets.protection_status.title'))} onAiClick={onAiClick} onClose={onClose}>
      {(chartType) => (
        <ChartVisualization 
          chartType={chartType} 
          data={data} 
          total={total} 
          totalLabel={t(tk('widgets.protection_status.machines'))} 
          tableColumns={tableColumns}
        />
      )}
    </WidgetCard>
  );
};

/**
 * Active Alerts Summary Widget
 */
export const ActiveAlertsSummaryWidget: React.FC<WidgetProps> = ({ onAiClick, onClose }) => {
  const { t } = useTranslation();
  
  // Data for the widget
  const alertsData: DataItem[] = [
    { color: 'bg-red-500', label: t(tk('widgets.active_alerts.machine_offline')), value: 0 },
    { color: 'bg-orange-500', label: t(tk('widgets.active_alerts.cannot_protect')), value: 0 },
    { color: 'bg-yellow-500', label: t(tk('widgets.active_alerts.azure_deletion')), value: 0 },
    { color: 'bg-red-400', label: t(tk('widgets.active_alerts.backup_failed')), value: 0 },
    { color: 'bg-orange-400', label: t(tk('widgets.active_alerts.activity_failed')), value: 0 },
    { color: 'bg-yellow-400', label: t(tk('widgets.active_alerts.plan_conflict')), value: 0 },
    { color: 'bg-blue-400', label: t(tk('widgets.active_alerts.activity_succeeded')), value: 0 },
    { color: 'bg-gray-400', label: t(tk('widgets.active_alerts.other')), value: 0 },
  ];
  const total = alertsData.reduce((sum, item) => sum + item.value, 0);
  
  const tableColumns: TableColumn[] = [
    { key: 'time', label: 'Alert time' },
    { key: 'type', label: 'Alert type' },
    { key: 'severity', label: 'Alert severity' },
    { key: 'device', label: 'Device name' },
    { key: 'plan', label: 'Plan name' },
    { key: 'message', label: 'Alert message' },
  ];
  
  return (
    <WidgetCard title={t(tk('widgets.active_alerts.title'))} onAiClick={onAiClick} onClose={onClose}>
      {(chartType) => (
        <ChartVisualization 
          chartType={chartType} 
          data={alertsData} 
          total={total} 
          totalLabel={t(tk('widgets.active_alerts.total'))} 
          tableColumns={tableColumns}
        />
      )}
    </WidgetCard>
  );
};

/**
 * Activities Widget
 */
export const ActivitiesWidget: React.FC<WidgetProps> = ({ onAiClick, onClose }) => {
  const { t } = useTranslation();
  
  const data: DataItem[] = [
    { color: 'bg-blue-500', label: t(tk('widgets.activities.total')), value: 0 },
    { color: 'bg-orange-500', label: t(tk('widgets.activities.danger')), value: 0 },
    { color: 'bg-red-500', label: t(tk('widgets.activities.critical')), value: 0 },
    { color: 'bg-green-500', label: t(tk('widgets.activities.success')), value: 0 },
  ];
  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  const tableColumns: TableColumn[] = [
    { key: 'time', label: 'Activity time' },
    { key: 'type', label: 'Activity type' },
    { key: 'status', label: 'Status' },
    { key: 'device', label: 'Device name' },
    { key: 'details', label: 'Details' },
  ];
  
  return (
    <WidgetCard title={t(tk('widgets.activities.title'))} onAiClick={onAiClick} onClose={onClose}>
      {(chartType) => (
        <ChartVisualization 
          chartType={chartType} 
          data={data} 
          total={total} 
          totalLabel={t(tk('widgets.activities.total'))} 
          tableColumns={tableColumns}
        />
      )}
    </WidgetCard>
  );
};

/**
 * Patch Installation Status Widget
 */
export const PatchInstallationWidget: React.FC<WidgetProps> = ({ onAiClick, onClose }) => {
  const { t } = useTranslation();
  
  const data: DataItem[] = [
    { color: 'bg-green-500', label: 'Installed', value: 0 },
    { color: 'bg-yellow-500', label: 'Pending', value: 0 },
    { color: 'bg-red-500', label: 'Failed', value: 0 },
  ];
  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  const tableColumns: TableColumn[] = [
    { key: 'patch', label: 'Patch name' },
    { key: 'status', label: 'Status' },
    { key: 'device', label: 'Device name' },
    { key: 'date', label: 'Install date' },
  ];
  
  return (
    <WidgetCard title={t(tk('widgets.patch_installation.title'))} subtitle="30 days" onAiClick={onAiClick} onClose={onClose}>
      {(chartType) => (
        <ChartVisualization 
          chartType={chartType} 
          data={data} 
          total={total} 
          totalLabel="Patches" 
          tableColumns={tableColumns}
        />
      )}
    </WidgetCard>
  );
};

/**
 * Missing Updates Widget
 */
export const MissingUpdatesWidget: React.FC<WidgetProps> = ({ onAiClick, onClose }) => {
  const { t } = useTranslation();
  
  const data: DataItem[] = [
    { color: 'bg-blue-500', label: t(tk('widgets.missing_updates.security')), value: 0 },
    { color: 'bg-orange-500', label: t(tk('widgets.missing_updates.critical')), value: 0 },
    { color: 'bg-gray-400', label: t(tk('widgets.missing_updates.other')), value: 0 },
  ];
  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  const tableColumns: TableColumn[] = [
    { key: 'update', label: 'Update name' },
    { key: 'type', label: 'Type' },
    { key: 'severity', label: 'Severity' },
    { key: 'device', label: 'Device name' },
  ];
  
  return (
    <WidgetCard title={t(tk('widgets.missing_updates.title'))} onAiClick={onAiClick} onClose={onClose}>
      {(chartType) => (
        <ChartVisualization 
          chartType={chartType} 
          data={data} 
          total={total} 
          totalLabel={t(tk('widgets.missing_updates.updates'))} 
          tableColumns={tableColumns}
        />
      )}
    </WidgetCard>
  );
};

/**
 * Disk Health Status Widget
 */
export const DiskHealthWidget: React.FC<WidgetProps> = ({ onAiClick, onClose }) => {
  const { t } = useTranslation();
  
  const data: DataItem[] = [
    { color: 'bg-red-500', label: t(tk('widgets.disk_health.critical')), value: 0 },
    { color: 'bg-yellow-500', label: t(tk('widgets.disk_health.warning')), value: 0 },
    { color: 'bg-green-500', label: t(tk('widgets.disk_health.ok')), value: 0 },
    { color: 'bg-gray-400', label: t(tk('widgets.disk_health.calculating')), value: 0 },
  ];
  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  const tableColumns: TableColumn[] = [
    { key: 'disk', label: 'Disk name' },
    { key: 'status', label: 'Health status' },
    { key: 'device', label: 'Device name' },
    { key: 'capacity', label: 'Capacity' },
  ];
  
  return (
    <WidgetCard title={t(tk('widgets.disk_health.title'))} onAiClick={onAiClick} onClose={onClose}>
      {(chartType) => (
        <ChartVisualization 
          chartType={chartType} 
          data={data} 
          total={total} 
          totalLabel={t(tk('widgets.disk_health.total'))} 
          tableColumns={tableColumns}
        />
      )}
    </WidgetCard>
  );
};

/**
 * Active Alerts Details Table Widget
 */
export const ActiveAlertsTableWidget: React.FC<WidgetProps> = ({ onAiClick, onClose }) => {
  const { t } = useTranslation();
  
  const data: DataItem[] = [
    { color: 'bg-red-500', label: 'Critical', value: 0 },
    { color: 'bg-orange-500', label: 'Warning', value: 0 },
    { color: 'bg-blue-500', label: 'Info', value: 0 },
  ];
  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  const tableColumns: TableColumn[] = [
    { key: 'time', label: 'Alert time' },
    { key: 'type', label: 'Alert type' },
    { key: 'severity', label: 'Alert severity' },
    { key: 'device', label: 'Device name' },
    { key: 'plan', label: 'Plan name' },
    { key: 'message', label: 'Alert message' },
  ];
  
  return (
    <WidgetCard title={t(tk('widgets.alerts_table.title'))} className="col-span-full" onAiClick={onAiClick} onClose={onClose}>
      {(chartType) => (
        <ChartVisualization 
          chartType={chartType} 
          data={data} 
          total={total} 
          totalLabel="Alerts" 
          tableColumns={tableColumns}
        />
      )}
    </WidgetCard>
  );
};

/**
 * Widget data configuration for AI insights
 */
interface WidgetData {
  title: string;
  timeframe: string;
  total: number;
  totalLabel: string;
  chartColor: string;
  items: Array<{ color: string; label: string; value: number }>;
  insights: string[];
}

const getWidgetData = (widgetId: string, t: (key: string) => string): WidgetData => {
  const widgetConfigs: Record<string, WidgetData> = {
    'protection_status': {
      title: t(tk('widgets.protection_status.title')),
      timeframe: '',
      total: 0,
      totalLabel: t(tk('widgets.protection_status.machines')),
      chartColor: 'text-green-500',
      items: [
        { color: 'bg-green-500', label: t(tk('widgets.protection_status.protected')), value: 0 },
        { color: 'bg-red-500', label: t(tk('widgets.protection_status.unprotected')), value: 0 },
        { color: 'bg-blue-500', label: t(tk('widgets.protection_status.managed')), value: 0 },
        { color: 'bg-gray-400', label: t(tk('widgets.protection_status.discovered')), value: 0 },
      ],
      insights: [
        'No machines are currently being monitored.',
        'This may indicate that agents have not been deployed yet.',
        'Recommendation: Deploy protection agents to your infrastructure.',
        'Start with critical servers and workstations first.',
        'Consider using automated deployment for large-scale rollouts.',
      ],
    },
    'active_alerts': {
      title: t(tk('widgets.active_alerts.title')),
      timeframe: '7 days',
      total: 0,
      totalLabel: t(tk('widgets.active_alerts.total')),
      chartColor: 'text-blue-500',
      items: [
        { color: 'bg-red-500', label: t(tk('widgets.active_alerts.machine_offline')), value: 0 },
        { color: 'bg-orange-500', label: t(tk('widgets.active_alerts.cannot_protect')), value: 0 },
        { color: 'bg-yellow-500', label: t(tk('widgets.active_alerts.azure_deletion')), value: 0 },
        { color: 'bg-red-400', label: t(tk('widgets.active_alerts.backup_failed')), value: 0 },
        { color: 'bg-orange-400', label: t(tk('widgets.active_alerts.activity_failed')), value: 0 },
        { color: 'bg-yellow-400', label: t(tk('widgets.active_alerts.plan_conflict')), value: 0 },
        { color: 'bg-blue-400', label: t(tk('widgets.active_alerts.activity_succeeded')), value: 0 },
        { color: 'bg-gray-400', label: t(tk('widgets.active_alerts.other')), value: 0 },
      ],
      insights: [
        'No active alerts have been recorded in the last 7 days.',
        'This indicates that all systems are operating normally.',
        'Continue monitoring to catch any issues early.',
        'Recommendation: Set up proactive alerting for critical events.',
        'Consider reviewing alert thresholds to ensure proper coverage.',
      ],
    },
    'activities': {
      title: t(tk('widgets.activities.title')),
      timeframe: '7 days',
      total: 0,
      totalLabel: t(tk('widgets.activities.total')),
      chartColor: 'text-blue-500',
      items: [
        { color: 'bg-blue-500', label: t(tk('widgets.activities.total')), value: 0 },
        { color: 'bg-orange-500', label: t(tk('widgets.activities.danger')), value: 0 },
        { color: 'bg-red-500', label: t(tk('widgets.activities.critical')), value: 0 },
        { color: 'bg-green-500', label: t(tk('widgets.activities.success')), value: 0 },
      ],
      insights: [
        'No activities have been recorded in the last 7 days.',
        'This could indicate that backup jobs are not configured or running.',
        'Recommendation: Verify that protection plans are active and scheduled.',
        'Check if agents are properly connected and reporting.',
        'Consider setting up automated backup schedules for critical workloads.',
      ],
    },
    'patch_installation': {
      title: t(tk('widgets.patch_installation.title')),
      timeframe: '30 days',
      total: 0,
      totalLabel: 'Patches',
      chartColor: 'text-muted-foreground',
      items: [],
      insights: [
        'No patch installation data available for the last 30 days.',
        'This may indicate patch management is not configured.',
        'Recommendation: Enable patch management to keep systems secure.',
        'Unpatched systems are vulnerable to security exploits.',
        'Consider implementing an automated patching schedule.',
      ],
    },
    'missing_updates': {
      title: t(tk('widgets.missing_updates.title')),
      timeframe: '',
      total: 0,
      totalLabel: t(tk('widgets.missing_updates.updates')),
      chartColor: 'text-blue-500',
      items: [
        { color: 'bg-blue-500', label: t(tk('widgets.missing_updates.security')), value: 0 },
        { color: 'bg-orange-500', label: t(tk('widgets.missing_updates.critical')), value: 0 },
        { color: 'bg-gray-400', label: t(tk('widgets.missing_updates.other')), value: 0 },
      ],
      insights: [
        'No missing updates detected across monitored machines.',
        'All systems appear to be up to date with latest patches.',
        'Continue monitoring for new updates as they are released.',
        'Recommendation: Maintain regular update schedules.',
        'Consider enabling automatic updates for critical security patches.',
      ],
    },
    'disk_health': {
      title: t(tk('widgets.disk_health.title')),
      timeframe: '',
      total: 0,
      totalLabel: t(tk('widgets.disk_health.total')),
      chartColor: 'text-green-500',
      items: [
        { color: 'bg-red-500', label: t(tk('widgets.disk_health.critical')), value: 0 },
        { color: 'bg-yellow-500', label: t(tk('widgets.disk_health.warning')), value: 0 },
        { color: 'bg-green-500', label: t(tk('widgets.disk_health.ok')), value: 0 },
        { color: 'bg-gray-400', label: t(tk('widgets.disk_health.calculating')), value: 0 },
      ],
      insights: [
        'No disk health data is currently available.',
        'Disk health monitoring may not be enabled on agents.',
        'Recommendation: Enable disk health monitoring to prevent data loss.',
        'Proactive disk monitoring can predict failures before they occur.',
        'Consider setting up alerts for disks with degraded health.',
      ],
    },
    'alerts_table': {
      title: t(tk('widgets.alerts_table.title')),
      timeframe: '',
      total: 0,
      totalLabel: 'Alerts',
      chartColor: 'text-muted-foreground',
      items: [],
      insights: [
        'The alerts table provides detailed information about each alert.',
        'Use filters to narrow down alerts by type, severity, or device.',
        'Recommendation: Address critical alerts first.',
        'Set up alert notifications to respond quickly to issues.',
        'Review alert patterns to identify recurring problems.',
      ],
    },
  };

  return widgetConfigs[widgetId] || widgetConfigs['active_alerts'];
};

/**
 * AI Insights Modal
 * Opens a modal with widget summary on left and AI insights on right
 * Based on Figma: node 1167-15337
 */
interface AiInsightsModalProps {
  widgetId: string;
  isOpen: boolean;
  onClose: () => void;
  customWidgetConfig?: CustomWidgetConfig;
}

const AiInsightsModal: React.FC<AiInsightsModalProps> = ({ widgetId, isOpen, onClose, customWidgetConfig }) => {
  const { t } = useTranslation();
  const { getMockData } = useWidgetConfigData();

  if (!isOpen) return null;

  // Check if this is a custom widget
  const isCustomWidget = widgetId.startsWith('custom-widget-') && customWidgetConfig;
  
  // Get data for predefined widgets
  const data = !isCustomWidget ? getWidgetData(widgetId, t) : null;
  
  // Get mock data for custom widgets
  const customMockData = isCustomWidget && customWidgetConfig?.datasource 
    ? getMockData(customWidgetConfig.datasource) 
    : [];
  
  // Generate insights for custom widget based on its data
  const getCustomWidgetInsights = (): string[] => {
    if (!customWidgetConfig) return [];
    const dataCount = customMockData.length;
    const widgetType = customWidgetConfig.type;
    
    // Generate contextual insights based on widget type and data
    const insights: string[] = [];
    
    if (dataCount === 0) {
      insights.push('No data is currently available for this widget.');
      insights.push('Verify that the datasource is properly configured.');
    } else {
      insights.push(`This ${widgetType} widget is displaying ${dataCount} data points.`);
      
      if (widgetType === 'donut' || widgetType === 'bar') {
        const valueField = customWidgetConfig.valueField || 'count';
        const total = customMockData.reduce((sum, item) => sum + (Number(item[valueField]) || 0), 0);
        insights.push(`Total value across all items: ${total.toLocaleString()}`);
        
        if (customMockData.length > 0) {
          const maxItem = customMockData.reduce((max, item) => 
            (Number(item[valueField]) || 0) > (Number(max[valueField]) || 0) ? item : max
          );
          const labelField = customWidgetConfig.labelField || 'type';
          insights.push(`Highest value: "${maxItem[labelField]}" with ${Number(maxItem[valueField]).toLocaleString()}`);
        }
      }
      
      if (widgetType === 'table') {
        const columns = customWidgetConfig.columns || [];
        const visibleColumns = columns.filter(c => !c.hidden);
        insights.push(`Displaying ${visibleColumns.length} columns of data.`);
      }
    }
    
    insights.push('Recommendation: Review the data trends and take action if needed.');
    insights.push('Consider setting up alerts for significant changes in these metrics.');
    
    return insights;
  };

  // Get title and insights based on widget type
  const title = isCustomWidget ? customWidgetConfig.name : data?.title || 'Widget';
  const insights = isCustomWidget ? getCustomWidgetInsights() : data?.insights || [];

  return (
    <>
      {/* Floating Widget Summary Card */}
      <div className="fixed left-1/2 top-1/3 z-50 -translate-x-1/2 -translate-y-1/2">
        <div className="rounded-lg border border-border bg-card p-4 shadow-lg min-w-[400px]">
          {/* Widget Header */}
          <div className="mb-3 flex items-center justify-between gap-16">
            <h3 className="font-medium">{title}</h3>
            {!isCustomWidget && data?.timeframe && (
              <span className="text-sm text-muted-foreground">{data.timeframe}</span>
            )}
          </div>

          {/* Widget Content - Render based on type */}
          {isCustomWidget && customWidgetConfig ? (
            // Render custom widget preview
            <CustomWidget 
              config={customWidgetConfig} 
              onAiClick={() => {}} 
              onClose={() => {}}
            />
          ) : data ? (
            // Render predefined widget (donut chart)
            <div className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <div className="relative flex h-20 w-20 items-center justify-center">
                  <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="8"
                      className="text-muted/20"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="8"
                      strokeDasharray={data.total > 0 ? "227 25" : "0 252"}
                      className={data.chartColor}
                    />
                  </svg>
                  <div className="text-center">
                    <div className={`text-lg font-bold ${data.chartColor}`}>{data.total}</div>
                    <div className="text-xs text-muted-foreground">{data.totalLabel}</div>
                  </div>
                </div>
              </div>

              {data.items.length > 0 ? (
                <div className="flex flex-col gap-0.5 text-xs">
                  {data.items.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className={`h-2 w-2 rounded-full ${item.color}`} />
                      <span className="max-w-[200px] truncate">{item.label}</span>
                      <span className="ml-auto font-medium">{item.value}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center text-sm text-muted-foreground">
                  No data available
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>

      {/* Right Side Panel - AI Insights */}
      <div className="fixed right-0 top-0 z-50 h-full w-80 border-l border-border bg-card p-4 shadow-lg">
        {/* Header with close button */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Insights Header */}
        <div className="mb-4 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="font-medium">Insights for {title}</span>
        </div>

        {/* AI Generated Insights */}
        <div className="flex flex-col gap-3 text-sm">
          {insights.map((insight, index) => (
            <p key={index}>• {insight}</p>
          ))}
        </div>
      </div>

      {/* Backdrop to close */}
      <div className="fixed inset-0 z-40 bg-black/30" onClick={onClose} />
    </>
  );
};

/**
 * Custom Widget Configuration
 */
// Table column interface
export interface TableColumnConfig {
  id: string;
  field: string;
  label: string;
  sortable: boolean;
  hidden: boolean;
}

export interface CustomWidgetConfig {
  id: string;
  name: string;
  description: string;
  type: string;
  datasource?: string;
  labelField?: string;
  valueField?: string;
  sortField?: string;
  sortOrder?: string;
  colourScheme?: string;
  showSummary?: boolean;
  showLegend?: boolean;
  // Bar chart specific
  groupField?: string;
  barThickness?: number;
  stacked?: boolean;
  // Table specific
  columns?: TableColumnConfig[];
  gridAlignment?: 'left' | 'center' | 'right';
  stripedGrid?: boolean;
}

/**
 * Custom Widget Component
 * Renders a user-created widget based on configuration
 */
const CustomWidget: React.FC<{ config: CustomWidgetConfig; onAiClick?: () => void; onClose?: () => void }> = ({ 
  config, 
  onAiClick,
  onClose 
}) => {
  // Get mock data from config - wrap in useMemo to prevent re-creation on every render
  const { getMockData, getAvailableFields } = useWidgetConfigData();
  const mockData = React.useMemo(
    () => (config.datasource ? getMockData(config.datasource) : []),
    [config.datasource, getMockData]
  );
  const availableFields = React.useMemo(
    () => (config.datasource ? getAvailableFields(config.datasource) : []),
    [config.datasource, getAvailableFields]
  );
  
  // Prepare data for rendering
  const labelField = config.labelField || '';
  const valueField = config.valueField || '';
  const sortField = config.sortField || 'value';
  const sortOrder = config.sortOrder || 'desc';
  const colourScheme = config.colourScheme || 'default';
  const showSummary = config.showSummary !== false;
  const showLegend = config.showLegend !== false;
  
  // Sort and process data
  const processedData = React.useMemo(() => {
    if (!mockData.length || !labelField || !valueField) return null;
    
    const sortedData = [...mockData];
    if (sortField === 'value') {
      sortedData.sort((a, b) => {
        const aVal = Number(a[valueField]) || 0;
        const bVal = Number(b[valueField]) || 0;
        return sortOrder === 'desc' ? bVal - aVal : aVal - bVal;
      });
    } else {
      sortedData.sort((a, b) => {
        const aLabel = String(a[labelField] || '');
        const bLabel = String(b[labelField] || '');
        return sortOrder === 'desc' ? bLabel.localeCompare(aLabel) : aLabel.localeCompare(bLabel);
      });
    }
    
    const countField = availableFields.includes('count') ? 'count' : valueField;
    const total = sortedData.reduce((sum, item) => sum + (Number(item[countField]) || 0), 0);
    const displayItems = sortedData.slice(0, 8);
    const displayTotal = displayItems.reduce((sum, item) => sum + (Number(item[valueField]) || 0), 0);
    const otherTotal = total - displayTotal;
    
    // Chart colors using CSS variable format for theme compatibility
    const defaultColors = [
      'hsl(var(--primary))',
      'hsl(var(--destructive))', 
      'hsl(var(--warning, 38 92% 50%))',
      'hsl(var(--success, 142 71% 45%))',
      'hsl(var(--chart-1, 262 83% 58%))',
      'hsl(var(--chart-2, 330 81% 60%))',
      'hsl(var(--chart-3, 187 86% 47%))',
      'hsl(var(--chart-4, 84 81% 44%))'
    ];
    const severityColors: Record<string, string> = { 
      critical: 'hsl(var(--destructive))', 
      error: 'hsl(var(--warning, 24 95% 53%))', 
      warning: 'hsl(var(--warning, 38 92% 50%))', 
      info: 'hsl(var(--primary))' 
    };
    const statusColors: Record<string, string> = { 
      protected: 'hsl(var(--success, 142 71% 45%))', 
      unprotected: 'hsl(var(--destructive))', 
      managed: 'hsl(var(--primary))', 
      unknown: 'hsl(var(--muted-foreground))' 
    };
    
    const getColor = (item: Record<string, unknown>, index: number) => {
      if (colourScheme === 'severity' && item.severity) {
        return severityColors[String(item.severity).toLowerCase()] || defaultColors[index % defaultColors.length];
      }
      if (colourScheme === 'status' && item.status) {
        return statusColors[String(item.status).toLowerCase()] || defaultColors[index % defaultColors.length];
      }
      return defaultColors[index % defaultColors.length];
    };
    
    return { items: displayItems, total, otherTotal, getColor };
  }, [mockData, labelField, valueField, sortField, sortOrder, colourScheme, availableFields]);

  return (
    <WidgetCard title={config.name} subtitle={config.description} onAiClick={onAiClick} onClose={onClose}>
      <div className="flex items-center gap-6">
        {/* Render based on widget type */}
        {config.type === 'donut' && processedData && (
          <>
            <div className="relative h-24 w-24 flex-shrink-0">
              <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
                {(() => {
                  let cumulativePercent = 0;
                  const radius = 35;
                  const circumference = 2 * Math.PI * radius;
                  const segments = processedData.items.map((item, index) => {
                    const value = Number(item[valueField]) || 0;
                    const percent = processedData.total > 0 ? value / processedData.total : 0;
                    const strokeDasharray = `${percent * circumference} ${circumference}`;
                    const strokeDashoffset = -cumulativePercent * circumference;
                    cumulativePercent += percent;
                    return (
                      <circle
                        key={index}
                        cx="50"
                        cy="50"
                        r={radius}
                        fill="none"
                        stroke={processedData.getColor(item, index)}
                        strokeWidth="12"
                        strokeDasharray={strokeDasharray}
                        strokeDashoffset={strokeDashoffset}
                      />
                    );
                  });
                  if (processedData.otherTotal > 0) {
                    const otherPercent = processedData.otherTotal / processedData.total;
                    segments.push(
                      <circle
                        key="other"
                        cx="50"
                        cy="50"
                        r={radius}
                        fill="none"
                        stroke="hsl(var(--muted-foreground))"
                        strokeWidth="12"
                        strokeDasharray={`${otherPercent * circumference} ${circumference}`}
                        strokeDashoffset={-cumulativePercent * circumference}
                      />
                    );
                  }
                  return segments;
                })()}
              </svg>
              {showSummary && (
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-lg font-bold">{processedData.total}</span>
                  <span className="text-xs text-muted-foreground">Total</span>
                </div>
              )}
            </div>
            {showLegend && (
              <div className="flex flex-1 flex-col gap-1 overflow-hidden">
                {processedData.items.map((item, index) => (
                  <div key={index} className="flex items-center gap-2 text-xs">
                    <div 
                      className="h-2 w-2 rounded-full flex-shrink-0" 
                      style={{ backgroundColor: processedData.getColor(item, index) }}
                    />
                    <span className="truncate flex-1">{String(item[labelField] || '')}</span>
                    <span className="font-medium flex-shrink-0">{String(item[valueField] || '')}</span>
                  </div>
                ))}
                {processedData.otherTotal > 0 && (
                  <div className="flex items-center gap-2 text-xs">
                    <div className="h-2 w-2 rounded-full flex-shrink-0 bg-gray-400" />
                    <span className="truncate flex-1">Other</span>
                    <span className="font-medium flex-shrink-0">{processedData.otherTotal}</span>
                  </div>
                )}
              </div>
            )}
          </>
        )}
        {config.type === 'donut' && !processedData && (
          <>
            <div className="relative h-24 w-24">
              <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="12" className="text-muted/20" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold">0</span>
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-1 text-sm text-muted-foreground">
              <span>No data available</span>
            </div>
          </>
        )}
        {(config.type === 'bar' || config.type === 'bar-v' || config.type === 'bar-h') && processedData && (() => {
          const thickness = config.barThickness || 12;
          const isStacked = config.stacked && config.groupField;
          const groupField = config.groupField || '';
          const chartHeight = 112; // h-28 = 112px
          
          // Stacked bar colors using CSS variables
          const stackColors = [
            'hsl(var(--destructive))',
            'hsl(var(--warning, 24 95% 53%))',
            'hsl(var(--warning, 48 96% 53%))',
            'hsl(var(--success, 142 71% 45%))',
            'hsl(var(--primary))',
            'hsl(var(--chart-1, 262 83% 58%))',
            'hsl(var(--chart-2, 330 81% 60%))',
            'hsl(var(--chart-3, 187 86% 47%))'
          ];
          
          // For stacked bars, group data by groupField and calculate totals
          let barData: { label: string; segments: { value: number; color: string; groupLabel: string }[] }[] = [];
          let uniqueGroups: string[] = [];
          let maxValue = 0;
          
          if (isStacked && groupField) {
            // Get unique group values (these become the legend items)
            uniqueGroups = [...new Set(processedData.items.map(item => String(item[groupField] || '')))];
            
            // Each item becomes a bar, colored by its group field value
            processedData.items.slice(0, 10).forEach((item) => {
              const groupValue = String(item[groupField] || '');
              const groupIndex = uniqueGroups.indexOf(groupValue);
              barData.push({
                label: String(item[labelField] || ''),
                segments: [{
                  value: Number(item[valueField]) || 0,
                  color: stackColors[groupIndex % stackColors.length],
                  groupLabel: groupValue,
                }],
              });
              maxValue = Math.max(maxValue, Number(item[valueField]) || 0);
            });
          } else {
            // Non-stacked: each item is a single bar
            maxValue = Math.max(...processedData.items.map(i => Number(i[valueField]) || 0), 1);
            barData = processedData.items.slice(0, 10).map((item, index) => ({
              label: String(item[labelField] || ''),
              segments: [{
                value: Number(item[valueField]) || 0,
                color: processedData.getColor(item, index),
                groupLabel: String(item[labelField] || ''),
              }],
            }));
          }
          
          // Round up to nice number for Y-axis
          const yAxisMax = Math.ceil(maxValue / 25) * 25 || 100;
          const yAxisSteps = [yAxisMax, Math.round(yAxisMax * 0.66), Math.round(yAxisMax * 0.33), 0];
          
          return (
            <div className="flex w-full flex-col gap-2">
              {/* Chart area with Y-axis */}
              <div className="flex">
                {/* Y-axis labels */}
                <div className="flex flex-col justify-between pr-2 text-[10px] text-muted-foreground h-28">
                  {yAxisSteps.map((val, i) => (
                    <span key={i}>{val}</span>
                  ))}
                </div>
                
                {/* Chart grid and bars */}
                <div className="flex-1 relative h-28 border-l border-b border-border">
                  {/* Horizontal grid lines */}
                  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                    {[0, 1, 2].map((i) => (
                      <div key={i} className="border-t border-border/50 w-full" />
                    ))}
                  </div>
                  
                  {/* Bars */}
                  <div className="absolute inset-0 flex items-end justify-around px-1">
                    {barData.slice(0, 10).map((bar, barIndex) => (
                      <div key={barIndex} className="flex flex-col items-center" style={{ width: `${thickness}px` }}>
                        {/* Stacked segments (rendered bottom to top) */}
                        <div className="flex flex-col-reverse w-full">
                          {bar.segments.map((segment, segIndex) => {
                            const segmentHeight = Math.max((segment.value / yAxisMax) * chartHeight, segment.value > 0 ? 4 : 0);
                            return (
                              <div 
                                key={segIndex}
                                className={`w-full transition-all ${segIndex === bar.segments.length - 1 ? 'rounded-t' : ''}`}
                                style={{ 
                                  height: `${segmentHeight}px`,
                                  backgroundColor: segment.color,
                                }}
                              />
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* X-axis labels */}
              <div className="flex pl-6">
                <div className="flex-1 flex justify-around text-[10px] text-muted-foreground">
                  {barData.slice(0, 10).map((_, index) => (
                    <span key={index} className="truncate text-center" style={{ width: `${thickness}px` }}>
                      {index + 1}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Legend */}
              {showLegend && (
                <div className="flex flex-wrap gap-3 text-xs mt-1">
                  {isStacked ? (
                    // For stacked: show unique groups with stackColors
                    uniqueGroups.slice(0, 6).map((group, index) => (
                      <div key={index} className="flex items-center gap-1">
                        <div 
                          className="h-2 w-2 rounded-full flex-shrink-0" 
                          style={{ backgroundColor: stackColors[index % stackColors.length] }}
                        />
                        <span className="truncate">{group}</span>
                      </div>
                    ))
                  ) : (
                    // For non-stacked: show items
                    processedData.items.slice(0, 4).map((item, index) => (
                      <div key={index} className="flex items-center gap-1">
                        <div 
                          className="h-2 w-2 rounded-full flex-shrink-0" 
                          style={{ backgroundColor: processedData.getColor(item, index) }}
                        />
                        <span className="truncate">{String(item[labelField] || '')}</span>
                        <span className="font-medium">{String(item[valueField] || '')}</span>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          );
        })()}
        {(config.type === 'bar' || config.type === 'bar-v' || config.type === 'bar-h') && !processedData && (
          <div className="flex h-20 w-full items-end gap-2">
            <div className="h-1/3 flex-1 rounded-t bg-primary/30" />
            <div className="h-1/2 flex-1 rounded-t bg-primary/40" />
            <div className="h-2/3 flex-1 rounded-t bg-primary/50" />
            <div className="h-1/4 flex-1 rounded-t bg-primary/30" />
            <div className="h-1/2 flex-1 rounded-t bg-primary/40" />
          </div>
        )}
        {(config.type === 'line' || config.type === 'area') && (
          <div className="h-20 w-full">
            <svg className="h-full w-full" viewBox="0 0 200 80">
              {config.type === 'area' && (
                <path d="M0 60 L40 50 L80 55 L120 30 L160 40 L200 20 L200 80 L0 80 Z" fill="currentColor" className="text-primary/20" />
              )}
              <path d="M0 60 L40 50 L80 55 L120 30 L160 40 L200 20" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary" />
            </svg>
          </div>
        )}
        {config.type === 'table' && (() => {
          const columns = config.columns || [];
          const visibleColumns = columns.filter(col => !col.hidden && col.field);
          const alignment = config.gridAlignment || 'left';
          const striped = config.stripedGrid || false;
          const alignClass = alignment === 'center' ? 'text-center' : alignment === 'right' ? 'text-right' : 'text-left';
          
          if (visibleColumns.length === 0 || mockData.length === 0) {
            return (
              <div className="w-full text-sm text-muted-foreground">
                <div className="border-b border-border pb-2 font-medium">No data available</div>
                <div className="py-2">-</div>
              </div>
            );
          }
          
          return (
            <div className="w-full overflow-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    {visibleColumns.map((col) => (
                      <th 
                        key={col.id} 
                        className={`pb-2 font-medium text-muted-foreground ${alignClass}`}
                      >
                        {col.label || col.field}
                        {col.sortable && <span className="ml-1 text-primary text-xs">↕</span>}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {mockData.slice(0, 5).map((row, rowIndex) => (
                    <tr 
                      key={rowIndex} 
                      className={`border-b border-border/50 ${striped && rowIndex % 2 === 1 ? 'bg-muted/30' : ''}`}
                    >
                      {visibleColumns.map((col) => (
                        <td key={col.id} className={`py-2 ${alignClass}`}>
                          {String(row[col.field] || '-').slice(0, 25)}
                          {String(row[col.field] || '').length > 25 && '...'}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        })()}
        {config.type === 'list' && processedData && (
          <div className="flex flex-col gap-2 w-full">
            {processedData.items.slice(0, 8).map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <div 
                  className="h-2 w-2 rounded-full flex-shrink-0" 
                  style={{ backgroundColor: processedData.getColor(item, index) }}
                />
                <span className="text-sm truncate flex-1">{String(item[labelField] || '')}</span>
                <span className="text-sm font-medium text-muted-foreground">{String(item[valueField] || '')}</span>
              </div>
            ))}
          </div>
        )}
        {config.type === 'list' && !processedData && (
          <div className="flex flex-col gap-2 w-full">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-primary/30 flex-shrink-0" />
                <div className="h-3 flex-1 rounded bg-muted" />
              </div>
            ))}
          </div>
        )}
        {config.type === 'legend' && processedData && (
          <div className="grid grid-cols-2 gap-x-6 gap-y-2 w-full">
            {processedData.items.slice(0, 10).map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div 
                  className="h-2 w-2 rounded-full flex-shrink-0" 
                  style={{ backgroundColor: processedData.getColor(item, index) }}
                />
                <span className="text-sm truncate">{String(item[labelField] || '')}</span>
                <span className="text-sm font-medium text-muted-foreground">{String(item[valueField] || '')}</span>
              </div>
            ))}
          </div>
        )}
        {config.type === 'legend' && !processedData && (
          <div className="grid grid-cols-2 gap-x-6 gap-y-2 w-full">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary/30 flex-shrink-0" />
                <div className="h-3 flex-1 rounded bg-muted" />
              </div>
            ))}
          </div>
        )}
        {config.type === 'treemap' && processedData && (() => {
          const items = processedData.items.slice(0, 8);
          const total = items.reduce((sum, item) => sum + (Number(item[valueField]) || 0), 0);
          
          const sortedItems = [...items].sort((a, b) => 
            (Number(b[valueField]) || 0) - (Number(a[valueField]) || 0)
          );
          
          const layout = sortedItems.map((item, index) => ({
            percent: total > 0 ? (Number(item[valueField]) || 0) / total * 100 : 0,
            color: processedData.getColor(item, index),
            label: String(item[labelField] || ''),
          }));
          
          return (
            <div className="h-40 w-full">
              <div className="flex h-full gap-1">
                {layout[0] && (
                  <div 
                    className="rounded flex items-end p-2 min-w-[30%]"
                    style={{ backgroundColor: layout[0].color, flex: layout[0].percent }}
                  >
                    <span className="text-xs text-white font-medium truncate drop-shadow-sm">
                      {layout[0].label}
                    </span>
                  </div>
                )}
                {layout.length > 1 && (
                  <div className="flex flex-col gap-1 flex-1">
                    <div className="flex gap-1 flex-1">
                      {layout.slice(1, 3).map((item, idx) => (
                        <div 
                          key={idx}
                          className="rounded flex items-end p-1.5"
                          style={{ backgroundColor: item.color, flex: item.percent || 1 }}
                        >
                          <span className="text-[10px] text-white font-medium truncate drop-shadow-sm">
                            {item.label}
                          </span>
                        </div>
                      ))}
                    </div>
                    {layout.length > 3 && (
                      <div className="flex gap-1 flex-1">
                        {layout.slice(3, 6).map((item, idx) => (
                          <div 
                            key={idx}
                            className="rounded flex items-end p-1"
                            style={{ backgroundColor: item.color, flex: item.percent || 1 }}
                          >
                            <span className="text-[10px] text-white font-medium truncate drop-shadow-sm">
                              {item.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })()}
        {config.type === 'treemap' && !processedData && (
          <div className="h-40 w-full">
            <div className="flex h-full gap-1">
              <div className="w-1/2 rounded bg-primary/20" />
              <div className="flex flex-1 flex-col gap-1">
                <div className="flex-1 rounded bg-primary/15" />
                <div className="flex-1 rounded bg-primary/10" />
              </div>
            </div>
          </div>
        )}
        {(config.type === 'dots' || config.type === 'heatmap') && (
          <div className="grid w-full grid-cols-4 gap-2">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-6 rounded bg-muted" />
            ))}
          </div>
        )}
      </div>
    </WidgetCard>
  );
};

/**
 * Predefined widget IDs
 */
type PredefinedWidgetId = 'protection_status' | 'active_alerts' | 'activities' | 'patch_installation' | 'missing_updates' | 'disk_health' | 'alerts_table';

/**
 * Dashboard Widgets Grid Props
 */
interface DashboardWidgetsGridProps {
  customWidgets?: CustomWidgetConfig[];
  onRemoveCustomWidget?: (widgetId: string) => void;
}

/**
 * Dashboard Widgets Grid
 * Renders all predefined widgets in a grid layout with AI panel
 */
export const DashboardWidgetsGrid: React.FC<DashboardWidgetsGridProps> = ({ 
  customWidgets = [],
  onRemoveCustomWidget 
}) => {
  const [selectedWidgetId, setSelectedWidgetId] = useState<string | null>(null);
  
  // Track which predefined widgets are visible
  const [visibleWidgets, setVisibleWidgets] = useState<Set<PredefinedWidgetId>>(
    new Set(['protection_status', 'active_alerts', 'activities', 'patch_installation', 'missing_updates', 'disk_health', 'alerts_table'])
  );

  const handleAiClick = (widgetId: string) => {
    setSelectedWidgetId(widgetId);
  };

  const handleCloseAiPanel = () => {
    setSelectedWidgetId(null);
  };

  const handleCloseWidget = (widgetId: PredefinedWidgetId) => {
    setVisibleWidgets(prev => {
      const newSet = new Set(prev);
      newSet.delete(widgetId);
      return newSet;
    });
  };

  return (
    <div className="flex flex-col gap-4 p-6">
      {/* Top row - 3 widgets */}
      <div className="grid grid-cols-3 gap-4">
        {visibleWidgets.has('protection_status') && (
          <ProtectionStatusWidget 
            onAiClick={() => handleAiClick('protection_status')} 
            onClose={() => handleCloseWidget('protection_status')}
          />
        )}
        {visibleWidgets.has('active_alerts') && (
          <ActiveAlertsSummaryWidget 
            onAiClick={() => handleAiClick('active_alerts')} 
            onClose={() => handleCloseWidget('active_alerts')}
          />
        )}
        {visibleWidgets.has('activities') && (
          <ActivitiesWidget 
            onAiClick={() => handleAiClick('activities')} 
            onClose={() => handleCloseWidget('activities')}
          />
        )}
      </div>
      
      {/* Middle row - 3 widgets */}
      <div className="grid grid-cols-3 gap-4">
        {visibleWidgets.has('patch_installation') && (
          <PatchInstallationWidget 
            onAiClick={() => handleAiClick('patch_installation')} 
            onClose={() => handleCloseWidget('patch_installation')}
          />
        )}
        {visibleWidgets.has('missing_updates') && (
          <MissingUpdatesWidget 
            onAiClick={() => handleAiClick('missing_updates')} 
            onClose={() => handleCloseWidget('missing_updates')}
          />
        )}
        {visibleWidgets.has('disk_health') && (
          <DiskHealthWidget 
            onAiClick={() => handleAiClick('disk_health')} 
            onClose={() => handleCloseWidget('disk_health')}
          />
        )}
      </div>
      
      {/* Bottom - Table widget */}
      {visibleWidgets.has('alerts_table') && (
        <ActiveAlertsTableWidget 
          onAiClick={() => handleAiClick('alerts_table')} 
          onClose={() => handleCloseWidget('alerts_table')}
        />
      )}

      {/* Custom Widgets */}
      {customWidgets.length > 0 && (
        <div className="grid grid-cols-3 gap-4">
          {customWidgets.map((widget) => (
            <CustomWidget 
              key={widget.id} 
              config={widget} 
              onAiClick={() => handleAiClick(widget.id)}
              onClose={() => onRemoveCustomWidget?.(widget.id)}
            />
          ))}
        </div>
      )}

      {/* AI Insights Modal */}
      <AiInsightsModal 
        widgetId={selectedWidgetId || ''} 
        isOpen={!!selectedWidgetId} 
        onClose={handleCloseAiPanel}
        customWidgetConfig={customWidgets.find(w => w.id === selectedWidgetId)}
      />
    </div>
  );
};

/**
 * Add Widget Panel
 * Side panel for adding new widgets to the dashboard
 * Based on Figma: node 1167-15064
 */
interface WidgetConfig {
  name: string;
  description: string;
  type: string;
  datasource?: string;
  labelField?: string;
  valueField?: string;
  sortField?: string;
  sortOrder?: string;
  colourScheme?: string;
  showSummary?: boolean;
  showLegend?: boolean;
  // Bar chart specific
  groupField?: string;
  barThickness?: number;
  stacked?: boolean;
  // Table specific
  columns?: TableColumnConfig[];
  gridAlignment?: 'left' | 'center' | 'right';
  stripedGrid?: boolean;
}

interface AddWidgetPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onAddWidget: (widgetConfig: WidgetConfig) => void;
}

export const AddWidgetPanel: React.FC<AddWidgetPanelProps> = ({ isOpen, onClose, onAddWidget }) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'custom' | 'catalog'>('custom');
  const [selectedType, setSelectedType] = useState<string>('donut');
  const [selectedDatasource, setSelectedDatasource] = useState<string>('');
  const [isGeneralExpanded, setIsGeneralExpanded] = useState(true);
  const [widgetName, setWidgetName] = useState('');
  const [widgetDescription, setWidgetDescription] = useState('');
  const [saveToCustom, setSaveToCustom] = useState(false);
  
  // Properties state - Common
  const [labelField, setLabelField] = useState<string>('');
  const [valueField, setValueField] = useState<string>('');
  const [colourScheme, setColourScheme] = useState<string>('default');
  const [showLegend, setShowLegend] = useState(true);
  
  // Properties state - Donut specific
  const [sortField, setSortField] = useState<string>('value');
  const [sortOrder, setSortOrder] = useState<string>('desc');
  const [showSummary, setShowSummary] = useState(true);
  
  // Properties state - Bar chart specific
  const [groupField, setGroupField] = useState<string>('');
  const [barThickness, setBarThickness] = useState<number>(12);
  const [stacked, setStacked] = useState(false);
  
  // Properties state - Table specific
  interface TableColumn {
    id: string;
    field: string;
    label: string;
    sortable: boolean;
    hidden: boolean;
  }
  const [tableColumns, setTableColumns] = useState<TableColumn[]>([
    { id: `col-${Date.now()}`, field: '', label: '', sortable: false, hidden: false }
  ]);
  const [gridAlignment, setGridAlignment] = useState<'left' | 'center' | 'right'>('left');
  const [stripedGrid, setStripedGrid] = useState(false);
  
  // Get datasources from config
  const { datasourceNames, datasources, getAvailableFields, getMockData, saveWidgetToCatalog, catalogWidgets } = useWidgetConfigData();
  
  // Get available fields when datasource changes - wrap in useMemo to prevent re-creation on every render
  const availableFields = React.useMemo(
    () => (selectedDatasource ? getAvailableFields(selectedDatasource) : []),
    [selectedDatasource, getAvailableFields]
  );
  
  // Get mock data for preview - wrap in useMemo to prevent re-creation on every render
  const mockData = React.useMemo(
    () => (selectedDatasource ? getMockData(selectedDatasource) : []),
    [selectedDatasource, getMockData]
  );
  
  // Auto-select label and value fields when datasource changes
  React.useEffect(() => {
    if (availableFields.length > 0 && !labelField) {
      // Try to find a good label field (prefer 'type', 'name', 'label', or first string field)
      const labelCandidates = ['type', 'name', 'label', 'title', 'description'];
      const foundLabel = labelCandidates.find(f => availableFields.includes(f)) || availableFields[0];
      setLabelField(foundLabel);
    }
    if (availableFields.length > 1 && !valueField) {
      // Try to find a good value field (prefer 'count', 'value', or first numeric field)
      const valueCandidates = ['count', 'value', 'total', 'amount'];
      const foundValue = valueCandidates.find(f => availableFields.includes(f)) || availableFields[1];
      setValueField(foundValue);
    }
  }, [availableFields, labelField, valueField]);
  
  // Detect if severity/status fields exist for colour scheme options
  const hasSeverityField = availableFields.includes('severity');
  const hasStatusField = availableFields.includes('status');
  
  // Prepare preview data for donut chart
  const getPreviewData = () => {
    if (!mockData.length || !labelField || !valueField) return null;
    
    // Sort the data
    const sortedData = [...mockData];
    if (sortField === 'value') {
      sortedData.sort((a, b) => {
        const aVal = Number(a[valueField]) || 0;
        const bVal = Number(b[valueField]) || 0;
        return sortOrder === 'desc' ? bVal - aVal : aVal - bVal;
      });
    } else {
      sortedData.sort((a, b) => {
        const aLabel = String(a[labelField] || '');
        const bLabel = String(b[labelField] || '');
        return sortOrder === 'desc' ? bLabel.localeCompare(aLabel) : aLabel.localeCompare(bLabel);
      });
    }
    
    // Calculate total for summary - always sum the 'count' field if it exists
    const countField = availableFields.includes('count') ? 'count' : valueField;
    const total = sortedData.reduce((sum, item) => sum + (Number(item[countField]) || 0), 0);
    
    // Limit items for display and calculate "Other" for remaining
    const displayItems = sortedData.slice(0, 8);
    const displayTotal = displayItems.reduce((sum, item) => sum + (Number(item[valueField]) || 0), 0);
    const otherTotal = total - displayTotal;
    
    // Get color based on scheme - using CSS variables for theme compatibility
    const getColor = (item: Record<string, unknown>, index: number) => {
      const defaultColors = [
        'hsl(var(--primary))',
        'hsl(var(--destructive))',
        'hsl(var(--warning, 38 92% 50%))',
        'hsl(var(--success, 142 71% 45%))',
        'hsl(var(--chart-1, 262 83% 58%))',
        'hsl(var(--chart-2, 330 81% 60%))',
        'hsl(var(--chart-3, 187 86% 47%))',
        'hsl(var(--chart-4, 84 81% 44%))'
      ];
      const severityColors: Record<string, string> = { 
        critical: 'hsl(var(--destructive))', 
        error: 'hsl(var(--warning, 24 95% 53%))', 
        warning: 'hsl(var(--warning, 38 92% 50%))', 
        info: 'hsl(var(--primary))' 
      };
      const statusColors: Record<string, string> = { 
        protected: 'hsl(var(--success, 142 71% 45%))', 
        unprotected: 'hsl(var(--destructive))', 
        managed: 'hsl(var(--primary))', 
        unknown: 'hsl(var(--muted-foreground))' 
      };
      
      if (colourScheme === 'severity' && item.severity) {
        return severityColors[String(item.severity).toLowerCase()] || defaultColors[index % defaultColors.length];
      }
      if (colourScheme === 'status' && item.status) {
        return statusColors[String(item.status).toLowerCase()] || defaultColors[index % defaultColors.length];
      }
      return defaultColors[index % defaultColors.length];
    };
    
    return {
      items: displayItems,
      total,
      otherTotal,
      getColor,
    };
  };
  
  const previewData = getPreviewData();

  // Reset form when closing
  const handleClose = () => {
    setWidgetName('');
    setWidgetDescription('');
    setSelectedType('donut');
    setSelectedDatasource('');
    setLabelField('');
    setValueField('');
    setSortField('value');
    setSortOrder('desc');
    setColourScheme('default');
    setShowSummary(true);
    setShowLegend(true);
    setSaveToCustom(false);
    setActiveTab('custom');
    // Bar chart specific
    setGroupField('');
    setBarThickness(12);
    setStacked(false);
    onClose();
  };

  if (!isOpen) return null;

  const handleAddWidget = () => {
    // Save to catalog if checkbox is checked
    if (saveToCustom && selectedDatasource) {
      saveWidgetToCatalog({
        name: widgetName || 'New Widget',
        description: widgetDescription,
        datasourceName: selectedDatasource,
        templateType: selectedType,
        config: {
          label_field: labelField,
          value_field: valueField,
          sort_field: sortField as 'value' | 'label',
          sort_order: sortOrder as 'asc' | 'desc',
          color_scheme: colourScheme,
          summary: showSummary,
          legend: showLegend,
        },
      });
    }
    
    onAddWidget({
      name: widgetName || 'New Widget',
      description: widgetDescription,
      type: selectedType,
      datasource: selectedDatasource,
      labelField,
      valueField,
      sortField,
      sortOrder,
      colourScheme,
      showSummary,
      showLegend,
      // Bar chart specific
      groupField,
      barThickness,
      stacked,
      // Table specific
      columns: tableColumns,
      gridAlignment,
      stripedGrid,
    });
    // Reset form
    setWidgetName('');
    setWidgetDescription('');
    setSelectedType('donut');
    setSelectedDatasource('');
    setLabelField('');
    setValueField('');
    setSortField('value');
    setSortOrder('desc');
    setColourScheme('default');
    setShowSummary(true);
    setShowLegend(true);
    setSaveToCustom(false);
    // Reset bar chart fields
    setGroupField('');
    setBarThickness(12);
    setStacked(false);
    // Reset table fields
    setTableColumns([{ id: `col-${Date.now()}`, field: '', label: '', sortable: false, hidden: false }]);
    setGridAlignment('left');
    setStripedGrid(false);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-50 bg-black/30" onClick={handleClose} />

      {/* Widget Skeleton Preview - Floating on dashboard */}
      <div className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2">
        <div className="w-[500px] rounded-xl border border-border bg-white p-6 shadow-xl">
          {/* Widget Title - Shows typed name or skeleton */}
          {widgetName ? (
            <h3 className="mb-1 text-sm font-medium text-gray-900">{widgetName}</h3>
          ) : (
            <div className="mb-1 h-4 w-32 rounded bg-blue-200" />
          )}
          {/* Widget Description - Shows typed description or nothing */}
          {widgetDescription ? (
            <p className="mb-6 text-xs text-muted-foreground">{widgetDescription}</p>
          ) : (
            <div className="mb-6" />
          )}
          
          {/* Donut Chart Preview */}
          {selectedType === 'donut' && (
            <div className="flex items-center gap-8">
              {/* Donut Circle */}
              <div className="relative h-28 w-28 flex-shrink-0">
                {previewData ? (
                  // Real donut with segments
                  <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
                    {(() => {
                      let cumulativePercent = 0;
                      const radius = 40;
                      const circumference = 2 * Math.PI * radius;
                      const segments = previewData.items.map((item, index) => {
                        const value = Number(item[valueField]) || 0;
                        const percent = previewData.total > 0 ? value / previewData.total : 0;
                        const strokeDasharray = `${percent * circumference} ${circumference}`;
                        const strokeDashoffset = -cumulativePercent * circumference;
                        cumulativePercent += percent;
                        return (
                          <circle
                            key={index}
                            cx="50"
                            cy="50"
                            r={radius}
                            fill="none"
                            stroke={previewData.getColor(item, index)}
                            strokeWidth="10"
                            strokeDasharray={strokeDasharray}
                            strokeDashoffset={strokeDashoffset}
                          />
                        );
                      });
                      
                      // Add "Other" segment if there are remaining items
                      if (previewData.otherTotal > 0) {
                        const otherPercent = previewData.otherTotal / previewData.total;
                        const strokeDasharray = `${otherPercent * circumference} ${circumference}`;
                        const strokeDashoffset = -cumulativePercent * circumference;
                        segments.push(
                          <circle
                            key="other"
                            cx="50"
                            cy="50"
                            r={radius}
                            fill="none"
                            stroke="hsl(var(--muted-foreground))"
                            strokeWidth="10"
                            strokeDasharray={strokeDasharray}
                            strokeDashoffset={strokeDashoffset}
                          />
                        );
                      }
                      
                      return segments;
                    })()}
                  </svg>
                ) : (
                  // Skeleton circle
                  <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(var(--primary) / 0.2)" strokeWidth="10" />
                  </svg>
                )}
                {/* Center summary */}
                {showSummary && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    {previewData ? (
                      <>
                        <span className="text-lg font-semibold">{previewData.total}</span>
                        <span className="text-xs text-muted-foreground">Total</span>
                      </>
                    ) : (
                      <div className="h-3 w-8 rounded bg-blue-100" />
                    )}
                  </div>
                )}
              </div>
              {/* Legend Items */}
              {showLegend && (
                <div className="flex flex-col gap-2 flex-1 overflow-hidden">
                  {previewData ? (
                    // Real legend with data
                    <>
                      {previewData.items.map((item, index) => (
                        <div key={index} className="flex items-center gap-2 text-xs">
                          <div 
                            className="h-2 w-2 rounded-full flex-shrink-0" 
                            style={{ backgroundColor: previewData.getColor(item, index) }}
                          />
                          <span className="truncate flex-1">{String(item[labelField] || '')}</span>
                          <span className="font-medium flex-shrink-0">{String(item[valueField] || '')}</span>
                        </div>
                      ))}
                      {previewData.otherTotal > 0 && (
                        <div className="flex items-center gap-2 text-xs">
                          <div 
                            className="h-2 w-2 rounded-full flex-shrink-0 bg-muted-foreground" 
                          />
                          <span className="truncate flex-1">Other</span>
                          <span className="font-medium flex-shrink-0">{previewData.otherTotal}</span>
                        </div>
                      )}
                    </>
                  ) : (
                    // Skeleton legend
                    <>
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-blue-300" />
                        <div className="h-3 w-40 rounded bg-blue-100" />
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-blue-300" />
                        <div className="h-3 w-36 rounded bg-blue-100" />
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-blue-300" />
                        <div className="h-3 w-32 rounded bg-blue-100" />
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-blue-300" />
                        <div className="h-3 w-28 rounded bg-blue-100" />
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          )}
          
          {/* Bar Chart Preview */}
          {selectedType === 'bar' && (
            <div className="flex flex-col gap-2">
              {previewData ? (() => {
                const isStacked = stacked && groupField;
                const chartHeight = 128; // h-32 = 128px
                
                // Stacked bar colors using CSS variables
                const stackColors = [
                  'hsl(var(--destructive))',
                  'hsl(var(--warning, 24 95% 53%))',
                  'hsl(var(--warning, 48 96% 53%))',
                  'hsl(var(--success, 142 71% 45%))',
                  'hsl(var(--primary))',
                  'hsl(var(--chart-1, 262 83% 58%))',
                  'hsl(var(--chart-2, 330 81% 60%))',
                  'hsl(var(--chart-3, 187 86% 47%))'
                ];
                
                // For stacked bars, group data and calculate totals
                let barData: { label: string; segments: { value: number; color: string; groupLabel: string }[] }[] = [];
                let uniqueGroups: string[] = [];
                let maxValue = 0;
                
                if (isStacked && groupField) {
                  // Get unique group values (these become the stacked segments)
                  uniqueGroups = [...new Set(previewData.items.map(item => String(item[groupField] || '')))];
                  
                  // Each item becomes a bar position, with segments for each group value it contains
                  // For data like Active Alerts Summary, we create one bar per item
                  // and color by the group field (severity)
                  previewData.items.slice(0, 10).forEach((item) => {
                    const groupValue = String(item[groupField] || '');
                    const groupIndex = uniqueGroups.indexOf(groupValue);
                    barData.push({
                      label: String(item[labelField] || ''),
                      segments: [{
                        value: Number(item[valueField]) || 0,
                        color: stackColors[groupIndex % stackColors.length],
                        groupLabel: groupValue,
                      }],
                    });
                    maxValue = Math.max(maxValue, Number(item[valueField]) || 0);
                  });
                } else {
                  maxValue = Math.max(...previewData.items.map(i => Number(i[valueField]) || 0), 1);
                  barData = previewData.items.slice(0, 10).map((item, index) => ({
                    label: String(item[labelField] || ''),
                    segments: [{
                      value: Number(item[valueField]) || 0,
                      color: previewData.getColor(item, index),
                      groupLabel: String(item[labelField] || ''),
                    }],
                  }));
                }
                
                const yAxisMax = Math.ceil(maxValue / 25) * 25 || 100;
                const yAxisSteps = [yAxisMax, Math.round(yAxisMax * 0.66), Math.round(yAxisMax * 0.33), 0];
                
                return (
                  <>
                    {/* Chart area with Y-axis */}
                    <div className="flex">
                      {/* Y-axis labels */}
                      <div className="flex flex-col justify-between pr-2 text-[10px] text-muted-foreground h-32">
                        {yAxisSteps.map((val, i) => (
                          <span key={i}>{val}</span>
                        ))}
                      </div>
                      
                      {/* Chart grid and bars */}
                      <div className="flex-1 relative h-32 border-l border-b border-border">
                        {/* Horizontal grid lines */}
                        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                          {[0, 1, 2].map((i) => (
                            <div key={i} className="border-t border-border/50 w-full" />
                          ))}
                        </div>
                        
                        {/* Bars */}
                        <div className="absolute inset-0 flex items-end justify-around px-1">
                          {barData.slice(0, 10).map((bar, barIndex) => (
                            <div key={barIndex} className="flex flex-col items-center" style={{ width: `${barThickness}px` }}>
                              <div className="flex flex-col-reverse w-full">
                                {bar.segments.map((segment, segIndex) => {
                                  const segmentHeight = Math.max((segment.value / yAxisMax) * chartHeight, segment.value > 0 ? 4 : 0);
                                  return (
                                    <div 
                                      key={segIndex}
                                      className={`w-full transition-all ${segIndex === bar.segments.length - 1 ? 'rounded-t' : ''}`}
                                      style={{ 
                                        height: `${segmentHeight}px`,
                                        backgroundColor: segment.color,
                                      }}
                                    />
                                  );
                                })}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {/* X-axis labels */}
                    <div className="flex pl-6">
                      <div className="flex-1 flex justify-around text-[10px] text-muted-foreground">
                        {barData.slice(0, 10).map((_, index) => (
                          <span key={index} className="text-center" style={{ width: `${barThickness}px` }}>
                            {index + 1}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Legend */}
                    {showLegend && (
                      <div className="flex flex-wrap gap-3 text-xs mt-1 justify-center">
                        {isStacked ? (
                          uniqueGroups.slice(0, 6).map((group, index) => (
                            <div key={index} className="flex items-center gap-1">
                              <div 
                                className="h-2 w-2 rounded-full flex-shrink-0" 
                                style={{ backgroundColor: stackColors[index % stackColors.length] }}
                              />
                              <span className="truncate">{group}</span>
                            </div>
                          ))
                        ) : (
                          previewData.items.slice(0, 4).map((item, index) => (
                            <div key={index} className="flex items-center gap-1">
                              <div 
                                className="h-2 w-2 rounded-full flex-shrink-0" 
                                style={{ backgroundColor: previewData.getColor(item, index) }}
                              />
                              <span className="truncate">{String(item[labelField] || '')}</span>
                              <span className="font-medium">{String(item[valueField] || '')}</span>
                            </div>
                          ))
                        )}
                      </div>
                    )}
                  </>
                );
              })() : (
                // Skeleton bar chart with axes
                <div className="flex flex-col gap-2">
                  <div className="flex">
                    <div className="flex flex-col justify-between pr-2 text-[10px] text-muted-foreground/50 h-32">
                      <span>100</span>
                      <span>66</span>
                      <span>33</span>
                      <span>0</span>
                    </div>
                    <div className="flex-1 relative h-32 border-l border-b border-border/50">
                      <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                        {[0, 1, 2].map((i) => (
                          <div key={i} className="border-t border-border/30 w-full" />
                        ))}
                      </div>
                      <div className="absolute inset-0 flex items-end justify-around px-2">
                        <div className="w-8 h-1/3 rounded-t bg-blue-200" />
                        <div className="w-8 h-2/3 rounded-t bg-blue-200" />
                        <div className="w-8 h-1/2 rounded-t bg-blue-200" />
                        <div className="w-8 h-full rounded-t bg-blue-200" />
                        <div className="w-8 h-3/4 rounded-t bg-blue-200" />
                        <div className="w-8 h-1/2 rounded-t bg-blue-200" />
                      </div>
                    </div>
                  </div>
                  <div className="flex pl-6">
                    <div className="flex-1 flex justify-around text-[10px] text-muted-foreground/50">
                      {[1, 2, 3, 4, 5, 6].map((n) => (
                        <span key={n}>{n}</span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {/* Table Preview */}
          {selectedType === 'table' && (() => {
            // Get visible columns (not hidden)
            const visibleColumns = tableColumns.filter(col => !col.hidden && col.field);
            const hasConfiguredColumns = visibleColumns.length > 0;
            
            // Get alignment class
            const alignClass = gridAlignment === 'center' ? 'text-center' : gridAlignment === 'right' ? 'text-right' : 'text-left';
            
            return (
              <div className="w-full overflow-hidden">
                {hasConfiguredColumns && mockData.length > 0 ? (
                  // Real table with configured columns
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-border">
                        {visibleColumns.map((col) => (
                          <th 
                            key={col.id} 
                            className={`pb-2 font-medium text-muted-foreground ${alignClass}`}
                          >
                            {col.label || col.field}
                            {col.sortable && <span className="ml-1 text-primary">↕</span>}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {mockData.slice(0, 4).map((row, rowIndex) => (
                        <tr 
                          key={rowIndex} 
                          className={`border-b border-border/50 ${stripedGrid && rowIndex % 2 === 1 ? 'bg-muted/30' : ''}`}
                        >
                          {visibleColumns.map((col) => (
                            <td key={col.id} className={`py-2 ${alignClass}`}>
                              {String(row[col.field] || '-').slice(0, 20)}
                              {String(row[col.field] || '').length > 20 && '...'}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  // Skeleton table
                  <>
                    <div className="mb-3 flex gap-4">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="flex items-center gap-2 flex-1">
                          <div className="h-2 w-2 rounded-full bg-blue-300" />
                          <div className="h-3 flex-1 rounded bg-blue-200" />
                        </div>
                      ))}
                    </div>
                    {[1, 2, 3, 4].map((row) => (
                      <div key={row} className={`mb-2 flex gap-4 ${stripedGrid && row % 2 === 0 ? 'bg-muted/30 rounded' : ''}`}>
                        {[1, 2, 3, 4].map((col) => (
                          <div key={col} className="h-3 flex-1 rounded bg-blue-100" />
                        ))}
                      </div>
                    ))}
                  </>
                )}
              </div>
            );
          })()}
          
          {/* List Preview */}
          {selectedType === 'list' && (
            <div className="flex flex-col gap-2 w-full">
              {previewData ? (
                // Real list with data
                previewData.items.slice(0, 6).map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div 
                      className="h-2 w-2 rounded-full flex-shrink-0" 
                      style={{ backgroundColor: previewData.getColor(item, index) }}
                    />
                    <span className="text-sm truncate flex-1">{String(item[labelField] || '')}</span>
                    <span className="text-sm font-medium text-muted-foreground">{String(item[valueField] || '')}</span>
                  </div>
                ))
              ) : (
                // Skeleton list
                [1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-blue-300 flex-shrink-0" />
                    <div className="h-3 flex-1 rounded bg-blue-100" />
                  </div>
                ))
              )}
            </div>
          )}
          
          {/* Legend Preview - Two column grid */}
          {selectedType === 'legend' && (
            <div className="grid grid-cols-2 gap-x-6 gap-y-2 w-full">
              {previewData ? (
                // Real legend with data
                previewData.items.slice(0, 8).map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div 
                      className="h-2 w-2 rounded-full flex-shrink-0" 
                      style={{ backgroundColor: previewData.getColor(item, index) }}
                    />
                    <span className="text-sm truncate">{String(item[labelField] || '')}</span>
                    <span className="text-sm font-medium text-muted-foreground">{String(item[valueField] || '')}</span>
                  </div>
                ))
              ) : (
                // Skeleton legend
                [1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-blue-300 flex-shrink-0" />
                    <div className="h-3 flex-1 rounded bg-blue-100" />
                  </div>
                ))
              )}
            </div>
          )}
          
          {/* Treemap Preview */}
          {selectedType === 'treemap' && (() => {
            if (!previewData || previewData.items.length === 0) {
              // Skeleton treemap
              return (
                <div className="h-32 w-full">
                  <div className="flex h-full gap-1">
                    <div className="w-1/2 rounded bg-blue-200" />
                    <div className="flex flex-1 flex-col gap-1">
                      <div className="flex-1 rounded bg-blue-100" />
                      <div className="flex-1 rounded bg-blue-50" />
                    </div>
                  </div>
                </div>
              );
            }
            
            // Calculate treemap layout
            const items = previewData.items.slice(0, 8);
            const total = items.reduce((sum, item) => sum + (Number(item[valueField]) || 0), 0);
            
            // Simple treemap algorithm - split into rows based on value
            const getTreemapLayout = () => {
              if (items.length === 0) return [];
              
              const sortedItems = [...items].sort((a, b) => 
                (Number(b[valueField]) || 0) - (Number(a[valueField]) || 0)
              );
              
              return sortedItems.map((item, index) => ({
                item,
                percent: total > 0 ? (Number(item[valueField]) || 0) / total * 100 : 0,
                color: previewData.getColor(item, index),
                label: String(item[labelField] || ''),
                value: Number(item[valueField]) || 0,
              }));
            };
            
            const layout = getTreemapLayout();
            
            // Render treemap with nested flex layout
            return (
              <div className="h-36 w-full">
                <div className="flex h-full gap-1">
                  {/* First column - largest item */}
                  {layout[0] && (
                    <div 
                      className="rounded flex items-end p-2 min-w-[30%]"
                      style={{ 
                        backgroundColor: layout[0].color,
                        flex: layout[0].percent,
                      }}
                    >
                      <span className="text-xs text-white font-medium truncate drop-shadow-sm">
                        {layout[0].label}
                      </span>
                    </div>
                  )}
                  {/* Second column - stacked items */}
                  {layout.length > 1 && (
                    <div className="flex flex-col gap-1 flex-1">
                      {/* Top row */}
                      <div className="flex gap-1 flex-1">
                        {layout.slice(1, 3).map((item, idx) => (
                          <div 
                            key={idx}
                            className="rounded flex items-end p-1.5"
                            style={{ 
                              backgroundColor: item.color,
                              flex: item.percent || 1,
                            }}
                          >
                            <span className="text-[10px] text-white font-medium truncate drop-shadow-sm">
                              {item.label}
                            </span>
                          </div>
                        ))}
                      </div>
                      {/* Bottom row */}
                      {layout.length > 3 && (
                        <div className="flex gap-1 flex-1">
                          {layout.slice(3, 6).map((item, idx) => (
                            <div 
                              key={idx}
                              className="rounded flex items-end p-1"
                              style={{ 
                                backgroundColor: item.color,
                                flex: item.percent || 1,
                              }}
                            >
                              <span className="text-[10px] text-white font-medium truncate drop-shadow-sm">
                                {item.label}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })()}
        </div>
      </div>
      
      {/* Modal - Full height side panel */}
      <div className="fixed right-0 top-0 z-50 flex h-full w-80 flex-col border-l border-border bg-card shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border p-4">
          <h2 className="text-lg font-semibold">{t(tk('add_widget_panel.title'))}</h2>
          <button
            onClick={handleClose}
            className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border">
          <button
            onClick={() => setActiveTab('custom')}
            className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === 'custom'
                ? 'border-b-2 border-primary text-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {t(tk('add_widget_panel.custom_widget'))}
          </button>
          <button
            onClick={() => setActiveTab('catalog')}
            className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === 'catalog'
                ? 'border-b-2 border-primary text-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {t(tk('add_widget_panel.widget_catalog'))}
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-4">
          {/* Widget Catalog Tab Content */}
          {activeTab === 'catalog' && (
            <div className="flex flex-col gap-3">
              {catalogWidgets.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">
                  No widgets in catalog. Create a custom widget and save it to the catalog.
                </p>
              ) : (
                catalogWidgets.map((widget) => {
                  // Get datasource name from func id
                  const datasourceName = datasources.find(
                    ds => ds.func.id === widget.settings.datasource.func
                  )?.name || '';
                  
                  // Get template type
                  const templateType = widget.settings.template.id.includes('pie') ? 'donut' : 
                        widget.settings.template.id.includes('bar') ? 'bar' :
                        widget.settings.template.id.includes('table') ? 'table' : 'donut';
                  
                  // Get config from template
                  const templateConfig = widget.settings.template.config;
                  
                  return (
                    <button
                      key={widget.id}
                      onClick={() => {
                        onAddWidget({
                          name: widget.title,
                          description: widget.description,
                          type: templateType,
                          datasource: datasourceName,
                          labelField: templateConfig.label_field,
                          valueField: templateConfig.value_field,
                          sortField: templateConfig.sort_field,
                          sortOrder: templateConfig.sort_order,
                          colourScheme: templateConfig.color_scheme,
                          showSummary: templateConfig.summary,
                          showLegend: templateConfig.legend,
                        });
                        handleClose();
                      }}
                      className="flex flex-col items-start gap-1 rounded-lg border border-border p-3 text-left hover:border-primary hover:bg-primary/5 transition-colors"
                    >
                      <span className="font-medium text-sm">{widget.title}</span>
                      <span className="text-xs text-muted-foreground">{widget.description}</span>
                      {widget.categories.includes('custom') && (
                        <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full mt-1">Custom</span>
                      )}
                    </button>
                  );
                })
              )}
            </div>
          )}
          
          {/* Custom Widget Tab Content */}
          {activeTab === 'custom' && (
            <>
          {/* Data Source Dropdown */}
          <div className="mb-4">
            <select 
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
              value={selectedDatasource}
              onChange={(e) => setSelectedDatasource(e.target.value)}
            >
              <option value="">{t(tk('add_widget_panel.data_source'))}</option>
              {datasourceNames.map((name) => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
          </div>

          {/* Widget Type Icons - 3x2 Grid matching the small dialog */}
          <div className="mb-6 grid grid-cols-3 gap-2">
            {/* Donut Chart */}
            <button
              onClick={() => setSelectedType('donut')}
              className={`flex h-14 items-center justify-center rounded-md border transition-colors ${
                selectedType === 'donut'
                  ? 'border-primary bg-primary/10'
                  : 'border-border hover:border-primary/50'
              }`}
              title="Donut Chart"
            >
              <ChartIcon type="donut" />
            </button>
            {/* Bar Chart */}
            <button
              onClick={() => setSelectedType('bar')}
              className={`flex h-14 items-center justify-center rounded-md border transition-colors ${
                selectedType === 'bar'
                  ? 'border-primary bg-primary/10'
                  : 'border-border hover:border-primary/50'
              }`}
              title="Bar Chart"
            >
              <ChartIcon type="bar" />
            </button>
            {/* Table */}
            <button
              onClick={() => setSelectedType('table')}
              className={`flex h-14 items-center justify-center rounded-md border transition-colors ${
                selectedType === 'table'
                  ? 'border-primary bg-primary/10'
                  : 'border-border hover:border-primary/50'
              }`}
              title="Table"
            >
              <ChartIcon type="table" />
            </button>
            {/* List */}
            <button
              onClick={() => setSelectedType('list')}
              className={`flex h-14 items-center justify-center rounded-md border transition-colors ${
                selectedType === 'list'
                  ? 'border-primary bg-primary/10'
                  : 'border-border hover:border-primary/50'
              }`}
              title="List"
            >
              <ChartIcon type="list" />
            </button>
            {/* Legend */}
            <button
              onClick={() => setSelectedType('legend')}
              className={`flex h-14 items-center justify-center rounded-md border transition-colors ${
                selectedType === 'legend'
                  ? 'border-primary bg-primary/10'
                  : 'border-border hover:border-primary/50'
              }`}
              title="Legend"
            >
              <ChartIcon type="legend" />
            </button>
            {/* Treemap */}
            <button
              onClick={() => setSelectedType('treemap')}
              className={`flex h-14 items-center justify-center rounded-md border transition-colors ${
                selectedType === 'treemap'
                  ? 'border-primary bg-primary/10'
                  : 'border-border hover:border-primary/50'
              }`}
              title="Treemap"
            >
              <ChartIcon type="treemap" />
            </button>
          </div>

          {/* General Section */}
          <div className="border-t border-border pt-4">
            <button
              onClick={() => setIsGeneralExpanded(!isGeneralExpanded)}
              className="mb-3 flex w-full items-center justify-between text-sm font-medium"
            >
              <span>{t(tk('add_widget_panel.general'))}</span>
              {isGeneralExpanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>

            {isGeneralExpanded && (
              <div className="flex flex-col gap-3">
                <Input
                  placeholder={t(tk('add_widget_panel.name_placeholder'))}
                  value={widgetName}
                  onChange={(e) => setWidgetName(e.target.value)}
                />
                <Input
                  placeholder={t(tk('add_widget_panel.description_placeholder'))}
                  value={widgetDescription}
                  onChange={(e) => setWidgetDescription(e.target.value)}
                />
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={saveToCustom}
                    onChange={(e) => setSaveToCustom(e.target.checked)}
                    className="rounded border-border"
                  />
                  <span className="text-muted-foreground">
                    {t(tk('add_widget_panel.save_to_catalog'))}
                  </span>
                </label>
              </div>
            )}
          </div>

          {/* Properties Section */}
          <div className="border-t border-border pt-4">
            <button
              className="mb-3 flex w-full items-center justify-between text-sm font-medium"
            >
              <span>{t(tk('add_widget_panel.properties'))}</span>
              <ChevronUp className="h-4 w-4" />
            </button>

            <div className="flex flex-col gap-3">
              {/* Common Fields - Label and Value */}
              {(selectedType === 'donut' || selectedType === 'bar') && (
                <>
                  {/* Label Field Dropdown */}
                  <select 
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                    value={labelField}
                    onChange={(e) => setLabelField(e.target.value)}
                    disabled={!selectedDatasource}
                  >
                    <option value="">{t(tk('add_widget_panel.label_placeholder'))}</option>
                    {availableFields
                      .filter((field) => field !== valueField && field !== groupField)
                      .map((field) => (
                        <option key={field} value={field}>{field}</option>
                      ))}
                  </select>
                  
                  {/* Value Field Dropdown */}
                  <select 
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                    value={valueField}
                    onChange={(e) => setValueField(e.target.value)}
                    disabled={!selectedDatasource}
                  >
                    <option value="">{t(tk('add_widget_panel.value_placeholder'))}</option>
                    {availableFields
                      .filter((field) => field !== labelField && field !== groupField)
                      .map((field) => (
                        <option key={field} value={field}>{field}</option>
                      ))}
                  </select>
                </>
              )}
              
              {/* Donut-specific Fields */}
              {selectedType === 'donut' && (
                <>
                  {/* Sort Field Dropdown */}
                  <select 
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                    value={sortField}
                    onChange={(e) => setSortField(e.target.value)}
                  >
                    <option value="value">{t(tk('add_widget_panel.sort_placeholder'))} - Value</option>
                    <option value="label">{t(tk('add_widget_panel.sort_placeholder'))} - Label</option>
                  </select>
                  
                  {/* Sort Order Dropdown */}
                  <select 
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                  >
                    <option value="desc">{t(tk('add_widget_panel.sort_order_placeholder'))} - Descending</option>
                    <option value="asc">{t(tk('add_widget_panel.sort_order_placeholder'))} - Ascending</option>
                  </select>
                  
                  {/* Colour Scheme Dropdown */}
                  <select 
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                    value={colourScheme}
                    onChange={(e) => setColourScheme(e.target.value)}
                  >
                    <option value="default">{t(tk('add_widget_panel.colour_scheme_placeholder'))} - Default</option>
                    {hasSeverityField && <option value="severity">{t(tk('add_widget_panel.colour_scheme_placeholder'))} - Severity</option>}
                    {hasStatusField && <option value="status">{t(tk('add_widget_panel.colour_scheme_placeholder'))} - Status</option>}
                  </select>
                  
                  {/* Show Summary Checkbox */}
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={showSummary}
                      onChange={(e) => setShowSummary(e.target.checked)}
                      className="rounded border-border"
                    />
                    <span className="text-muted-foreground">
                      {t(tk('add_widget_panel.show_summary'))}
                    </span>
                  </label>
                  
                  {/* Show Legend Checkbox */}
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={showLegend}
                      onChange={(e) => setShowLegend(e.target.checked)}
                      className="rounded border-border"
                    />
                    <span className="text-muted-foreground">
                      {t(tk('add_widget_panel.show_legend'))}
                    </span>
                  </label>
                </>
              )}
              
              {/* Bar Chart-specific Fields */}
              {selectedType === 'bar' && (
                <>
                  {/* Group Field Dropdown */}
                  <select 
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                    value={groupField}
                    onChange={(e) => setGroupField(e.target.value)}
                    disabled={!selectedDatasource}
                  >
                    <option value="">Group field (optional)</option>
                    {availableFields
                      .filter((field) => field !== labelField && field !== valueField)
                      .map((field) => (
                        <option key={field} value={field}>{field}</option>
                      ))}
                  </select>
                  
                  {/* Colour Scheme Dropdown */}
                  <select 
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                    value={colourScheme}
                    onChange={(e) => setColourScheme(e.target.value)}
                  >
                    <option value="default">{t(tk('add_widget_panel.colour_scheme_placeholder'))} - Default</option>
                    {hasSeverityField && <option value="severity">{t(tk('add_widget_panel.colour_scheme_placeholder'))} - Severity</option>}
                    {hasStatusField && <option value="status">{t(tk('add_widget_panel.colour_scheme_placeholder'))} - Status</option>}
                  </select>
                  
                  {/* Bar Thickness */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Bar thickness:</span>
                    <input
                      type="number"
                      min={4}
                      max={32}
                      value={barThickness}
                      onChange={(e) => setBarThickness(Number(e.target.value))}
                      className="w-16 rounded-md border border-border bg-background px-2 py-1 text-sm"
                    />
                  </div>
                  
                  {/* Stacked Checkbox */}
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={stacked}
                      onChange={(e) => setStacked(e.target.checked)}
                      className="rounded border-border"
                    />
                    <span className="text-muted-foreground">
                      Stacked bars
                    </span>
                  </label>
                  
                  {/* Show Legend Checkbox */}
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={showLegend}
                      onChange={(e) => setShowLegend(e.target.checked)}
                      className="rounded border-border"
                    />
                    <span className="text-muted-foreground">
                      {t(tk('add_widget_panel.show_legend'))}
                    </span>
                  </label>
                </>
              )}
              
              {/* Table-specific Fields */}
              {selectedType === 'table' && (
                <>
                  {/* Grid Alignment Dropdown */}
                  <select 
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                    value={gridAlignment}
                    onChange={(e) => setGridAlignment(e.target.value as 'left' | 'center' | 'right')}
                  >
                    <option value="left">Grid alignment - Left</option>
                    <option value="center">Grid alignment - Center</option>
                    <option value="right">Grid alignment - Right</option>
                  </select>
                  
                  {/* Striped Grid Checkbox */}
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={stripedGrid}
                      onChange={(e) => setStripedGrid(e.target.checked)}
                      className="rounded border-border"
                    />
                    <span className="text-muted-foreground">Striped grid</span>
                  </label>
                </>
              )}
            </div>
          </div>

          {/* Columns Section - Only for Table type */}
          {selectedType === 'table' && (
            <div className="border-t border-border pt-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-medium">Columns</span>
                <button
                  onClick={() => setTableColumns([...tableColumns, { 
                    id: `col-${Date.now()}`, 
                    field: '', 
                    label: '', 
                    sortable: false, 
                    hidden: false 
                  }])}
                  className="flex items-center gap-1 text-sm text-primary hover:underline"
                >
                  <Plus className="h-4 w-4" />
                  New column
                </button>
              </div>

              <div className="flex flex-col gap-4">
                {tableColumns.map((column, index) => (
                  <div key={column.id} className="rounded-md border border-border p-3">
                    {/* Column Field (Name) */}
                    <select 
                      className="mb-2 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                      value={column.field}
                      onChange={(e) => {
                        const newColumns = [...tableColumns];
                        newColumns[index].field = e.target.value;
                        // Auto-fill label if empty
                        if (!newColumns[index].label) {
                          newColumns[index].label = e.target.value;
                        }
                        setTableColumns(newColumns);
                      }}
                      disabled={!selectedDatasource}
                    >
                      <option value="">Name (field)</option>
                      {availableFields.map((field) => (
                        <option key={field} value={field}>{field}</option>
                      ))}
                    </select>
                    
                    {/* Column Label */}
                    <input
                      type="text"
                      className="mb-2 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                      placeholder="Label"
                      value={column.label}
                      onChange={(e) => {
                        const newColumns = [...tableColumns];
                        newColumns[index].label = e.target.value;
                        setTableColumns(newColumns);
                      }}
                    />
                    
                    {/* Column Options */}
                    <div className="flex flex-col gap-2">
                      <label className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          checked={column.sortable}
                          onChange={(e) => {
                            const newColumns = [...tableColumns];
                            newColumns[index].sortable = e.target.checked;
                            setTableColumns(newColumns);
                          }}
                          className="rounded border-border"
                        />
                        <span className="text-muted-foreground">Make column sortable</span>
                      </label>
                      
                      <label className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          checked={column.hidden}
                          onChange={(e) => {
                            const newColumns = [...tableColumns];
                            newColumns[index].hidden = e.target.checked;
                            setTableColumns(newColumns);
                          }}
                          className="rounded border-border"
                        />
                        <span className="text-muted-foreground">Hide column</span>
                      </label>
                    </div>
                    
                    {/* Delete Button - disabled if only 1 column */}
                    <button
                      onClick={() => {
                        if (tableColumns.length > 1) {
                          setTableColumns(tableColumns.filter((_, i) => i !== index));
                        }
                      }}
                      disabled={tableColumns.length <= 1}
                      className={`mt-2 text-sm ${
                        tableColumns.length <= 1 
                          ? 'text-muted-foreground cursor-not-allowed' 
                          : 'text-red-500 hover:underline'
                      }`}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Filters Section */}
          <div className="border-t border-border pt-4">
            <button
              className="mb-3 flex w-full items-center justify-between text-sm font-medium"
            >
              <span>{t(tk('add_widget_panel.filters'))}</span>
              <ChevronUp className="h-4 w-4" />
            </button>

            <div className="flex flex-col gap-3">
              <select className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm">
                <option>{t(tk('add_widget_panel.filter_1'))}</option>
              </select>
              <select className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm">
                <option>{t(tk('add_widget_panel.filter_2'))}</option>
              </select>
            </div>
          </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-border p-4">
          <Button variant={ButtonVariant.Default} onClick={handleAddWidget}>
            {t(tk('add_widget_panel.add_widget'))}
          </Button>
          <button
            onClick={handleClose}
            className="text-sm text-primary hover:underline"
          >
            {t(tk('add_widget_panel.cancel'))}
          </button>
        </div>
      </div>
    </>
  );
};

export default DashboardWidgetsGrid;

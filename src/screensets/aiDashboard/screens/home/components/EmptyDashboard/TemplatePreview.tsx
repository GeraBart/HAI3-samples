/**
 * TemplatePreview
 * Mini chart preview displayed inside template cards
 */

import React from 'react';

interface TemplatePreviewProps {
  type: 'standard' | 'sales' | 'customer-support';
}

export const TemplatePreview: React.FC<TemplatePreviewProps> = ({ type }) => {
  if (type === 'standard') {
    return (
      <div className="flex h-full flex-col gap-1 bg-white p-2">
        <div className="flex gap-1">
          {['Total Visitors', 'Page Views', 'Bounce Rate', 'Avg. Session'].map((label, i) => (
            <div key={i} className="flex-1 rounded border border-gray-200 p-1">
              <div className="text-[6px] text-gray-500">{label}</div>
              <div className="text-[9px] font-semibold text-foreground">
                {['24.5K', '98.2K', '42.8%', '3m 24s'][i]}
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-1 items-end gap-[2px] rounded border border-gray-200 p-1">
          {[45, 55, 50, 65, 48, 70, 52, 75, 58, 68, 62, 72, 55, 80].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-t bg-blue-500"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (type === 'sales') {
    return (
      <div className="flex h-full flex-col gap-1 bg-white p-2">
        <div className="flex gap-1">
          {['Open Tickets', 'Avg Response', 'CSAT Score', 'Resolution'].map((label, i) => (
            <div key={i} className="flex-1 rounded border border-gray-200 p-1">
              <div className="text-[6px] text-gray-500">{label}</div>
              <div className="text-[9px] font-semibold text-foreground">
                {['142', '2.4h', '94%', '8.2h'][i]}
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-1 gap-1">
          <div className="flex-1 rounded border border-gray-200 p-1">
            <div className="text-[6px] text-gray-500">Ticket Volume</div>
            <svg className="h-full w-full" viewBox="0 0 100 40" preserveAspectRatio="none">
              <path
                d="M 0,30 L 20,25 L 40,28 L 60,18 L 80,22 L 100,15"
                stroke="#93c5fd"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </div>
          <div className="flex flex-1 flex-col rounded border border-gray-200 p-1">
            <div className="text-[6px] text-gray-500">By Priority</div>
            <div className="flex flex-1 items-end justify-center gap-2">
              {[30, 40, 35].map((h, i) => (
                <div
                  key={i}
                  className="w-3 rounded-t bg-blue-500"
                  style={{ height: `${h}px` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col gap-1 bg-white p-2">
      <div className="flex gap-1">
        {['Active Users', 'Features Used', 'Retention', 'NPS'].map((label, i) => (
          <div key={i} className="flex-1 rounded border border-gray-200 p-1">
            <div className="text-[6px] text-gray-500">{label}</div>
            <div className="text-[9px] font-semibold text-foreground">
              {['12.4K', '87%', '82%', '68'][i]}
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-1 gap-1">
        <div className="flex flex-1 flex-col gap-1 rounded border border-gray-200 p-1">
          <div className="text-[6px] text-gray-500">Feature Adoption</div>
          {[92, 78, 65].map((w, i) => (
            <div key={i} className="flex items-center gap-1">
              <div className="h-1 flex-1 rounded bg-gray-200">
                <div
                  className="h-full rounded bg-blue-500"
                  style={{ width: `${w}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-1 flex-col items-center justify-center rounded border border-gray-200 p-1">
          <div className="text-[6px] text-gray-500">Health</div>
          <div className="relative h-10 w-10">
            <svg className="h-full w-full" viewBox="0 0 40 40">
              <circle cx="20" cy="20" r="16" fill="none" stroke="#e5e7eb" strokeWidth="4" />
              <circle
                cx="20"
                cy="20"
                r="16"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="4"
                strokeDasharray="75 100"
                transform="rotate(-90 20 20)"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-[8px] font-semibold">
              85
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

TemplatePreview.displayName = 'TemplatePreview';

export default TemplatePreview;

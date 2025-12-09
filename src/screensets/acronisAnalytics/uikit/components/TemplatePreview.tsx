/**
 * Template Preview Components
 * Presentational components for dashboard template previews
 */

import React from 'react';

/**
 * Standard Template Preview Component
 */
export const StandardTemplatePreview: React.FC = () => (
  <div className="flex h-full flex-col gap-0.5 bg-background p-1.5">
    {/* Top row - 4 metric cards */}
    <div className="flex gap-0.5">
      <div className="flex-1 rounded-sm border border-border bg-background p-1">
        <div className="mb-0.5 text-[6px] text-muted-foreground">Total Visitors</div>
        <div className="text-[9px] font-semibold text-foreground">24.5K</div>
      </div>
      <div className="flex-1 rounded-sm border border-border bg-background p-1">
        <div className="mb-0.5 text-[6px] text-muted-foreground">Page Views</div>
        <div className="text-[9px] font-semibold text-foreground">98.2K</div>
      </div>
      <div className="flex-1 rounded-sm border border-border bg-background p-1">
        <div className="mb-0.5 text-[6px] text-muted-foreground">Bounce Rate</div>
        <div className="text-[9px] font-semibold text-foreground">42.8%</div>
      </div>
      <div className="flex-1 rounded-sm border border-border bg-background p-1">
        <div className="mb-0.5 text-[6px] text-muted-foreground">Avg. Session</div>
        <div className="text-[9px] font-semibold text-foreground">3m 24s</div>
      </div>
    </div>
    {/* Bottom - Bar chart */}
    <div className="flex flex-1 items-end gap-px rounded-sm border border-border bg-background p-1">
      {[45, 55, 50, 65, 48, 70, 52, 75, 58, 68, 62, 72, 55, 80].map((height, i) => (
        <div key={i} className={`flex-1 rounded-t-sm bg-primary h-[${height}%]`} />
      ))}
    </div>
  </div>
);

/**
 * Sales Template Preview Component
 */
export const SalesTemplatePreview: React.FC = () => (
  <div className="flex h-full flex-col gap-0.5 bg-background p-1.5">
    {/* Top row - 4 metric cards */}
    <div className="flex gap-0.5">
      <div className="flex-1 rounded-sm border border-border bg-background p-1">
        <div className="mb-0.5 text-[6px] text-muted-foreground">Open Tickets</div>
        <div className="text-[9px] font-semibold text-foreground">142</div>
      </div>
      <div className="flex-1 rounded-sm border border-border bg-background p-1">
        <div className="mb-0.5 text-[6px] text-muted-foreground">Avg Response</div>
        <div className="text-[9px] font-semibold text-foreground">2.4h</div>
      </div>
      <div className="flex-1 rounded-sm border border-border bg-background p-1">
        <div className="mb-0.5 text-[6px] text-muted-foreground">CSAT Score</div>
        <div className="text-[9px] font-semibold text-foreground">94%</div>
      </div>
      <div className="flex-1 rounded-sm border border-border bg-background p-1">
        <div className="mb-0.5 text-[6px] text-muted-foreground">Resolution</div>
        <div className="text-[9px] font-semibold text-foreground">8.2h</div>
      </div>
    </div>
    {/* Bottom row - Line chart and Bar chart */}
    <div className="flex flex-1 gap-0.5">
      {/* Line chart */}
      <div className="relative flex-1 rounded-sm border border-border bg-background p-1">
        <div className="mb-0.5 text-[6px] text-muted-foreground">Ticket Volume</div>
        <svg width="100%" height="85%" viewBox="0 0 100 40" preserveAspectRatio="none" className="absolute bottom-1 left-1 right-1">
          <path d="M 0,30 L 10,25 L 20,28 L 30,20 L 40,22 L 50,18 L 60,15 L 70,20 L 80,12 L 90,15 L 100,10" className="stroke-primary/50" strokeWidth="1" fill="none" />
          <path d="M 0,30 L 10,25 L 20,28 L 30,20 L 40,22 L 50,18 L 60,15 L 70,20 L 80,12 L 90,15 L 100,10 L 100,40 L 0,40 Z" className="fill-primary/20" />
        </svg>
      </div>
      {/* Bar chart */}
      <div className="flex flex-1 flex-col rounded-sm border border-border bg-background p-1">
        <div className="mb-0.5 text-[6px] text-muted-foreground">By Priority</div>
        <div className="flex flex-1 items-end justify-center gap-0.5">
          <div className="flex flex-col items-center gap-0.5">
            <div className="h-[30px] w-3 rounded-t-sm bg-primary" />
            <div className="text-[5px] text-muted-foreground">Low</div>
          </div>
          <div className="flex flex-col items-center gap-0.5">
            <div className="h-10 w-3 rounded-t-sm bg-primary" />
            <div className="text-[5px] text-muted-foreground">Med</div>
          </div>
          <div className="flex flex-col items-center gap-0.5">
            <div className="h-[35px] w-3 rounded-t-sm bg-primary/80" />
            <div className="text-[5px] text-muted-foreground">High</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

/**
 * Customer Support Template Preview Component
 */
export const CustomerSupportTemplatePreview: React.FC = () => (
  <div className="flex h-full flex-col gap-0.5 bg-background p-1.5">
    {/* Top row - 4 metric cards */}
    <div className="flex gap-0.5">
      <div className="flex-1 rounded-sm border border-border bg-background p-1">
        <div className="mb-0.5 text-[6px] text-muted-foreground">Active Users</div>
        <div className="text-[9px] font-semibold text-foreground">12.4K</div>
      </div>
      <div className="flex-1 rounded-sm border border-border bg-background p-1">
        <div className="mb-0.5 text-[6px] text-muted-foreground">Features Used</div>
        <div className="text-[9px] font-semibold text-foreground">87%</div>
      </div>
      <div className="flex-1 rounded-sm border border-border bg-background p-1">
        <div className="mb-0.5 text-[6px] text-muted-foreground">Retention</div>
        <div className="text-[9px] font-semibold text-foreground">82%</div>
      </div>
      <div className="flex-1 rounded-sm border border-border bg-background p-1">
        <div className="mb-0.5 text-[6px] text-muted-foreground">NPS</div>
        <div className="text-[9px] font-semibold text-foreground">68</div>
      </div>
    </div>
    {/* Bottom row - Horizontal bars and Donut chart */}
    <div className="flex flex-1 gap-0.5">
      {/* Horizontal bars */}
      <div className="flex flex-1 flex-col gap-0.5 rounded-sm border border-border bg-background p-1">
        <div className="mb-px text-[6px] text-muted-foreground">Feature Adoption</div>
        <div className="flex items-center gap-0.5">
          <div className="w-5 text-[5px] text-muted-foreground">Search</div>
          <div className="relative h-1 flex-1 rounded-sm bg-muted">
            <div className="absolute inset-y-0 left-0 w-[92%] rounded-sm bg-primary" />
          </div>
          <div className="text-[5px] text-muted-foreground">92%</div>
        </div>
        <div className="flex items-center gap-0.5">
          <div className="w-5 text-[5px] text-muted-foreground">Reports</div>
          <div className="relative h-1 flex-1 rounded-sm bg-muted">
            <div className="absolute inset-y-0 left-0 w-[78%] rounded-sm bg-primary" />
          </div>
          <div className="text-[5px] text-muted-foreground">78%</div>
        </div>
        <div className="flex items-center gap-0.5">
          <div className="w-5 text-[5px] text-muted-foreground">Export</div>
          <div className="relative h-1 flex-1 rounded-sm bg-muted">
            <div className="absolute inset-y-0 left-0 w-[65%] rounded-sm bg-primary" />
          </div>
          <div className="text-[5px] text-muted-foreground">65%</div>
        </div>
      </div>
      {/* Donut chart */}
      <div className="flex flex-1 flex-col items-center justify-center rounded-sm border border-border bg-background p-1">
        <div className="mb-1 self-start text-[6px] text-muted-foreground">Health</div>
        <div className="relative h-10 w-10">
          <svg width="40" height="40" viewBox="0 0 40 40">
            <circle cx="20" cy="20" r="16" fill="none" className="stroke-muted" strokeWidth="6" />
            <circle cx="20" cy="20" r="16" fill="none" className="stroke-primary" strokeWidth="6" strokeDasharray="75.4 100.5" strokeDashoffset="0" transform="rotate(-90 20 20)" />
          </svg>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[8px] font-semibold text-foreground">85</div>
        </div>
        <div className="mt-0.5 text-[5px] text-muted-foreground">Excellent</div>
      </div>
    </div>
  </div>
);

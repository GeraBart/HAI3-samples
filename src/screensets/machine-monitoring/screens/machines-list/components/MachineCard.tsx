import { Card, CardContent, Badge, Progress } from '@hai3/uikit';
import type { MachineFleetInfo, LocationCategory } from '../../../api/mockData';
import { StatusBadge } from './StatusBadge';
import _ from 'lodash';

interface MachineCardProps {
  machine: MachineFleetInfo;
  tk: (key: string) => string;
  onNameClick: () => void;
  onSSHClick: () => void;
}

const statusColors = {
  online: 'bg-emerald-500',
  offline: 'bg-slate-500',
  maintenance: 'bg-amber-500',
};

const statusTextColors = {
  online: 'text-emerald-400',
  offline: 'text-slate-400',
  maintenance: 'text-amber-400',
};

const locationIcons: Record<LocationCategory, React.ReactNode> = {
  datacenter: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  cloud: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
    </svg>
  ),
  office: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  remote: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

function formatUptime(seconds: number): string {
  if (seconds === 0) return '-';
  const days = Math.floor(seconds / 86400);
  if (days > 0) return `${days}d`;
  const hours = Math.floor(seconds / 3600);
  if (hours > 0) return `${hours}h`;
  const minutes = Math.floor(seconds / 60);
  return `${minutes}m`;
}

function formatLastSeen(timestamp: number, tk: (key: string) => string): string {
  const diff = Date.now() - timestamp;
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return tk('machine.just_now');
  if (minutes < 60) return `${minutes}m ${tk('machine.ago')}`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ${tk('machine.ago')}`;
  const days = Math.floor(hours / 24);
  return `${days}d ${tk('machine.ago')}`;
}

export function MachineCard({ machine, tk, onNameClick, onSSHClick }: MachineCardProps) {
  const criticalIssues = _.filter(machine.issues, i => i.severity === 'critical');
  const hasCritical = criticalIssues.length > 0;

  const diskUsagePercent = Math.round((machine.usedDisk / machine.totalDisk) * 100);
  const ramUsagePercent = Math.round((machine.usedRam / machine.totalRam) * 100);

  return (
    <Card className={`transition-all hover:shadow-md ${hasCritical ? 'border-red-500/30' : ''}`}>
      <CardContent className="pt-4 pb-4 px-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${statusColors[machine.status]}`} />
              <button
                onClick={onNameClick}
                className="font-semibold text-sm truncate hover:text-primary hover:underline text-left"
                title={machine.name}
              >
                {machine.name}
              </button>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5 truncate font-mono" title={machine.hostname}>
              {machine.hostname}
            </p>
          </div>
          <Badge variant="outline" className="text-xs shrink-0 ml-2">
            {machine.isVirtual ? 'VM' : 'Physical'}
          </Badge>
        </div>

        {/* OS & IP with SSH */}
        <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="truncate">{machine.os} {machine.osVersion}</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground font-mono">
            <span className="truncate">{machine.ipAddress}</span>
            <button
              onClick={onSSHClick}
              className="p-0.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              title={tk('ssh.connect')}
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 mb-3 p-2 rounded-md bg-muted/30">
          <div className="text-muted-foreground">
            {locationIcons[machine.location]}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-medium">{tk(`location.${machine.location}`)}</div>
            <div className="text-xs text-muted-foreground truncate">{machine.locationDetail}</div>
          </div>
        </div>

        {/* Resource Usage */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-muted-foreground">{tk('machine.ram')}</span>
              <span className="font-medium">{ramUsagePercent}%</span>
            </div>
            <Progress
              value={ramUsagePercent}
              className={`h-1.5 bg-muted ${ramUsagePercent > 90 ? '[&>div]:bg-red-500' : ramUsagePercent > 70 ? '[&>div]:bg-amber-500' : '[&>div]:bg-emerald-500'}`}
            />
          </div>
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-muted-foreground">{tk('machine.disk')}</span>
              <span className="font-medium">{diskUsagePercent}%</span>
            </div>
            <Progress
              value={diskUsagePercent}
              className={`h-1.5 bg-muted ${diskUsagePercent > 90 ? '[&>div]:bg-red-500' : diskUsagePercent > 70 ? '[&>div]:bg-amber-500' : '[&>div]:bg-emerald-500'}`}
            />
          </div>
        </div>

        {/* Status & Uptime */}
        <div className="flex items-center justify-between text-xs mb-3">
          <div className="flex items-center gap-1.5">
            <span className="text-muted-foreground">{tk('machine.status')}:</span>
            <span className={`font-medium ${statusTextColors[machine.status]}`}>
              {tk(`status.${machine.status}`)}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{formatUptime(machine.uptime)}</span>
            <span className="mx-1">•</span>
            <span>{formatLastSeen(machine.lastSeen, tk)}</span>
          </div>
        </div>

        {/* Issues */}
        {machine.issues.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border">
            {machine.issues.slice(0, 3).map(issue => (
              <StatusBadge
                key={issue.id}
                type={issue.type}
                severity={issue.severity}
                label={issue.title}
              />
            ))}
            {machine.issues.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{machine.issues.length - 3}
              </Badge>
            )}
          </div>
        )}

        {/* No issues indicator */}
        {machine.issues.length === 0 && (
          <div className="flex items-center gap-1.5 pt-2 border-t border-border text-xs text-muted-foreground">
            <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{tk('machine.no_issues')}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

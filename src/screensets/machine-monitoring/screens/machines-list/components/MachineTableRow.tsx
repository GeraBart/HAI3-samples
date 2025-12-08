import { Badge, Progress } from '@hai3/uikit';
import type { MachineFleetInfo } from '../../../api/mockData';
import { StatusBadge } from './StatusBadge';
import _ from 'lodash';

interface MachineTableRowProps {
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

function formatUptime(seconds: number): string {
  if (seconds === 0) return '-';
  const days = Math.floor(seconds / 86400);
  if (days > 0) return `${days}d`;
  const hours = Math.floor(seconds / 3600);
  if (hours > 0) return `${hours}h`;
  const minutes = Math.floor(seconds / 60);
  return `${minutes}m`;
}

export function MachineTableRow({ machine, tk, onNameClick, onSSHClick }: MachineTableRowProps) {
  const criticalIssues = _.filter(machine.issues, i => i.severity === 'critical');
  const hasCritical = criticalIssues.length > 0;

  const diskUsagePercent = Math.round((machine.usedDisk / machine.totalDisk) * 100);
  const ramUsagePercent = Math.round((machine.usedRam / machine.totalRam) * 100);

  return (
    <tr className={`border-b border-border hover:bg-muted/30 ${hasCritical ? 'bg-red-500/5' : ''}`}>
      {/* Status */}
      <td className="px-3 py-2">
        <div className={`w-2 h-2 rounded-full ${statusColors[machine.status]}`} />
      </td>

      {/* Name */}
      <td className="px-3 py-2">
        <button
          onClick={onNameClick}
          className="text-sm font-medium hover:text-primary hover:underline text-left"
        >
          {machine.name}
        </button>
        <div className="text-xs text-muted-foreground font-mono">{machine.hostname}</div>
      </td>

      {/* IP + SSH */}
      <td className="px-3 py-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-mono text-muted-foreground">{machine.ipAddress}</span>
          <button
            onClick={onSSHClick}
            className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            title={tk('ssh.connect')}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </button>
        </div>
      </td>

      {/* OS */}
      <td className="px-3 py-2 text-sm text-muted-foreground">
        {machine.os} {machine.osVersion}
      </td>

      {/* Type */}
      <td className="px-3 py-2">
        <Badge variant="outline" className="text-xs">
          {machine.isVirtual ? 'VM' : 'Physical'}
        </Badge>
      </td>

      {/* Location */}
      <td className="px-3 py-2 text-sm text-muted-foreground">
        {tk(`location.${machine.location}`)}
      </td>

      {/* RAM */}
      <td className="px-3 py-2">
        <div className="flex items-center gap-2">
          <Progress
            value={ramUsagePercent}
            className={`w-16 h-1.5 bg-muted ${ramUsagePercent > 90 ? '[&>div]:bg-red-500' : ramUsagePercent > 70 ? '[&>div]:bg-amber-500' : '[&>div]:bg-emerald-500'}`}
          />
          <span className="text-xs text-muted-foreground w-8">{ramUsagePercent}%</span>
        </div>
      </td>

      {/* Disk */}
      <td className="px-3 py-2">
        <div className="flex items-center gap-2">
          <Progress
            value={diskUsagePercent}
            className={`w-16 h-1.5 bg-muted ${diskUsagePercent > 90 ? '[&>div]:bg-red-500' : diskUsagePercent > 70 ? '[&>div]:bg-amber-500' : '[&>div]:bg-emerald-500'}`}
          />
          <span className="text-xs text-muted-foreground w-8">{diskUsagePercent}%</span>
        </div>
      </td>

      {/* Uptime */}
      <td className="px-3 py-2 text-sm text-muted-foreground">
        {formatUptime(machine.uptime)}
      </td>

      {/* Issues */}
      <td className="px-3 py-2">
        {machine.issues.length > 0 ? (
          <div className="flex flex-wrap gap-1">
            {machine.issues.slice(0, 2).map(issue => (
              <StatusBadge
                key={issue.id}
                type={issue.type}
                severity={issue.severity}
                label={issue.title}
              />
            ))}
            {machine.issues.length > 2 && (
              <Badge variant="secondary" className="text-xs">
                +{machine.issues.length - 2}
              </Badge>
            )}
          </div>
        ) : (
          <span className="text-xs text-emerald-400">{tk('machine.no_issues')}</span>
        )}
      </td>
    </tr>
  );
}

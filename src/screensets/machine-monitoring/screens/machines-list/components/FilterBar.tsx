import { Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Button, ButtonVariant, ButtonSize } from '@hai3/uikit';
import type { LocationCategory, IssueType } from '../../../api/mockData';

interface FilterBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  location: LocationCategory | 'all';
  onLocationChange: (value: LocationCategory | 'all') => void;
  status: 'all' | 'online' | 'offline' | 'maintenance';
  onStatusChange: (value: 'all' | 'online' | 'offline' | 'maintenance') => void;
  issueType: IssueType | 'all';
  onIssueTypeChange: (value: IssueType | 'all') => void;
  onReset: () => void;
  tk: (key: string) => string;
}

export function FilterBar({
  search,
  onSearchChange,
  location,
  onLocationChange,
  status,
  onStatusChange,
  issueType,
  onIssueTypeChange,
  onReset,
  tk,
}: FilterBarProps) {
  const hasFilters = search || location !== 'all' || status !== 'all' || issueType !== 'all';

  return (
    <div className="flex flex-wrap items-center gap-3 p-4 rounded-lg bg-muted/20 border border-border">
      {/* Search */}
      <div className="relative flex-1 min-w-[200px]">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <Input
          type="text"
          placeholder={tk('filter.search_placeholder')}
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Location Filter */}
      <Select value={location} onValueChange={(v) => onLocationChange(v as LocationCategory | 'all')}>
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder={tk('filter.location')} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{tk('filter.all_locations')}</SelectItem>
          <SelectItem value="datacenter">{tk('location.datacenter')}</SelectItem>
          <SelectItem value="cloud">{tk('location.cloud')}</SelectItem>
          <SelectItem value="office">{tk('location.office')}</SelectItem>
          <SelectItem value="remote">{tk('location.remote')}</SelectItem>
        </SelectContent>
      </Select>

      {/* Status Filter */}
      <Select value={status} onValueChange={(v) => onStatusChange(v as 'all' | 'online' | 'offline' | 'maintenance')}>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder={tk('filter.status')} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{tk('filter.all_status')}</SelectItem>
          <SelectItem value="online">{tk('status.online')}</SelectItem>
          <SelectItem value="offline">{tk('status.offline')}</SelectItem>
          <SelectItem value="maintenance">{tk('status.maintenance')}</SelectItem>
        </SelectContent>
      </Select>

      {/* Issue Type Filter */}
      <Select value={issueType} onValueChange={(v) => onIssueTypeChange(v as IssueType | 'all')}>
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder={tk('filter.issue_type')} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{tk('filter.all_issues')}</SelectItem>
          <SelectItem value="hardware">{tk('issues.hardware')}</SelectItem>
          <SelectItem value="software">{tk('issues.software')}</SelectItem>
          <SelectItem value="security">{tk('issues.security')}</SelectItem>
          <SelectItem value="backup">{tk('issues.backup')}</SelectItem>
          <SelectItem value="network">{tk('issues.network')}</SelectItem>
        </SelectContent>
      </Select>

      {/* Reset Button */}
      {hasFilters && (
        <Button variant={ButtonVariant.Ghost} size={ButtonSize.Sm} onClick={onReset} className="text-muted-foreground">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          {tk('filter.reset')}
        </Button>
      )}
    </div>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from '@hai3/uikit';

interface FleetStatsCardProps {
  stats: {
    totalMachines: number;
    onlineMachines: number;
    offlineMachines: number;
    maintenanceMachines: number;
    virtualMachines: number;
    physicalMachines: number;
    locationCounts: {
      datacenter: number;
      cloud: number;
      office: number;
      remote: number;
    };
  };
  tk: (key: string) => string;
}

interface StatItemProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: string;
  total?: number;
}

function StatItem({ icon, label, value, color, total }: StatItemProps) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
      <div className={`p-2 rounded-lg ${color}`}>
        {icon}
      </div>
      <div>
        <div className="text-2xl font-bold">{value}</div>
        <div className="text-xs text-muted-foreground">
          {label}
          {total !== undefined && (
            <span className="ml-1 opacity-60">/ {total}</span>
          )}
        </div>
      </div>
    </div>
  );
}

export function FleetStatsCard({ stats, tk }: FleetStatsCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          {tk('stats.title')}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Status Overview */}
        <div className="grid grid-cols-2 gap-3">
          <StatItem
            icon={
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
              </svg>
            }
            label={tk('stats.total_machines')}
            value={stats.totalMachines}
            color="bg-slate-600"
          />
          <StatItem
            icon={
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
            label={tk('stats.online')}
            value={stats.onlineMachines}
            color="bg-emerald-600"
            total={stats.totalMachines}
          />
          <StatItem
            icon={
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
              </svg>
            }
            label={tk('stats.offline')}
            value={stats.offlineMachines}
            color="bg-slate-500"
            total={stats.totalMachines}
          />
          <StatItem
            icon={
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            }
            label={tk('stats.maintenance')}
            value={stats.maintenanceMachines}
            color="bg-amber-500"
            total={stats.totalMachines}
          />
        </div>

        {/* Type Distribution */}
        <div className="pt-2 border-t border-border">
          <div className="text-xs font-medium text-muted-foreground mb-2">{tk('stats.machine_types')}</div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-blue-500" />
              <span className="text-sm">{tk('stats.physical')}: {stats.physicalMachines}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-purple-500" />
              <span className="text-sm">{tk('stats.virtual')}: {stats.virtualMachines}</span>
            </div>
          </div>
        </div>

        {/* Location Distribution */}
        <div className="pt-2 border-t border-border">
          <div className="text-xs font-medium text-muted-foreground mb-2">{tk('stats.by_location')}</div>
          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="p-2 rounded bg-muted/30">
              <div className="text-lg font-bold">{stats.locationCounts.datacenter}</div>
              <div className="text-xs text-muted-foreground">{tk('location.datacenter')}</div>
            </div>
            <div className="p-2 rounded bg-muted/30">
              <div className="text-lg font-bold">{stats.locationCounts.cloud}</div>
              <div className="text-xs text-muted-foreground">{tk('location.cloud')}</div>
            </div>
            <div className="p-2 rounded bg-muted/30">
              <div className="text-lg font-bold">{stats.locationCounts.office}</div>
              <div className="text-xs text-muted-foreground">{tk('location.office')}</div>
            </div>
            <div className="p-2 rounded bg-muted/30">
              <div className="text-lg font-bold">{stats.locationCounts.remote}</div>
              <div className="text-xs text-muted-foreground">{tk('location.remote')}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

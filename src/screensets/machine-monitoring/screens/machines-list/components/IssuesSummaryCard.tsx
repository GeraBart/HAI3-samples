import { Card, CardContent, CardHeader, CardTitle, Progress } from '@hai3/uikit';

interface IssuesSummaryCardProps {
  title: string;
  stats: {
    totalIssues: number;
    criticalIssues: number;
    warningIssues: number;
    infoIssues: number;
    issuesByType: {
      hardware: number;
      software: number;
      security: number;
      backup: number;
      network: number;
    };
  };
  tk: (key: string) => string;
}

interface IssueTypeRowProps {
  icon: React.ReactNode;
  label: string;
  count: number;
  color: string;
  total: number;
}

function IssueTypeRow({ icon, label, count, color, total }: IssueTypeRowProps) {
  const percentage = total > 0 ? (count / total) * 100 : 0;
  const progressColor = color.replace('/20', '');

  return (
    <div className="flex items-center gap-3">
      <div className={`p-1.5 rounded ${color}`}>{icon}</div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-medium">{label}</span>
          <span className="text-sm font-bold">{count}</span>
        </div>
        <Progress
          value={percentage}
          className={`h-1.5 bg-muted [&>div]:${progressColor}`}
        />
      </div>
    </div>
  );
}

export function IssuesSummaryCard({ title, stats, tk }: IssuesSummaryCardProps) {
  const totalByType = stats.issuesByType.hardware +
    stats.issuesByType.software +
    stats.issuesByType.security +
    stats.issuesByType.backup +
    stats.issuesByType.network;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Severity Summary */}
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-3 rounded-lg bg-red-500/10 border border-red-500/20">
            <div className="text-2xl font-bold text-red-400">{stats.criticalIssues}</div>
            <div className="text-xs text-red-400/80">{tk('issues.critical')}</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
            <div className="text-2xl font-bold text-amber-400">{stats.warningIssues}</div>
            <div className="text-xs text-amber-400/80">{tk('issues.warning')}</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
            <div className="text-2xl font-bold text-blue-400">{stats.infoIssues}</div>
            <div className="text-xs text-blue-400/80">{tk('issues.info')}</div>
          </div>
        </div>

        {/* By Type */}
        <div className="space-y-3 pt-2">
          <IssueTypeRow
            icon={
              <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
            }
            label={tk('issues.hardware')}
            count={stats.issuesByType.hardware}
            color="bg-orange-500/20"
            total={totalByType}
          />
          <IssueTypeRow
            icon={
              <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
              </svg>
            }
            label={tk('issues.software')}
            count={stats.issuesByType.software}
            color="bg-purple-500/20"
            total={totalByType}
          />
          <IssueTypeRow
            icon={
              <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            }
            label={tk('issues.security')}
            count={stats.issuesByType.security}
            color="bg-red-500/20"
            total={totalByType}
          />
          <IssueTypeRow
            icon={
              <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            }
            label={tk('issues.backup')}
            count={stats.issuesByType.backup}
            color="bg-cyan-500/20"
            total={totalByType}
          />
          <IssueTypeRow
            icon={
              <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
              </svg>
            }
            label={tk('issues.network')}
            count={stats.issuesByType.network}
            color="bg-indigo-500/20"
            total={totalByType}
          />
        </div>
      </CardContent>
    </Card>
  );
}

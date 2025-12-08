/**
 * Mock data for machine monitoring
 * Simulates realistic system metrics and process data
 */

import _ from 'lodash';

export type TimeRange = '30min' | '4hours' | '1day' | '7days';

/**
 * Location categories for machine organization
 */
export type LocationCategory = 'datacenter' | 'office' | 'cloud' | 'remote';

/**
 * Issue severity levels
 */
export type IssueSeverity = 'critical' | 'warning' | 'info';

/**
 * Issue types for machine health tracking
 */
export type IssueType = 'hardware' | 'software' | 'security' | 'backup' | 'network';

/**
 * Machine issue definition
 */
export interface MachineIssue {
  id: string;
  type: IssueType;
  severity: IssueSeverity;
  title: string;
  description: string;
  detectedAt: number;
}

/**
 * Extended machine info for fleet management
 */
export interface MachineFleetInfo {
  id: string;
  name: string;
  hostname: string;
  os: string;
  osVersion: string;
  ipAddress: string;
  macAddress: string;
  location: LocationCategory;
  locationDetail: string;
  status: 'online' | 'offline' | 'maintenance';
  lastSeen: number;
  cpuModel: string;
  cpuCores: number;
  gpuModel: string;
  totalRam: number;
  usedRam: number;
  totalDisk: number;
  usedDisk: number;
  uptime: number;
  issues: MachineIssue[];
  tags: string[];
  isVirtual: boolean;
  hypervisor?: string;
}

export interface TimeRangeConfig {
  duration: number; // in milliseconds
  interval: number; // in milliseconds
  pointCount: number;
  label: string;
}

export const TIME_RANGES: Record<TimeRange, TimeRangeConfig> = {
  '30min': {
    duration: 30 * 60 * 1000, // 30 minutes
    interval: 5 * 1000, // 5 seconds
    pointCount: 360, // 30min / 5sec
    label: '30 Minutes',
  },
  '4hours': {
    duration: 4 * 60 * 60 * 1000, // 4 hours
    interval: 60 * 1000, // 1 minute
    pointCount: 240, // 4h / 1min
    label: '4 Hours',
  },
  '1day': {
    duration: 24 * 60 * 60 * 1000, // 1 day
    interval: 15 * 60 * 1000, // 15 minutes
    pointCount: 96, // 24h / 15min
    label: '1 Day',
  },
  '7days': {
    duration: 7 * 24 * 60 * 60 * 1000, // 7 days
    interval: 60 * 60 * 1000, // 1 hour
    pointCount: 168, // 7d / 1h
    label: '7 Days',
  },
};

export interface MachineInfo {
  id: string;
  name: string;
  os: string;
  cpuModel: string;
  gpuModel: string;
  totalRam: number;
  totalDisk: number;
  uptime: number;
}

export interface MetricsSnapshot {
  timestamp: number;
  cpuUsage: number;
  ramUsage: number;
  diskUsage: number;
  networkIn: number;
  networkOut: number;
  gpuUsage: number;
}

export interface Process {
  pid: number;
  name: string;
  command: string;
  cpuPercent: number;
  rssMemory: number;
  virtualMemory: number;
  startTime: number;
  status: string;
}

export const MOCK_MACHINES: MachineInfo[] = [
  {
    id: 'machine-1',
    name: 'Production Server 01',
    os: 'Ubuntu 22.04.3 LTS',
    cpuModel: 'Intel Xeon E5-2686 v4 @ 2.30GHz (16 cores)',
    gpuModel: 'NVIDIA Tesla T4 (16GB)',
    totalRam: 64,
    totalDisk: 512,
    uptime: 2592000,
  },
  {
    id: 'machine-2',
    name: 'Development Workstation',
    os: 'macOS Sonoma 14.2',
    cpuModel: 'Apple M2 Pro (12 cores)',
    gpuModel: 'Apple M2 Pro GPU (19 cores)',
    totalRam: 32,
    totalDisk: 1024,
    uptime: 864000,
  },
  {
    id: 'machine-3',
    name: 'Database Server',
    os: 'Red Hat Enterprise Linux 9.2',
    cpuModel: 'AMD EPYC 7763 @ 2.45GHz (64 cores)',
    gpuModel: 'Integrated Graphics',
    totalRam: 256,
    totalDisk: 2048,
    uptime: 5184000,
  },
];

/**
 * Generate realistic time-series metrics for a specific time range
 */
export function generateMetricsForRange(machineId: string, timeRange: TimeRange): MetricsSnapshot[] {
  const now = Date.now();
  const config = TIME_RANGES[timeRange];
  const metrics: MetricsSnapshot[] = [];

  // Base patterns for different machines
  const patterns = {
    'machine-1': { cpu: 45, ram: 70, disk: 60, net: 100, gpu: 35 },
    'machine-2': { cpu: 25, ram: 50, disk: 40, net: 50, gpu: 20 },
    'machine-3': { cpu: 65, ram: 85, disk: 75, net: 200, gpu: 5 },
  };

  const pattern = patterns[machineId as keyof typeof patterns] || patterns['machine-1'];

  for (let i = 0; i < config.pointCount; i++) {
    const timestamp = now - config.duration + i * config.interval;
    const date = new Date(timestamp);
    const hourOfDay = date.getHours();
    const minuteOfHour = date.getMinutes();

    // Add daily patterns (higher usage during work hours)
    const dailyFactor = hourOfDay >= 9 && hourOfDay <= 18 ? 1.3 : 0.7;

    // Add micro-patterns for shorter time ranges
    let microFactor = 1.0;
    if (timeRange === '30min' || timeRange === '4hours') {
      // Add 5-minute cycles for short ranges
      microFactor = 1.0 + 0.15 * Math.sin((minuteOfHour / 5) * Math.PI);
    }

    // Add some randomness (less for shorter intervals)
    const randomness = timeRange === '30min' ? 0.05 : timeRange === '4hours' ? 0.1 : 0.2;
    const variance = () => 1.0 - randomness + Math.random() * (randomness * 2);

    // Add occasional spikes
    const spike = Math.random() > 0.95 ? 1.5 : 1.0;

    metrics.push({
      timestamp,
      cpuUsage: Math.min(95, pattern.cpu * dailyFactor * microFactor * variance() * spike),
      ramUsage: Math.min(95, pattern.ram * dailyFactor * variance()),
      diskUsage: Math.min(95, pattern.disk + Math.random() * 5),
      networkIn: pattern.net * dailyFactor * microFactor * variance() * spike,
      networkOut: pattern.net * 0.6 * dailyFactor * microFactor * variance(),
      gpuUsage: Math.min(95, pattern.gpu * dailyFactor * variance() * spike),
    });
  }

  return metrics;
}

/**
 * Generate realistic time-series metrics for the past week (legacy function)
 * @deprecated Use generateMetricsForRange with '7days' instead
 */
export function generateWeekMetrics(machineId: string): MetricsSnapshot[] {
  return generateMetricsForRange(machineId, '7days');
}

/**
 * Generate mock process list
 */
export function generateProcessList(_machineId: string): Process[] {
  const baseProcesses = [
    { name: 'systemd', command: '/usr/lib/systemd/systemd --system --deserialize 31', cpu: 0.1, ram: 12, vm: 180 },
    { name: 'node', command: 'node /app/server.js --port 3000 --env production', cpu: 15.3, ram: 450, vm: 1200 },
    { name: 'postgres', command: 'postgres: main process', cpu: 8.7, ram: 850, vm: 2400 },
    { name: 'redis-server', command: '/usr/bin/redis-server 127.0.0.1:6379', cpu: 2.1, ram: 120, vm: 350 },
    { name: 'nginx', command: 'nginx: master process /usr/sbin/nginx -g daemon off;', cpu: 0.5, ram: 25, vm: 180 },
    { name: 'nginx', command: 'nginx: worker process', cpu: 3.2, ram: 45, vm: 220 },
    { name: 'docker', command: '/usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock', cpu: 1.8, ram: 180, vm: 850 },
    { name: 'containerd', command: '/usr/bin/containerd', cpu: 0.9, ram: 95, vm: 450 },
    { name: 'python3', command: 'python3 /opt/monitoring/agent.py --interval 60', cpu: 2.5, ram: 85, vm: 320 },
    { name: 'java', command: 'java -Xmx2g -jar /opt/app/service.jar', cpu: 12.4, ram: 2100, vm: 4500 },
    { name: 'sshd', command: '/usr/sbin/sshd -D', cpu: 0.1, ram: 8, vm: 120 },
    { name: 'cron', command: '/usr/sbin/cron -f', cpu: 0.0, ram: 4, vm: 80 },
    { name: 'rsyslogd', command: '/usr/sbin/rsyslogd -n -iNONE', cpu: 0.2, ram: 15, vm: 140 },
    { name: 'prometheus', command: '/usr/local/bin/prometheus --config.file=/etc/prometheus/prometheus.yml', cpu: 5.6, ram: 320, vm: 980 },
    { name: 'grafana-server', command: '/usr/sbin/grafana-server --config=/etc/grafana/grafana.ini', cpu: 3.1, ram: 180, vm: 650 },
    { name: 'elasticsearch', command: '/usr/share/elasticsearch/jdk/bin/java -Xms4g -Xmx4g', cpu: 18.9, ram: 4200, vm: 8500 },
    { name: 'kibana', command: '/usr/share/kibana/bin/../node/bin/node /usr/share/kibana/bin/../src/cli', cpu: 4.2, ram: 380, vm: 1100 },
    { name: 'mongod', command: '/usr/bin/mongod --config /etc/mongod.conf', cpu: 6.8, ram: 650, vm: 1800 },
    { name: 'kubelet', command: '/usr/bin/kubelet --config=/var/lib/kubelet/config.yaml', cpu: 7.3, ram: 420, vm: 1250 },
    { name: 'kube-proxy', command: '/usr/local/bin/kube-proxy --config=/var/lib/kube-proxy/config.conf', cpu: 1.2, ram: 85, vm: 380 },
  ];

  const now = Date.now();
  const processes: Process[] = [];

  baseProcesses.forEach((proc, index) => {
    const variance = 0.8 + Math.random() * 0.4;
    // Only first 3 processes are running, rest are sleeping
    const status = index < 3 ? 'running' : 'sleeping';

    processes.push({
      pid: 1000 + index * 100 + Math.floor(Math.random() * 50),
      name: proc.name,
      command: proc.command,
      cpuPercent: proc.cpu * variance,
      rssMemory: proc.ram * 1024 * 1024 * variance,
      virtualMemory: proc.vm * 1024 * 1024 * variance,
      startTime: now - Math.floor(Math.random() * 86400000 * 7),
      status,
    });
  });

  return processes.sort((a, b) => b.cpuPercent - a.cpuPercent);
}

/**
 * Mock fleet data for machines list screen
 */
export const MOCK_FLEET_MACHINES: MachineFleetInfo[] = [
  {
    id: 'fleet-001',
    name: 'Production Web Server 01',
    hostname: 'prod-web-01.corp.local',
    os: 'Ubuntu',
    osVersion: '22.04.3 LTS',
    ipAddress: '10.0.1.10',
    macAddress: '00:1A:2B:3C:4D:5E',
    location: 'datacenter',
    locationDetail: 'DC-East Rack A12',
    status: 'online',
    lastSeen: Date.now(),
    cpuModel: 'Intel Xeon E5-2686 v4',
    cpuCores: 16,
    gpuModel: 'N/A',
    totalRam: 64,
    usedRam: 48,
    totalDisk: 512,
    usedDisk: 320,
    uptime: 2592000,
    issues: [
      {
        id: 'issue-001',
        type: 'security',
        severity: 'warning',
        title: 'Open Port Detected',
        description: 'Port 8080 is exposed to public network',
        detectedAt: Date.now() - 86400000,
      },
    ],
    tags: ['production', 'web', 'nginx'],
    isVirtual: false,
  },
  {
    id: 'fleet-002',
    name: 'Database Primary',
    hostname: 'db-primary.corp.local',
    os: 'Red Hat Enterprise Linux',
    osVersion: '9.2',
    ipAddress: '10.0.1.20',
    macAddress: '00:1A:2B:3C:4D:5F',
    location: 'datacenter',
    locationDetail: 'DC-East Rack B08',
    status: 'online',
    lastSeen: Date.now(),
    cpuModel: 'AMD EPYC 7763',
    cpuCores: 64,
    gpuModel: 'N/A',
    totalRam: 256,
    usedRam: 180,
    totalDisk: 2048,
    usedDisk: 1200,
    uptime: 5184000,
    issues: [
      {
        id: 'issue-002',
        type: 'hardware',
        severity: 'critical',
        title: 'Disk SMART Warning',
        description: 'Drive sda showing reallocated sectors',
        detectedAt: Date.now() - 172800000,
      },
      {
        id: 'issue-003',
        type: 'backup',
        severity: 'warning',
        title: 'Backup Delayed',
        description: 'Last successful backup was 48 hours ago',
        detectedAt: Date.now() - 43200000,
      },
    ],
    tags: ['production', 'database', 'postgresql'],
    isVirtual: false,
  },
  {
    id: 'fleet-003',
    name: 'Dev VM - Frontend',
    hostname: 'dev-frontend-01.corp.local',
    os: 'Ubuntu',
    osVersion: '24.04 LTS',
    ipAddress: '10.0.2.50',
    macAddress: '00:1A:2B:3C:4D:60',
    location: 'cloud',
    locationDetail: 'AWS us-east-1',
    status: 'online',
    lastSeen: Date.now(),
    cpuModel: 'Intel Xeon Platinum 8375C',
    cpuCores: 4,
    gpuModel: 'N/A',
    totalRam: 16,
    usedRam: 8,
    totalDisk: 100,
    usedDisk: 45,
    uptime: 864000,
    issues: [
      {
        id: 'issue-004',
        type: 'software',
        severity: 'warning',
        title: 'Outdated Packages',
        description: '12 packages have security updates available',
        detectedAt: Date.now() - 259200000,
      },
    ],
    tags: ['development', 'frontend', 'nodejs'],
    isVirtual: true,
    hypervisor: 'AWS EC2',
  },
  {
    id: 'fleet-004',
    name: 'Office Workstation - Design',
    hostname: 'ws-design-01.corp.local',
    os: 'macOS',
    osVersion: 'Sonoma 14.2',
    ipAddress: '10.0.3.100',
    macAddress: '00:1A:2B:3C:4D:61',
    location: 'office',
    locationDetail: 'HQ Floor 3 - Design Dept',
    status: 'online',
    lastSeen: Date.now() - 300000,
    cpuModel: 'Apple M2 Pro',
    cpuCores: 12,
    gpuModel: 'Apple M2 Pro GPU (19 cores)',
    totalRam: 32,
    usedRam: 24,
    totalDisk: 1024,
    usedDisk: 680,
    uptime: 432000,
    issues: [],
    tags: ['workstation', 'design', 'creative'],
    isVirtual: false,
  },
  {
    id: 'fleet-005',
    name: 'Staging API Server',
    hostname: 'staging-api.corp.local',
    os: 'Debian',
    osVersion: '12 (Bookworm)',
    ipAddress: '10.0.2.30',
    macAddress: '00:1A:2B:3C:4D:62',
    location: 'cloud',
    locationDetail: 'GCP us-central1',
    status: 'online',
    lastSeen: Date.now(),
    cpuModel: 'Intel Xeon E5-2696 v4',
    cpuCores: 8,
    gpuModel: 'N/A',
    totalRam: 32,
    usedRam: 12,
    totalDisk: 200,
    usedDisk: 85,
    uptime: 1296000,
    issues: [
      {
        id: 'issue-005',
        type: 'security',
        severity: 'critical',
        title: 'SSL Certificate Expiring',
        description: 'Certificate expires in 7 days',
        detectedAt: Date.now() - 604800000,
      },
      {
        id: 'issue-006',
        type: 'network',
        severity: 'info',
        title: 'High Latency Detected',
        description: 'Average response time increased by 40%',
        detectedAt: Date.now() - 3600000,
      },
    ],
    tags: ['staging', 'api', 'nodejs'],
    isVirtual: true,
    hypervisor: 'GCP Compute Engine',
  },
  {
    id: 'fleet-006',
    name: 'Backup Storage Server',
    hostname: 'backup-01.corp.local',
    os: 'FreeNAS',
    osVersion: '13.0-U5.3',
    ipAddress: '10.0.1.50',
    macAddress: '00:1A:2B:3C:4D:63',
    location: 'datacenter',
    locationDetail: 'DC-West Rack C04',
    status: 'online',
    lastSeen: Date.now(),
    cpuModel: 'Intel Xeon E3-1275 v6',
    cpuCores: 4,
    gpuModel: 'N/A',
    totalRam: 64,
    usedRam: 58,
    totalDisk: 48000,
    usedDisk: 32000,
    uptime: 8640000,
    issues: [
      {
        id: 'issue-007',
        type: 'hardware',
        severity: 'warning',
        title: 'High Temperature',
        description: 'CPU temperature above 75°C',
        detectedAt: Date.now() - 7200000,
      },
    ],
    tags: ['storage', 'backup', 'zfs'],
    isVirtual: false,
  },
  {
    id: 'fleet-007',
    name: 'CI/CD Runner 01',
    hostname: 'runner-01.corp.local',
    os: 'Ubuntu',
    osVersion: '22.04.3 LTS',
    ipAddress: '10.0.2.70',
    macAddress: '00:1A:2B:3C:4D:64',
    location: 'cloud',
    locationDetail: 'Azure West US 2',
    status: 'maintenance',
    lastSeen: Date.now() - 1800000,
    cpuModel: 'Intel Xeon Platinum 8272CL',
    cpuCores: 8,
    gpuModel: 'NVIDIA Tesla T4',
    totalRam: 32,
    usedRam: 4,
    totalDisk: 256,
    usedDisk: 120,
    uptime: 0,
    issues: [
      {
        id: 'issue-008',
        type: 'software',
        severity: 'info',
        title: 'Scheduled Maintenance',
        description: 'System upgrade in progress',
        detectedAt: Date.now() - 1800000,
      },
    ],
    tags: ['ci-cd', 'runner', 'docker'],
    isVirtual: true,
    hypervisor: 'Azure VM',
  },
  {
    id: 'fleet-008',
    name: 'Legacy Windows Server',
    hostname: 'legacy-win.corp.local',
    os: 'Windows Server',
    osVersion: '2016 Datacenter',
    ipAddress: '10.0.1.80',
    macAddress: '00:1A:2B:3C:4D:65',
    location: 'datacenter',
    locationDetail: 'DC-East Rack D02',
    status: 'online',
    lastSeen: Date.now(),
    cpuModel: 'Intel Xeon E5-2640 v4',
    cpuCores: 10,
    gpuModel: 'N/A',
    totalRam: 48,
    usedRam: 38,
    totalDisk: 500,
    usedDisk: 420,
    uptime: 15552000,
    issues: [
      {
        id: 'issue-009',
        type: 'software',
        severity: 'critical',
        title: 'End of Life OS',
        description: 'Windows Server 2016 extended support ends soon',
        detectedAt: Date.now() - 2592000000,
      },
      {
        id: 'issue-010',
        type: 'security',
        severity: 'critical',
        title: 'Missing Security Patches',
        description: '8 critical Windows updates pending',
        detectedAt: Date.now() - 604800000,
      },
      {
        id: 'issue-011',
        type: 'backup',
        severity: 'critical',
        title: 'No Backup Configured',
        description: 'Machine is not included in backup schedule',
        detectedAt: Date.now() - 7776000000,
      },
    ],
    tags: ['legacy', 'windows', 'active-directory'],
    isVirtual: false,
  },
  {
    id: 'fleet-009',
    name: 'Remote Developer Laptop',
    hostname: 'remote-dev-sarah.corp.local',
    os: 'macOS',
    osVersion: 'Ventura 13.6',
    ipAddress: '192.168.1.105',
    macAddress: '00:1A:2B:3C:4D:66',
    location: 'remote',
    locationDetail: 'San Francisco, CA',
    status: 'offline',
    lastSeen: Date.now() - 86400000,
    cpuModel: 'Apple M1 Pro',
    cpuCores: 10,
    gpuModel: 'Apple M1 Pro GPU (16 cores)',
    totalRam: 16,
    usedRam: 0,
    totalDisk: 512,
    usedDisk: 280,
    uptime: 0,
    issues: [
      {
        id: 'issue-012',
        type: 'security',
        severity: 'warning',
        title: 'VPN Disconnected',
        description: 'Device not connected to corporate VPN for 24h',
        detectedAt: Date.now() - 86400000,
      },
    ],
    tags: ['remote', 'developer', 'laptop'],
    isVirtual: false,
  },
  {
    id: 'fleet-010',
    name: 'Monitoring Stack',
    hostname: 'monitoring.corp.local',
    os: 'CentOS',
    osVersion: 'Stream 9',
    ipAddress: '10.0.1.90',
    macAddress: '00:1A:2B:3C:4D:67',
    location: 'datacenter',
    locationDetail: 'DC-East Rack A08',
    status: 'online',
    lastSeen: Date.now(),
    cpuModel: 'Intel Xeon E5-2680 v4',
    cpuCores: 14,
    gpuModel: 'N/A',
    totalRam: 128,
    usedRam: 96,
    totalDisk: 1000,
    usedDisk: 650,
    uptime: 3456000,
    issues: [],
    tags: ['monitoring', 'prometheus', 'grafana'],
    isVirtual: false,
  },
  {
    id: 'fleet-011',
    name: 'K8s Worker Node 01',
    hostname: 'k8s-worker-01.corp.local',
    os: 'Ubuntu',
    osVersion: '22.04.3 LTS',
    ipAddress: '10.0.4.10',
    macAddress: '00:1A:2B:3C:4D:68',
    location: 'cloud',
    locationDetail: 'AWS us-west-2',
    status: 'online',
    lastSeen: Date.now(),
    cpuModel: 'AMD EPYC 7R32',
    cpuCores: 16,
    gpuModel: 'N/A',
    totalRam: 64,
    usedRam: 52,
    totalDisk: 200,
    usedDisk: 145,
    uptime: 1728000,
    issues: [
      {
        id: 'issue-013',
        type: 'network',
        severity: 'warning',
        title: 'Pod Network Congestion',
        description: 'Inter-pod latency above threshold',
        detectedAt: Date.now() - 14400000,
      },
    ],
    tags: ['kubernetes', 'worker', 'container'],
    isVirtual: true,
    hypervisor: 'AWS EC2',
  },
  {
    id: 'fleet-012',
    name: 'Mail Gateway',
    hostname: 'mail-gw.corp.local',
    os: 'Debian',
    osVersion: '11 (Bullseye)',
    ipAddress: '10.0.1.25',
    macAddress: '00:1A:2B:3C:4D:69',
    location: 'datacenter',
    locationDetail: 'DC-East Rack A04',
    status: 'online',
    lastSeen: Date.now(),
    cpuModel: 'Intel Xeon E3-1230 v6',
    cpuCores: 4,
    gpuModel: 'N/A',
    totalRam: 16,
    usedRam: 10,
    totalDisk: 500,
    usedDisk: 280,
    uptime: 6912000,
    issues: [
      {
        id: 'issue-014',
        type: 'software',
        severity: 'warning',
        title: 'Outdated Antivirus Definitions',
        description: 'ClamAV definitions 3 days old',
        detectedAt: Date.now() - 259200000,
      },
    ],
    tags: ['mail', 'gateway', 'postfix'],
    isVirtual: false,
  },
];

/**
 * Get fleet statistics summary
 */
export function getFleetStatistics() {
  const machines = MOCK_FLEET_MACHINES;
  const allIssues = _.flatMap(machines, m => m.issues);

  return {
    totalMachines: machines.length,
    onlineMachines: _.filter(machines, m => m.status === 'online').length,
    offlineMachines: _.filter(machines, m => m.status === 'offline').length,
    maintenanceMachines: _.filter(machines, m => m.status === 'maintenance').length,
    virtualMachines: _.filter(machines, m => m.isVirtual).length,
    physicalMachines: _.filter(machines, m => !m.isVirtual).length,
    totalIssues: allIssues.length,
    criticalIssues: _.filter(allIssues, i => i.severity === 'critical').length,
    warningIssues: _.filter(allIssues, i => i.severity === 'warning').length,
    infoIssues: _.filter(allIssues, i => i.severity === 'info').length,
    issuesByType: {
      hardware: _.filter(allIssues, i => i.type === 'hardware').length,
      software: _.filter(allIssues, i => i.type === 'software').length,
      security: _.filter(allIssues, i => i.type === 'security').length,
      backup: _.filter(allIssues, i => i.type === 'backup').length,
      network: _.filter(allIssues, i => i.type === 'network').length,
    },
    locationCounts: {
      datacenter: _.filter(machines, m => m.location === 'datacenter').length,
      cloud: _.filter(machines, m => m.location === 'cloud').length,
      office: _.filter(machines, m => m.location === 'office').length,
      remote: _.filter(machines, m => m.location === 'remote').length,
    },
  };
}

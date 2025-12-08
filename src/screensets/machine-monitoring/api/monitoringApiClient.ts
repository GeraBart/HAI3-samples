/**
 * Mock API Client for Machine Monitoring
 * Simulates API calls with embedded mock data
 */

import {
  MOCK_MACHINES,
  MOCK_FLEET_MACHINES,
  generateMetricsForRange,
  generateWeekMetrics,
  generateProcessList,
  getFleetStatistics,
  type MachineInfo,
  type MachineFleetInfo,
  type MetricsSnapshot,
  type Process,
  type TimeRange,
  type LocationCategory,
  type IssueType
} from './mockData';
import _ from 'lodash';

/**
 * Simulates network delay
 */
function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export class MonitoringApiClient {
  /**
   * Get list of available machines
   */
  async getMachines(): Promise<MachineInfo[]> {
    await delay(300);
    return [...MOCK_MACHINES];
  }

  /**
   * Get machine by ID
   */
  async getMachine(machineId: string): Promise<MachineInfo | null> {
    await delay(200);
    return MOCK_MACHINES.find(m => m.id === machineId) || null;
  }

  /**
   * Get metrics for a machine for a specific time range
   */
  async getMetrics(machineId: string, timeRange: TimeRange): Promise<MetricsSnapshot[]> {
    await delay(400);
    return generateMetricsForRange(machineId, timeRange);
  }

  /**
   * Get metrics for a machine over the past week
   * @deprecated Use getMetrics with timeRange '7days' instead
   */
  async getWeekMetrics(machineId: string): Promise<MetricsSnapshot[]> {
    await delay(400);
    return generateWeekMetrics(machineId);
  }

  /**
   * Get current metrics snapshot
   */
  async getCurrentMetrics(machineId: string): Promise<MetricsSnapshot> {
    await delay(150);
    const metrics = generateMetricsForRange(machineId, '30min');
    return metrics[metrics.length - 1];
  }

  /**
   * Get list of running processes
   */
  async getProcesses(machineId: string): Promise<Process[]> {
    await delay(350);
    return generateProcessList(machineId);
  }

  /**
   * Get all fleet machines with optional filters
   */
  async getFleetMachines(filters?: {
    location?: LocationCategory;
    issueType?: IssueType;
    status?: 'online' | 'offline' | 'maintenance';
    search?: string;
  }): Promise<MachineFleetInfo[]> {
    await delay(400);
    let machines = [...MOCK_FLEET_MACHINES];

    if (filters) {
      if (filters.location) {
        machines = _.filter(machines, m => m.location === filters.location);
      }
      if (filters.status) {
        machines = _.filter(machines, m => m.status === filters.status);
      }
      if (filters.issueType) {
        machines = _.filter(machines, m =>
          _.some(m.issues, i => i.type === filters.issueType)
        );
      }
      if (filters.search) {
        const search = _.toLower(filters.search);
        machines = _.filter(machines, m =>
          _.includes(_.toLower(m.name), search) ||
          _.includes(_.toLower(m.hostname), search) ||
          _.includes(_.toLower(m.ipAddress), search) ||
          _.some(m.tags, t => _.includes(_.toLower(t), search))
        );
      }
    }

    return machines;
  }

  /**
   * Get fleet statistics summary
   */
  async getFleetStatistics() {
    await delay(200);
    return getFleetStatistics();
  }

  /**
   * Get a single fleet machine by ID
   */
  async getFleetMachine(machineId: string): Promise<MachineFleetInfo | null> {
    await delay(200);
    return _.find(MOCK_FLEET_MACHINES, m => m.id === machineId) || null;
  }
}

/**
 * Singleton instance
 */
export const monitoringApiClient = new MonitoringApiClient();

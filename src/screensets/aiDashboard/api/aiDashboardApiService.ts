/**
 * aiDashboard API Service
 * Domain-specific API service for this screenset
 */

import { BaseApiService, RestProtocol, apiRegistry, type MockMap } from '@hai3/uicore';
import { AI_DASHBOARD_SCREENSET_ID } from '../ids';

export const AI_DASHBOARD_DOMAIN = `${AI_DASHBOARD_SCREENSET_ID}:api` as const;

/**
 * API request/response types
 * Add your API types here
 */

/**
 * aiDashboard API Service
 * Extends BaseApiService with domain-specific methods
 */
export class aiDashboardApiService extends BaseApiService {
  constructor() {
    super(
      { baseURL: '/api/aiDashboard' },
      new RestProtocol({
        timeout: 30000,
      })
    );
  }

  /**
   * Get mock map from registry
   */
  protected getMockMap(): MockMap {
    return apiRegistry.getMockMap(AI_DASHBOARD_DOMAIN);
  }

  /**
   * Add your API methods here
   *
   * Example:
   * async getItems(): Promise<Item[]> {
   *   return this.protocol(RestProtocol).get<Item[]>('/items');
   * }
   */
}

// Register API service
apiRegistry.register(AI_DASHBOARD_DOMAIN, aiDashboardApiService);

// Module augmentation - extends uicore ApiServicesMap
declare module '@hai3/uicore' {
  interface ApiServicesMap {
    [AI_DASHBOARD_DOMAIN]: aiDashboardApiService;
  }
}

/**
 * acronisAnalytics API Service
 * Domain-specific API service for this screenset
 */

import { BaseApiService, RestProtocol, apiRegistry, type MockMap } from '@hai3/uicore';
import { ACRONIS_ANALYTICS_SCREENSET_ID } from '../ids';

export const ACRONIS_ANALYTICS_DOMAIN = `${ACRONIS_ANALYTICS_SCREENSET_ID}:api` as const;

/**
 * API request/response types
 * Add your API types here
 */

/**
 * acronisAnalytics API Service
 * Extends BaseApiService with domain-specific methods
 */
export class acronisAnalyticsApiService extends BaseApiService {
  constructor() {
    super(
      { baseURL: '/api/acronisAnalytics' },
      new RestProtocol({
        timeout: 30000,
      })
    );
  }

  /**
   * Get mock map from registry
   */
  protected getMockMap(): MockMap {
    return apiRegistry.getMockMap(ACRONIS_ANALYTICS_DOMAIN);
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
apiRegistry.register(ACRONIS_ANALYTICS_DOMAIN, acronisAnalyticsApiService);

// Module augmentation - extends uicore ApiServicesMap
declare module '@hai3/uicore' {
  interface ApiServicesMap {
    [ACRONIS_ANALYTICS_DOMAIN]: acronisAnalyticsApiService;
  }
}

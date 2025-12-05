/**
 * newTest API Service
 * Domain-specific API service for this screenset
 */

import { BaseApiService, RestProtocol, apiRegistry, type MockMap } from '@hai3/uicore';
import { NEW_TEST_SCREENSET_ID } from '../ids';

export const NEW_TEST_DOMAIN = `${NEW_TEST_SCREENSET_ID}:api` as const;

/**
 * API request/response types
 * Add your API types here
 */

/**
 * newTest API Service
 * Extends BaseApiService with domain-specific methods
 */
export class newTestApiService extends BaseApiService {
  constructor() {
    super(
      { baseURL: '/api/newTest' },
      new RestProtocol({
        timeout: 30000,
      })
    );
  }

  /**
   * Get mock map from registry
   */
  protected getMockMap(): MockMap {
    return apiRegistry.getMockMap(NEW_TEST_DOMAIN);
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
apiRegistry.register(NEW_TEST_DOMAIN, newTestApiService);

// Module augmentation - extends uicore ApiServicesMap
declare module '@hai3/uicore' {
  interface ApiServicesMap {
    [NEW_TEST_DOMAIN]: newTestApiService;
  }
}

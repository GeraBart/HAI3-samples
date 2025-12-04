/**
 * Modern Dashboard Screenset IDs
 *
 * ALL unique identifiers for this screenset in one place.
 * When duplicating this screenset, ONLY change the values in this file.
 * Everything else (events, icons, API domains, translations) will auto-update via template literals.
 */

/**
 * Screenset ID
 * Used for: Redux slice name, event namespace, icon namespace, API domain, translations
 */
export const MODERN_DASHBOARD_SCREENSET_ID = 'modernDashboard';

/**
 * Screen IDs
 * Used for: Screen routing, screen-level translations
 */
export const DASHBOARD_SCREEN_ID = 'dashboard';

/**
 * API Domain
 * Used for: API service registration
 */
export const DASHBOARD_API_DOMAIN = `${MODERN_DASHBOARD_SCREENSET_ID}:dashboard`;

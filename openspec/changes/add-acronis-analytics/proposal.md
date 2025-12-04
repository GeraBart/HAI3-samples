# Proposal: Add Acronis Analytics Screenset

## Summary
Add new Mockups screenset "acronis-analytics" with configurable dashboard functionality. Users can create and manage multiple dashboard tabs dynamically.

## Details
- Name: acronis-analytics
- Category: Mockups
- Initial screens: home
- State management: Yes (dashboard tabs management)
- API services: Yes (for future analytics data)

## Features
### Dashboard Tab Management
- Initial tab: "Dashboard 1"
- "+ Add dashboard" button next to tabs
- Inline input for new dashboard name
- Dynamic tab creation on Enter key
- Horizontal tab navigation

## Implementation
Uses `hai3 screenset create` CLI to ensure uniformity, followed by:
1. State management for dashboard tabs (slices/dashboardSlice.ts)
2. Events for tab operations (events/dashboardEvents.ts)
3. Actions for tab management (actions/dashboardActions.ts)
4. API service structure (api/AnalyticsApiService.ts)
5. UI components using @hai3/uikit (Tabs, Input, Button)

## Architecture Notes
- Follows HAI3 Redux+Flux pattern
- Domain-based state management (dashboard domain)
- No manual styling - uses @hai3/uikit components only
- Screenset-isolated API services
- Full localization support (36 languages)

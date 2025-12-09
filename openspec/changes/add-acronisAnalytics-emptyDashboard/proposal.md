# Proposal: Add EmptyDashboard Screen

## Summary
Add new screen "emptyDashboard" to acronisAnalytics screenset to provide an empty state for the dashboards page.

## Details
- Screenset: acronisAnalytics
- Screen name: emptyDashboard
- Add to menu: No
- Design reference: Figma node 146-14548

## Why
Users need a helpful empty state when no dashboards exist, guiding them to:
- Use AI to generate dashboards from natural language descriptions
- Choose from default dashboard templates (Standard, Sales, Customer Support)
- Import dashboards from JSON files
- Manually build dashboards by adding widgets

## What Changes
- Add EMPTY_DASHBOARD_SCREEN_ID to ids.ts
- Create emptyDashboard screen with i18n support for all 36 languages
- Implement UI matching Figma design with:
  - AI-powered dashboard generation input field
  - Default dashboard template cards with preview
  - JSON import option (drag & drop or browse)
  - Manual widget addition option
- Use only @hai3/uikit components (no manual styling)
- Follow HAI3 screen creation pattern with useScreenTranslations()

## Impact
- Affected files: src/screensets/acronisAnalytics/ids.ts
- New directory: src/screensets/acronisAnalytics/screens/empty-dashboard/
- No menu changes (screen not added to menu)

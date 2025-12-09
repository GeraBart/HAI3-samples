# Tasks: Add EmptyDashboard Screen

## 1. Implementation
- [x] 1.1 Add EMPTY_DASHBOARD_SCREEN_ID to ids.ts
- [x] 1.2 Create screen directory structure: screens/empty-dashboard/
- [x] 1.3 Create i18n files for all 36 languages in screens/empty-dashboard/i18n/
- [x] 1.4 Create EmptyDashboardScreen component with:
  - [x] Import useScreenTranslations, useTranslation, I18nRegistry, Language from @hai3/uicore
  - [x] Import SCREENSET_ID and SCREEN_ID from ../../ids
  - [x] Create translation loader with I18nRegistry.createLoader() for ALL 36 languages
  - [x] Call useScreenTranslations(SCREENSET_ID, SCREEN_ID, translations)
  - [x] Use t() with keys: screen.acronisAnalytics.emptyDashboard:key
  - [x] Wrap translated text with TextLoader
  - [x] Add displayName property
  - [x] Export default for lazy loading
- [x] 1.5 Implement UI components using @hai3/uikit only:
  - [x] AI input field with OpenAI icon and send button
  - [x] Default dashboard template cards (Standard, Sales, Customer Support)
  - [x] JSON import section with drag & drop
  - [x] Manual widget addition option
- [x] 1.6 Validate: `npm run type-check && npm run lint`
- [ ] 1.7 Test via Chrome MCP:
  - [ ] Navigate to acronisAnalytics screenset
  - [ ] Navigate to emptyDashboard screen
  - [ ] Verify 0 console errors
  - [ ] Verify translations load correctly
  - [ ] Verify UI matches Figma design

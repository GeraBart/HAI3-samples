# Tasks: Add aiDashboard Screenset

## 1. Screenset Setup
- [x] 1.1 Create screenset via CLI: `hai3 screenset create aiDashboard --category=mockups`
- [x] 1.2 Create types/dashboard.ts (Dashboard, Tab, Widget interfaces)
- [x] 1.3 Create types/aiGeneration.ts (GenerationStep, GenerationState)
- [x] 1.4 Add slices/dashboardSlice.ts (tabs, active dashboard)
- [x] 1.5 Add slices/aiGenerationSlice.ts (generation state, steps)
- [x] 1.6 Add events/dashboardEvents.ts, events/aiGenerationEvents.ts
- [x] 1.7 Add effects/dashboardEffects.ts, effects/aiGenerationEffects.ts
- [x] 1.8 Add actions/dashboardActions.ts
- [x] 1.9 Add api/AiDashboardApiService.ts with mocks.ts

## 2. Reusable Widget Components (`uikit/widgets/`)
- [x] 2.1 Create WidgetContainer.tsx (common wrapper with title, actions, loading)
- [x] 2.2 Create StatusChartWidget.tsx (donut/ring charts)
- [x] 2.3 Create DataChartWidget.tsx (line/area charts)
- [x] 2.4 Create BarChartWidget.tsx (vertical/horizontal bars)
- [x] 2.5 Create TableWidget.tsx (data table with columns)
- [x] 2.6 Create MetricCardWidget.tsx (single KPI with trend)
- [x] 2.7 Create widgets/index.ts barrel export

## 3. Dashboard Tabs Components (`uikit/DashboardTabs/`)
- [x] 3.1 Create TabItem.tsx (single tab with active state)
- [x] 3.2 Create TabInput.tsx (inline text input for rename/create)
- [x] 3.3 Create AddTabButton.tsx ("+" button)
- [x] 3.4 Create TabSettingsDropdown.tsx (dropdown menu)
- [x] 3.5 Create DashboardTabs.tsx (container orchestrating all)
- [x] 3.6 Create DashboardTabs/index.ts barrel export

## 4. Tab Settings Dropdown Actions
- [x] 4.1 Implement Rename action → shows TabInput inline
- [x] 4.2 Implement Clone action → duplicates dashboard
- [x] 4.3 Implement Move left action
- [x] 4.4 Implement Move right action (disabled when last)
- [x] 4.5 Implement Delete action → opens confirmation dialog

## 5. Delete Confirmation Dialog (`uikit/DeleteTabDialog/`)
- [x] 5.1 Create DeleteTabDialog.tsx
- [x] 5.2 Implement modal overlay (rgba(36,49,67,0.9) background)
- [x] 5.3 Add title with tab name interpolation
- [x] 5.4 Add warning message text
- [x] 5.5 Add Cancel (outline) and Delete (destructive) buttons
- [x] 5.6 Create DeleteTabDialog/index.ts

## 6. Icons (`uikit/icons/`)
- [x] 6.1 Create AiSparkleIcon.tsx (gradient purple/blue star)
- [x] 6.2 Create icons/index.ts and register with uikitRegistry

## 7. Empty Dashboard Components (`screens/home/components/EmptyDashboard/`)
- [x] 7.1 Create AiPromptSection.tsx (AI icon + heading + description + textarea)
- [x] 7.2 Create TemplatePreview.tsx (mini chart preview in card)
- [x] 7.3 Create TemplateCard.tsx (card with preview + title + description)
- [x] 7.4 Create TemplatesSection.tsx (category tabs + grid of TemplateCards)
- [x] 7.5 Create AdditionalOptions.tsx (Import JSON + Add widget cards)
- [x] 7.6 Create EmptyDashboard.tsx (composes all sections)
- [x] 7.7 Create EmptyDashboard/index.ts

## 8. AI Generation Flow (`screens/home/components/GeneratingDashboard/`)
- [x] 8.1 Create StepIcon.tsx (checkmark/spinner/circle based on state)
- [x] 8.2 Create GenerationStep.tsx (single step with icon + title + description)
- [x] 8.3 Create GeneratingDashboard.tsx (title + description + 4 steps)
- [x] 8.4 Implement step animation timing (1.5s per step simulation)
- [x] 8.5 Create GeneratingDashboard/index.ts

## 9. Dashboard Preview (`screens/home/components/DashboardPreview/`)
- [x] 9.1 Create InsightItem.tsx (bullet point with text)
- [x] 9.2 Create AiInsightsPanel.tsx (collapsible panel with insights)
- [x] 9.3 Create WidgetGrid.tsx (responsive grid using widget components)
- [x] 9.4 Create DashboardPreview.tsx (AI toggle + insights + widgets)
- [x] 9.5 Create DashboardPreview/index.ts

## 10. Main Screen Integration
- [x] 10.1 Create screens/home/components/index.ts (barrel exports)
- [x] 10.2 Update HomeScreen.tsx to compose DashboardTabs + content area
- [x] 10.3 Implement state-based rendering:
  - empty → EmptyDashboard
  - generating → GeneratingDashboard
  - preview → DashboardPreview
- [x] 10.4 Connect to Redux state for dashboard/generation management
- [x] 10.5 Handle AI prompt submission → trigger generation flow

## 11. Internationalization
- [x] 11.1 Add screenset-level i18n (36 languages) - CLI generated
- [x] 11.2 Add screen-level i18n for home screen (36 languages) - CLI generated
- [x] 11.3 Add translation keys for all UI text (en.json updated)

## 12. Validation
- [x] 12.1 Run `npm run type-check`
- [x] 12.2 Run `npm run arch:check`
- [x] 12.3 Run `npm run lint`
- [ ] 12.4 Run `npm run dev` and test manually
- [ ] 12.5 Verify screenset appears in selector
- [ ] 12.6 Test all tab operations (add, rename, clone, move, delete)
- [ ] 12.7 Test AI generation flow with simulated delays
- [ ] 12.8 Verify widget components render correctly
- [ ] 12.9 Verify 0 console errors

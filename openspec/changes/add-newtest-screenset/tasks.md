# Tasks: Add newTest Screenset

## 1. Scaffold
- [x] 1.1 Create screenset via CLI: `hai3 screenset create newTest --category=Mockups`

## 2. Overview Screen Layout
- [x] 2.1 Implement dashboard header with tabs row (Dashboard tab + Add tab action)
- [x] 2.2 Implement header actions row (Add widget, Download, Send, Expand, overflow)
- [x] 2.3 Implement centered empty-state block with icon, title, subtitle, and 3 helper actions
- [x] 2.4 Implement "Add tab" dialog (opens on Add tab click, with Tab name input, Cancel/Add buttons)
- [x] 2.5 Implement tab management (add new tabs, switch between tabs, active tab styling)

## 3. State Management (using local React state for mockup)
- [ ] 3.1 Create `slices/dashboardSlice.ts` for tabs and dashboard state
- [ ] 3.2 Create `events/dashboardEvents.ts` with local DOMAIN_ID
- [ ] 3.3 Create `effects/dashboardEffects.ts` for tab/widget actions
- [ ] 3.4 Create `actions/dashboardActions.ts` for UI dispatches

## 4. Localization
- [x] 4.1 Add screenset-level translations (title, empty state text, action labels)
- [x] 4.2 Add screen-level translations for overview screen

## 5. Validation
- [x] 5.1 Run `npm run type-check && npm run arch:check && npm run lint`
- [ ] 5.2 Test via Chrome MCP: verify screenset in selector, switch to newTest, check 0 console errors

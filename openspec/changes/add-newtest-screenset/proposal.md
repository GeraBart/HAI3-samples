# Proposal: Add newTest Screenset

## Summary
Add new Mockups screenset "newTest" with 1 initial screen (`overview`) that implements a Monitoring > Overview dashboard empty state based on the Acronis AI Dashboards Figma design.

## Details
- **Name:** newTest
- **Category:** Mockups
- **Initial screens:** overview
- **State management:** Y (tabs, selected tab, empty vs populated dashboard state)
- **API services:** N (front-end only mockup for now)

## What Changes
- New screenset directory `src/screensets/newTest/`
- Overview screen with:
  - Dashboard header with tabs ("Dashboard" default tab + "Add tab" action)
  - Header actions row: Add widget, Download, Send, Expand, overflow menu
  - Centered empty-state block when no widgets exist:
    - Gauge/speedometer icon
    - Title: "Build your first dashboard"
    - Subtitle: "Add data widgets to customize your view and track what matters most."
    - Helper actions: View Demo, How to create dashboard?, Copy from existing dashboard
- Local state management for tabs and dashboard empty/populated state
- Localization files for all 36 languages

## Impact
- Affected specs: none (new capability)
- Affected code: `src/screensets/newTest/`, `src/screensets/screensetRegistry.tsx` (auto-registration)

## Implementation
Uses `hai3 screenset create newTest --category=Mockups` CLI to ensure uniformity.

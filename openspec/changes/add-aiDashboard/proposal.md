# Proposal: Add aiDashboard Screenset

## Summary
Add new Mockups screenset "aiDashboard" with main screen implementing an AI-powered dashboard builder system.

## Details
- **Name**: aiDashboard
- **Category**: Mockups
- **Initial screens**: main
- **State management**: Yes (dashboard tabs, AI generation state, widgets)
- **API services**: Yes (AI generation endpoints)

## Features

### 1. Horizontal Dashboard Tabs (Header)
- Tab bar with existing dashboards (DASHBOARD, DASHBOARD 2, etc.)
- Active tab indicator (underline)
- "+" button to add new dashboard tab
- Inline rename input when adding new tab
- Settings dropdown button on active tab only

### 2. Tab Settings Dropdown
- **Rename**: Opens inline input to rename tab
- **Clone**: Duplicates the dashboard
- **Move left**: Reorders tab to the left
- **Move right**: Reorders tab to the right (disabled if last)
- **Delete**: Shows confirmation dialog

### 3. Delete Confirmation Dialog
- Modal overlay with dark background
- Title: "Delete tab "{tabName}""
- Warning message about permanent deletion
- Cancel and Delete buttons

### 4. Empty Dashboard State
Components:
- AI sparkle icon (gradient purple/blue)
- Heading: "Describe your dashboard, and we'll build it."
- Description text
- AI chat textarea with placeholder and send button
- Dashboard templates section with category tabs (All, Category 1, 2, 3)
- Template cards with preview thumbnails (Standard, Sales, Customer support)
- "See more" link
- Additional options section:
  - Import JSON (dashed border, upload icon)
  - Add widget manually (solid border, grid icon)

### 5. AI Generation Flow
When user enters prompt and presses Enter:
1. Show "Creating your dashboard" screen
2. Progress steps with animated states:
   - Analyzing your request (completed → checkmark)
   - Identifying data sources (in progress → spinner)
   - Selecting visualizations (pending → circle)
   - Generating dashboard (pending → circle)
3. Simulate backend request with delays
4. On completion, show dashboard preview

### 6. Dashboard Preview (After Generation)
- AI Insights toggle
- AI dashboard insights panel with:
  - "Powered by Acronis AI" badge
  - Security Gaps Identified section
  - Positive Indicators section
  - Custom prompt button
  - Show more button
- Widget grid:
  - Status charts (donut charts)
  - Data chart
  - Activities bar chart
  - Table data section

## Implementation
Uses `hai3 screenset create` CLI to ensure uniformity, then adds custom components.

## Component Architecture

### Directory Structure
```
src/screensets/aiDashboard/
├── aiDashboardScreenset.tsx
├── ids.ts
├── i18n/                          # 36 language files
├── slices/
│   ├── dashboardSlice.ts          # Dashboard tabs state
│   └── aiGenerationSlice.ts       # AI generation state
├── events/
│   ├── dashboardEvents.ts
│   └── aiGenerationEvents.ts
├── effects/
│   ├── dashboardEffects.ts
│   └── aiGenerationEffects.ts
├── actions/
│   └── dashboardActions.ts
├── api/
│   ├── AiDashboardApiService.ts
│   └── mocks.ts
├── types/
│   ├── dashboard.ts               # Dashboard, Tab, Widget types
│   └── aiGeneration.ts            # Generation step types
├── uikit/
│   ├── icons/
│   │   ├── AiSparkleIcon.tsx      # Gradient AI icon
│   │   └── index.ts
│   ├── DashboardTabs/
│   │   ├── DashboardTabs.tsx      # Main tabs container
│   │   ├── TabItem.tsx            # Single tab component
│   │   ├── TabInput.tsx           # Inline rename input
│   │   ├── TabSettingsDropdown.tsx
│   │   ├── AddTabButton.tsx
│   │   └── index.ts
│   ├── DeleteTabDialog/
│   │   ├── DeleteTabDialog.tsx
│   │   └── index.ts
│   └── widgets/                   # Reusable widget components
│       ├── StatusChartWidget.tsx  # Donut/ring charts
│       ├── DataChartWidget.tsx    # Line/area charts
│       ├── BarChartWidget.tsx     # Bar/column charts
│       ├── TableWidget.tsx        # Data table widget
│       ├── MetricCardWidget.tsx   # Single metric display
│       ├── WidgetContainer.tsx    # Common widget wrapper
│       └── index.ts
└── screens/
    └── main/
        ├── MainScreen.tsx
        ├── i18n/                   # 36 language files
        └── components/
            ├── EmptyDashboard/
            │   ├── EmptyDashboard.tsx
            │   ├── AiPromptSection.tsx      # AI icon + heading + textarea
            │   ├── TemplatesSection.tsx     # Template cards grid
            │   ├── TemplateCard.tsx         # Single template card
            │   ├── TemplatePreview.tsx      # Mini preview in card
            │   ├── AdditionalOptions.tsx    # Import + Add widget
            │   └── index.ts
            ├── GeneratingDashboard/
            │   ├── GeneratingDashboard.tsx
            │   ├── GenerationStep.tsx       # Single step with icon
            │   ├── StepIcon.tsx             # Checkmark/spinner/circle
            │   └── index.ts
            ├── DashboardPreview/
            │   ├── DashboardPreview.tsx
            │   ├── AiInsightsPanel.tsx      # AI insights section
            │   ├── InsightItem.tsx          # Single insight row
            │   ├── WidgetGrid.tsx           # Grid layout for widgets
            │   └── index.ts
            └── index.ts
```

### Reusable Components

#### 1. Widget Components (`uikit/widgets/`)
Each widget type is a separate file for maintainability:

- **WidgetContainer.tsx** - Common wrapper with title, actions, loading state
- **StatusChartWidget.tsx** - Donut/ring charts for status distribution
- **DataChartWidget.tsx** - Line/area charts for time series data
- **BarChartWidget.tsx** - Vertical/horizontal bar charts
- **TableWidget.tsx** - Data tables with sorting, pagination
- **MetricCardWidget.tsx** - Single KPI display with trend indicator

#### 2. Dashboard Tabs (`uikit/DashboardTabs/`)
Extracted into granular components:

- **DashboardTabs.tsx** - Container orchestrating all tab components
- **TabItem.tsx** - Single tab with active state, click handler
- **TabInput.tsx** - Inline text input for rename/create
- **TabSettingsDropdown.tsx** - Dropdown menu with actions
- **AddTabButton.tsx** - "+" button to create new tab

#### 3. Empty Dashboard Components (`screens/main/components/EmptyDashboard/`)
Split by logical sections:

- **AiPromptSection.tsx** - AI icon, heading, description, textarea
- **TemplatesSection.tsx** - Category tabs + template grid
- **TemplateCard.tsx** - Individual template with preview
- **AdditionalOptions.tsx** - Import JSON + Add widget cards

#### 4. Generation Flow (`screens/main/components/GeneratingDashboard/`)
- **GenerationStep.tsx** - Reusable step component with status
- **StepIcon.tsx** - Icon based on step state (pending/active/completed)

#### 5. Dashboard Preview (`screens/main/components/DashboardPreview/`)
- **AiInsightsPanel.tsx** - Collapsible AI insights section
- **InsightItem.tsx** - Single insight with icon and text
- **WidgetGrid.tsx** - Responsive grid layout using widget components

### Component Reusability Guidelines

1. **Widget components** are designed to be reusable across different dashboards
2. **Props-driven configuration** - widgets accept data and config via props
3. **No hardcoded data** - all content comes from state or i18n
4. **Consistent styling** - use @hai3/uikit tokens, no manual styling
5. **Type-safe interfaces** - each widget has explicit TypeScript interface

## Design References
- Main overview: Figma node 122-28705
- Tabs header: Figma node 122-29181
- Tab input: Figma node 1-8220
- Settings dropdown: Figma node 1-8035
- Delete confirmation: Figma node 1-8177
- AI icon: Figma node 122-29224
- AI textarea: Figma node 122-29202
- Templates: Figma node 137-21243
- Additional options: Figma node 137-21242
- Generation progress: Figma node 122-29975
- Dashboard preview: Figma node 123-15689

# Proposal: Enhance aiDashboard Widgets

## Why
The current aiDashboard implementation displays widgets in a static grid layout. Users need the ability to customize their dashboard layout by repositioning and resizing widgets, as well as configuring individual widget settings to match their specific needs.

## What Changes
- Add drag-and-drop widget reordering within the dashboard grid
- Add widget resize functionality (small, medium, large, full-width)
- Add widget configuration panel for customizing data sources, colors, and display options
- Add edit mode toggle to enable/disable layout modifications
- Add widget toolbar with quick actions (configure, resize, remove)

## Impact
- Affected specs: aiDashboard
- Affected code:
  - `src/screensets/aiDashboard/types/dashboard.ts` - Widget position/size types
  - `src/screensets/aiDashboard/slices/aiDashboardSlice.ts` - Layout state management
  - `src/screensets/aiDashboard/uikit/widgets/` - Widget wrapper enhancements
  - `src/screensets/aiDashboard/screens/home/components/DashboardPreview/` - Grid layout updates

## Features

### 1. Widget Edit Button (Per-Widget)
- Pencil icon appears on hover in the top-right corner of each widget
- Clicking the pencil opens a settings sidebar from the right
- Widget enters edit mode and is displayed **centered in the main content area** (Figma: 123-23506)
- Other widgets are hidden/dimmed while editing
- Live preview of configuration changes in the centered widget
- No global edit mode - each widget can be configured independently

### 2. Widget Settings Sidebar (Figma: 123-23622)
- Header: "Create custom widget" title with close (X) button
- Data source dropdown
- Widget type icons (donut chart, table, bar chart, list, scatter plot, heatmap)
- General section: Name, Description, "Save to custom widgets catalog" checkbox
- Properties section: Label, Value, Sort, Sort order, Colour scheme dropdowns; Show summary, Show legend checkboxes
- Filters section: Expandable with Filter #1, Filter #2, etc.
- Footer: Cancel and "Add widget" buttons

### 2. Drag-and-Drop Reordering
- Dashboard grid consists of 3 columns
- Widgets can span 1, 2, or 3 columns
- Drag handle appears on widgets in edit mode
- Visual drop zone indicators during drag showing valid grid positions
- Smooth animation when widgets reposition
- Widgets snap to nearest valid grid position

### 3. Widget Resize
- Resize by dragging any border (left, right, top, bottom) or corner
- Width snaps to column boundaries: 1 column, 2 columns, or 3 columns (full-width)
- Height adjusts freely based on content or manual resize
- Size selector dropdown in widget toolbar (1 Column, 2 Columns, 3 Columns)
- Responsive behavior on smaller screens

## Design References
- Widget Settings Sidebar: Figma node 123-23622
- Widget Centered Preview in Edit Mode: Figma node 123-23506

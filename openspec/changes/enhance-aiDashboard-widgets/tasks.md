# Tasks: Enhance aiDashboard Widgets

## 1. Type Definitions
- [x] 1.1 Add `WidgetColumnSpan` type (1, 2, 3)
- [x] 1.2 Add `WidgetPosition` interface (row, column, columnSpan, height)
- [x] 1.3 Update `BaseWidget` to include position and columnSpan properties
- [x] 1.4 Add `WidgetConfig` interface for widget-specific settings
- [x] 1.5 Add `GridLayout` interface for 3-column grid management

## 2. State Management
- [x] 2.1 Add `widgetLayouts` map (widgetId → position/columnSpan)
- [x] 2.2 Add `activeSettingsWidgetId` for settings sidebar
- [x] 2.3 Add `widgetConfigs` map (widgetId → config)
- [x] 2.4 Add reducers: updateWidgetPosition, updateWidgetColumnSpan
- [x] 2.5 Add reducers: openWidgetSettings, closeWidgetSettings, updateWidgetConfig
- [x] 2.6 Add events for all new actions
- [x] 2.7 Add effects to connect events to reducers

## 3. Widget Edit Button & Centered Preview
- [x] 3.1 Create `WidgetEditButton.tsx` component (pencil icon)
- [x] 3.2 Add edit button to WidgetContainer (top-right corner)
- [x] 3.3 Show edit button on widget hover
- [x] 3.4 Create `WidgetEditMode.tsx` container for centered widget display
- [x] 3.5 Implement centered widget preview layout (Figma: 123-23506)
- [x] 3.6 Hide/dim other widgets when one is in edit mode
- [x] 3.7 Connect edit button click to open edit mode + settings sidebar

## 4. Widget Settings Sidebar (Figma: 123-23622)
- [x] 4.1 Create `WidgetSettingsSidebar.tsx` slide-out panel
- [x] 4.2 Create sidebar header with title and close button
- [x] 4.3 Create `DataSourceDropdown.tsx` component
- [x] 4.4 Create `WidgetTypeSelector.tsx` with icon options
- [x] 4.5 Create `GeneralSection.tsx` (Name, Description, Save to catalog checkbox)
- [x] 4.6 Create `PropertiesSection.tsx` (Label, Value, Sort, Sort order, Colour scheme, Show summary, Show legend)
- [x] 4.7 Create `FiltersSection.tsx` (expandable with multiple filters)
- [x] 4.8 Add Cancel and "Add widget" footer buttons
- [x] 4.9 Add i18n keys for all sidebar labels

## 5. Drag-and-Drop
- [x] 5.1 Create `DraggableWidget.tsx` wrapper component
- [x] 5.2 Add drag handle icon (visible in edit mode)
- [x] 5.3 Implement drag start/move/end handlers
- [x] 5.4 Create `DropZone.tsx` for visual drop indicators
- [x] 5.5 Update WidgetGrid to support drag-and-drop reordering
- [x] 5.6 Add smooth transition animations

## 6. Widget Resize
- [x] 6.1 Create `ResizeHandle.tsx` component for edge and corner resizing
- [x] 6.2 Create `ResizableWidget.tsx` wrapper component
- [x] 6.3 Add resize borders/corners to WidgetContainer (edit mode only)
- [x] 6.4 Implement horizontal resize with column snapping (1, 2, 3 columns)
- [x] 6.5 Implement vertical resize for height adjustment
- [x] 6.6 Update 3-column grid layout to respect widget columnSpan
- [x] 6.7 Add responsive behavior for smaller screens

## 7. Widget Configuration Panel
- [x] 7.1 Integrated into WidgetSettingsSidebar (combined approach)
- [x] 7.2 Widget type-specific settings via PropertiesSection
- [x] 7.3 Apply/Cancel buttons with state management
- [x] 7.4 Live preview of configuration changes via WidgetEditMode

## 8. Integration
- [x] 8.1 Update DashboardPreview to include edit mode UI
- [x] 8.2 Update WidgetGrid to use new layout system
- [x] 8.3 Update WidgetContainer to include edit button and resize handle
- [x] 8.4 Connect all components to Redux state

## 9. Validation
- [x] 9.1 Run `npm run type-check`
- [x] 9.2 Run `npm run arch:check`
- [x] 9.3 Run `npm run lint`
- [ ] 9.4 Test edit mode toggle
- [ ] 9.5 Test drag-and-drop reordering
- [ ] 9.6 Test widget resize
- [ ] 9.7 Test widget configuration panel
- [ ] 9.8 Verify 0 console errors

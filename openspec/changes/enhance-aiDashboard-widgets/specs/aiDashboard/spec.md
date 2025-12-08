# aiDashboard Widget Enhancements

## ADDED Requirements

### Requirement: Widget Edit Button
The system SHALL provide a per-widget edit button that opens a settings sidebar for configuring the widget.

#### Scenario: Show edit button on hover
- **WHEN** user hovers over a widget
- **THEN** a pencil icon appears in the top-right corner of the widget

#### Scenario: Open widget settings sidebar
- **WHEN** user clicks the pencil icon on a widget
- **THEN** the widget enters edit mode and is displayed centered in the main content area
- **AND** a settings sidebar slides in from the right
- **AND** sidebar displays "Create custom widget" title with close button
- **AND** sidebar contains Data source dropdown, widget type icons, General section (Name, Description), Properties section (Label, Value, Sort, Sort order, Colour scheme, Show summary, Show legend checkboxes), and Filters section
- **AND** sidebar has Cancel and "Add widget" buttons at the bottom
- **AND** other widgets in the dashboard are hidden or dimmed

#### Scenario: Widget preview in edit mode
- **WHEN** widget is in edit mode
- **THEN** the widget is displayed centered horizontally in the main content area
- **AND** the widget shows a live preview of configuration changes
- **AND** the widget maintains its aspect ratio and size

#### Scenario: Close widget settings sidebar
- **WHEN** user clicks the close (X) button or Cancel button
- **THEN** sidebar closes
- **AND** widget retains original configuration

### Requirement: Widget Drag-and-Drop
The system SHALL allow users to reorder widgets via drag-and-drop. The dashboard grid consists of 3 columns, and widgets can span 1, 2, or 3 columns.

#### Scenario: Drag widget to new position
- **WHEN** user drags a widget by its drag handle
- **THEN** visual drop zone indicators appear showing valid 3-column grid positions
- **AND** other widgets shift to show potential placement
- **WHEN** user releases the widget
- **THEN** widget snaps to the nearest valid grid position
- **AND** layout state is updated

### Requirement: Widget Resize
The system SHALL allow users to resize widgets by dragging any border (left, right, top, bottom) or corner. The grid supports 3 columns, and widgets can span 1, 2, or 3 columns.

#### Scenario: Resize widget by dragging border
- **WHEN** user drags a widget border (left, right, top, or bottom)
- **THEN** widget size changes following the cursor
- **AND** horizontal size snaps to column boundaries (1, 2, or 3 columns)
- **WHEN** user releases the border
- **THEN** widget adopts the new size
- **AND** grid layout adjusts accordingly

#### Scenario: Resize widget by dragging corner
- **WHEN** user drags a widget corner
- **THEN** widget resizes in both dimensions following the cursor
- **AND** width snaps to column boundaries (1, 2, or 3 columns)
- **WHEN** user releases the corner
- **THEN** widget adopts the new size
- **AND** grid layout reflows

### Requirement: Widget Remove Action
The system SHALL allow users to remove widgets from the dashboard.

#### Scenario: Remove widget via settings sidebar
- **WHEN** user opens widget settings and clicks a remove/delete option
- **THEN** widget is removed from the dashboard
- **AND** remaining widgets reflow to fill the gap

### Requirement: Widget Settings Sidebar
The system SHALL provide a settings sidebar for configuring widget properties based on the Figma design.

#### Scenario: Configure data source
- **WHEN** widget settings sidebar is open
- **THEN** user can select a data source from the dropdown

#### Scenario: Select widget type
- **WHEN** widget settings sidebar is open
- **THEN** user can choose widget type from icon options (donut chart, table, bar chart, list, scatter plot, heatmap)

#### Scenario: Configure general settings
- **WHEN** widget settings sidebar is open
- **THEN** user can edit Name and Description fields
- **AND** user can toggle "Save this widget to custom widgets catalog" checkbox

#### Scenario: Configure properties
- **WHEN** widget settings sidebar is open
- **THEN** user can configure Label, Value, Sort, Sort order, and Colour scheme dropdowns
- **AND** user can toggle Show summary and Show legend checkboxes

#### Scenario: Configure filters
- **WHEN** widget settings sidebar is open
- **THEN** user can add and configure multiple filters (Filter #1, Filter #2, etc.)

#### Scenario: Apply widget configuration
- **WHEN** user clicks "Add widget" button in sidebar
- **THEN** widget updates with new configuration
- **AND** sidebar closes

#### Scenario: Cancel widget configuration
- **WHEN** user clicks Cancel button in sidebar
- **THEN** sidebar closes
- **AND** widget retains original configuration

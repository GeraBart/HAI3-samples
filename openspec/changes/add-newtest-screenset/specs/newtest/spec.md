## ADDED Requirements

### Requirement: Dashboard Overview Screen
The newTest screenset SHALL provide an `overview` screen that displays a dashboard view with a header, tabs, actions, and content area.

#### Scenario: Empty dashboard state
- **WHEN** the user has no widgets configured
- **THEN** the overview screen MUST display a centered empty-state block containing:
  - A gauge/speedometer icon
  - Title text: "Build your first dashboard"
  - Subtitle text: "Add data widgets to customize your view and track what matters most."
  - Three helper action links: "View Demo", "How to create dashboard?", "Copy from existing dashboard"

#### Scenario: Dashboard header with tabs
- **WHEN** the overview screen is displayed
- **THEN** the header MUST show a tabs row with at least one tab ("Dashboard") and an "Add tab" action

#### Scenario: Header actions row
- **WHEN** the overview screen is displayed
- **THEN** the header MUST show action buttons: Add widget, Download, Send, Expand, and an overflow menu

---

### Requirement: Tab Management
The newTest screenset SHALL support multiple dashboard tabs managed in local state.

#### Scenario: Add new tab
- **WHEN** the user clicks "Add tab"
- **THEN** a new tab MUST be created in local state and set as the active tab

#### Scenario: Switch tabs
- **WHEN** the user clicks on an existing tab
- **THEN** that tab MUST become the active tab and its content (or empty state) MUST be displayed

---

### Requirement: Empty State Helper Actions
The empty-state block SHALL provide helper actions to guide the user.

#### Scenario: View Demo action
- **WHEN** the user clicks "View Demo"
- **THEN** the system MUST dispatch a `viewDemo` event (implementation may be stubbed for Mockups category)

#### Scenario: How to create dashboard action
- **WHEN** the user clicks "How to create dashboard?"
- **THEN** the system MUST dispatch a `showHelp` event or navigate to help content

#### Scenario: Copy from existing dashboard action
- **WHEN** the user clicks "Copy from existing dashboard"
- **THEN** the system MUST dispatch a `copyDashboard` event or open a selection dialog

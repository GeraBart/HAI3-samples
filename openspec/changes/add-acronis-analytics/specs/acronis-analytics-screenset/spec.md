# Acronis Analytics Screenset Specification

## ADDED Requirements

### Requirement: Screenset Structure
The system SHALL provide an acronis-analytics screenset with proper HAI3 architecture.

#### Scenario: Screenset initialization
- **WHEN** the screenset is loaded
- **THEN** it SHALL be registered in the screenset registry
- **AND** it SHALL have proper localization for all 36 languages
- **AND** it SHALL have a centralized ids.ts with SCREENSET_ID constant

### Requirement: Dashboard Tab Management State
The system SHALL manage dashboard tabs using Redux+Flux pattern with domain-based state management.

#### Scenario: Initial state
- **WHEN** the screenset loads
- **THEN** the dashboard slice SHALL contain an initial tab named "Dashboard 1"
- **AND** the state SHALL be managed via dashboardSlice.ts
- **AND** the slice SHALL be registered with its own effects

#### Scenario: Tab creation
- **WHEN** a user creates a new dashboard tab
- **THEN** an event SHALL be dispatched via dashboardEvents.ts
- **AND** the effect SHALL handle the event in dashboardEffects.ts
- **AND** the state SHALL be updated via the dashboard slice reducer

### Requirement: Dashboard Tab UI
The system SHALL provide a horizontal tab interface using @hai3/uikit components only.

#### Scenario: Initial tab display
- **WHEN** the home screen loads
- **THEN** it SHALL display a horizontal tab labeled "Dashboard 1"
- **AND** the tab SHALL be implemented using @hai3/uikit Tabs component
- **AND** no manual styling SHALL be applied

#### Scenario: Add dashboard button
- **WHEN** the home screen loads
- **THEN** it SHALL display a "+ Add dashboard" button next to the tabs
- **AND** the button SHALL be implemented using @hai3/uikit Button component

### Requirement: New Dashboard Creation
The system SHALL allow users to create new dashboard tabs dynamically.

#### Scenario: Show input on button click
- **WHEN** the user clicks "+ Add dashboard" button
- **THEN** an inline input field SHALL appear
- **AND** the input SHALL be implemented using @hai3/uikit Input component
- **AND** the input SHALL have a placeholder from localization

#### Scenario: Create tab on Enter key
- **WHEN** the user types a dashboard name and presses Enter
- **THEN** a new horizontal tab SHALL be created with the entered name
- **AND** the action SHALL be dispatched via dashboardActions.ts
- **AND** the input field SHALL clear
- **AND** the new tab SHALL become active

#### Scenario: Switch between tabs
- **WHEN** the user clicks on any dashboard tab
- **THEN** the active tab SHALL change
- **AND** the dashboard content SHALL update accordingly

### Requirement: Localization
The system SHALL provide full localization support for the screenset.

#### Scenario: Screenset-level translations
- **WHEN** the screenset is loaded
- **THEN** it SHALL use I18nRegistry.createLoader for screenset-level translations
- **AND** translations SHALL be in the "screenset.acronis-analytics:key" namespace
- **AND** all 36 languages SHALL be supported

#### Scenario: Screen-level translations
- **WHEN** the home screen is loaded
- **THEN** it SHALL use useScreenTranslations hook
- **AND** translations SHALL be in the "screen.acronis-analytics.home:key" namespace
- **AND** all UI text SHALL be wrapped with TextLoader or use t()

#### Scenario: Custom UI keys
- **WHEN** rendering dashboard UI
- **THEN** it SHALL use localized keys for:
  - "add_dashboard" button text
  - "dashboard_name_placeholder" input placeholder
  - "dashboard_default_name" for default tab names

### Requirement: API Service Structure
The system SHALL provide a screenset-local API service for future analytics data.

#### Scenario: API service creation
- **WHEN** the screenset is initialized
- **THEN** it SHALL have an AnalyticsApiService in api/ folder
- **AND** the service SHALL use template literal domain: `${SCREENSET_ID}:analytics`
- **AND** the service SHALL be imported and registered in screenset config
- **AND** the service SHALL have a mocks.ts file

#### Scenario: API service isolation
- **WHEN** actions need to call the API
- **THEN** they SHALL import from local api folder
- **AND** the API service SHALL NOT be shared with other screensets

### Requirement: Architecture Compliance
The system SHALL follow all HAI3 architecture rules.

#### Scenario: No manual styling
- **WHEN** implementing any UI component
- **THEN** it SHALL use only @hai3/uikit components
- **AND** no manual CSS or inline styles SHALL be applied

#### Scenario: Domain-based state management
- **WHEN** organizing state management
- **THEN** it SHALL split into domain folders: slices/, events/, effects/, actions/
- **AND** it SHALL NOT have coordinator effects files
- **AND** it SHALL NOT have barrel exports in events/ or effects/

#### Scenario: Slice registration
- **WHEN** registering the dashboard slice
- **THEN** it SHALL export the slice object as default
- **AND** it SHALL use registerSlice(sliceObject, initEffects)
- **AND** it SHALL augment RootState in screenset store file

#### Scenario: Event handling
- **WHEN** defining events
- **THEN** events SHALL be in dashboardEvents.ts with local DOMAIN_ID constant
- **AND** events SHALL follow EVENTS.md data flow rules

#### Scenario: No direct slice imports
- **WHEN** components need to interact with state
- **THEN** they SHALL use actions from dashboardActions.ts
- **AND** they SHALL NOT import slices directly

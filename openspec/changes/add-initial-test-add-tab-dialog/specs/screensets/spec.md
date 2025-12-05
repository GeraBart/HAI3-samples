## ADDED Requirements

### Requirement: AddTabDialog for initialTest Overview
The system SHALL provide an `AddTabDialog` UI component for the `initialTest` screenset Overview screen so that users can initiate creation of a new dashboard tab via a simple, UI-only dialog.

#### Scenario: Open and confirm AddTabDialog from Overview
- **WHEN** the user is on the `initialTest` screenset Overview screen
- **AND** the user clicks the "Add tab" control in the header tabs row
- **THEN** an `AddTabDialog` modal dialog SHALL open using `@hai3/uikit` dialog primitives
- **AND** the dialog SHALL display:
  - A title equivalent to "Add tab"
  - A short helper description explaining that the user is creating a new dashboard tab
  - A single text input for the tab name, with label equivalent to "Tab name" and placeholder similar to "Enter tab name"
  - A primary high-emphasis button labeled "Add"
  - A secondary low-emphasis button labeled "Cancel"
- **AND** all user-visible strings in this dialog SHALL be sourced from the `initialTest` Overview screen-level i18n namespace (`screen.initialTest.initialTest:*`) for all supported languages
- **AND** the dialog implementation SHALL own only local React state for the input value and invoke a provided `onConfirm(name)` callback when the user clicks "Add"
- **AND** the dialog SHALL close when the user clicks the close icon, presses the Cancel button, or completes a successful Add action
- **AND** this change SHALL be UI-only: no real dashboards tab array, no Redux slice updates, and no API calls are required; the dialog MAY currently just close after `onConfirm` without persisting or mutating any dashboards data.

# Proposal: Add AddTabDialog Component to initialTest Screenset

## Summary
Add a screenset-specific `AddTabDialog` UI component for the `initialTest` screenset, used by the Dashboards-style Overview screen to create a new dashboard tab via a simple, UI-only dialog that matches the provided Figma design.

Figma (header context): https://www.figma.com/design/UNEmkcMLy88EV0GU82B1EO/Ai-dashboards---widgets?node-id=1167-15449&t=sh2G5Ildsy0U1Pe1-0

Figma (dialog): https://www.figma.com/design/UNEmkcMLy88EV0GU82B1EO/Ai-dashboards---widgets?node-id=1167-14073&t=sh2G5Ildsy0U1Pe1-0

## Details
- Screenset: `initialTest`
- Component name: `AddTabDialog`
- Type: screenset-specific UI component (no Redux, no effects, no API)
- Location: `src/screensets/initialTest/uikit/AddTabDialog.tsx`
- Props:
  - `isOpen: boolean`
  - `onOpenChange: (open: boolean) => void`
  - `onConfirm: (name: string) => void`

## Implementation
- Build `AddTabDialog` using only `@hai3/uikit` primitives (e.g. `Dialog`, `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogDescription`, `DialogFooter`, `Button`, `Input`, `Label`), plus allowed Tailwind utility classes.
- Dialog content should mirror the Figma dialog:
  - Title equivalent to "Add tab".
  - Short helper description explaining the user is creating a new dashboard tab.
  - Single text input for the tab name, with label equivalent to "Tab name" and placeholder similar to "Enter tab name".
  - Primary high-emphasis button labeled "Add".
  - Secondary low-emphasis button labeled "Cancel".
- The component owns only local React state for the input value and calls `onConfirm(name)` when the user clicks "Add"; the parent decides what to do with the value. No Redux access, no slices, no event bus.
- All user-visible strings (title, description, label, placeholder, buttons) must use the existing `initialTest` Overview screen-level namespace: `screen.initialTest.initialTest:*`.
- As part of this change, wire `AddTabDialog` into the `initialTest` Overview (`HomeScreen`) so that clicking the existing "Add tab" control opens the dialog and closing can happen via the close icon, Cancel button, or successful Add action.
- This change is strictly UI-only: there is no real dashboards tab array, no persistence, and no API calls; the dialog may currently just close after `onConfirm` without updating any model.

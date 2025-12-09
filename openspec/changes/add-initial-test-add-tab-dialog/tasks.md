# Tasks: Add AddTabDialog Component to initialTest Screenset

## 1. Component implementation
- [ ] 1.1 Create `src/screensets/initialTest/uikit/AddTabDialog.tsx` as a screenset-specific UI component.
- [ ] 1.2 Implement props interface with `isOpen: boolean`, `onOpenChange: (open: boolean) => void`, and `onConfirm: (name: string) => void`.
- [ ] 1.3 Implement the dialog UI using `@hai3/uikit` primitives only (Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, Button, Input, Label, etc.) plus allowed Tailwind utility classes.
- [ ] 1.4 Mirror the Figma dialog layout: title, helper description, single text input for tab name, and primary/secondary actions (Add / Cancel).
- [ ] 1.5 Manage only local React state for the input value; call `onConfirm(name)` on Add and let the parent decide what to do.

## 2. Localization
- [ ] 2.1 Add dialog-related translation keys (title, description, field label, placeholder, Add, Cancel) to `src/screensets/initialTest/screens/home/i18n/en.json` under the existing `screen.initialTest.initialTest:*` namespace.
- [ ] 2.2 Mirror these keys across all 36 language files for the `initialTest` Home screen (even if some are temporarily English-only) to maintain type safety.

## 3. Wire into Overview screen
- [ ] 3.1 Update `src/screensets/initialTest/screens/home/HomeScreen.tsx` to import and use `AddTabDialog`.
- [ ] 3.2 Make the existing "Add tab" control open the dialog by controlling `isOpen` and `onOpenChange` via local component state.
- [ ] 3.3 Implement a simple `onConfirm` handler (for now this MAY be a placeholder that just closes the dialog without updating any dashboards/tabs model).

## 4. Validation & testing
- [ ] 4.1 Run `npm run type-check`.
- [ ] 4.2 Run `npm run lint`.
- [ ] 4.3 Run `npm run arch:check`.
- [ ] 4.4 Start dev server and verify via browser that:
  - `initialTest` screenset Overview loads without errors.
  - Clicking "Add tab" opens the dialog.
  - Cancel, close icon, and Add all close the dialog as expected.
  - No console errors or architecture violations occur.

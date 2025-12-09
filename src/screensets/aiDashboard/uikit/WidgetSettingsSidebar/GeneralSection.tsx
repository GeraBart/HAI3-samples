/**
 * GeneralSectionView
 * Pure presentational component for Name, Description, and Save to catalog checkbox
 * UIKit pattern: value/onChange, no hooks, no side effects
 */

import React from 'react';
import { Input, Textarea } from '@hai3/uikit';
import { ChevronUp } from 'lucide-react';

export interface GeneralSectionViewProps {
  name: string;
  description: string;
  saveToCustomCatalog: boolean;
  /** Section header text */
  sectionTitle?: React.ReactNode;
  /** Name input placeholder */
  namePlaceholder?: string;
  /** Description input placeholder */
  descriptionPlaceholder?: string;
  /** Save to catalog label */
  saveToCatalogLabel?: React.ReactNode;
  /** Whether section is expanded */
  isExpanded?: boolean;
  /** Called when expansion state changes */
  onExpandedChange?: (expanded: boolean) => void;
  onNameChange: (name: string) => void;
  onDescriptionChange: (description: string) => void;
  onSaveToCustomCatalogChange: (save: boolean) => void;
}

/**
 * GeneralSectionView - Presentational general settings section
 * Receives all data and callbacks as props
 */
export const GeneralSectionView: React.FC<GeneralSectionViewProps> = ({
  name,
  description,
  saveToCustomCatalog,
  sectionTitle = 'General',
  namePlaceholder = 'Name',
  descriptionPlaceholder = 'Description',
  saveToCatalogLabel = 'Save to custom catalog',
  isExpanded: controlledExpanded,
  onExpandedChange,
  onNameChange,
  onDescriptionChange,
  onSaveToCustomCatalogChange,
}) => {
  const [internalExpanded, setInternalExpanded] = React.useState(true);
  const isExpanded = controlledExpanded ?? internalExpanded;

  const handleToggle = () => {
    const newValue = !isExpanded;
    setInternalExpanded(newValue);
    onExpandedChange?.(newValue);
  };

  return (
    <div className="border-b border-border">
      <button
        type="button"
        onClick={handleToggle}
        className="flex w-full items-center justify-between px-5 py-4 text-sm font-medium"
      >
        {sectionTitle}
        <ChevronUp className={`h-4 w-4 transition-transform ${isExpanded ? '' : 'rotate-180'}`} />
      </button>
      {isExpanded && (
        <div className="flex flex-col gap-4 px-5 pb-4">
          <Input
            placeholder={namePlaceholder}
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
          />
          <Textarea
            placeholder={descriptionPlaceholder}
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            rows={3}
          />
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="save-to-catalog"
              checked={saveToCustomCatalog}
              onChange={(e) => onSaveToCustomCatalogChange(e.target.checked)}
              className="h-4 w-4 rounded border-border"
            />
            <label htmlFor="save-to-catalog" className="text-sm">
              {saveToCatalogLabel}
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

GeneralSectionView.displayName = 'GeneralSectionView';

export default GeneralSectionView;

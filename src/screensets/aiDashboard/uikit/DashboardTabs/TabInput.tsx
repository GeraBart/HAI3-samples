/**
 * TabInput
 * Inline text input for tab rename/create
 */

import React, { useState, useEffect, useRef } from 'react';
import { Input } from '@hai3/uikit';

interface TabInputProps {
  initialValue: string;
  onSubmit: (value: string) => void;
  onCancel: () => void;
  placeholder?: string;
}

export const TabInput: React.FC<TabInputProps> = ({
  initialValue,
  onSubmit,
  onCancel,
  placeholder = 'Tab name',
}) => {
  const [value, setValue] = useState(initialValue);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    inputRef.current?.select();
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const trimmedValue = value.trim();
      if (trimmedValue) {
        onSubmit(trimmedValue);
      } else {
        onCancel();
      }
    } else if (e.key === 'Escape') {
      onCancel();
    }
  };

  const handleBlur = () => {
    const trimmedValue = value.trim();
    if (trimmedValue) {
      onSubmit(trimmedValue);
    } else {
      onCancel();
    }
  };

  return (
    <Input
      ref={inputRef}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
      placeholder={placeholder}
      className="h-8 w-32 text-sm font-semibold uppercase tracking-wide"
    />
  );
};

TabInput.displayName = 'TabInput';

export default TabInput;

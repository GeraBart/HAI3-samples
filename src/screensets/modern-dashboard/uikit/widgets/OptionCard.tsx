import React from 'react';
import { uikitRegistry } from '@hai3/uicore';
import { UPLOAD_ICON_ID } from '../icons/UploadIcon';
import { GRID_ICON_ID } from '../icons/GridIcon';

type OptionCardType = 'upload' | 'manual';

interface OptionCardProps {
  type: OptionCardType;
  onClick?: () => void;
}

const OPTION_CONFIG = {
  upload: {
    iconId: UPLOAD_ICON_ID,
    title: 'Drag & drop JSON files,',
    linkText: 'or browse',
    subtitle: 'to create a dashboard.',
    borderStyle: 'border-dashed',
  },
  manual: {
    iconId: GRID_ICON_ID,
    title: 'Start building your dashboard manually',
    linkText: '',
    subtitle: 'by adding a widget.',
    borderStyle: 'border-solid',
  },
};

/**
 * OptionCard - Action option card matching Figma design
 * Types: upload (dashed border), manual (solid border)
 */
export const OptionCard: React.FC<OptionCardProps> = ({ type, onClick }) => {
  const config = OPTION_CONFIG[type];

  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-4 p-4 w-full
        border ${config.borderStyle} border-[#2668C5]/30 rounded-md
        hover:border-[#2668C5] hover:shadow-md hover:bg-[#F4F7FC]/50
        transition-all duration-200
        text-left
      `}
    >
      {/* Icon Container */}
      <div className="flex items-center justify-center w-12 h-12 bg-[#ECF3FD] rounded-md shrink-0">
        {uikitRegistry.getIcon(config.iconId)}
      </div>

      {/* Text */}
      <div className="text-sm text-[#243143]">
        <span>{config.title}</span>
        {config.linkText && (
          <span className="text-[#2668C5] font-semibold"> {config.linkText}</span>
        )}
        <span> {config.subtitle}</span>
      </div>
    </button>
  );
};

OptionCard.displayName = 'OptionCard';

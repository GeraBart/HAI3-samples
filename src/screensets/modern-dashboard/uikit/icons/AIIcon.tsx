import React from 'react';

export const AI_ICON_ID = 'modernDashboard:ai';

export const AIIcon: React.FC<{ className?: string }> = ({ className = 'text-primary' }) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M16 2L19.09 8.26L26 9.27L21 14.14L22.18 21.02L16 17.77L9.82 21.02L11 14.14L6 9.27L12.91 8.26L16 2Z"
      fill="currentColor"
    />
    <path
      d="M16 22L18.5 27L24 28L20 31L21 26L16 22Z"
      fill="currentColor"
      opacity="0.6"
    />
    <path
      d="M16 22L13.5 27L8 28L12 31L11 26L16 22Z"
      fill="currentColor"
      opacity="0.6"
    />
  </svg>
);

AIIcon.displayName = 'AIIcon';

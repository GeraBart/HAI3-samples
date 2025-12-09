import React from 'react';

export const SEND_ICON_ID = 'modernDashboard:send';

export const SendIcon: React.FC<{ className?: string }> = ({ className = 'text-primary' }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M14.5 1.5L7 9M14.5 1.5L10 14.5L7 9M14.5 1.5L1.5 6L7 9"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

SendIcon.displayName = 'SendIcon';

import React from 'react';

export const GRID_ICON_ID = 'modernDashboard:grid';

export const GridIcon: React.FC = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="3" y="3" width="7" height="7" rx="1" stroke="#2668C5" strokeWidth="2" />
    <rect x="14" y="3" width="7" height="7" rx="1" stroke="#2668C5" strokeWidth="2" />
    <rect x="3" y="14" width="7" height="7" rx="1" stroke="#2668C5" strokeWidth="2" />
    <rect x="14" y="14" width="7" height="7" rx="1" stroke="#2668C5" strokeWidth="2" />
  </svg>
);

GridIcon.displayName = 'GridIcon';

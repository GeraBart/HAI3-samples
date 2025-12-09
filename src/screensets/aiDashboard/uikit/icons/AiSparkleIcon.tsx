/**
 * AiSparkleIcon
 * Gradient purple/blue sparkle icon for AI features
 */

import React from 'react';
import { AI_DASHBOARD_SCREENSET_ID } from '../../ids';

export const AI_SPARKLE_ICON_ID = `${AI_DASHBOARD_SCREENSET_ID}:aiSparkle`;

interface AiSparkleIconProps {
  size?: number;
  className?: string;
}

export const AiSparkleIcon: React.FC<AiSparkleIconProps> = ({
  size = 32,
  className = '',
}) => {
  const gradientId = `aiSparkleGradient-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient
          id={gradientId}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" className="[stop-color:hsl(var(--chart-1,262_83%_58%))]" />
          <stop offset="100%" className="[stop-color:hsl(var(--primary))]" />
        </linearGradient>
      </defs>
      <path
        d="M16 2L18.5 10.5L27 8L21 14L27 20L18.5 17.5L16 26L13.5 17.5L5 20L11 14L5 8L13.5 10.5L16 2Z"
        fill={`url(#${gradientId})`}
      />
      <path
        d="M25 3L26 6L29 5L27 7L29 9L26 8L25 11L24 8L21 9L23 7L21 5L24 6L25 3Z"
        fill={`url(#${gradientId})`}
        opacity="0.7"
      />
    </svg>
  );
};

AiSparkleIcon.displayName = 'AiSparkleIcon';

export default AiSparkleIcon;

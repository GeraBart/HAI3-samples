import React from 'react';

interface StatCardMiniProps {
  value: string;
  changePercent: number;
  label: string;
}

/**
 * StatCardMini - Compact metric card matching Figma design
 * Displays: large value, change percentage (colored), small label
 */
export const StatCardMini: React.FC<StatCardMiniProps> = ({
  value,
  changePercent,
  label,
}) => {
  const isPositive = changePercent >= 0;
  const changeColor = isPositive ? 'text-green-600' : 'text-red-600';
  const changePrefix = isPositive ? '+' : '';

  return (
    <div className="flex flex-col gap-0.5">
      <div className="flex items-baseline gap-2">
        <span className="text-lg font-semibold text-[#243143]">{value}</span>
        <span className={`text-xs ${changeColor}`}>
          {changePrefix}{changePercent}%
        </span>
      </div>
      <span className="text-xs text-[#243143]/70">{label}</span>
    </div>
  );
};

StatCardMini.displayName = 'StatCardMini';

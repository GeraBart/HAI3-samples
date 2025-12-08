/**
 * InsightItem
 * Single insight bullet point with icon and text
 */

import React from 'react';
import { AlertCircle, CheckCircle, Info } from 'lucide-react';
import type { AiInsight } from '../../../../types';

interface InsightItemProps {
  insight: AiInsight;
}

export const InsightItem: React.FC<InsightItemProps> = ({ insight }) => {
  const getIcon = () => {
    switch (insight.type) {
      case 'warning':
        return <AlertCircle className="h-4 w-4 shrink-0 text-amber-500" />;
      case 'positive':
        return <CheckCircle className="h-4 w-4 shrink-0 text-green-500" />;
      default:
        return <Info className="h-4 w-4 shrink-0 text-blue-500" />;
    }
  };

  return (
    <li className="flex items-start gap-2 text-sm text-foreground">
      {getIcon()}
      <span>{insight.text}</span>
    </li>
  );
};

InsightItem.displayName = 'InsightItem';

export default InsightItem;

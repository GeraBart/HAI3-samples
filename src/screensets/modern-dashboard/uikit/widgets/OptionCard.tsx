import React from 'react';

interface OptionCardProps {
  /** Icon element to display */
  icon: React.ReactNode;
  /** Main title text */
  title: string;
  /** Optional link text (styled as primary) */
  linkText?: string;
  /** Subtitle text */
  subtitle: string;
  /** Border style variant */
  variant?: 'dashed' | 'solid';
  /** Click handler */
  onClick?: () => void;
}

/**
 * OptionCard - Presentational action option card
 * Receives icon as prop for UIKit presentational pattern
 */
export const OptionCard: React.FC<OptionCardProps> = ({ 
  icon,
  title,
  linkText,
  subtitle,
  variant = 'solid',
  onClick,
}) => {
  const borderStyle = variant === 'dashed' ? 'border-dashed' : 'border-solid';

  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-4 p-4 w-full
        border ${borderStyle} border-primary/30 rounded-md
        hover:border-primary hover:shadow-md hover:bg-muted/50
        transition-all duration-200
        text-left
      `}
    >
      {/* Icon Container */}
      <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-md shrink-0">
        {icon}
      </div>

      {/* Text */}
      <div className="text-sm text-foreground">
        <span>{title}</span>
        {linkText && (
          <span className="text-primary font-semibold"> {linkText}</span>
        )}
        <span> {subtitle}</span>
      </div>
    </button>
  );
};

OptionCard.displayName = 'OptionCard';

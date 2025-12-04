import React from 'react';

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

/**
 * CategoryFilter - Template category tabs matching Figma design
 * Shows: "All", "Category 1", "Category 2", "Category 3" buttons
 */
export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  activeCategory,
  onCategoryChange,
}) => {
  return (
    <div className="flex items-center gap-1">
      {categories.map((category) => {
        const isActive = category === activeCategory;
        return (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`
              px-3 py-1.5 text-sm rounded-md transition-all duration-200
              ${isActive
                ? 'bg-[#2668C5] text-white shadow-sm'
                : 'bg-transparent text-[#243143] hover:bg-[#2668C5]/10 hover:text-[#2668C5]'
              }
            `}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
};

CategoryFilter.displayName = 'CategoryFilter';

import React from "react";
import { X } from "lucide-react";

interface CategoryFilterProps {
  selectedCategories: string[];
  onCategorySelect: (category: string) => void;
  onCategoryRemove: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategories,
  onCategoryRemove,
}) => {
  return (
    <div className="mb-4">
      {selectedCategories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {selectedCategories.map((category) => (
            <span
              key={category}
              className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center"
            >
              {category}
              <button
                onClick={() => onCategoryRemove(category)}
                className="ml-1 text-blue-600 hover:text-blue-800"
              >
                <X size={12} />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryFilter;

interface PopularCategoriesProps {
  selectedCategories: string[];
  onCategorySelect: (category: string) => void;
}
const categories = [
  "Running",
  "Cycling",
  "Triathlon",
  "Swimming",
  "Obstacle & Adventure",
  "Virtual Races",
];

const PopularCategories: React.FC<PopularCategoriesProps> = ({
  selectedCategories,
  onCategorySelect,
}) => {
  return (
    <div className="flex flex-wrap justify-between items-center gap-2 mb-10 w-full">
      {categories.map((category) => (
        <button
          key={category}
          className={`w-48 py-2 rounded-md transition-colors duration-200 ${
            selectedCategories.includes(category)
              ? "bg-primary text-white"
              : "bg-white text-primary border border-primary/40 hover:bg-primary/20"
          }`}
          onClick={() => onCategorySelect(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default PopularCategories;

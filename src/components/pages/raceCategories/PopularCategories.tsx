"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const categories = [
  "RUNNING",
  "CYCLING",
  "TRIATHLON",
  "SWIMMING",
  "OBSTACLE_ADVENTURE",
  "VIRTUAL_RACE",
];

const toCamelCase = (str: string) => {
  return str
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const PopularCategories = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);

    const params = new URLSearchParams(searchParams.toString());
    params.set("category", category);

    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap justify-between items-center gap-2 mb-10 w-full">
      {categories.map((category) => (
        <button
          key={category}
          className={`w-48 py-2 rounded-md transition-colors duration-200 ${
            selectedCategory === category
              ? "bg-primary text-white"
              : "bg-white text-primary border border-primary/40 hover:bg-primary/20"
          }`}
          onClick={() => handleCategoryClick(category)}
        >
          {toCamelCase(category)}
        </button>
      ))}
    </div>
  );
};

export default PopularCategories;

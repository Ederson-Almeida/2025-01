"use client";

import { useState } from "react";

const categories = [
  "Jardineiro",
  "Limpeza",
  "Babá",
  "Dog Walker",
  "Motorista",
  "Beleza / Estética",
  "Manutenção",
  "Eletricista",
  "Encanador",
  "Professor",
];

export default function Categories() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="w-full overflow-x-auto py-4">
      <div className="flex gap-2 min-w-max px-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
              ${
                selectedCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}

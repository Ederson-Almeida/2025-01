"use client";

import { useState } from "react";
import { Button } from "primereact/button";

const categories = [
  {
    label: "Jardineiro",
    icon: "pi pi-leaf",
  },
  {
    label: "Limpeza",
    icon: "pi pi-home",
  },
  {
    label: "Babá",
    icon: "pi pi-heart",
  },
  {
    label: "Dog Walker",
    icon: "pi pi-heart-fill",
  },
  {
    label: "Motorista",
    icon: "pi pi-car",
  },
  {
    label: "Beleza / Estética",
    icon: "pi pi-star",
  },
  {
    label: "Manutenção",
    icon: "pi pi-wrench",
  },
  {
    label: "Eletricista",
    icon: "pi pi-bolt",
  },
  {
    label: "Encanador",
    icon: "pi pi-cog",
  },
  {
    label: "Professor",
    icon: "pi pi-book",
  },
];

export default function Categories() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="w-full py-6 max-w-7xl mx-auto">
      <div className="relative">
        <div className="flex overflow-x-auto hide-scrollbar gap-3 px-4 pb-4 -mx-4 snap-x snap-mandatory">
          {categories.map((category) => (
            <div key={category.label} className="snap-start shrink-0">
              <Button
                icon={category.icon}
                label={category.label}
                size="large"
                severity={
                  selectedCategory === category.label ? "info" : "secondary"
                }
                outlined={selectedCategory !== category.label}
                className="whitespace-nowrap shadow-sm hover:shadow-lg transition-all rounded-lg p-2 bg-slate-200"
                onClick={() => setSelectedCategory(category.label)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";

import DashboardLayout from "@/components/DashboardLayout";

export default function Faturas() {
  return (
    <DashboardLayout>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Faturas</h1>
        <p className="text-gray-600">Visualize e gerencie suas faturas aqui.</p>
      </div>
    </DashboardLayout>
  );
}

"use client";

import DashboardLayout from "@/components/DashboardLayout";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Bem-vindo ao Dashboard
        </h1>
        <p className="text-gray-600">
          Selecione uma opção no menu lateral para começar.
        </p>
      </div>
    </DashboardLayout>
  );
}

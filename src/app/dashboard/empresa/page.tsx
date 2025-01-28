"use client";

import DashboardLayout from "@/components/DashboardLayout";

export default function MinhaEmpresa() {
  return (
    <DashboardLayout>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Minha Empresa</h1>
        <p className="text-gray-600">
          Gerencie as informações da sua empresa aqui.
        </p>
      </div>
    </DashboardLayout>
  );
}

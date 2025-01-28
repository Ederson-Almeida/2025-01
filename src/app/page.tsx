"use client";

import { useState } from "react";
import Banner from "@/components/Banner";
import Categories from "@/components/Categories";
import ProfessionalCard from "@/components/ProfessionalCard";
import AuthDialog from "@/components/AuthDialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

// Dados mockados para exemplo
const professionals = [
    {
        id: 1,
        name: "Borcelle",
        image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=400",
        category: "Jardinagem",
        description:
            "Poda planejada ou emergencial, projetos de paisagismo, e etc...",
    },
    {
        id: 2,
        name: "Go Dog",
        image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=400",
        category: "DogWallker",
        description:
            "Passeios diários, cuidados especiais e atenção total para seu pet.",
    },
    {
        id: 3,
        name: "Marlene",
        image: "https://images.unsplash.com/photo-1599577180758-69c952d78d84?q=80&w=400",
        category: "Baby Sitter",
        description:
            "Cuidados com crianças, atividades educativas e acompanhamento escolar.",
    },
    {
        id: 4,
        name: "Simpe",
        image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=400",
        category: "Limpeza",
        description:
            "Limpeza residencial e comercial, com produtos de qualidade e equipe treinada.",
    },
];

export default function Home() {
    const [authDialogVisible, setAuthDialogVisible] = useState(false);
    const [authMode, setAuthMode] = useState<"login" | "register">("login");
    const [searchTerm, setSearchTerm] = useState("");

    const showAuthDialog = (mode: "login" | "register") => {
        setAuthMode(mode);
        setAuthDialogVisible(true);
    };

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center flex-1 max-w-md">
                        <span className="p-input-icon-left w-full">
                            <i className="pi pi-search" />
                            <InputText
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Buscar profissionais..."
                                className="w-full"
                            />
                        </span>
                    </div>
                    <div className="flex gap-3 ml-4">
                        <Button
                            label="Login"
                            icon="pi pi-user"
                            text
                            onClick={() => showAuthDialog("login")}
                        />
                        <Button
                            label="Cadastrar"
                            icon="pi pi-plus-circle"
                            severity="info"
                            onClick={() => showAuthDialog("register")}
                        />
                    </div>
                </div>
            </header>

            {/* Banner */}
            <Banner />

            {/* Categories */}
            <Categories />

            {/* Professional Cards */}
            <section className="max-w-7xl mx-auto px-4 py-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    Destaque do mês
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {professionals.map((professional) => (
                        <ProfessionalCard
                            key={professional.id}
                            name={professional.name}
                            image={professional.image}
                            category={professional.category}
                            description={professional.description}
                        />
                    ))}
                </div>
            </section>

            {/* Auth Dialog */}
            <AuthDialog
                visible={authDialogVisible}
                onHide={() => setAuthDialogVisible(false)}
                mode={authMode}
            />
        </main>
    );
}

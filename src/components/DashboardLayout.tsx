"use client";

import { useState } from "react";
import { Button } from "primereact/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

interface MenuItem {
    label: string;
    icon: string;
    path: string;
}

const menuItems: MenuItem[] = [
    {
        label: "Minha Empresa",
        icon: "pi pi-building",
        path: "/dashboard/empresa",
    },
    {
        label: "Faturas",
        icon: "pi pi-file",
        path: "/dashboard/faturas",
    },
    {
        label: "Chat",
        icon: "pi pi-comments",
        path: "/dashboard/chat",
    },
];

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [sidebarVisible, setSidebarVisible] = useState(true);
    const router = useRouter();

    const handleLogout = async () => {
        try {
            const response = await fetch("/api/auth/logout", {
                method: "POST",
            });

            if (response.ok) {
                router.push("/");
            }
        } catch (error) {
            console.error("Erro ao fazer logout:", error);
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div
                className={`bg-white shadow-md w-64 flex flex-col ${
                    sidebarVisible ? "" : "hidden"
                }`}
            >
                {/* Logo */}
                <div className="p-4 border-b">
                    <Image
                        src="/logo.png"
                        alt="Logo"
                        width={150}
                        height={50}
                        className="mx-auto"
                    />
                </div>

                {/* Menu Items */}
                <nav className="flex-1 p-4">
                    <ul className="space-y-2">
                        {menuItems.map((item) => (
                            <li key={item.path}>
                                <Link
                                    href={item.path}
                                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-700 hover:text-gray-900"
                                >
                                    <i className={`${item.icon} text-xl`} />
                                    <span>{item.label}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Logout Button */}
                <div className="p-4 border-t">
                    <Button
                        icon="pi pi-sign-out"
                        label="Sair"
                        severity="danger"
                        outlined
                        className="w-full justify-start"
                        onClick={handleLogout}
                    />
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto">
                {/* Toggle Sidebar Button - Visible only on mobile */}
                <Button
                    icon={
                        sidebarVisible
                            ? "pi pi-arrow-left"
                            : "pi pi-arrow-right"
                    }
                    rounded
                    text
                    className="fixed top-4 left-4 lg:hidden z-50"
                    onClick={() => setSidebarVisible(!sidebarVisible)}
                />

                {/* Content */}
                <div className="p-4">{children}</div>
            </div>
        </div>
    );
}

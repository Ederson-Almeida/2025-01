"use client";

import Image from "next/image";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";

interface ProfessionalCardProps {
    name: string;
    image: string;
    category: string;
    description: string;
}

export default function ProfessionalCard({
    name,
    image,
    category,
    description,
}: ProfessionalCardProps) {
    const header = (
        <div className="relative h-48 w-full">
            <Image src={image} alt={name} fill style={{ objectFit: "cover" }} />
        </div>
    );

    const footer = (
        <Button
            label="Ver Perfil"
            icon="pi pi-user"
            className="w-full"
            severity="info"
        />
    );

    return (
        <Card
            title={name}
            subTitle={<Tag value={category} severity="info" />}
            header={header}
            footer={footer}
            className="hover:shadow-lg transition-shadow"
        >
            <p className="text-gray-600 text-sm line-clamp-3">{description}</p>
        </Card>
    );
}

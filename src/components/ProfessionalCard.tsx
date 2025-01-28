import Image from "next/image";

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
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 w-full">
        <Image src={image} alt={name} fill style={{ objectFit: "cover" }} />
      </div>

      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mt-2">
          {category}
        </span>
        <p className="mt-2 text-gray-600 text-sm line-clamp-3">{description}</p>

        <button className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
          Ver Perfil
        </button>
      </div>
    </div>
  );
}

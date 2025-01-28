import Banner from "@/components/Banner";
import Categories from "@/components/Categories";
import ProfessionalCard from "@/components/ProfessionalCard";

// Dados mockados para exemplo
const professionals = [
  {
    id: 1,
    name: "Borcelle",
    image:
      "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=400",
    category: "Jardinagem",
    description:
      "Poda planejada ou emergencial, projetos de paisagismo, e etc...",
  },
  {
    id: 2,
    name: "Go Dog",
    image:
      "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=400",
    category: "DogWallker",
    description:
      "Passeios diários, cuidados especiais e atenção total para seu pet.",
  },
  {
    id: 3,
    name: "Marlene",
    image:
      "https://images.unsplash.com/photo-1599577180758-69c952d78d84?q=80&w=400",
    category: "Baby Sitter",
    description:
      "Cuidados com crianças, atividades educativas e acompanhamento escolar.",
  },
  {
    id: 4,
    name: "Simpe",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=400",
    category: "Limpeza",
    description:
      "Limpeza residencial e comercial, com produtos de qualidade e equipe treinada.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Buscar"
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-4">
            <button className="px-4 py-2 text-gray-600 hover:text-gray-800">
              Login
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Cadastrar como Prestador de Serviço
            </button>
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
    </main>
  );
}

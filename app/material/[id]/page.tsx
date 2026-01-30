import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMaterialById, mockMaterials } from "@/lib/mockMaterials";
import { mockProjects } from "@/lib/mockProjects";
import UserMenu from "@/app/components/UserMenu";
import NotificationsMenu from "@/app/components/NotificationsMenu";

// Generate static params for all materials
export function generateStaticParams() {
  return mockMaterials.map((material) => ({
    id: material.id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const material = getMaterialById(id);
  if (!material) {
    return { title: "Материал не найден — вКвартирах" };
  }
  return {
    title: `${material.name} ${material.code} — ${material.manufacturer.name} — вКвартирах`,
    description: material.description,
  };
}

// Icons
function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function BriefcaseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}

function ChevronLeftIcon() {
  return (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M9 22a1 1 0 100-2 1 1 0 000 2zM20 22a1 1 0 100-2 1 1 0 000 2zM1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg width="20" height="20" fill="none" stroke="#D9614C" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M22 11.08V12a10 10 0 11-5.93-9.14" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 4L12 14.01l-3-3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WallIcon() {
  return (
    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M3 15h18M9 3v18M15 3v18" />
    </svg>
  );
}

function FloorIcon() {
  return (
    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path d="M2 22h20M4 22V10l8-6 8 6v12" />
      <path d="M9 22v-6h6v6M9 13h.01M15 13h.01" />
    </svg>
  );
}

function CeilingIcon() {
  return (
    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <rect x="2" y="4" width="20" height="4" rx="1" />
      <path d="M4 8v12M20 8v12M8 8v4M12 8v6M16 8v4" />
    </svg>
  );
}

function getTypeIcon(type: string) {
  switch (type) {
    case "wall":
      return <WallIcon />;
    case "floor":
      return <FloorIcon />;
    case "ceiling":
      return <CeilingIcon />;
    default:
      return <WallIcon />;
  }
}

function getTypeName(type: string) {
  switch (type) {
    case "wall":
      return "Для стен";
    case "floor":
      return "Для пола";
    case "ceiling":
      return "Для потолка";
    default:
      return "Материал";
  }
}

export default async function MaterialPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const material = getMaterialById(id);

  if (!material) {
    notFound();
  }

  // Get projects that could use this material (random selection for demo)
  const relatedProjects = mockProjects.slice(0, 4);

  const formatPrice = (price: number) => price.toLocaleString("ru-RU") + " ₽";

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="h-16 bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-black flex items-center justify-center rounded">
              <span className="text-white font-bold text-xs">X</span>
            </div>
            <span className="font-medium text-base tracking-tight hidden sm:inline">вКвартирах</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 ml-8 lg:ml-12">
            <Link href="/catalog" className="text-gray-700 hover:text-black transition-colors text-sm">
              Каталог
            </Link>
            <Link href="/designers" className="text-gray-700 hover:text-black transition-colors text-sm">
              Дизайнерам
            </Link>
            <Link href="/business" className="text-gray-700 hover:text-black transition-colors text-sm">
              Бизнесу
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-0.5">
          <button className="p-2 text-gray-500 hover:text-black transition-colors">
            <SearchIcon />
          </button>
          <div className="w-px h-5 bg-gray-200" />
          <NotificationsMenu />
          <div className="w-px h-5 bg-gray-200" />
          <button className="p-2 text-gray-500 hover:text-black transition-colors">
            <BriefcaseIcon />
          </button>
          <div className="w-px h-5 bg-gray-200" />
          <div className="ml-1">
            <UserMenu />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/catalog"
            className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ChevronLeftIcon />
            <span>Назад в каталог</span>
          </Link>
        </div>

        {/* Product Hero */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image */}
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-50 rounded-2xl overflow-hidden">
                <Image
                  src={material.image}
                  alt={material.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {/* Type badge */}
              <div className="absolute top-4 left-4 flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm">
                <span className="text-gray-600">{getTypeIcon(material.type)}</span>
                <span className="text-sm font-medium">{getTypeName(material.type)}</span>
              </div>
            </div>

            {/* Details */}
            <div className="flex flex-col">
              {/* Manufacturer tag */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm text-[#D9614C] font-medium">
                  {material.manufacturer.name}
                </span>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-xs text-gray-500">{material.manufacturer.country}</span>
              </div>

              {/* Name and code */}
              <h1 className="text-3xl lg:text-4xl font-medium text-gray-900 mb-2">
                «{material.name}»
              </h1>
              <p className="text-lg text-gray-500 mb-6">
                Код: {material.code}
              </p>

              {/* Price */}
              <div className="mb-6">
                <span className="text-3xl font-bold text-gray-900">
                  {formatPrice(material.price)}
                </span>
                <span className="text-gray-500 ml-2">{material.priceUnit}</span>
              </div>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed mb-8">
                {material.description}
              </p>

              {/* Actions */}
              <div className="flex gap-4 mb-8">
                <button className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-[#D9614C] text-white rounded-full hover:bg-[#c54f3d] transition-colors font-medium">
                  <CartIcon />
                  Заказать расчёт
                </button>
                <button className="p-4 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors">
                  <HeartIcon />
                </button>
              </div>

              {/* Quick specs */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-xl">
                {material.characteristics.slice(0, 4).map((char, idx) => (
                  <div key={idx}>
                    <span className="text-xs text-gray-500">{char.label}</span>
                    <p className="text-sm font-medium text-gray-900">{char.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Manufacturer Section */}
        <section className="bg-gray-50 py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-medium text-gray-900 mb-6">О производителе</h2>
            <div className="bg-white rounded-2xl p-6 lg:p-8">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden">
                  <Image
                    src={material.manufacturer.logo}
                    alt={material.manufacturer.name}
                    width={60}
                    height={60}
                    className="object-contain"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-medium text-gray-900">
                      {material.manufacturer.name}
                    </h3>
                    <span className="px-2 py-0.5 bg-gray-100 rounded text-xs text-gray-600">
                      {material.manufacturer.country}
                    </span>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {material.manufacturer.description}
                  </p>
                  <a
                    href={`https://${material.manufacturer.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-[#D9614C] hover:text-[#c54f3d] transition-colors"
                  >
                    {material.manufacturer.website}
                    <ExternalLinkIcon />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Characteristics */}
        <section className="py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-medium text-gray-900 mb-6">Характеристики</h2>
            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
              {material.characteristics.map((char, idx) => (
                <div
                  key={idx}
                  className={`flex items-center justify-between p-4 ${idx !== material.characteristics.length - 1 ? "border-b border-gray-100" : ""
                    }`}
                >
                  <span className="text-gray-600">{char.label}</span>
                  <span className="font-medium text-gray-900">{char.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Usage Conditions */}
        <section className="bg-gray-50 py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-medium text-gray-900 mb-6">Условия использования</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {material.usageConditions.map((condition, idx) => (
                <div key={idx} className="bg-white rounded-xl p-6">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      <CheckCircleIcon />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">{condition.title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {condition.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects with this material */}
        <section className="py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-medium text-gray-900 mb-6">
              Проекты с этим материалом
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {material.projectImages.map((img, idx) => (
                <Link
                  key={idx}
                  href={`/project/${relatedProjects[idx]?.id || 1}`}
                  className="group block relative aspect-[4/3] rounded-xl overflow-hidden"
                >
                  <Image
                    src={img}
                    alt={`Интерьер ${idx + 1}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-white text-sm font-medium">
                      {relatedProjects[idx]?.titleType || "Квартира"}, {relatedProjects[idx]?.area || 75} м²
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Related Materials */}
        <section className="bg-gray-50 py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-medium text-gray-900 mb-6">Другие материалы</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {mockMaterials
                .filter((m) => m.id !== material.id)
                .slice(0, 4)
                .map((m) => (
                  <Link
                    key={m.id}
                    href={`/material/${m.id}`}
                    className="group block bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow"
                  >
                    <div className="relative aspect-square">
                      <Image
                        src={m.image}
                        alt={m.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2 left-2 px-2 py-1 bg-white/90 rounded text-xs">
                        {getTypeName(m.type)}
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-gray-500 mb-1">{m.manufacturer.name}</p>
                      <h3 className="text-sm font-medium text-gray-900 mb-1 group-hover:text-[#D9614C] transition-colors">
                        «{m.name}»
                      </h3>
                      <p className="text-xs text-gray-500">{m.code}</p>
                      <p className="text-sm font-medium text-gray-900 mt-2">
                        {formatPrice(m.price)} <span className="text-xs text-gray-500 font-normal">{m.priceUnit}</span>
                      </p>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-medium text-gray-900 mb-4">
              Нужна помощь с расчётом материалов?
            </h2>
            <p className="text-gray-600 mb-8">
              Наши специалисты рассчитают необходимое количество материала для вашего проекта
            </p>
            <button className="inline-flex items-center gap-2 px-8 py-4 bg-[#D9614C] text-white rounded-full hover:bg-[#c54f3d] transition-colors text-lg">
              Заказать расчёт
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-white flex items-center justify-center rounded">
                <span className="text-black font-bold text-xs">X</span>
              </div>
              <span className="font-medium">вКвартирах</span>
            </div>
            <nav className="flex items-center gap-6 text-sm text-gray-400">
              <Link href="/catalog" className="hover:text-white transition-colors">Каталог</Link>
              <Link href="/designers" className="hover:text-white transition-colors">Дизайнерам</Link>
              <Link href="/business" className="hover:text-white transition-colors">Бизнесу</Link>
            </nav>
            <p className="text-sm text-gray-400">© 2026 вКвартирах</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

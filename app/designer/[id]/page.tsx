import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDesignerById, mockDesigners } from "@/lib/mockDesigners";
import { mockProjects } from "@/lib/mockProjects";
import UserMenu from "@/app/components/UserMenu";
import NotificationsMenu from "@/app/components/NotificationsMenu";

// Generate static params for all designers
export function generateStaticParams() {
  return mockDesigners.map((designer) => ({
    id: designer.id.toString(),
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const designer = getDesignerById(parseInt(id));
  if (!designer) {
    return { title: "Дизайнер не найден — вКвартирах" };
  }
  return {
    title: `${designer.name} — вКвартирах`,
    description: `Профиль дизайнера ${designer.name}. Смотрите проекты и работы на платформе вКвартирах.`,
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

function LocationIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill={filled ? "#F59E0B" : "none"}
      stroke={filled ? "#F59E0B" : "#D1D5DB"}
      strokeWidth="2"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function ProjectsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18" />
      <path d="M9 21V9" />
    </svg>
  );
}

function AwardIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}

export default async function DesignerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const designer = getDesignerById(parseInt(id));

  if (!designer) {
    notFound();
  }

  // Get projects by this designer
  const designerProjects = mockProjects.filter((p) => p.designerId === designer.id);

  // Calculate stats
  const totalProjects = designerProjects.length;
  const avgRating = 4.8;
  const yearsExperience = 5 + (designer.id % 8);

  // Get unique styles
  const styles = [...new Set(designerProjects.map((p) => p.style))];

  // Get unique cities
  const cities = [...new Set(designerProjects.map((p) => p.city))];

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
        {/* Hero Section with Designer Info */}
        <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-12 lg:py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              {/* Avatar */}
              <div className="relative">
                <div className="w-40 h-40 lg:w-48 lg:h-48 rounded-full overflow-hidden ring-4 ring-white shadow-xl">
                  <Image
                    src={designer.avatar}
                    alt={designer.name}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                {/* Verified badge */}
                <div className="absolute bottom-2 right-2 w-10 h-10 bg-[#D9614C] rounded-full flex items-center justify-center shadow-lg">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl lg:text-4xl font-medium text-gray-900 mb-2">
                  {designer.name}
                </h1>
                <p className="text-lg text-[#D9614C] mb-4">{designer.specialty}</p>

                {/* Rating */}
                <div className="flex items-center justify-center md:justify-start gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon key={star} filled={star <= Math.round(avgRating)} />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">{avgRating} / 5.0</span>
                </div>

                {/* Stats */}
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 mb-6">
                  <div className="flex items-center gap-2 text-gray-600">
                    <ProjectsIcon />
                    <span className="text-sm">{totalProjects} проектов</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <CalendarIcon />
                    <span className="text-sm">{yearsExperience} лет опыта</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <AwardIcon />
                    <span className="text-sm">Топ дизайнер</span>
                  </div>
                </div>

                {/* Contact button */}
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                  <a
                    href={`mailto:${designer.email}`}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#D9614C] text-white rounded-full hover:bg-[#c54f3d] transition-colors"
                  >
                    <MailIcon />
                    <span>Связаться</span>
                  </a>
                  <Link
                    href="/catalog"
                    className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-full hover:bg-white transition-colors text-gray-700"
                  >
                    Все проекты
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-12 border-b border-gray-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-medium text-gray-900 mb-6">О дизайнере</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {designer.name} — профессиональный дизайнер интерьера с опытом работы более {yearsExperience} лет.
                  Специализируется на создании функциональных и эстетичных пространств, которые отражают индивидуальность каждого клиента.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  За годы практики реализовал более {totalProjects} уникальных проектов различной сложности —
                  от компактных студий до просторных загородных домов. Каждый проект — это внимательная работа с пожеланиями заказчика
                  и стремление к идеальному результату.
                </p>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">Стили</h3>
                  <div className="flex flex-wrap gap-2">
                    {styles.map((style) => (
                      <span key={style} className="px-3 py-1.5 bg-gray-100 rounded-full text-sm text-gray-700">
                        {style}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">География проектов</h3>
                  <div className="flex flex-wrap gap-2">
                    {cities.map((city) => (
                      <span key={city} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 rounded-full text-sm text-gray-700">
                        <LocationIcon />
                        {city}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-medium text-gray-900">
                Проекты ({totalProjects})
              </h2>
            </div>

            {designerProjects.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {designerProjects.map((project) => (
                  <Link
                    key={project.id}
                    href={`/project/${project.id}`}
                    className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100"
                  >
                    {/* Image */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={project.image}
                        alt={`${project.titleType}, ${project.area} м²`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-gray-900">
                          {project.titleType}, {project.area} м²
                        </h3>
                        <span className="text-sm text-[#D9614C] font-medium">
                          {project.price.toLocaleString("ru-RU")} ₽
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <LocationIcon />
                          {project.city}
                        </span>
                        <span>{project.style}</span>
                      </div>
                      <p className="mt-3 text-sm text-gray-600 line-clamp-2">
                        {project.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-gray-50 rounded-xl">
                <p className="text-gray-500">Пока нет опубликованных проектов</p>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-medium text-gray-900 mb-4">
              Хотите заказать дизайн-проект?
            </h2>
            <p className="text-gray-600 mb-8">
              Свяжитесь с {designer.name} напрямую для обсуждения вашего проекта
            </p>
            <a
              href={`mailto:${designer.email}`}
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#D9614C] text-white rounded-full hover:bg-[#c54f3d] transition-colors text-lg"
            >
              <MailIcon />
              Написать дизайнеру
            </a>
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

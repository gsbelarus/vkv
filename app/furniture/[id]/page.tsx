import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getFurnitureById, mockFurniture } from "@/lib/mockFurniture";
import UserMenu from "@/app/components/UserMenu";
import NotificationsMenu from "@/app/components/NotificationsMenu";
import SearchBar from "@/app/components/SearchBar";

// Generate static params for all furniture items
export function generateStaticParams() {
  return mockFurniture.map((item) => ({
    id: item.id.toString(),
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = getFurnitureById(parseInt(id));
  if (!item) {
    return { title: "Товар не найден — вКвартирах" };
  }
  return {
    title: `${item.name} — ${item.brand} — вКвартирах`,
    description: item.description,
  };
}

// Icons
function BriefcaseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill={filled ? "#F59E0B" : "none"}
      stroke={filled ? "#F59E0B" : "#D1D5DB"}
      strokeWidth="2"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
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

function TruckIcon() {
  return (
    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path d="M1 3h15v13H1zM16 8h4l3 3v5h-7V8zM5.5 21a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM18.5 21a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function RefreshIcon() {
  return (
    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path d="M1 4v6h6M23 20v-6h-6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20.49 9A9 9 0 005.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 013.51 15" strokeLinecap="round" strokeLinejoin="round" />
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

export default async function FurniturePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = getFurnitureById(parseInt(id));

  if (!item) {
    notFound();
  }

  // Get similar items (same brand or random)
  const similarItems = mockFurniture
    .filter((f) => f.id !== item.id)
    .sort((a, b) => (a.brand === item.brand ? -1 : 1))
    .slice(0, 4);

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
          <SearchBar />
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

        {/* Product Section */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image */}
            <div className="relative">
              <div className="aspect-square bg-gray-50 rounded-2xl overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-contain p-8"
                  priority
                />
              </div>
              {/* Image badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <span className="px-3 py-1 bg-white rounded-full text-xs font-medium shadow-sm">
                  {item.brand}
                </span>
              </div>
            </div>

            {/* Details */}
            <div className="flex flex-col">
              {/* Brand and SKU */}
              <div className="flex items-center gap-3 mb-2">
                <span className="text-sm text-[#D9614C] font-medium uppercase tracking-wider">
                  {item.brand}
                </span>
                <span className="text-xs text-gray-400">Артикул: {item.sku}</span>
              </div>

              {/* Name */}
              <h1 className="text-3xl lg:text-4xl font-medium text-gray-900 mb-4">
                {item.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon key={i} filled={i < Math.round(item.rating)} />
                  ))}
                </div>
                <span className="text-sm text-gray-600">{item.rating} из 5</span>
                <span className="text-sm text-gray-400">• 24 отзыва</span>
              </div>

              {/* Price */}
              <div className="mb-6">
                <span className="text-3xl font-bold text-gray-900">
                  {formatPrice(item.price)}
                </span>
              </div>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed mb-8">
                {item.description}
              </p>

              {/* Actions */}
              <div className="flex gap-4 mb-8">
                <button className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-[#D9614C] text-white rounded-full hover:bg-[#c54f3d] transition-colors font-medium">
                  <CartIcon />
                  Добавить в корзину
                </button>
                <button className="p-4 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors">
                  <HeartIcon />
                </button>
              </div>

              {/* Benefits */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-100">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-2 text-gray-600">
                    <TruckIcon />
                  </div>
                  <span className="text-xs text-gray-600">Доставка 1-3 дня</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-2 text-gray-600">
                    <ShieldIcon />
                  </div>
                  <span className="text-xs text-gray-600">Гарантия 2 года</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-2 text-gray-600">
                    <RefreshIcon />
                  </div>
                  <span className="text-xs text-gray-600">Возврат 14 дней</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Specifications */}
        <section className="bg-gray-50 py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-medium text-gray-900 mb-6">Характеристики</h2>
            <div className="bg-white rounded-xl overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-4 border-b md:border-r border-gray-100">
                  <span className="text-sm text-gray-500">Бренд</span>
                  <p className="font-medium text-gray-900">{item.brand}</p>
                </div>
                <div className="p-4 border-b border-gray-100">
                  <span className="text-sm text-gray-500">Артикул</span>
                  <p className="font-medium text-gray-900">{item.sku}</p>
                </div>
                <div className="p-4 border-b md:border-r border-gray-100">
                  <span className="text-sm text-gray-500">Материал каркаса</span>
                  <p className="font-medium text-gray-900">Массив дерева</p>
                </div>
                <div className="p-4 border-b border-gray-100">
                  <span className="text-sm text-gray-500">Материал обивки</span>
                  <p className="font-medium text-gray-900">Текстиль</p>
                </div>
                <div className="p-4 md:border-r border-gray-100">
                  <span className="text-sm text-gray-500">Размеры (Ш×Г×В)</span>
                  <p className="font-medium text-gray-900">80 × 75 × 95 см</p>
                </div>
                <div className="p-4">
                  <span className="text-sm text-gray-500">Вес</span>
                  <p className="font-medium text-gray-900">18 кг</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Similar Items */}
        <section className="py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-medium text-gray-900 mb-6">Похожие товары</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {similarItems.map((similar) => (
                <Link
                  key={similar.id}
                  href={`/furniture/${similar.id}`}
                  className="group block bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow"
                >
                  <div className="relative aspect-square bg-gray-50 p-4">
                    <Image
                      src={similar.image}
                      alt={similar.name}
                      fill
                      className="object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                      {similar.brand}
                    </p>
                    <h3 className="text-sm font-medium text-gray-900 mb-2 group-hover:text-[#D9614C] transition-colors">
                      {similar.name}
                    </h3>
                    <div className="flex gap-0.5 mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                          key={i}
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill={i < Math.round(similar.rating) ? "#F59E0B" : "none"}
                          stroke={i < Math.round(similar.rating) ? "#F59E0B" : "#D1D5DB"}
                          strokeWidth="2"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {formatPrice(similar.price)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gray-50 py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-medium text-gray-900 mb-4">
              Нужна помощь с выбором?
            </h2>
            <p className="text-gray-600 mb-8">
              Наши консультанты помогут подобрать мебель под ваш интерьер
            </p>
            <button className="inline-flex items-center gap-2 px-8 py-4 bg-[#D9614C] text-white rounded-full hover:bg-[#c54f3d] transition-colors text-lg">
              Получить консультацию
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

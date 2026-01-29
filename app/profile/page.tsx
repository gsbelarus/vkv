import Image from "next/image";
import Link from "next/link";
import UserMenu from "../components/UserMenu";

export const metadata = {
  title: "Профиль — вКвартирах",
  description: "Личный кабинет пользователя",
};

// Icons
function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
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

function HeartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
    </svg>
  );
}

function LongArrowRight() {
  return (
    <svg width="60" height="12" viewBox="0 0 60 12" fill="none" stroke="currentColor" strokeWidth="1.5">
      <line x1="0" y1="6" x2="52" y2="6" />
      <polyline points="48 2 54 6 48 10" />
    </svg>
  );
}

// Mock user data
const userData = {
  name: "Александр Иванов",
  email: "alexander.ivanov@mail.ru",
  phone: "+7 (999) 123-45-67",
  avatar: "/pic/user.png",
  registeredAt: "Март 2025",
  stats: {
    favorites: 12,
    orders: 3,
    reviews: 5
  }
};

// Mock favorites
const favorites = [
  { id: 1, title: "Квартира, 85 м²", style: "Минимализм", image: "/pic/Frame 109.png", price: 125000 },
  { id: 2, title: "Квартира-студия, 42 м²", style: "Сканди", image: "/pic/Frame 110.png", price: 68000 },
  { id: 3, title: "Коттедж, 180 м²", style: "Современный", image: "/pic/Frame 111.png", price: 320000 },
];

// Mock orders
const orders = [
  { id: 1001, date: "15.01.2026", title: "Квартира, 65 м²", status: "Оплачен", price: 95000 },
  { id: 1002, date: "28.12.2025", title: "Квартира-студия, 38 м²", status: "Доставлен", price: 52000 },
];

export default function ProfilePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
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
          <button className="p-2 text-gray-500 hover:text-black transition-colors">
            <BellIcon />
          </button>
          <div className="w-px h-5 bg-gray-200" />
          <button className="p-2 text-gray-500 hover:text-black transition-colors">
            <BriefcaseIcon />
          </button>
          <div className="w-px h-5 bg-gray-200 ml-1" />
          <div className="ml-2">
            <UserMenu />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Profile Header */}
          <div className="bg-white rounded-2xl p-8 mb-8 shadow-sm">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="relative w-24 h-24 rounded-full overflow-hidden">
                <Image
                  src={userData.avatar}
                  alt={userData.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-medium text-gray-900 mb-1">{userData.name}</h1>
                <p className="text-gray-500 text-sm mb-4">На платформе с {userData.registeredAt}</p>
                <div className="flex flex-wrap gap-6">
                  <div>
                    <p className="text-2xl font-light text-[#D9614C]">{userData.stats.favorites}</p>
                    <p className="text-xs text-gray-500">В избранном</p>
                  </div>
                  <div>
                    <p className="text-2xl font-light text-[#D9614C]">{userData.stats.orders}</p>
                    <p className="text-xs text-gray-500">Заказов</p>
                  </div>
                  <div>
                    <p className="text-2xl font-light text-[#D9614C]">{userData.stats.reviews}</p>
                    <p className="text-xs text-gray-500">Отзывов</p>
                  </div>
                </div>
              </div>
              <button className="px-6 py-2.5 border border-gray-200 rounded-full text-sm hover:bg-gray-50 transition-colors flex items-center gap-2">
                <SettingsIcon />
                Настройки
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Personal Info */}
            <div className="lg:col-span-1 space-y-6">
              {/* Contact Info */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Контактные данные</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Email</p>
                    <p className="text-sm text-gray-900">{userData.email}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Телефон</p>
                    <p className="text-sm text-gray-900">{userData.phone}</p>
                  </div>
                </div>
                <button className="mt-4 text-sm text-[#D9614C] hover:text-[#c54f3d] transition-colors">
                  Редактировать
                </button>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Быстрые действия</h2>
                <div className="space-y-2">
                  <Link
                    href="/catalog"
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-10 h-10 bg-[#D9614C]/10 rounded-full flex items-center justify-center text-[#D9614C]">
                      <SearchIcon />
                    </div>
                    <span className="text-sm text-gray-700">Найти проект</span>
                  </Link>
                  <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className="w-10 h-10 bg-[#D9614C]/10 rounded-full flex items-center justify-center text-[#D9614C]">
                      <HeartIcon />
                    </div>
                    <span className="text-sm text-gray-700">Избранное</span>
                  </button>
                  <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className="w-10 h-10 bg-[#D9614C]/10 rounded-full flex items-center justify-center text-[#D9614C]">
                      <CartIcon />
                    </div>
                    <span className="text-sm text-gray-700">Корзина</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column - Favorites & Orders */}
            <div className="lg:col-span-2 space-y-6">
              {/* Favorites */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium text-gray-900">Избранные проекты</h2>
                  <Link href="/catalog" className="text-sm text-[#D9614C] hover:text-[#c54f3d] transition-colors">
                    Смотреть все
                  </Link>
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                  {favorites.map((item) => (
                    <Link
                      key={item.id}
                      href={`/project/${item.id}`}
                      className="group"
                    >
                      <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-2">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <p className="text-sm font-medium text-gray-900">{item.title}</p>
                      <p className="text-xs text-gray-500">{item.style}</p>
                      <p className="text-sm text-[#D9614C] mt-1">{item.price.toLocaleString("ru-RU")} ₽</p>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Orders */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium text-gray-900">Мои заказы</h2>
                  <button className="text-sm text-[#D9614C] hover:text-[#c54f3d] transition-colors">
                    История заказов
                  </button>
                </div>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                    >
                      <div>
                        <p className="text-sm font-medium text-gray-900">Заказ #{order.id}</p>
                        <p className="text-xs text-gray-500">{order.date} · {order.title}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">{order.price.toLocaleString("ru-RU")} ₽</p>
                        <p className={`text-xs ${order.status === "Оплачен" ? "text-amber-600" : "text-green-600"}`}>
                          {order.status}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-[#D9614C] rounded-2xl p-6 text-white">
                <h2 className="text-lg font-medium mb-2">Персональные рекомендации</h2>
                <p className="text-white/80 text-sm mb-4">
                  На основе ваших предпочтений мы подобрали проекты, которые могут вам понравиться
                </p>
                <Link
                  href="/catalog"
                  className="inline-flex items-center gap-2 bg-white text-[#D9614C] px-6 py-2.5 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors"
                >
                  Посмотреть подборку
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="h-[20vh] flex bg-white mt-8">
        <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-8">
          <nav className="flex flex-col gap-2 sm:gap-3">
            <Link href="/catalog" className="text-gray-500 font-semibold text-lg sm:text-xl hover:text-gray-700 transition-colors">
              Каталог
            </Link>
            <Link href="/designers" className="text-gray-500 font-semibold text-lg sm:text-xl hover:text-gray-700 transition-colors">
              Дизайнерам
            </Link>
            <Link href="/business" className="text-gray-500 font-semibold text-lg sm:text-xl hover:text-gray-700 transition-colors">
              Бизнесу
            </Link>
          </nav>
        </div>
        <div className="w-[45%] sm:w-[35%] lg:w-[18.5%] bg-[#D9614C] rounded-tl-[20px] rounded-bl-[20px] flex flex-col justify-center px-4 sm:px-6 lg:px-8 text-white">
          <p className="text-sm sm:text-base lg:text-lg font-medium leading-snug mb-3 sm:mb-4">
            Смотреть<br />каталог
          </p>
          <LongArrowRight />
        </div>
      </footer>
    </div>
  );
}

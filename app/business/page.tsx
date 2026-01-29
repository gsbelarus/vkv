import Image from "next/image";
import Link from "next/link";
import UserMenu from "../components/UserMenu";

export const metadata = {
  title: "Бизнесу — вКвартирах",
  description: "Партнёрство для поставщиков мебели, строительных материалов и застройщиков",
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

function ArrowRightIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14M12 5l7 7-7 7" />
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

function BuildingIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#D9614C" strokeWidth="1.5">
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <path d="M9 22v-4h6v4M9 6h.01M15 6h.01M9 10h.01M15 10h.01M9 14h.01M15 14h.01" />
    </svg>
  );
}

function FurnitureIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#D9614C" strokeWidth="1.5">
      <path d="M20 9V6a2 2 0 00-2-2H6a2 2 0 00-2 2v3" />
      <path d="M2 11a2 2 0 012-2h16a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2v-6z" />
      <path d="M4 19v2M20 19v2" />
    </svg>
  );
}

function MaterialsIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#D9614C" strokeWidth="1.5">
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <path d="M2 10h20M6 14h4" />
    </svg>
  );
}

function ToolsIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#D9614C" strokeWidth="1.5">
      <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
    </svg>
  );
}

const partnerTypes = [
  {
    icon: <FurnitureIcon />,
    title: "Производители мебели",
    description: "Размещайте свою продукцию в каталоге мебели и техники. Клиенты видят вашу мебель в контексте реальных интерьеров и могут купить в один клик."
  },
  {
    icon: <MaterialsIcon />,
    title: "Поставщики материалов",
    description: "Интегрируйте отделочные материалы в систему кастомизации проектов. Покупатели выбирают ваши краски, ламинат и обои при настройке дизайна."
  },
  {
    icon: <BuildingIcon />,
    title: "Застройщики",
    description: "Предлагайте готовые дизайн-решения покупателям квартир в новостройках. Увеличивайте средний чек и лояльность клиентов."
  },
  {
    icon: <ToolsIcon />,
    title: "Строительные компании",
    description: "Получайте заказы на реализацию дизайн-проектов. Клиенты приходят с готовым проектом и бюджетом — вам остаётся только реализовать."
  }
];

const benefits = [
  { value: "50K+", label: "Целевых посетителей в месяц" },
  { value: "85%", label: "Конверсия в заявку" },
  { value: "₽2.5M", label: "Средний чек проекта" },
  { value: "48ч", label: "Запуск интеграции" }
];

export default function BusinessPage() {
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
            <Link href="/business" className="text-[#D9614C] text-sm">
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
          <div className="w-px h-5 bg-gray-200" />
          <div className="ml-1">
            <UserMenu />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[60vh] overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/pic/Frame 115.png"
              alt="Бизнес партнёрство"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-gray-900/40" />
          </div>
          <div className="relative z-10 h-full flex flex-col justify-center px-8 lg:px-16 max-w-4xl">
            <p className="text-[#D9614C] text-sm font-medium tracking-wider uppercase mb-4">
              B2B партнёрство
            </p>
            <h1 className="text-4xl lg:text-6xl font-light text-white leading-tight mb-6">
              Развивайте бизнес<br />вместе с нами
            </h1>
            <p className="text-gray-300 text-lg lg:text-xl max-w-xl mb-8">
              Интегрируйте ваши продукты и услуги в экосистему дизайн-проектов.
              Получайте целевых клиентов без затрат на привлечение.
            </p>
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 bg-[#D9614C] hover:bg-[#c54f3d] text-white px-8 py-4 rounded-full text-sm font-medium transition-colors w-fit"
            >
              Обсудить сотрудничество
              <ArrowRightIcon />
            </Link>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 px-8 lg:px-16 bg-gray-50">
          <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((item, idx) => (
              <div key={idx} className="text-center">
                <p className="text-4xl lg:text-5xl font-light text-[#D9614C] mb-2">{item.value}</p>
                <p className="text-gray-600 text-sm">{item.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Partner Types */}
        <section className="py-20 px-8 lg:px-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-light text-gray-900 mb-4 text-center">
              Кому подходит партнёрство
            </h2>
            <p className="text-gray-500 text-center mb-16 max-w-2xl mx-auto">
              Мы работаем со всеми участниками рынка интерьерного дизайна —
              от производителей мебели до застройщиков
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              {partnerTypes.map((partner, idx) => (
                <div
                  key={idx}
                  className="p-8 border border-gray-200 rounded-2xl hover:border-[#D9614C]/30 hover:shadow-lg transition-all"
                >
                  <div className="mb-4">{partner.icon}</div>
                  <h3 className="text-xl font-medium text-gray-900 mb-3">{partner.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{partner.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Integration Options */}
        <section className="py-20 px-8 lg:px-16 bg-gray-900 text-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-light mb-16 text-center">
              Варианты интеграции
            </h2>
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="p-8 bg-white/5 rounded-2xl border border-white/10">
                <p className="text-[#D9614C] text-sm font-medium mb-4">Базовый</p>
                <h3 className="text-2xl font-medium mb-4">Каталог товаров</h3>
                <p className="text-gray-400 mb-6">
                  Размещение товаров в каталоге мебели и материалов с прямыми ссылками на ваш сайт
                </p>
                <ul className="space-y-3 text-sm text-gray-300">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#D9614C] rounded-full" />
                    До 100 позиций
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#D9614C] rounded-full" />
                    Брендинг карточек
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#D9614C] rounded-full" />
                    Статистика переходов
                  </li>
                </ul>
              </div>
              <div className="p-8 bg-[#D9614C] rounded-2xl relative">
                <span className="absolute top-4 right-4 text-xs bg-white/20 px-3 py-1 rounded-full">
                  Популярный
                </span>
                <p className="text-white/70 text-sm font-medium mb-4">Продвинутый</p>
                <h3 className="text-2xl font-medium mb-4">Интеграция в проекты</h3>
                <p className="text-white/80 mb-6">
                  Ваши материалы и мебель в системе кастомизации дизайн-проектов
                </p>
                <ul className="space-y-3 text-sm text-white/90">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-white rounded-full" />
                    Неограниченные позиции
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-white rounded-full" />
                    API интеграция
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-white rounded-full" />
                    Комиссия с продаж
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-white rounded-full" />
                    Персональный менеджер
                  </li>
                </ul>
              </div>
              <div className="p-8 bg-white/5 rounded-2xl border border-white/10">
                <p className="text-[#D9614C] text-sm font-medium mb-4">Премиум</p>
                <h3 className="text-2xl font-medium mb-4">White Label</h3>
                <p className="text-gray-400 mb-6">
                  Полная интеграция платформы в ваш бизнес-процесс под вашим брендом
                </p>
                <ul className="space-y-3 text-sm text-gray-300">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#D9614C] rounded-full" />
                    Кастомный дизайн
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#D9614C] rounded-full" />
                    Выделенный сервер
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#D9614C] rounded-full" />
                    SLA 99.9%
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#D9614C] rounded-full" />
                    Техподдержка 24/7
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Clients */}
        <section className="py-20 px-8 lg:px-16">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-light text-gray-900 mb-4">
              Нам доверяют
            </h2>
            <p className="text-gray-500 mb-12">
              Более 50 компаний уже сотрудничают с платформой
            </p>
            <div className="flex flex-wrap justify-center items-center gap-12 opacity-50">
              {["IKEA", "Леруа Мерлен", "Hoff", "ПИК", "Самолёт", "А101"].map((brand, idx) => (
                <span key={idx} className="text-2xl font-light text-gray-400">
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section id="contact" className="py-20 px-8 lg:px-16 bg-gray-50">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-light text-gray-900 mb-4 text-center">
              Оставить заявку
            </h2>
            <p className="text-gray-500 text-center mb-12">
              Заполните форму, и наш менеджер свяжется с вами в течение рабочего дня
            </p>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Название компании"
                  className="w-full px-6 py-4 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#D9614C] transition-colors"
                />
                <input
                  type="text"
                  placeholder="Контактное лицо"
                  className="w-full px-6 py-4 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#D9614C] transition-colors"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-6 py-4 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#D9614C] transition-colors"
                />
                <input
                  type="tel"
                  placeholder="Телефон"
                  className="w-full px-6 py-4 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#D9614C] transition-colors"
                />
              </div>
              <select
                className="w-full px-6 py-4 border border-gray-200 rounded-xl text-sm text-gray-500 focus:outline-none focus:border-[#D9614C] transition-colors appearance-none bg-white"
              >
                <option value="">Тип партнёрства</option>
                <option value="furniture">Производитель мебели</option>
                <option value="materials">Поставщик материалов</option>
                <option value="developer">Застройщик</option>
                <option value="construction">Строительная компания</option>
                <option value="other">Другое</option>
              </select>
              <textarea
                placeholder="Расскажите о вашей компании и целях сотрудничества"
                rows={4}
                className="w-full px-6 py-4 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#D9614C] transition-colors resize-none"
              />
              <button
                type="submit"
                className="w-full py-4 bg-[#D9614C] hover:bg-[#c54f3d] text-white rounded-full text-sm font-medium transition-colors"
              >
                Отправить заявку
              </button>
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="h-[20vh] flex">
        <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-8">
          <nav className="flex flex-col gap-2 sm:gap-3">
            <Link href="/catalog" className="text-gray-500 font-semibold text-lg sm:text-xl hover:text-gray-700 transition-colors">
              Каталог
            </Link>
            <Link href="/designers" className="text-gray-500 font-semibold text-lg sm:text-xl hover:text-gray-700 transition-colors">
              Дизайнерам
            </Link>
            <Link href="/business" className="text-[#D9614C] font-semibold text-lg sm:text-xl">
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

import Image from "next/image";
import Link from "next/link";
import UserMenu from "../components/UserMenu";

export const metadata = {
  title: "Дизайнерам — вКвартирах",
  description: "Присоединяйтесь к платформе вКвартирах и продавайте свои дизайн-проекты",
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

function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D9614C" strokeWidth="2.5">
      <polyline points="20 6 9 17 4 12" />
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

export default function DesignersPage() {
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
            <Link href="/designers" className="text-[#D9614C] text-sm">
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
              src="/pic/Frame 110.png"
              alt="Дизайн интерьера"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
          </div>
          <div className="relative z-10 h-full flex flex-col justify-center px-8 lg:px-16 max-w-4xl">
            <p className="text-[#D9614C] text-sm font-medium tracking-wider uppercase mb-4">
              Для дизайнеров интерьера
            </p>
            <h1 className="text-4xl lg:text-6xl font-light text-white leading-tight mb-6">
              Монетизируйте<br />свои проекты
            </h1>
            <p className="text-gray-300 text-lg lg:text-xl max-w-xl mb-8">
              Присоединяйтесь к крупнейшей платформе дизайн-проектов
              и получайте пассивный доход от каждой продажи
            </p>
            <Link
              href="#join"
              className="inline-flex items-center gap-2 bg-[#D9614C] hover:bg-[#c54f3d] text-white px-8 py-4 rounded-full text-sm font-medium transition-colors w-fit"
            >
              Стать партнёром
              <ArrowRightIcon />
            </Link>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-8 lg:px-16 bg-gray-50">
          <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-4xl lg:text-5xl font-light text-[#D9614C] mb-2">500+</p>
              <p className="text-gray-600 text-sm">Проектов в каталоге</p>
            </div>
            <div className="text-center">
              <p className="text-4xl lg:text-5xl font-light text-[#D9614C] mb-2">120</p>
              <p className="text-gray-600 text-sm">Дизайнеров-партнёров</p>
            </div>
            <div className="text-center">
              <p className="text-4xl lg:text-5xl font-light text-[#D9614C] mb-2">70%</p>
              <p className="text-gray-600 text-sm">Комиссия дизайнеру</p>
            </div>
            <div className="text-center">
              <p className="text-4xl lg:text-5xl font-light text-[#D9614C] mb-2">24ч</p>
              <p className="text-gray-600 text-sm">Модерация проекта</p>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 px-8 lg:px-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-light text-gray-900 mb-12 text-center">
              Почему дизайнеры выбирают нас
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Пассивный доход",
                  description: "Загрузите проект один раз и получайте доход с каждой продажи без дополнительных усилий"
                },
                {
                  title: "Широкая аудитория",
                  description: "Более 50 000 потенциальных клиентов ежемесячно просматривают каталог"
                },
                {
                  title: "Простая загрузка",
                  description: "Интуитивный интерфейс для загрузки проектов — от идеи до публикации за 30 минут"
                },
                {
                  title: "Персональный менеджер",
                  description: "Поддержка на каждом этапе: от регистрации до первой продажи"
                },
                {
                  title: "Аналитика продаж",
                  description: "Детальная статистика по просмотрам, добавлениям в избранное и покупкам"
                },
                {
                  title: "Быстрые выплаты",
                  description: "Вывод средств на карту или расчётный счёт в течение 3 рабочих дней"
                }
              ].map((benefit, idx) => (
                <div key={idx} className="p-6 bg-gray-50 rounded-2xl">
                  <div className="flex items-start gap-3 mb-3">
                    <CheckIcon />
                    <h3 className="text-lg font-medium text-gray-900">{benefit.title}</h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed pl-8">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 px-8 lg:px-16 bg-gray-900 text-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-light mb-16 text-center">
              Как начать сотрудничество
            </h2>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { step: "01", title: "Регистрация", desc: "Заполните анкету и загрузите портфолио" },
                { step: "02", title: "Модерация", desc: "Наши эксперты проверят ваши работы" },
                { step: "03", title: "Загрузка", desc: "Добавьте проекты через личный кабинет" },
                { step: "04", title: "Продажи", desc: "Получайте доход с каждой сделки" }
              ].map((item, idx) => (
                <div key={idx} className="text-center">
                  <p className="text-5xl font-light text-[#D9614C] mb-4">{item.step}</p>
                  <h3 className="text-lg font-medium mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Requirements */}
        <section className="py-20 px-8 lg:px-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-light text-gray-900 mb-12 text-center">
              Требования к проектам
            </h2>
            <div className="space-y-4">
              {[
                "Полный комплект визуализаций (минимум 5 ракурсов)",
                "Планировочное решение с расстановкой мебели",
                "Спецификация материалов и отделки",
                "Оригинальный авторский дизайн",
                "Реализованный или готовый к реализации проект"
              ].map((req, idx) => (
                <div key={idx} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-8 h-8 rounded-full bg-[#D9614C]/10 flex items-center justify-center flex-shrink-0">
                    <CheckIcon />
                  </div>
                  <p className="text-gray-700">{req}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="join" className="py-20 px-8 lg:px-16 bg-[#D9614C]">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl lg:text-4xl font-light mb-6">
              Готовы начать?
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
              Оставьте заявку, и мы свяжемся с вами в течение 24 часов
              для обсуждения условий сотрудничества
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Ваш email"
                className="flex-1 px-6 py-4 rounded-full text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-gray-900 hover:bg-gray-800 text-white rounded-full text-sm font-medium transition-colors"
              >
                Отправить
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
            <Link href="/designers" className="text-[#D9614C] font-semibold text-lg sm:text-xl">
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

import Image from "next/image";

export default function HeroVisualStrip() {
  return (
    <div className="px-8 pb-6 pt-4">
      {/* Title */}
      <h1 className="text-xl font-bold text-gray-900 mb-4">
        Выберите из 500+ проектов
      </h1>

      {/* Visual strip - 3 images */}
      <div className="relative flex h-[140px] overflow-hidden rounded-lg">
        {/* Image 1 */}
        <div className="relative w-1/3">
          <Image
            src="/pic/home_page_1.png"
            alt="Интерьер"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 33vw, 25vw"
          />
          <div className="absolute top-4 left-4 right-2">
            <p className="text-white text-base sm:text-lg leading-snug font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              Найти проект за 5 минут<br />под любую площадь
            </p>
          </div>
          <div className="absolute bottom-4 left-4">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </div>
          </div>
        </div>

        {/* Image 2 */}
        <div className="relative w-1/3">
          <Image
            src="/pic/home_page_2.png"
            alt="Интерьер"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 33vw, 25vw"
          />
        </div>

        {/* Image 3 */}
        <div className="relative w-1/3">
          <Image
            src="/pic/home_page_3.png"
            alt="Интерьер"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 33vw, 25vw"
          />
          <div className="absolute top-4 left-4 right-2">
            <p className="text-white text-base sm:text-lg leading-snug font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              Первый концепт-план —<br />бесплатно
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

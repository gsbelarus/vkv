import Image from "next/image";

export default function HeroVisual() {
  return (
    <div className="relative w-full lg:w-[63%] flex-shrink-0">
      {/* Image composition container - 3 images horizontally */}
      <div className="relative flex h-[calc(80vh-64px)] overflow-hidden rounded-br-[40px]">
        {/* Image 1 */}
        <div className="relative w-1/3">
          <Image
            src="/pic/home_page_1.png"
            alt="Интерьер гостиной"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 33vw, 21vw"
          />
          {/* Value proposition overlay */}
          <div className="absolute bottom-8 left-4 right-2">
            <p className="text-white text-base sm:text-lg leading-snug font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              Найти проект за 5 минут<br />под любую площадь
            </p>
          </div>
        </div>

        {/* Image 2 */}
        <div className="relative w-1/3">
          <Image
            src="/pic/home_page_2.png"
            alt="Уютная гостиная"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 33vw, 21vw"
          />
          {/* Value proposition overlay */}
          <div className="absolute bottom-8 left-4 right-2">
            <p className="text-white text-base sm:text-lg leading-snug font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              Кастомизация за 24 часа<br />Технические чертежи
            </p>
          </div>
        </div>

        {/* Image 3 */}
        <div className="relative w-1/3">
          <Image
            src="/pic/home_page_3.png"
            alt="Современный интерьер"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 33vw, 21vw"
          />
          {/* Value proposition overlay */}
          <div className="absolute top-6 left-4 right-2">
            <p className="text-white text-base sm:text-lg leading-snug font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              Первый концепт-план —<br />бесплатно
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

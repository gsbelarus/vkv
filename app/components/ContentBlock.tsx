import SocialIcons from "./SocialIcons";

function PlayArrow() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  );
}

export default function ContentBlock() {
  return (
    <div className="hidden lg:flex flex-1 h-[calc(80vh-64px)]">
      {/* First Column */}
      <div className="w-1/2 flex flex-col justify-between py-6 xl:py-8 px-4 xl:px-6 border-r border-gray-200">
        <div>
          {/* Accent Year */}
          <p className="text-5xl xl:text-7xl font-light text-[#D9614C] tracking-tight mb-4 xl:mb-6">
            2026
          </p>

          {/* Heading */}
          <h1 className="text-2xl xl:text-4xl font-normal text-gray-900 leading-tight mb-2 xl:mb-3">
            Каталог<br />интерьеров
          </h1>

          {/* Subtitle */}
          <p className="text-gray-500 text-sm xl:text-base">
            Дизайн-проект вашей<br />квартиры
          </p>
        </div>

        {/* Social Icons */}
        <SocialIcons />
      </div>

      {/* Second Column */}
      <div className="w-1/2 flex flex-row items-center justify-center gap-3 px-2">
        {/* "Подробнее" text */}
        <span
          className="text-xs xl:text-sm font-medium text-gray-800 whitespace-nowrap"
          style={{
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)'
          }}
        >
          Подробнее
        </span>

        {/* Arrow */}
        <PlayArrow />

        {/* "ИНТЕРЬЕРЫ" large text */}
        <span
          className="text-[#D9614C]/20 font-bold whitespace-nowrap"
          style={{
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)',
            fontSize: 'clamp(40px, 8vh, 80px)',
            letterSpacing: '0.05em',
            lineHeight: 1
          }}
        >
          ИНТЕРЬЕРЫ
        </span>
      </div>
    </div>
  );
}

import Link from "next/link";

function LongArrowRight() {
  return (
    <svg width="60" height="12" viewBox="0 0 60 12" fill="none" stroke="currentColor" strokeWidth="1.5">
      <line x1="0" y1="6" x2="52" y2="6" />
      <polyline points="48 2 54 6 48 10" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="h-[20vh] flex">
      {/* Left Section - Navigation */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-8">
        <nav className="flex flex-col gap-2 sm:gap-3">
          <Link
            href="/catalog"
            className="text-gray-500 font-semibold text-lg sm:text-xl hover:text-gray-700 transition-colors"
          >
            Каталог
          </Link>
          <Link
            href="/designers"
            className="text-gray-500 font-semibold text-lg sm:text-xl hover:text-gray-700 transition-colors"
          >
            Дизайнерам
          </Link>
          <Link
            href="/business"
            className="text-gray-500 font-semibold text-lg sm:text-xl hover:text-gray-700 transition-colors"
          >
            Бизнесу
          </Link>
        </nav>
      </div>

      {/* Right Section - CTA Block */}
      <div
        className="w-[45%] sm:w-[35%] lg:w-[18.5%] bg-[#D9614C] rounded-tl-[20px] rounded-bl-[20px] flex flex-col justify-center px-4 sm:px-6 lg:px-8 text-white"
      >
        <p className="text-sm sm:text-base lg:text-lg font-medium leading-snug mb-3 sm:mb-4">
          Узнайте, что сейчас<br />в моде
        </p>
        <LongArrowRight />
      </div>
    </footer>
  );
}

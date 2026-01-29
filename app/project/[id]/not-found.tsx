import Link from "next/link";

export default function ProjectNotFound() {
  return (
    <div className="min-h-dvh flex items-center justify-center bg-gray-50">
      <div className="text-center px-6">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            width="32"
            height="32"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            className="text-gray-400"
          >
            <path
              d="M3 7v4a1 1 0 001 1h3m10-5v4a1 1 0 01-1 1h-3m-4-5v4m4 4v4a1 1 0 01-1 1H9a1 1 0 01-1-1v-4m0 0h4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-medium text-gray-900 mb-2">
          Проект не найден
        </h1>
        <p className="text-gray-500 mb-8 max-w-sm mx-auto">
          К сожалению, запрошенный проект не существует или был удалён из каталога.
        </p>
        <Link
          href="/catalog"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#D9614C] hover:bg-[#c54f3d] text-white rounded-full text-sm font-medium transition-colors"
        >
          <svg
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Вернуться в каталог
        </Link>
      </div>
    </div>
  );
}

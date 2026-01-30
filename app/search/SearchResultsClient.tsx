"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import UserMenu from "@/app/components/UserMenu";
import NotificationsMenu from "@/app/components/NotificationsMenu";
import SearchBar from "@/app/components/SearchBar";
import {
  performSearch,
  SearchResult,
  SearchResultType,
  getTypeLabel,
  getTypeColor,
} from "@/lib/search";

function BriefcaseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}

function ProjectIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M9 21V9" />
    </svg>
  );
}

function DesignerIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function FurnitureIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3" />
      <path d="M2 11v5a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H6v-2a2 2 0 0 0-4 0Z" />
      <path d="M4 18v2M20 18v2" />
    </svg>
  );
}

function MaterialIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M3 15h18M9 3v18M15 3v18" />
    </svg>
  );
}

function getTypeIcon(type: SearchResultType) {
  switch (type) {
    case "project":
      return <ProjectIcon />;
    case "designer":
      return <DesignerIcon />;
    case "furniture":
      return <FurnitureIcon />;
    case "material":
      return <MaterialIcon />;
  }
}

// Component to highlight matched text
function HighlightedText({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>;

  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className="bg-yellow-200 text-gray-900 px-0.5 rounded">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

const filterOptions: { value: SearchResultType | "all"; label: string }[] = [
  { value: "all", label: "Все" },
  { value: "project", label: "Проекты" },
  { value: "designer", label: "Дизайнеры" },
  { value: "furniture", label: "Мебель" },
  { value: "material", label: "Материалы" },
];

export default function SearchResultsClient() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [filter, setFilter] = useState<SearchResultType | "all">("all");

  const results = useMemo(() => performSearch(query), [query]);

  const filteredResults = useMemo(() => {
    if (filter === "all") return results;
    return results.filter((r) => r.type === filter);
  }, [results, filter]);

  // Count by type
  const counts = useMemo(() => {
    const c: Record<SearchResultType | "all", number> = {
      all: results.length,
      project: 0,
      designer: 0,
      furniture: 0,
      material: 0,
    };
    results.forEach((r) => c[r.type]++);
    return c;
  }, [results]);

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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Search Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-medium text-gray-900 mb-2">
              Результаты поиска
            </h1>
            {query ? (
              <p className="text-gray-600">
                По запросу «<span className="font-medium text-gray-900">{query}</span>»
                {filteredResults.length > 0 ? (
                  <> найдено {filteredResults.length} {getResultWord(filteredResults.length)}</>
                ) : (
                  <> ничего не найдено</>
                )}
              </p>
            ) : (
              <p className="text-gray-600">Введите запрос для поиска</p>
            )}
          </div>

          {/* Filters */}
          {results.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {filterOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setFilter(opt.value)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === opt.value
                      ? "bg-[#D9614C] text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                    }`}
                >
                  {opt.label}
                  {counts[opt.value] > 0 && (
                    <span className={`ml-1.5 ${filter === opt.value ? "text-white/80" : "text-gray-400"}`}>
                      {counts[opt.value]}
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}

          {/* Results List */}
          {filteredResults.length > 0 ? (
            <div className="space-y-4">
              {filteredResults.map((result) => (
                <Link
                  key={result.id}
                  href={result.url}
                  className="flex gap-4 p-4 bg-white rounded-xl border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all group"
                >
                  {/* Image */}
                  <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                    <Image
                      src={result.image}
                      alt={result.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${getTypeColor(result.type)}`}>
                        {getTypeIcon(result.type)}
                        {getTypeLabel(result.type)}
                      </span>
                      <span className="text-xs text-gray-400">
                        найдено в поле «{result.matchField}»
                      </span>
                    </div>

                    <h3 className="font-medium text-gray-900 mb-1 group-hover:text-[#D9614C] transition-colors">
                      <HighlightedText text={result.title} query={query} />
                    </h3>

                    <p className="text-sm text-gray-500 mb-2">
                      <HighlightedText text={result.subtitle} query={query} />
                    </p>

                    <p className="text-sm text-gray-600 line-clamp-2">
                      <HighlightedText text={result.matchedText} query={query} />
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : query ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Ничего не найдено</h3>
              <p className="text-gray-600 mb-6">
                Попробуйте изменить запрос или поискать что-то другое
              </p>
              <Link
                href="/catalog"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#D9614C] text-white rounded-full hover:bg-[#c54f3d] transition-colors"
              >
                Перейти в каталог
              </Link>
            </div>
          ) : null}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-auto">
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

function getResultWord(count: number): string {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return "результатов";
  }
  if (lastDigit === 1) {
    return "результат";
  }
  if (lastDigit >= 2 && lastDigit <= 4) {
    return "результата";
  }
  return "результатов";
}

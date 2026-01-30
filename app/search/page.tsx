import { Suspense } from "react";
import SearchResultsClient from "./SearchResultsClient";

export const metadata = {
  title: "Результаты поиска — вКвартирах",
  description: "Поиск по каталогу дизайн-проектов, дизайнерам, мебели и материалам",
};

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchLoading />}>
      <SearchResultsClient />
    </Suspense>
  );
}

function SearchLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-[#D9614C] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-600">Загрузка...</p>
      </div>
    </div>
  );
}

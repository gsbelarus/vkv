"use client";

import { useState, useMemo } from "react";
import { mockProjects } from "@/lib/mockProjects";
import {
  FilterState,
  SortOption,
  defaultFilters,
  filterProjects,
  sortProjects,
} from "@/lib/filtering";
import SidebarFilters from "./components/SidebarFilters";
import TopHeaderStrip from "./components/TopHeaderStrip";
import HeroVisualStrip from "./components/HeroVisualStrip";
import ActiveFilterChips from "./components/ActiveFilterChips";
import SortDropdown from "./components/SortDropdown";
import CatalogGrid from "./components/CatalogGrid";

export default function CatalogPageClient() {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [sortBy, setSortBy] = useState<SortOption>("price-asc");

  const filteredProjects = useMemo(() => {
    const filtered = filterProjects(mockProjects, filters);
    return sortProjects(filtered, sortBy);
  }, [filters, sortBy]);

  const handleRemoveFilter = (key: keyof FilterState, value?: string | number) => {
    if (key === "priceMin" || key === "priceMax") {
      setFilters((prev) => ({
        ...prev,
        priceMin: defaultFilters.priceMin,
        priceMax: defaultFilters.priceMax,
      }));
    } else if (key === "titleTypes" && typeof value === "string") {
      setFilters((prev) => ({
        ...prev,
        titleTypes: prev.titleTypes.filter(t => t !== value),
      }));
    } else if (key === "rooms" && typeof value === "number") {
      setFilters((prev) => ({
        ...prev,
        rooms: prev.rooms.filter(r => r !== value),
      }));
    } else if (key === "styles" && typeof value === "string") {
      setFilters((prev) => ({
        ...prev,
        styles: prev.styles.filter(s => s !== value),
      }));
    } else if (key === "designers" && typeof value === "string") {
      setFilters((prev) => ({
        ...prev,
        designers: prev.designers.filter(d => d !== value),
      }));
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <SidebarFilters filters={filters} onFiltersChange={setFilters} />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top white section - fixed */}
        <div className="flex-shrink-0 bg-white rounded-bl-[40px]" style={{ minHeight: "25vh" }}>
          <TopHeaderStrip />
          <HeroVisualStrip />
        </div>

        {/* Bottom section - catalog grid */}
        <div className="flex-1 flex flex-col overflow-hidden p-6">
          {/* Section header - fixed */}
          <div className="flex-shrink-0">
            <h2 className="text-base font-medium text-gray-900 mb-2">Подобрали для вас</h2>

            {/* Filters bar */}
            <div className="flex items-start justify-between gap-3 mb-4">
              <ActiveFilterChips filters={filters} onRemoveFilter={handleRemoveFilter} />
              <SortDropdown value={sortBy} onChange={setSortBy} />
            </div>
          </div>

          {/* Grid - scrollable */}
          <div className="flex-1 overflow-y-auto pr-2">
            <CatalogGrid projects={filteredProjects} />
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { FilterState, defaultFilters } from "@/lib/filtering";

interface ActiveFilterChipsProps {
  filters: FilterState;
  onRemoveFilter: (key: keyof FilterState, value?: string | number) => void;
}

function CloseIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export default function ActiveFilterChips({ filters, onRemoveFilter }: ActiveFilterChipsProps) {
  const chips: Array<{ key: keyof FilterState; label: string; value?: string | number }> = [];

  filters.titleTypes.forEach(type => {
    chips.push({ key: "titleTypes", label: type, value: type });
  });

  filters.rooms.forEach(room => {
    chips.push({ key: "rooms", label: `${room}-комн.`, value: room });
  });

  if (filters.priceMin > defaultFilters.priceMin || filters.priceMax < defaultFilters.priceMax) {
    const minK = Math.round(filters.priceMin / 1000);
    const maxK = Math.round(filters.priceMax / 1000);
    chips.push({ key: "priceMin", label: `${minK} 000-${maxK} 000 ₽` });
  }

  filters.styles.forEach(style => {
    chips.push({ key: "styles", label: style, value: style });
  });

  filters.designers.forEach(designer => {
    chips.push({ key: "designers", label: designer, value: designer });
  });

  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {chips.map((chip, index) => (
        <button
          key={`${chip.key}-${chip.value ?? index}`}
          onClick={() => onRemoveFilter(chip.key, chip.value)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors"
        >
          {chip.label}
          <CloseIcon />
        </button>
      ))}
    </div>
  );
}

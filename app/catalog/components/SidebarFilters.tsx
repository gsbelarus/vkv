"use client";

import { FilterState, defaultFilters } from "@/lib/filtering";
import { allStyles, allDesigners, allTitleTypes } from "@/lib/mockProjects";
import { useState } from "react";

interface SidebarFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

import Link from "next/link";

function Logo() {
  return (
    <Link href="/" className="h-16 flex items-center gap-2 px-6 border-b border-gray-200 bg-gray-100 hover:bg-gray-200 transition-colors">
      <div className="w-7 h-7 bg-black flex items-center justify-center rounded">
        <span className="text-white font-bold text-xs">X</span>
      </div>
      <span className="font-medium text-base tracking-tight">вКвартирах</span>
    </Link>
  );
}

function FilterSection({
  title,
  children,
  action,
}: {
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <div className="px-6 py-4 border-b border-gray-100">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-gray-900">{title}</h3>
        {action}
      </div>
      {children}
    </div>
  );
}

function AccordionSection({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="px-6 py-4 border-b border-gray-100">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left"
      >
        <h3 className="text-sm font-medium text-gray-900">{title}</h3>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      {isOpen && <div className="mt-3">{children}</div>}
    </div>
  );
}

function Checkbox({
  label,
  checked,
  onChange,
  accent = false,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
  accent?: boolean;
}) {
  return (
    <label className="flex items-center gap-2 py-1 cursor-pointer group" onClick={onChange}>
      <div
        className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${checked
          ? "bg-[#D9614C] border-[#D9614C]"
          : "border-gray-300 group-hover:border-gray-400"
          }`}
      >
        {checked && (
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </div>
      <span className={`text-sm ${accent ? "text-[#D9614C]" : "text-gray-700"}`}>{label}</span>
    </label>
  );
}

function PriceSlider({
  min,
  max,
  valueMin,
  valueMax,
  onValueChange,
}: {
  min: number;
  max: number;
  valueMin: number;
  valueMax: number;
  onValueChange: (min: number, max: number) => void;
}) {
  const leftPercent = ((valueMin - min) / (max - min)) * 100;
  const rightPercent = ((valueMax - min) / (max - min)) * 100;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>RUB</span>
      </div>
      <div className="relative h-1 bg-gray-200 rounded">
        <div
          className="absolute h-1 bg-[#D9614C] rounded"
          style={{ left: `${leftPercent}%`, right: `${100 - rightPercent}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={10000}
          value={valueMin}
          onChange={(e) => onValueChange(Math.min(Number(e.target.value), valueMax - 10000), valueMax)}
          className="absolute w-full h-1 appearance-none bg-transparent pointer-events-auto cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#D9614C] [&::-webkit-slider-thumb]:cursor-pointer"
        />
        <input
          type="range"
          min={min}
          max={max}
          step={10000}
          value={valueMax}
          onChange={(e) => onValueChange(valueMin, Math.max(Number(e.target.value), valueMin + 10000))}
          className="absolute w-full h-1 appearance-none bg-transparent pointer-events-auto cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#D9614C] [&::-webkit-slider-thumb]:cursor-pointer"
        />
      </div>
      <div className="flex items-center justify-between text-xs text-gray-600">
        <span>0 ₽</span>
        <span>1 млн</span>
      </div>
      <div className="flex items-center gap-2 text-xs text-gray-500">
        <span>{(valueMin / 1000).toFixed(0)} 000</span>
        <span>—</span>
        <span>{(valueMax / 1000).toFixed(0)} 000</span>
      </div>
    </div>
  );
}

export default function SidebarFilters({ filters, onFiltersChange }: SidebarFiltersProps) {
  const roomOptions = [1, 2, 3, 4, 5, 6, 7];

  const handleReset = () => {
    onFiltersChange(defaultFilters);
  };

  return (
    <aside className="w-[20%] min-w-[240px] bg-gray-100 h-screen flex-shrink-0 flex flex-col">
      {/* Fixed header section */}
      <div className="flex-shrink-0">
        <Logo />

        {/* Filter Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-100">
          <div className="flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="4" x2="4" y1="21" y2="14" />
              <line x1="4" x2="4" y1="10" y2="3" />
              <line x1="12" x2="12" y1="21" y2="12" />
              <line x1="12" x2="12" y1="8" y2="3" />
              <line x1="20" x2="20" y1="21" y2="16" />
              <line x1="20" x2="20" y1="12" y2="3" />
              <line x1="2" x2="6" y1="14" y2="14" />
              <line x1="10" x2="14" y1="8" y2="8" />
              <line x1="18" x2="22" y1="16" y2="16" />
            </svg>
            <span className="text-sm font-medium">Фильтр</span>
          </div>
          <button onClick={handleReset} className="text-xs text-gray-400 hover:text-gray-600">
            Сбросить
          </button>
        </div>
      </div>

      {/* Scrollable filters section */}
      <div className="flex-1 overflow-y-auto bg-gray-100">
        {/* Тип помещения */}
        <FilterSection title="Тип помещения">
          <div className="space-y-1">
            <Checkbox
              label="Все"
              checked={filters.titleTypes.length === 0 || filters.titleTypes.length === allTitleTypes.length}
              onChange={() => {
                if (filters.titleTypes.length === allTitleTypes.length) {
                  onFiltersChange({ ...filters, titleTypes: [] });
                } else {
                  onFiltersChange({ ...filters, titleTypes: [...allTitleTypes] });
                }
              }}
            />
            {allTitleTypes.map((type) => (
              <Checkbox
                key={type}
                label={type}
                checked={filters.titleTypes.includes(type)}
                onChange={() => {
                  const newTypes = filters.titleTypes.includes(type)
                    ? filters.titleTypes.filter(t => t !== type)
                    : [...filters.titleTypes, type];
                  onFiltersChange({ ...filters, titleTypes: newTypes });
                }}
                accent={filters.titleTypes.includes(type)}
              />
            ))}
          </div>
        </FilterSection>

        {/* Комнат */}
        <FilterSection title="Комнат">
          <div className="space-y-1">
            <Checkbox
              label="Все"
              checked={filters.rooms.length === 0 || filters.rooms.length === roomOptions.length}
              onChange={() => {
                if (filters.rooms.length === roomOptions.length) {
                  onFiltersChange({ ...filters, rooms: [] });
                } else {
                  onFiltersChange({ ...filters, rooms: [...roomOptions] });
                }
              }}
            />
            {roomOptions.map((room) => (
              <Checkbox
                key={room}
                label={String(room)}
                checked={filters.rooms.includes(room)}
                onChange={() => {
                  const newRooms = filters.rooms.includes(room)
                    ? filters.rooms.filter(r => r !== room)
                    : [...filters.rooms, room];
                  onFiltersChange({ ...filters, rooms: newRooms });
                }}
                accent={filters.rooms.includes(room)}
              />
            ))}
          </div>
        </FilterSection>

        {/* Стоимость */}
        <FilterSection title="Стоимость">
          <PriceSlider
            min={0}
            max={1000000}
            valueMin={filters.priceMin}
            valueMax={filters.priceMax}
            onValueChange={(min, max) => onFiltersChange({ ...filters, priceMin: min, priceMax: max })}
          />
        </FilterSection>

        {/* Стиль */}
        <AccordionSection title="Стиль">
          <div className="space-y-1">
            <Checkbox
              label="Все"
              checked={filters.styles.length === 0 || filters.styles.length === allStyles.length}
              onChange={() => {
                if (filters.styles.length === allStyles.length) {
                  onFiltersChange({ ...filters, styles: [] });
                } else {
                  onFiltersChange({ ...filters, styles: [...allStyles] });
                }
              }}
            />
            {allStyles.map((style) => (
              <Checkbox
                key={style}
                label={style}
                checked={filters.styles.includes(style)}
                onChange={() => {
                  const newStyles = filters.styles.includes(style)
                    ? filters.styles.filter(s => s !== style)
                    : [...filters.styles, style];
                  onFiltersChange({ ...filters, styles: newStyles });
                }}
                accent={filters.styles.includes(style)}
              />
            ))}
          </div>
        </AccordionSection>

        {/* Дизайнер */}
        <AccordionSection title="Дизайнер">
          <div className="space-y-1">
            <Checkbox
              label="Все"
              checked={filters.designers.length === 0 || filters.designers.length === allDesigners.length}
              onChange={() => {
                if (filters.designers.length === allDesigners.length) {
                  onFiltersChange({ ...filters, designers: [] });
                } else {
                  onFiltersChange({ ...filters, designers: [...allDesigners] });
                }
              }}
            />
            {allDesigners.map((designer) => (
              <Checkbox
                key={designer}
                label={designer}
                checked={filters.designers.includes(designer)}
                onChange={() => {
                  const newDesigners = filters.designers.includes(designer)
                    ? filters.designers.filter(d => d !== designer)
                    : [...filters.designers, designer];
                  onFiltersChange({ ...filters, designers: newDesigners });
                }}
                accent={filters.designers.includes(designer)}
              />
            ))}
          </div>
        </AccordionSection>

        {/* Другое */}
        <AccordionSection title="Другое">
          <p className="text-xs text-gray-400">Дополнительные фильтры...</p>
        </AccordionSection>
      </div>
    </aside>
  );
}

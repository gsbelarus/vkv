import { Project } from "./mockProjects";

export interface FilterState {
  titleTypes: string[];
  rooms: number[];
  priceMin: number;
  priceMax: number;
  styles: string[];
  designers: string[];
}

export type SortOption =
  | "price-asc"
  | "price-desc"
  | "area-asc"
  | "area-desc"
  | "rooms-asc"
  | "rooms-desc"
  | "popular";

export const defaultFilters: FilterState = {
  titleTypes: [],
  rooms: [],
  priceMin: 0,
  priceMax: 1000000,
  styles: [],
  designers: [],
};

export function filterProjects(
  projects: Project[],
  filters: FilterState
): Project[] {
  return projects.filter((project) => {
    // Title type filter (if any selected, project must match one of them)
    if (filters.titleTypes.length > 0 && !filters.titleTypes.includes(project.titleType)) {
      return false;
    }

    // Rooms filter
    if (filters.rooms.length > 0 && !filters.rooms.includes(project.rooms)) {
      return false;
    }

    // Price range filter
    if (project.price < filters.priceMin || project.price > filters.priceMax) {
      return false;
    }

    // Style filter
    if (filters.styles.length > 0 && !filters.styles.includes(project.style)) {
      return false;
    }

    // Designer filter
    if (filters.designers.length > 0 && !filters.designers.includes(project.designerName)) {
      return false;
    }

    return true;
  });
}

export function sortProjects(
  projects: Project[],
  sortBy: SortOption
): Project[] {
  const sorted = [...projects];

  switch (sortBy) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "area-asc":
      return sorted.sort((a, b) => a.area - b.area);
    case "area-desc":
      return sorted.sort((a, b) => b.area - a.area);
    case "rooms-asc":
      return sorted.sort((a, b) => a.rooms - b.rooms);
    case "rooms-desc":
      return sorted.sort((a, b) => b.rooms - a.rooms);
    case "popular":
      return sorted.sort((a, b) => b.popularScore - a.popularScore);
    default:
      return sorted;
  }
}

export function getActiveFilterChips(filters: FilterState): Array<{
  key: keyof FilterState;
  label: string;
  value: string | number;
}> {
  const chips: Array<{ key: keyof FilterState; label: string; value: string | number }> = [];

  if (filters.titleTypes.length > 0) {
    filters.titleTypes.forEach(type => {
      chips.push({ key: "titleTypes", label: type, value: type });
    });
  }

  if (filters.rooms.length > 0) {
    filters.rooms.forEach(room => {
      chips.push({ key: "rooms", label: `${room}-х комнатная`, value: room });
    });
  }

  if (filters.priceMin > 0 || filters.priceMax < 1000000) {
    const label = `${formatPrice(filters.priceMin)} - ${formatPrice(filters.priceMax)} ₽`;
    chips.push({ key: "priceMin", label, value: filters.priceMin });
  }

  if (filters.styles.length > 0) {
    filters.styles.forEach(style => {
      chips.push({ key: "styles", label: style, value: style });
    });
  }

  if (filters.designers.length > 0) {
    filters.designers.forEach(designer => {
      chips.push({ key: "designers", label: designer, value: designer });
    });
  }

  return chips;
}

export function formatPrice(price: number): string {
  return price.toLocaleString("ru-RU");
}

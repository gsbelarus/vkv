import { mockProjects, Project } from "./mockProjects";
import { mockDesigners, Designer } from "./mockDesigners";
import { mockFurniture, FurnitureItem } from "./mockFurniture";
import { mockMaterials, Material } from "./mockMaterials";

export type SearchResultType = "project" | "designer" | "furniture" | "material";

export interface SearchResult {
  id: string;
  type: SearchResultType;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  url: string;
  matchedText: string;
  matchField: string;
}

function normalizeText(text: string): string {
  return text.toLowerCase().trim();
}

function findMatch(text: string, query: string): { found: boolean; excerpt: string } {
  const normalizedText = normalizeText(text);
  const normalizedQuery = normalizeText(query);

  const index = normalizedText.indexOf(normalizedQuery);
  if (index === -1) {
    return { found: false, excerpt: "" };
  }

  // Get excerpt around the match
  const start = Math.max(0, index - 30);
  const end = Math.min(text.length, index + query.length + 50);
  let excerpt = text.substring(start, end);

  if (start > 0) excerpt = "..." + excerpt;
  if (end < text.length) excerpt = excerpt + "...";

  return { found: true, excerpt };
}

function searchInProject(project: Project, query: string): SearchResult | null {
  const fieldsToSearch = [
    { field: "Название", value: `${project.titleType}, ${project.area} м²` },
    { field: "Стиль", value: project.style },
    { field: "Город", value: project.city },
    { field: "Дизайнер", value: project.designerName },
    { field: "Описание", value: project.description },
    { field: "Комнаты", value: project.roomsTags.join(", ") },
  ];

  for (const { field, value } of fieldsToSearch) {
    const match = findMatch(value, query);
    if (match.found) {
      return {
        id: `project-${project.id}`,
        type: "project",
        title: `${project.titleType}, ${project.area} м²`,
        subtitle: `${project.style} • ${project.city}`,
        description: project.description,
        image: project.image,
        url: `/project/${project.id}`,
        matchedText: match.excerpt,
        matchField: field,
      };
    }
  }
  return null;
}

function searchInDesigner(designer: Designer, query: string): SearchResult | null {
  const fieldsToSearch = [
    { field: "Имя", value: designer.name },
    { field: "Специальность", value: designer.specialty },
    { field: "Email", value: designer.email },
  ];

  for (const { field, value } of fieldsToSearch) {
    const match = findMatch(value, query);
    if (match.found) {
      return {
        id: `designer-${designer.id}`,
        type: "designer",
        title: designer.name,
        subtitle: designer.specialty,
        description: `Профессиональный дизайнер интерьера на платформе вКвартирах`,
        image: designer.avatar,
        url: `/designer/${designer.id}`,
        matchedText: match.excerpt,
        matchField: field,
      };
    }
  }
  return null;
}

function searchInFurniture(item: FurnitureItem, query: string): SearchResult | null {
  const fieldsToSearch = [
    { field: "Название", value: item.name },
    { field: "Бренд", value: item.brand },
    { field: "Артикул", value: item.sku },
    { field: "Описание", value: item.description },
  ];

  for (const { field, value } of fieldsToSearch) {
    const match = findMatch(value, query);
    if (match.found) {
      return {
        id: `furniture-${item.id}`,
        type: "furniture",
        title: item.name,
        subtitle: `${item.brand} • ${item.price.toLocaleString("ru-RU")} ₽`,
        description: item.description,
        image: item.image,
        url: `/furniture/${item.id}`,
        matchedText: match.excerpt,
        matchField: field,
      };
    }
  }
  return null;
}

function searchInMaterial(material: Material, query: string): SearchResult | null {
  const fieldsToSearch = [
    { field: "Название", value: material.name },
    { field: "Код", value: material.code },
    { field: "Производитель", value: material.manufacturer.name },
    { field: "Страна", value: material.manufacturer.country },
    { field: "Описание", value: material.description },
    { field: "О производителе", value: material.manufacturer.description },
  ];

  // Also search in characteristics
  for (const char of material.characteristics) {
    fieldsToSearch.push({ field: char.label, value: char.value });
  }

  for (const { field, value } of fieldsToSearch) {
    const match = findMatch(value, query);
    if (match.found) {
      return {
        id: `material-${material.id}`,
        type: "material",
        title: `«${material.name}» ${material.code}`,
        subtitle: `${material.manufacturer.name} • ${material.price.toLocaleString("ru-RU")} ₽ ${material.priceUnit}`,
        description: material.description,
        image: material.image,
        url: `/material/${material.id}`,
        matchedText: match.excerpt,
        matchField: field,
      };
    }
  }
  return null;
}

export function performSearch(query: string): SearchResult[] {
  if (!query.trim()) return [];

  const results: SearchResult[] = [];

  // Search in projects
  for (const project of mockProjects) {
    const result = searchInProject(project, query);
    if (result) results.push(result);
  }

  // Search in designers
  for (const designer of mockDesigners) {
    const result = searchInDesigner(designer, query);
    if (result) results.push(result);
  }

  // Search in furniture
  for (const item of mockFurniture) {
    const result = searchInFurniture(item, query);
    if (result) results.push(result);
  }

  // Search in materials
  for (const material of mockMaterials) {
    const result = searchInMaterial(material, query);
    if (result) results.push(result);
  }

  return results;
}

export function getTypeLabel(type: SearchResultType): string {
  switch (type) {
    case "project":
      return "Проект";
    case "designer":
      return "Дизайнер";
    case "furniture":
      return "Мебель";
    case "material":
      return "Материал";
  }
}

export function getTypeColor(type: SearchResultType): string {
  switch (type) {
    case "project":
      return "bg-blue-100 text-blue-700";
    case "designer":
      return "bg-green-100 text-green-700";
    case "furniture":
      return "bg-amber-100 text-amber-700";
    case "material":
      return "bg-purple-100 text-purple-700";
  }
}

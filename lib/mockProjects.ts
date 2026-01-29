export interface Project {
  id: number;
  titleType: "Квартира-студия" | "Квартира" | "Коттедж" | "Пентхаус";
  area: number;
  rooms: number;
  price: number;
  style: string;
  city: string;
  designerName: string;
  designerId: number;
  designerAvatar: string;
  image: string;
  images: string[];
  roomsTags: string[];
  popularScore: number;
  createdAt: string;
  description: string;
}

const styles = [
  "Эко-стиль",
  "Минимализм",
  "Сканди",
  "Лофт",
  "Неоклассика",
  "Japandi",
  "Современный",
  "Модерн",
];

const cities = ["Москва", "Казань", "Санкт-Петербург", "Екатеринбург", "Сочи", "Новосибирск"];

const designers = [
  "Курмакаева Ляйсан",
  "Петров Алексей",
  "Иванова Мария",
  "Сидорова Анна",
  "Козлов Дмитрий",
  "Николаева Елена",
];

const images = [
  "/pic/Frame 109.png",
  "/pic/Frame 110.png",
  "/pic/Frame 111.png",
  "/pic/Frame 112.png",
  "/pic/Frame 113.png",
  "/pic/Frame 114.png",
  "/pic/Frame 115.png",
  "/pic/Frame 116.png",
  "/pic/Frame 117.png",
  "/pic/Frame 118.png",
  "/pic/Frame 119.png",
  "/pic/Frame 120.png",
];

const roomsTagsOptions = [
  ["Гостиная", "Кухня", "Прихожая"],
  ["Гостиная", "Кухня", "Прихожая", "Спальня"],
  ["Гостиная", "Кухня", "Спальня", "Ванная"],
  ["Гостиная", "Кухня", "Прихожая", "Спальня", "Детская"],
];

const descriptions = [
  "Светлый интерьер с панорамными окнами. Открытая планировка объединяет кухню и гостиную.",
  "Уютное пространство с акцентами натурального дерева. Продуманное зонирование для всей семьи.",
  "Минималистичный дизайн с функциональным хранением. Нейтральная палитра создаёт ощущение простора.",
  "Современный проект с элементами лофта. Высокие потолки и индустриальные акценты.",
  "Скандинавский уют с тёплыми текстурами. Много света и природных материалов.",
  "Элегантная неоклассика с молдингами. Благородные оттенки и изысканная мебель.",
  "Экологичный интерьер с живыми растениями. Натуральные материалы и спокойные тона.",
  "Японский минимализм с европейским комфортом. Чистые линии и функциональность.",
  "Яркий современный дизайн с цветовыми акцентами. Динамичное пространство для активной жизни.",
  "Классический интерьер с современными удобствами. Симметрия и гармония в каждой детали.",
  "Индустриальный шик с мягкими текстилем. Контраст грубых и нежных текстур.",
  "Средиземноморский стиль с арками и терракотой. Солнечное настроение круглый год.",
];

const titleTypes: Project["titleType"][] = [
  "Квартира-студия",
  "Квартира",
  "Коттедж",
  "Пентхаус",
];

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export const mockProjects: Project[] = Array.from({ length: 48 }, (_, i) => {
  const seed = i + 1;
  const typeIndex = Math.floor(seededRandom(seed * 1) * titleTypes.length);
  const titleType = titleTypes[typeIndex];

  let rooms: number;
  if (titleType === "Квартира-студия") {
    rooms = 1;
  } else if (titleType === "Пентхаус") {
    rooms = Math.floor(seededRandom(seed * 2) * 4) + 4; // 4-7
  } else if (titleType === "Коттедж") {
    rooms = Math.floor(seededRandom(seed * 2) * 5) + 3; // 3-7
  } else {
    rooms = Math.floor(seededRandom(seed * 2) * 6) + 1; // 1-6
  }

  const area =
    titleType === "Квартира-студия"
      ? Math.floor(seededRandom(seed * 3) * 20) + 25 // 25-45
      : titleType === "Пентхаус"
        ? Math.floor(seededRandom(seed * 3) * 100) + 150 // 150-250
        : titleType === "Коттедж"
          ? Math.floor(seededRandom(seed * 3) * 150) + 100 // 100-250
          : Math.floor(seededRandom(seed * 3) * 80) + 40; // 40-120

  const price =
    titleType === "Квартира-студия"
      ? Math.floor(seededRandom(seed * 4) * 50000) + 30000
      : titleType === "Пентхаус"
        ? Math.floor(seededRandom(seed * 4) * 500000) + 300000
        : titleType === "Коттедж"
          ? Math.floor(seededRandom(seed * 4) * 400000) + 200000
          : Math.floor(seededRandom(seed * 4) * 150000) + 50000;

  const designerIndex = Math.floor(seededRandom(seed * 7) * designers.length);
  const mainImage = images[i % images.length];

  // Generate multiple images for gallery (4-6 images)
  const numImages = Math.floor(seededRandom(seed * 11) * 3) + 4;
  const projectImages: string[] = [mainImage];
  for (let j = 1; j < numImages; j++) {
    projectImages.push(images[(i + j) % images.length]);
  }

  return {
    id: i + 1,
    titleType,
    area,
    rooms,
    price,
    style: styles[Math.floor(seededRandom(seed * 5) * styles.length)],
    city: cities[Math.floor(seededRandom(seed * 6) * cities.length)],
    designerName: designers[designerIndex],
    designerId: designerIndex + 1,
    designerAvatar: "/pic/user.png",
    image: mainImage,
    images: projectImages,
    roomsTags: roomsTagsOptions[Math.floor(seededRandom(seed * 12) * roomsTagsOptions.length)],
    popularScore: Math.floor(seededRandom(seed * 8) * 100),
    createdAt: new Date(2025, Math.floor(seededRandom(seed * 9) * 12), Math.floor(seededRandom(seed * 10) * 28) + 1).toISOString(),
    description: descriptions[i % descriptions.length],
  };
});

export const allStyles = styles;
export const allDesigners = designers;
export const allCities = cities;
export const allTitleTypes = titleTypes;

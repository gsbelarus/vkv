export interface Project {
  id: number;
  titleType: "Квартира-студия" | "Квартира" | "Коттедж" | "Пентхаус";
  area: number;
  rooms: number;
  price: number;
  style: string;
  city: string;
  designerName: string;
  designerAvatar: string;
  image: string;
  popularScore: number;
  createdAt: string;
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

  return {
    id: i + 1,
    titleType,
    area,
    rooms,
    price,
    style: styles[Math.floor(seededRandom(seed * 5) * styles.length)],
    city: cities[Math.floor(seededRandom(seed * 6) * cities.length)],
    designerName: designers[Math.floor(seededRandom(seed * 7) * designers.length)],
    designerAvatar: "/pic/user.png",
    image: images[i % images.length],
    popularScore: Math.floor(seededRandom(seed * 8) * 100),
    createdAt: new Date(2025, Math.floor(seededRandom(seed * 9) * 12), Math.floor(seededRandom(seed * 10) * 28) + 1).toISOString(),
  };
});

export const allStyles = styles;
export const allDesigners = designers;
export const allCities = cities;
export const allTitleTypes = titleTypes;

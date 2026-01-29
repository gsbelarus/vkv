export interface FurnitureItem {
  id: number;
  brand: string;
  name: string;
  sku: string;
  rating: number;
  price: number;
  image: string;
  description: string;
}

const furnitureImages = [
  "/pic/Frame 121.png",
  "/pic/Frame 122.png",
  "/pic/Frame 123.png",
  "/pic/Frame 124.png",
];

export const mockFurniture: FurnitureItem[] = [
  {
    id: 1,
    brand: "IKEA",
    name: "Muren Armchairs",
    sku: "MURN-2024-GRY",
    rating: 5,
    price: 29900,
    image: furnitureImages[0],
    description: "Классическое кресло с высокой спинкой. Мягкие подлокотники и глубокое сиденье обеспечивают максимальный комфорт. Обивка из износостойкой ткани.",
  },
  {
    id: 2,
    brand: "IKEA",
    name: "Standmoon Footstool",
    sku: "STDM-4521-BLK",
    rating: 4,
    price: 31000,
    image: furnitureImages[1],
    description: "Универсальный пуф-подставка для ног. Компактный дизайн идеально впишется в любой интерьер. Прочный каркас из массива бука.",
  },
  {
    id: 3,
    brand: "IKEA",
    name: "Hemlingby Sofa",
    sku: "HMLG-7834-GRY",
    rating: 5,
    price: 45900,
    image: furnitureImages[2],
    description: "Трёхместный диван в скандинавском стиле. Съёмные чехлы можно стирать в машине. Пружинный блок для долговечности.",
  },
  {
    id: 4,
    brand: "IKEA",
    name: "Standmoon Footstool",
    sku: "STDM-4522-GRY",
    rating: 4,
    price: 31000,
    image: furnitureImages[3],
    description: "Элегантный пуф серого цвета. Внутреннее отделение для хранения мелочей. Нескользящие ножки защитят пол.",
  },
  {
    id: 5,
    brand: "BoConcept",
    name: "Adelaide Dining Chair",
    sku: "ADLD-9901-OAK",
    rating: 5,
    price: 42000,
    image: furnitureImages[0],
    description: "Дизайнерский обеденный стул с эргономичной спинкой. Ножки из дуба покрыты защитным лаком. Датский дизайн премиум-класса.",
  },
  {
    id: 6,
    brand: "BoConcept",
    name: "Osaka Sofa",
    sku: "OSKA-1102-NVY",
    rating: 5,
    price: 189000,
    image: furnitureImages[1],
    description: "Модульный диван с регулируемыми подголовниками. Итальянская кожа высшего качества. Механизм трансформации для релаксации.",
  },
  {
    id: 7,
    brand: "Zara Home",
    name: "Linen Armchair",
    sku: "LNCH-3344-BGE",
    rating: 4,
    price: 34500,
    image: furnitureImages[2],
    description: "Кресло в стиле прованс с льняной обивкой. Натуральные материалы создают уют. Лёгкий каркас удобен для перемещения.",
  },
  {
    id: 8,
    brand: "H&M Home",
    name: "Cotton Pouf",
    sku: "CPUF-5567-WHT",
    rating: 3,
    price: 8900,
    image: furnitureImages[3],
    description: "Мягкий пуф из 100% хлопка. Ручная работа, каждое изделие уникально. Наполнитель из переработанных материалов.",
  },
  {
    id: 9,
    brand: "IKEA",
    name: "Kivik Corner Sofa",
    sku: "KVKC-8872-GRN",
    rating: 4,
    price: 67900,
    image: furnitureImages[0],
    description: "Угловой диван для большой семьи. Память формы в сиденьях. Десятилетняя гарантия на каркас.",
  },
  {
    id: 10,
    brand: "Westwing",
    name: "Velvet Bench",
    sku: "VBNC-2211-RST",
    rating: 5,
    price: 28500,
    image: furnitureImages[1],
    description: "Бархатная банкетка цвета терракоты. Золотистые металлические ножки. Идеально для прихожей или спальни.",
  },
  {
    id: 11,
    brand: "La Redoute",
    name: "Rattan Chair",
    sku: "RTCH-6789-NAT",
    rating: 4,
    price: 19900,
    image: furnitureImages[2],
    description: "Плетёное кресло из натурального ротанга. Экологичное производство. Подушка в комплекте.",
  },
  {
    id: 12,
    brand: "IKEA",
    name: "Poäng Armchair",
    sku: "PONG-1234-BRN",
    rating: 5,
    price: 12990,
    image: furnitureImages[3],
    description: "Легендарное кресло-качалка POÄNG. Гнутый берёзовый каркас создаёт пружинящий эффект. Бестселлер с 1976 года.",
  },
];

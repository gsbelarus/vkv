export interface Designer {
  id: number;
  name: string;
  email: string;
  avatar: string;
  specialty: string;
}

export const mockDesigners: Designer[] = [
  {
    id: 1,
    name: "Курмакаева Ляйсан",
    email: "lyaysan.kurmakayeva@vkvartirakh.ru",
    avatar: "/pic/Frame 107.png",
    specialty: "Дизайнер интерьера",
  },
  {
    id: 2,
    name: "Петров Алексей",
    email: "alexey.petrov@vkvartirakh.ru",
    avatar: "/pic/Frame 107.png",
    specialty: "Дизайнер интерьера",
  },
  {
    id: 3,
    name: "Иванова Мария",
    email: "maria.ivanova@vkvartirakh.ru",
    avatar: "/pic/Frame 107.png",
    specialty: "Дизайнер интерьера",
  },
  {
    id: 4,
    name: "Сидорова Анна",
    email: "anna.sidorova@vkvartirakh.ru",
    avatar: "/pic/Frame 107.png",
    specialty: "Дизайнер интерьера",
  },
  {
    id: 5,
    name: "Козлов Дмитрий",
    email: "dmitry.kozlov@vkvartirakh.ru",
    avatar: "/pic/Frame 107.png",
    specialty: "Дизайнер интерьера",
  },
  {
    id: 6,
    name: "Николаева Елена",
    email: "elena.nikolaeva@vkvartirakh.ru",
    avatar: "/pic/Frame 107.png",
    specialty: "Дизайнер интерьера",
  },
];

export function getDesignerByName(name: string): Designer | undefined {
  return mockDesigners.find((d) => d.name === name);
}

export function getDesignerById(id: number): Designer | undefined {
  return mockDesigners.find((d) => d.id === id);
}

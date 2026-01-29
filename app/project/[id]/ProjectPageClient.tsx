"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Project } from "@/lib/mockProjects";
import { getDesignerByName } from "@/lib/mockDesigners";
import { mockFurniture, FurnitureItem } from "@/lib/mockFurniture";
import UserMenu from "@/app/components/UserMenu";

// Icons
function SearchIcon() {
  return (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BriefcaseIcon() {
  return (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" strokeLinecap="round" />
    </svg>
  );
}

function ChevronLeftIcon() {
  return (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function HeartIcon({ filled }: { filled?: boolean }) {
  return (
    <svg width="24" height="24" fill={filled ? "#D9614C" : "none"} stroke={filled ? "#D9614C" : "currentColor"} strokeWidth="1.5" viewBox="0 0 24 24">
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path d="M9 22a1 1 0 100-2 1 1 0 000 2zM20 22a1 1 0 100-2 1 1 0 000 2zM1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill={filled ? "#F59E0B" : "none"}
      stroke={filled ? "#F59E0B" : "#D1D5DB"}
      strokeWidth="2"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

// Material options
const wallOptions = [
  { id: "wall1", name: "«Туманный Копенгаген» S 1502-Y50R", price: 15000 },
  { id: "wall2", name: "«Рассвет над городом» RAL 9003", price: 12000 },
];

const floorOptions = [
  { id: "floor1", name: "«Туманный Копенгаген» S 1502-Y50R", price: 25000 },
  { id: "floor2", name: "«Рассвет над городом» RAL 9003", price: 20000 },
];

const ceilingOptions = [
  { id: "ceiling1", name: "«Рассвет над городом» RAL 9003", price: 18000 },
];

interface ProjectPageClientProps {
  project: Project;
  otherProjects: Project[];
}

export default function ProjectPageClient({
  project,
  otherProjects,
}: ProjectPageClientProps) {
  const router = useRouter();
  const designer = getDesignerByName(project.designerName);

  // Gallery state
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  // Room chips state
  const allRooms = ["Все", ...project.roomsTags];
  const [selectedRooms, setSelectedRooms] = useState<string[]>(["Все"]);

  // Material selections
  const [selectedWall, setSelectedWall] = useState(wallOptions[0].id);
  const [selectedFloor, setSelectedFloor] = useState(floorOptions[0].id);
  const [selectedCeiling, setSelectedCeiling] = useState(ceilingOptions[0].id);

  // Cart state
  const [cart, setCart] = useState<number[]>([]);
  const [showToast, setShowToast] = useState(false);

  // Calculate total price
  const calculateTotal = () => {
    let total = project.price;
    total += wallOptions.find((o) => o.id === selectedWall)?.price || 0;
    total += floorOptions.find((o) => o.id === selectedFloor)?.price || 0;
    total += ceilingOptions.find((o) => o.id === selectedCeiling)?.price || 0;

    // Room multiplier
    if (!selectedRooms.includes("Все")) {
      const roomMultiplier = selectedRooms.length / project.roomsTags.length;
      total = Math.round(total * roomMultiplier);
    }

    return total;
  };

  const handleRoomToggle = (room: string) => {
    if (room === "Все") {
      setSelectedRooms(["Все"]);
    } else {
      let newRooms = selectedRooms.filter((r) => r !== "Все");
      if (newRooms.includes(room)) {
        newRooms = newRooms.filter((r) => r !== room);
        if (newRooms.length === 0) {
          newRooms = ["Все"];
        }
      } else {
        newRooms = [...newRooms, room];
        if (newRooms.length === project.roomsTags.length) {
          newRooms = ["Все"];
        }
      }
      setSelectedRooms(newRooms);
    }
  };

  const addToCart = (itemId: number) => {
    if (!cart.includes(itemId)) {
      setCart([...cart, itemId]);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    }
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString("ru-RU") + " ₽";
  };

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/catalog");
    }
  };

  return (
    <div className="flex h-dvh">
      {/* Left Sidebar - 1/5 width */}
      <aside className="w-1/5 bg-gray-100 flex flex-col">
        {/* Fixed header part */}
        <div className="p-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 mb-8">
            <div className="w-7 h-7 bg-black flex items-center justify-center rounded">
              <span className="text-white font-bold text-xs">X</span>
            </div>
            <span className="font-medium text-base tracking-tight">
              вКвартирах
            </span>
          </Link>

          {/* Designer info */}
          <p className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-4">
            Дизайнер проекта
          </p>

          <div className="flex flex-col items-center text-center mb-6">
            <div className="relative w-24 h-24 rounded-full overflow-hidden mb-3">
              <Image
                src={designer?.avatar || "/pic/Frame 107.png"}
                alt={project.designerName}
                fill
                className="object-cover"
              />
            </div>
            <h3 className="font-medium text-gray-900">{project.designerName}</h3>
            <p className="text-sm text-gray-500">
              {designer?.specialty || "Дизайнер интерьера"}
            </p>
          </div>

          <a
            href={`mailto:${designer?.email || "info@vkvartirakh.ru"}`}
            className="block w-full py-2.5 px-4 border border-gray-300 rounded-full text-center text-sm hover:bg-white transition-colors mb-8"
          >
            Связаться
          </a>

          <p className="text-xs font-bold text-gray-700 uppercase tracking-wider">
            Другие проекты
          </p>
        </div>

        {/* Scrollable other projects */}
        <div className="flex-1 overflow-y-auto min-h-0 px-6 pb-6">
          <div className="space-y-4">
            {otherProjects.slice(0, 6).map((p) => (
              <Link
                key={p.id}
                href={`/project/${p.id}`}
                className="block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={p.image}
                    alt={p.titleType}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-3">
                  <div className="flex justify-between items-start mb-1">
                    <p className="text-xs font-medium">
                      {p.titleType}, {p.area} м²
                    </p>
                    <span className="text-xs text-[#D9614C]">{p.city}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Image
                      src="/pic/user.png"
                      alt=""
                      width={16}
                      height={16}
                      className="rounded-full"
                    />
                    <span className="truncate">Автор</span>
                    <span className="ml-auto">Стиль</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span className="ml-5 truncate">{p.designerName}</span>
                    <span className="ml-auto">{p.style}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </aside>

      {/* Right Content - 4/5 width */}
      <main className="w-4/5 bg-white flex flex-col">
        {/* Top Header Strip */}
        <header className="flex items-center justify-between px-8 py-4 border-b border-gray-200 pl-16">
          <nav className="flex items-center gap-8">
            <Link
              href="/catalog"
              className="text-sm text-[#D9614C] hover:text-[#c54f3d] transition-colors"
            >
              Каталог
            </Link>
            <Link
              href="/designers"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Дизайнерам
            </Link>
            <Link
              href="/business"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Бизнесу
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <SearchIcon />
            </button>
            <div className="w-px h-5 bg-gray-200" />
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
              <BellIcon />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#D9614C] rounded-full" />
            </button>
            <div className="w-px h-5 bg-gray-200" />
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
              <BriefcaseIcon />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#D9614C] rounded-full text-white text-[10px] flex items-center justify-center">
                0
              </span>
            </button>
            <div className="w-px h-5 bg-gray-200" />
            <UserMenu />
          </div>
        </header>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto">
          <div className="pl-16 pr-8 py-6">
            {/* Back button */}
            <button
              onClick={handleBack}
              className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 transition-colors mb-6"
            >
              <ChevronLeftIcon />
              <span>Назад</span>
            </button>

            {/* Project title */}
            <h1 className="text-2xl font-medium text-gray-900 mb-8">
              Проект «{project.titleType === "Квартира-студия"
                ? "Реализованный проект частного дома, фрагмент"
                : `${project.titleType}, ${project.area} м²`}»
            </h1>

            {/* Main content area - 3 columns */}
            <div className="grid grid-cols-[96px_1fr_280px] gap-6 mb-12">
              {/* Column 1: Thumbnails */}
              <div className="space-y-3">
                {project.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-full aspect-square rounded-lg overflow-hidden border-2 transition-all ${selectedImageIndex === idx
                      ? "border-[#D9614C]"
                      : "border-transparent hover:border-gray-300"
                      }`}
                  >
                    <Image
                      src={img}
                      alt={`Фото ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Column 2: Main image */}
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gray-100">
                <Image
                  src={project.images[selectedImageIndex]}
                  alt={project.titleType}
                  fill
                  className="object-cover"
                />
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="absolute top-4 right-4 p-2 bg-white/80 hover:bg-white rounded-full transition-colors"
                >
                  <HeartIcon filled={isFavorite} />
                </button>
              </div>

              {/* Column 3: Customization panel */}
              <div>
                {/* Room chips */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {allRooms.map((room) => (
                    <button
                      key={room}
                      onClick={() => handleRoomToggle(room)}
                      className={`px-3 py-1.5 rounded-full text-sm transition-colors ${selectedRooms.includes(room)
                        ? "bg-[#D9614C] text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                    >
                      {room === "Все" && "✕ "}
                      {room}
                    </button>
                  ))}
                </div>

                {/* Walls */}
                <div className="mb-4 pb-4 border-b border-gray-200">
                  <h3 className="font-medium text-gray-900 mb-3">
                    Стены под покраску
                  </h3>
                  <div className="space-y-2">
                    {wallOptions.map((option) => (
                      <label
                        key={option.id}
                        className="flex items-start gap-3 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="wall"
                          checked={selectedWall === option.id}
                          onChange={() => setSelectedWall(option.id)}
                          className="mt-1 w-4 h-4 text-[#D9614C] border-gray-300 focus:ring-[#D9614C] accent-[#D9614C]"
                        />
                        <span className="text-sm text-gray-600">
                          {option.name}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Floor */}
                <div className="mb-4 pb-4 border-b border-gray-200">
                  <h3 className="font-medium text-gray-900 mb-3">Ламинат</h3>
                  <div className="space-y-2">
                    {floorOptions.map((option) => (
                      <label
                        key={option.id}
                        className="flex items-start gap-3 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="floor"
                          checked={selectedFloor === option.id}
                          onChange={() => setSelectedFloor(option.id)}
                          className="mt-1 w-4 h-4 text-[#D9614C] border-gray-300 focus:ring-[#D9614C] accent-[#D9614C]"
                        />
                        <span className="text-sm text-gray-600">
                          {option.name}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Ceiling */}
                <div className="mb-6 pb-4 border-b border-gray-200">
                  <h3 className="font-medium text-gray-900 mb-3">Потолок</h3>
                  <div className="space-y-2">
                    {ceilingOptions.map((option) => (
                      <label
                        key={option.id}
                        className="flex items-start gap-3 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="ceiling"
                          checked={selectedCeiling === option.id}
                          onChange={() => setSelectedCeiling(option.id)}
                          className="mt-1 w-4 h-4 text-[#D9614C] border-gray-300 focus:ring-[#D9614C] accent-[#D9614C]"
                        />
                        <span className="text-sm text-gray-600">
                          {option.name}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Total and buy button */}
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900">
                    {formatPrice(calculateTotal())}
                  </span>
                  <button className="px-6 py-2.5 bg-[#D9614C] hover:bg-[#c54f3d] text-white rounded-full text-sm font-medium transition-colors">
                    Купить
                  </button>
                </div>
              </div>
            </div>

            {/* Furniture section */}
            <section>
              <h2 className="text-xl font-medium text-gray-900 mb-6">
                Мебель и техника
              </h2>
              <div className="grid grid-cols-4 gap-6">
                {mockFurniture.map((item) => (
                  <FurnitureCard
                    key={item.id}
                    item={item}
                    inCart={cart.includes(item.id)}
                    onAddToCart={() => addToCart(item.id)}
                  />
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Toast notification */}
      {showToast && (
        <div className="fixed bottom-6 right-6 bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in">
          Товар добавлен в корзину
        </div>
      )}
    </div>
  );
}

// Furniture card component with flip animation
function FurnitureCard({
  item,
  inCart,
  onAddToCart,
}: {
  item: FurnitureItem;
  inCart: boolean;
  onAddToCart: () => void;
}) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
      {/* Flip container for image */}
      <div className="relative aspect-square [perspective:1000px] group">
        <div className="relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
          {/* Front side - Image */}
          <div className="absolute inset-0 bg-gray-50 p-4 [backface-visibility:hidden]">
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-contain"
            />
          </div>
          {/* Back side - Description */}
          <div className="absolute inset-0 bg-[#D9614C] p-4 [backface-visibility:hidden] [transform:rotateY(180deg)] flex items-center justify-center">
            <p className="text-white text-sm text-center leading-relaxed">
              {item.description}
            </p>
          </div>
        </div>
      </div>
      <div className="p-4">
        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
          {item.brand}
        </p>
        <h3 className="text-sm font-medium text-gray-900 mb-1">{item.name}</h3>
        <div className="flex gap-0.5 mb-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <StarIcon key={i} filled={i < Math.round(item.rating)} />
          ))}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-900">
            {item.price.toLocaleString("ru-RU")} ₽
          </span>
          <button
            onClick={onAddToCart}
            disabled={inCart}
            className={`p-2 rounded-full transition-colors ${inCart
              ? "bg-[#D9614C] text-white"
              : "bg-gray-100 hover:bg-gray-200 text-gray-600"
              }`}
          >
            <CartIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

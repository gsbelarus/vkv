"use client";

import { useState, useRef, useEffect } from "react";

interface Notification {
  id: number;
  type: "project" | "furniture" | "designer" | "promo" | "order";
  title: string;
  message: string;
  time: string;
  isRead: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: 1,
    type: "project",
    title: "Новый проект в вашем стиле",
    message: "Дизайнер Анна Светлова добавила проект «Скандинавский минимализм» — 78 м²",
    time: "5 мин назад",
    isRead: false,
  },
  {
    id: 2,
    type: "furniture",
    title: "Скидка на мебель",
    message: "Диван «Copenhagen» из вашего избранного теперь со скидкой 20%",
    time: "1 час назад",
    isRead: false,
  },
  {
    id: 3,
    type: "designer",
    title: "Дизайнер ответил",
    message: "Мария Иванова ответила на ваш запрос по проекту «Лофт на Арбате»",
    time: "2 часа назад",
    isRead: false,
  },
  {
    id: 4,
    type: "order",
    title: "Заказ отправлен",
    message: "Ваш заказ #4521 с комплектом мебели отправлен курьерской службой",
    time: "Вчера",
    isRead: true,
  },
  {
    id: 5,
    type: "promo",
    title: "Эксклюзивное предложение",
    message: "Бесплатная консультация дизайнера при заказе проекта до конца недели",
    time: "2 дня назад",
    isRead: true,
  },
];

function BellIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}

function ProjectIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18" />
      <path d="M9 21V9" />
    </svg>
  );
}

function FurnitureIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3" />
      <path d="M2 11v5a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H6v-2a2 2 0 0 0-4 0Z" />
      <path d="M4 18v2" />
      <path d="M20 18v2" />
    </svg>
  );
}

function DesignerIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function OrderIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16v-2" />
      <path d="m7.5 4.27 9 5.15" />
      <polyline points="3.29,7 12,12 20.71,7" />
      <line x1="12" y1="22" x2="12" y2="12" />
    </svg>
  );
}

function PromoIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
    </svg>
  );
}

function getNotificationIcon(type: Notification["type"]) {
  switch (type) {
    case "project":
      return <ProjectIcon />;
    case "furniture":
      return <FurnitureIcon />;
    case "designer":
      return <DesignerIcon />;
    case "order":
      return <OrderIcon />;
    case "promo":
      return <PromoIcon />;
  }
}

function getNotificationColor(type: Notification["type"]) {
  switch (type) {
    case "project":
      return "bg-blue-100 text-blue-600";
    case "furniture":
      return "bg-amber-100 text-amber-600";
    case "designer":
      return "bg-green-100 text-green-600";
    case "order":
      return "bg-purple-100 text-purple-600";
    case "promo":
      return "bg-[#D9614C]/10 text-[#D9614C]";
  }
}

export default function NotificationsMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);
  const [visibleNotifications, setVisibleNotifications] = useState<number[]>([]);
  const menuRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setVisibleNotifications([]);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen) {
      // Animate notifications appearing one by one
      notifications.forEach((notification, index) => {
        setTimeout(() => {
          setVisibleNotifications((prev) => [...prev, notification.id]);
        }, index * 100);
      });
    } else {
      setVisibleNotifications([]);
    }
  }, [isOpen, notifications]);

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-500 hover:text-black transition-colors relative"
      >
        <BellIcon />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-[#D9614C] rounded-full text-white text-[10px] font-medium flex items-center justify-center px-1">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-96 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50">
          {/* Header */}
          <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-medium text-gray-900">Уведомления</h3>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-xs text-[#D9614C] hover:text-[#c54f3d] transition-colors"
              >
                Прочитать все
              </button>
            )}
          </div>

          {/* Notifications list */}
          <div className="max-h-[400px] overflow-y-auto">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                onClick={() => markAsRead(notification.id)}
                className={`
                  px-4 py-3 border-b border-gray-50 cursor-pointer
                  hover:bg-gray-50 transition-all duration-300
                  ${!notification.isRead ? "bg-blue-50/30" : ""}
                  ${visibleNotifications.includes(notification.id)
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-4"
                  }
                `}
                style={{
                  transition: "opacity 0.3s ease-out, transform 0.3s ease-out, background-color 0.2s",
                }}
              >
                <div className="flex gap-3">
                  {/* Icon */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${getNotificationColor(
                      notification.type
                    )}`}
                  >
                    {getNotificationIcon(notification.type)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-medium text-gray-900">
                        {notification.title}
                      </p>
                      {!notification.isRead && (
                        <span className="w-2 h-2 bg-[#D9614C] rounded-full flex-shrink-0 mt-1.5" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-0.5 line-clamp-2">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {notification.time}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
            <button className="w-full text-center text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Все уведомления
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

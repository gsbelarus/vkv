"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}

export default function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        setQuery("");
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleSearch = () => {
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setIsOpen(false);
      setQuery("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="relative flex items-center">
      {/* Search input - slides in from right */}
      <div
        className={`
          absolute right-full mr-2 overflow-hidden transition-all duration-300 ease-out
          ${isOpen ? "w-64 opacity-100" : "w-0 opacity-0"}
        `}
      >
        <div className="relative flex items-center">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Поиск по сайту..."
            className="w-full h-9 pl-4 pr-10 text-sm border border-gray-200 rounded-full focus:outline-none focus:border-[#D9614C] focus:ring-1 focus:ring-[#D9614C] transition-colors"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <CloseIcon />
            </button>
          )}
        </div>
      </div>

      {/* Search button */}
      <button
        onClick={() => {
          if (isOpen && query.trim()) {
            handleSearch();
          } else {
            setIsOpen(!isOpen);
          }
        }}
        className={`p-2 transition-colors ${isOpen ? "text-[#D9614C]" : "text-gray-500 hover:text-black"
          }`}
      >
        <SearchIcon />
      </button>
    </div>
  );
}

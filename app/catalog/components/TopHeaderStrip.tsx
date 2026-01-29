import Image from "next/image";
import Link from "next/link";
import UserMenu from "../../components/UserMenu";
import NotificationsMenu from "../../components/NotificationsMenu";

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}

function BriefcaseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}

function IconButton({ children }: { children: React.ReactNode }) {
  return (
    <button className="p-2 text-gray-500 hover:text-black transition-colors">
      {children}
    </button>
  );
}

function Divider() {
  return <div className="w-px h-5 bg-gray-200" />;
}

export default function TopHeaderStrip() {
  return (
    <div className="h-16 px-8 flex items-center justify-between border-b border-gray-200">
      {/* Left: Navigation */}
      <nav className="flex items-center gap-8">
        <Link href="/catalog" className="text-[#D9614C] text-sm font-medium">
          Каталог
        </Link>
        <Link href="/designers" className="text-gray-700 hover:text-black transition-colors text-sm">
          Дизайнерам
        </Link>
        <Link href="/business" className="text-gray-700 hover:text-black transition-colors text-sm">
          Бизнесу
        </Link>
      </nav>

      {/* Right: Icons */}
      <div className="flex items-center gap-0.5">
        <IconButton>
          <SearchIcon />
        </IconButton>
        <Divider />
        <NotificationsMenu />
        <Divider />
        <IconButton>
          <BriefcaseIcon />
        </IconButton>
        <Divider />
        <div className="ml-1">
          <UserMenu />
        </div>
      </div>
    </div>
  );
}

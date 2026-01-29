"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Project } from "@/lib/mockProjects";

interface ProjectCardProps {
  project: Project;
}

function LocationIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const router = useRouter();

  const handleDesignerClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/designer/${project.designerId}`);
  };

  return (
    <Link
      href={`/project/${project.id}`}
      className="block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
    >
      {/* Image with flip animation */}
      <div className="relative aspect-[4/3] [perspective:1000px]">
        <div className="relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
          {/* Front side - Image */}
          <div className="absolute inset-0 [backface-visibility:hidden]">
            <Image
              src={project.image}
              alt={`${project.titleType}, ${project.area} м²`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
            />
          </div>
          {/* Back side - Description */}
          <div className="absolute inset-0 bg-[#D9614C] [backface-visibility:hidden] [transform:rotateY(180deg)] flex items-center justify-center p-4">
            <p className="text-white text-xs text-center leading-relaxed">
              {project.description}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-2.5">
        {/* Type and location row */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-gray-900">
            {project.titleType === "Квартира-студия" ? "Квартира" : project.titleType}, {project.area} м2
          </span>
          <span
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              window.open(`https://www.google.com/maps/search/${encodeURIComponent(project.city)}`, '_blank');
            }}
            className="flex items-center gap-0.5 text-[10px] text-gray-500 hover:text-[#D9614C] transition-colors cursor-pointer"
          >
            <LocationIcon />
            {project.city}
          </span>
        </div>

        {/* Designer and style row */}
        <div className="flex items-center justify-between">
          <button
            onClick={handleDesignerClick}
            className="flex items-center gap-1.5 hover:opacity-80 transition-opacity text-left"
          >
            <Image
              src={project.designerAvatar}
              alt={project.designerName}
              width={20}
              height={20}
              className="rounded-full object-cover"
            />
            <div className="flex flex-col">
              <span className="text-[8px] text-gray-400">Автор</span>
              <span className="text-[10px] text-gray-700 truncate max-w-[80px] hover:text-[#D9614C] transition-colors">{project.designerName}</span>
            </div>
          </button>
          <div className="flex flex-col text-right">
            <span className="text-[8px] text-gray-400">Стиль</span>
            <span className="text-[10px] text-gray-700">{project.style}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

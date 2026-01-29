import { Project } from "@/lib/mockProjects";
import ProjectCard from "./ProjectCard";

interface CatalogGridProps {
  projects: Project[];
}

export default function CatalogGrid({ projects }: CatalogGridProps) {
  if (projects.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-400">
        Проекты не найдены. Попробуйте изменить фильтры.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}

import { mockProjects } from "@/lib/mockProjects";
import ProjectPageClient from "./ProjectPageClient";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = mockProjects.find((p) => p.id === Number(id));

  if (!project) {
    return { title: "Проект не найден — вКвартирах" };
  }

  return {
    title: `${project.titleType}, ${project.area} м² — вКвартирах`,
    description: `Дизайн-проект интерьера в стиле ${project.style}. ${project.rooms}-комнатная, ${project.city}`,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const projectId = Number(id);
  const project = mockProjects.find((p) => p.id === projectId);

  if (!project) {
    notFound();
  }

  // Get other projects by the same designer
  const otherProjects = mockProjects.filter(
    (p) => p.designerName === project.designerName && p.id !== project.id
  );

  return (
    <ProjectPageClient project={project} otherProjects={otherProjects} />
  );
}

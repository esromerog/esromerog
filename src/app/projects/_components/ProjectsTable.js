"use client";

import { useSearchParams } from "next/navigation";
import ProjectCard from "./ProjectCard";

function filterProjects(project, query) {
  if (!query) return true;
  const { name, tags, description, role } = project.metadata;
  const q = query.toLowerCase();
  return (
    name.toLowerCase().includes(q) ||
    description.toLowerCase().includes(q) ||
    role.toLowerCase().includes(q) ||
    tags.some((tag) => tag.name.toLowerCase().includes(q))
  );
}

export default function ProjectsTable({ projects }) {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const filteredProjects = projects.filter((project) =>
    filterProjects(project, query),
  );

  return (
    <div className="project-card-container">
      {filteredProjects.map(({ slug, metadata }) => (
        <ProjectCard key={slug} metadata={metadata} slug={slug} />
      ))}
    </div>
  );
}

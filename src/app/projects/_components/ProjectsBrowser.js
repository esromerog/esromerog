"use client";

import { useState } from "react";
import clsx from "clsx";
import ProjectCard, { isHighlight } from "./ProjectCard";

const FILTERS = [
  { id: "highlights", label: "Highlights", star: true },
  { id: "games-art", label: "Games & Art" },
  { id: "science", label: "Science" },
  { id: "education", label: "Education" },
];

// Highlights narrows the list; the category chips widen it among themselves.
function matchesFilters({ metadata }, active) {
  if (active.has("highlights") && !isHighlight(metadata)) return false;
  const categories = FILTERS.filter(({ id }) => id !== "highlights" && active.has(id));
  if (!categories.length) return true;
  return categories.some(({ id }) => metadata.filters?.includes(id));
}

export default function ProjectsBrowser({ projects }) {
  const [active, setActive] = useState(new Set());

  function toggle(id) {
    setActive((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  const visible = projects.filter(
    (p) => !p.metadata.draft && matchesFilters(p, active),
  );

  return (
    <>
      <div className="project-filter">
        <h2 id="project-filter-label">Filter</h2>
        <div className="chip-group" role="group" aria-labelledby="project-filter-label">
          {FILTERS.map(({ id, label, star }) => {
            const selected = active.has(id);
            return (
              <button
                key={id}
                type="button"
                aria-pressed={selected}
                className={clsx("chip", star && "chip-star", selected && "active")}
                onClick={() => toggle(id)}
              >
                {star && <span className="chip-star-icon" aria-hidden>✦</span>}
                {label}
                {selected && (
                  <span className="material-symbols-outlined chip-x" aria-hidden>
                    close
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
      <div className="project-card-container">
        {visible.map(({ slug, metadata }) => (
          <ProjectCard key={slug} metadata={metadata} slug={slug} />
        ))}
        {!visible.length && <p>No projects match those filters yet.</p>}
      </div>
    </>
  );
}

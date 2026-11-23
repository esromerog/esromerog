import honors from "@/content/cv/honors.json";

// Publications, talks, and awards live in content/cv/honors.json. That file is the single
// source of truth: the CV renders it, and project pages pull from it via <Publication />.
// An entry's `projects` field lists the project slugs it belongs to; the link is shown on both sides.

export function getHonor(id) {
  const honor = honors.find((h) => h.id === id);
  if (!honor) throw new Error(`No entry with id "${id}" in content/cv/honors.json`);
  return honor;
}

export function honorsForProject(slug) {
  return honors.filter((h) => h.projects?.includes(slug));
}

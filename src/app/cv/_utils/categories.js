export function matches({ categories = [], bullets = [] }, category) {
  return (
    categories.includes(category) ||
    bullets.some((b) => b.categories?.includes(category))
  );
}

export function visibleBullets(bullets, category) {
  if (!category) return bullets;
  return bullets?.filter((b) => !b.categories || b.categories.includes(category));
}


export function visibleSkills(skills, category) {
  return skills
    .map(({ group, items }) => ({
      group,
      items: items
        .filter((s) => !category || typeof s === "string" || !s.categories || s.categories.includes(category))
        .map((s) => (typeof s === "string" ? s : s.text)),
    }))
    .filter(({ items }) => items.length);
}

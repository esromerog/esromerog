import { formatRange } from "../app/cv/_utils/dates";
import { getHonor, honorsForProject } from "../app/_utils/honors";

// One publication / talk / award, rendered from content/cv/honors.json.
// Usage in MDX: <Publication id="mobi-2024" />
export function Publication({ id }) {
  const { name, role, org, orgUrl, links, start, end } = getHonor(id);

  return (
    <p className="publication">
      <strong>{name}</strong> · {role}
      <br />
      {orgUrl ? <a href={orgUrl}>{org}</a> : org}, {formatRange(start, end)}
      {links?.map(({ label, url }) => (
        <span key={label}>
          {" ["}
          <a href={url}>{label}</a>
          {"]"}
        </span>
      ))}
      {" ["}
      <a href={`/cv#${id}`}>CV</a>
      {"]"}
    </p>
  );
}

// Every entry on the CV that lists this project. Rendered automatically on project pages.
export function Publications({ project }) {
  const entries = honorsForProject(project);
  if (!entries.length) return null;

  return (
    <>
      <h2>Publications, Conferences, and Awards</h2>
      {entries.map(({ id }) => (
        <Publication key={id} id={id} />
      ))}
    </>
  );
}

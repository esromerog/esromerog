import Link from "next/link";

export const HIGHLIGHT_PRIORITY = 3; // same bar the CV uses for its ✦ entries

export function isHighlight(metadata) {
  return (metadata.cv?.priority ?? 0) >= HIGHLIGHT_PRIORITY;
}

export default function ProjectCard({ slug, metadata }) {
  const { name, tags, description, thumbnail, href, start } = metadata;
  const year = start?.slice(0, 4);
  const external = href?.startsWith("http");
  const linkProps = external
    ? { href, target: "_blank", rel: "noopener noreferrer" }
    : { href: href ?? `/projects/${slug}` };

  return (
    <article className="project-card">
      <div className="card-header">
        <h2 className="card-box card-title">{name}</h2>
        {year && (
          <p className="card-box card-year">
            {isHighlight(metadata) && <span className="card-star">✦</span>}
            {year}
          </p>
        )}
        <Link
          {...linkProps}
          className="card-box card-link"
          aria-label={`Open ${name}`}
        >
          <span className="material-symbols-outlined" aria-hidden>
            arrow_outward
          </span>
        </Link>
      </div>
      <div className="card-body">
        {thumbnail && <img className="card-image" src={thumbnail} alt="" />}
        <p className="card-subtitle">
          <em>{description}</em>
        </p>
      </div>
      <div className="card-tags">
        {tags
          .filter(({ show }) => show)
          .map((tag) => (
            <p className="card-box" key={tag.name}>
              {tag.name}
            </p>
          ))}
      </div>
    </article>
  );
}

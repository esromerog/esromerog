import Link from "next/link";
export default function ProjectCard({ slug, metadata }) {
  const { name, tags, description, role } = metadata;
  return (
    <div className="project-card" key={name}>
      <div id="tags" className="card-tags">
        {tags
          .filter(({ show }) => show)
          .map((tag) => (
            <p key={tag.name}>{tag.name}</p>
          ))}
      </div>
      <div className="card-body">
        <h2>{name}</h2>
        <p>
          <em>{description}</em>
        </p>
        <Link className="button-primary" href={`/projects/${slug}`}>
          Learn More
        </Link>
      </div>
    </div>
  );
}

import clsx from "clsx";
import { formatRange } from "../_utils/dates";
import { visibleBullets } from "../_utils/categories";

export default function CvEntry({ role, name, org, summary, bullets, links, orgUrl, start, end, category, starred, skip, bulletSummary = true }) {
  return (
    <article className={clsx("cv-entry", starred && "cv-starred", skip && "cv-print-skip")}>
      <div className="cv-entry-head">
        <h3>{name ? `${role}: ${name}` : role}</h3>
        <span className="cv-dates">{formatRange(start, end)}</span>
      </div>
      <p className="cv-org">
        @ {orgUrl ? <a href={orgUrl}>{org}</a> : org}
        {links?.map(({ label, url }) => (
          <span key={label}>
            {" ["}
            {url ? <a href={url}>{label}</a> : label}
            {"]"}
          </span>
        ))}
      </p>
      {summary && !bulletSummary && <p className="cv-summary">{summary}</p>}
      {(bullets || (summary && bulletSummary)) && (
        <ul>
          {summary && bulletSummary && <li>{summary}</li>}
          {visibleBullets(bullets, category)?.map(({ text }) => (
            <li key={text}>{text}</li>
          ))}
        </ul>
      )}
    </article>
  );
}

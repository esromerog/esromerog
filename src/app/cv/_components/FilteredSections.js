"use client";

import { useState } from "react";
import clsx from "clsx";
import CvEntry from "./CvEntry";
import PrintButton from "./PrintButton";
import { matches, visibleSkills } from "../_utils/categories";

export default function FilteredSections({ categories, sections, skills, children }) {
  const [category, setCategory] = useState(null);
  const visibleSkillGroups = visibleSkills(skills, category);

  return (
    <>
      <div className="cv-actions no-print">
        <PrintButton />
      </div>
      <div className="cv-filter no-print">
        {[null, ...categories].map((c) => (
          <button
            key={c ?? "all"}
            className={clsx("cv-chip", category === c && "active")}
            onClick={() => setCategory(c)}
          >
            {c ?? "All"}
          </button>
        ))}
      </div>
      {sections.map(({ title, entries, printPriority }) => {
        const visible = entries.filter((e) => !category || matches(e, category));
        if (!visible.length) return null;
        const printable = !printPriority || visible.some((e) => e.priority >= printPriority);
        return (
          <section className={clsx("cv-section", !printable && "cv-print-skip")} key={title}>
            <h2>{title}</h2>
            {visible.map((e) => (
              <CvEntry
                key={e.role + e.name}
                {...e}
                category={category}
                starred={printPriority && e.priority >= printPriority}
                skip={printPriority && !(e.priority >= printPriority)}
              />
            ))}
          </section>
        );
      })}
      {children}
      {visibleSkillGroups.length > 0 && (
        <section className="cv-section">
          <h2>Skills</h2>
          {visibleSkillGroups.map(({ group, items }) => (
            <article className="cv-entry" key={group}>
              <h3>{group}</h3>
              <p className="cv-summary">{items.join(" • ")}</p>
            </article>
          ))}
        </section>
      )}
    </>
  );
}

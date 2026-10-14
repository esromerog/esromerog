import NavBar from "../../_components/Navbar";
import CvEntry from "./_components/CvEntry";
import FilteredSections from "./_components/FilteredSections";
import { getCv } from "./_utils/getCv";
import "./cv.scss";

export const metadata = { title: "CV · Esteban Romero" };

// Everything with a priority of 3 prints
const PRINT_PRIORITY = 3;

const display = (url) => url.replace(/^(https?:\/\/|mailto:)/, "").replace(/\/$/, "");

function Section({ title, empty, children }) {
  if (empty) return null;
  return (
    <section className="cv-section">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

export default async function CV() {
  const { profile, experience, honors, education, skills } = await getCv();
  const { name, pronouns, tagline, email, links, categories } = profile;

  return (
    <div className="portfolio-main">
      <NavBar />
      <div className="projects-page background-beige cv">
        <div className="scrollable-projects">
          <div className="projects-text">
            <p className="cv-contact">
              <a href={links.website}>{display(links.website)}</a> |{" "}
              <a href={`mailto:${email}`}>{email}</a> |{" "}
              <a href={links.github}>{display(links.github)}</a> |{" "}
              <a href={links.itch}>{display(links.itch)}</a>
            </p>
            <div className="cv-body">
              <h1>
                {name} <span className="cv-pronouns">( {pronouns} )</span>
              </h1>
              <p className="m-0 mb-1">
                <em>{tagline}</em>
              </p>
              <FilteredSections
                categories={categories}
                sections={[
                  { title: "Selected Projects & Experience", entries: experience, printPriority: PRINT_PRIORITY },
                  { title: "Publications, Conferences, and Awards", entries: honors },
                ]}
                skills={skills}
              >
                <Section title="Education" empty={!education.length}>
                  {education.map((e) => <CvEntry key={e.role} {...e} />)}
                </Section>
              </FilteredSections>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

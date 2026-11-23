import { getAllProjectMetadata } from "../../projects/_utils/getAllMDX";
import { slugList } from "../../projects/_utils/slugList";
import { sortKey } from "./dates";
import profile from "@/content/cv/profile.json";
import workExperience from "@/content/cv/work-experience.json";
import honors from "@/content/cv/honors.json";
import skills from "@/content/cv/skills.json";


const byPriority = (a, b) =>
  (b.priority ?? 0) - (a.priority ?? 0) ||
  sortKey(b.end ?? b.start) - sortKey(a.end ?? a.start);

export async function getCv() {
  const allProjects = await getAllProjectMetadata(slugList);
  const projects = allProjects
    .filter(({ metadata }) => metadata.cv)
    .map(({ metadata: { name, start, end, cv } }) => ({
      ...cv,
      name: cv.name ?? name,
      start,
      end,
    }));

  // Link each honor to the project pages that reference it (see app/_utils/honors.js).
  const projectName = Object.fromEntries(allProjects.map(({ slug, metadata }) => [slug, metadata.name]));
  const linkedHonors = honors.map(({ projects = [], links = [], ...honor }) => ({
    ...honor,
    links: [
      ...links,
      ...projects.map((slug) => {
        if (!projectName[slug]) throw new Error(`honors.json: "${honor.id}" references unknown project "${slug}"`);
        return { label: projectName[slug], url: `/projects/${slug}` };
      }),
    ],
  }));

  return {
    profile,
    experience: [...projects, ...workExperience].sort(byPriority),
    honors: linkedHonors.sort(byPriority),
    education: [...profile.education].sort(byPriority),
    skills,
  };
}

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
  const projects = (await getAllProjectMetadata(slugList))
    .filter(({ metadata }) => metadata.cv)
    .map(({ metadata: { name, start, end, cv } }) => ({
      ...cv,
      name: cv.name ?? name,
      start,
      end,
    }));

  return {
    profile,
    experience: [...projects, ...workExperience].sort(byPriority),
    honors: [...honors].sort(byPriority),
    education: [...profile.education].sort(byPriority),
    skills,
  };
}

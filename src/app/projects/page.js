// import Garden from "./_components/three-js/garden";
import { slugList } from "./_utils/slugList";
import { getAllProjectMetadata } from "./_utils/getAllMDX";
import ProjectsBrowser from "./_components/ProjectsBrowser";
import FragmentCanvas from "fragment-canvas";
import ShaderBackground from "./_components/ShaderBackground";

export default async function ProjectsPage(props) {
  // return <Garden />;
  const projects = await getAllProjectMetadata(slugList);

  return (
    <div className="projects-page">
      <div className="position-absolute">
        <ShaderBackground key={props.params} />
      </div>
      <div className="scrollable-projects">
        <div className="projects-text">
          <ProjectsHeader />
          <ProjectsBrowser projects={projects} />
        </div>
      </div>
    </div>
  );
}

function ProjectsHeader({}) {
  return (
    <div>
      <h1>my work</h1>
      <p>
        My projects are focused on creating digital worlds tuned to our
        individual physiology and putting those tools in the hands of other
        artists, learners, and players.
      </p>
      {/*<button className="button-primary">Search</button>*/}
    </div>
  );
}

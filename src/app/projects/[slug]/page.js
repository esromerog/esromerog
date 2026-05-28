import { P5Wrapper } from "../../../_components/p5Wrapper/p5Wrapper";
import { backgroundSketch } from "./_components/p5background";
import LinkButton from "../../../_components/LinkButton";
import { slugList } from "../_utils/slugList";

export default async function Page({ params }) {
  const { slug } = await params;
  const { default: Project, metadata } = await import(`@/content/${slug}.mdx`);

  return (
    <div className="projects-page">
      <div className="position-absolute">
        {/*<P5Wrapper
          sketch={backgroundSketch}
        />*/}
      </div>
      <div className="scrollable-projects">
        <div className="projects-text">
          <h1>{metadata.name}</h1>
          <p className="m-0 mb-1">
            <em>{metadata.description}</em>
          </p>
          <div className="button-group mb-2">
            {metadata.links.map(({ url, label }) => (
              <LinkButton href={url} key={label} className="pe-2">
                {label}
              </LinkButton>
            ))}
          </div>
          <Project />
        </div>
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return slugList;
}

export const dynamicParams = false;

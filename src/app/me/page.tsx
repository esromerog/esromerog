import NavBar from "../../_components/Navbar";
import Link from "next/link";
export default function Me() {
  return (
    <div className="portfolio-main">
      <NavBar />
      <div className="projects-page background-beige">
        <div className="scrollable-projects">
          <div className="projects-text">
            <h1>Me</h1>
            <p className="m-0 mb-1">
              <em>Game design graduate student, artist, and researcher.</em>
            </p>
            <div className="d-flex">
              <Link
                href={"/pdfs/EstebanRomeroCV.pdf"}
                target="_blank"
                className="button-primary me-4px"
              >
                CV
              </Link>
              <a
                href={"https://github.com/esromerog/esromerog"}
                target="_blank"
                className="button-primary"
              >
                Portfolio Github
              </a>
            </div>
            <p>
              Creating digital worlds for other artists, learners, and players.
            </p>
            <p>
              Currently, I am a graduate student at NYU's Game Center. I am also
              working as a researcher at MindHive / YouQuantified. My background
              is in Biomedical Engineering at Tecnológico de Monterrey in
              Guadalajara, México.
            </p>
            <h2 className="mb-n0-5">Contact</h2>
            <p>esromerog@gmail.com</p>
            <div className="social-icons">
              <a
                href="https://www.linkedin.com/in/esromerog/"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src="/images/assets/linkedin.svg"
                  alt="Linkedin icon"
                ></img>
              </a>
              <a
                href="https://www.instagram.com/tacosrosas/"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src="/images/assets/instagram.svg"
                  alt="Instagram icon"
                ></img>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

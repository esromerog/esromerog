
import NavBar from "../../_components/Navbar";

export default function ProjectsLayout({ children }) {


  return (
    <div className="portfolio-main">
      <NavBar />
      {children}
    </div>
  );
}

/*
      <div className="main-background"></div>
      <div className="style-overlay"></div>
*/

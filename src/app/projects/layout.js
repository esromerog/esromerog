"use client";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import clsx from "clsx";

function NavBar() {
  const [fullScreenNav, setFullScreenNav] = useState(false);
  const pathname = usePathname();

  return (
    <div className={clsx("navbar-container", fullScreenNav && "active")}>
      <div className={clsx("navbar", fullScreenNav && "active")}>
        <Link href="/projects" className="name-label">
          esteban romero
        </Link>
        <div className={clsx("navigation", fullScreenNav && "active")}>
          <Link
            href="/projects"
            className={clsx(
              "navbar-link",
              pathname.startsWith("/projects") && "active",
            )}
          >
            Projects
          </Link>
          <a
            href="/pdfs/EstebanRomeroCV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="navbar-link"
          >
            CV
          </a>
          <Link
            href="/projects/about"
            className={clsx(
              "navbar-link",
              pathname.startsWith("/projects/about") && "active",
            )}
          >
            Me
          </Link>
          <a
            href="https://github.com/esromerog"
            target="_blank"
            rel="noopener noreferrer"
            className={clsx(
              "navbar-link",
              pathname.startsWith("https://github.com/esromerog") && "active",
            )}
          >
            GitHub
          </a>
          <a
            href="https://immortaicarus.itch.io"
            target="_blank"
            rel="noopener noreferrer"
            className={clsx(
              "navbar-link",
              pathname.startsWith("https://immortaicarus.itch.io") && "active",
            )}
          >
            Games
          </a>
        </div>
        <button
          className="icon material-symbols-outlined"
          onClick={() => setFullScreenNav(!fullScreenNav)}
        >
          {fullScreenNav ? "expand_less" : "more_vert"}
        </button>
      </div>
    </div>
  );
}

export default function ProjectsLayout({ children }) {
  useEffect(() => {
    // document.body.style.overflow = "scroll";
    document.body.style.backgroundColor = "white";
  }, []);

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

"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";
import { links } from "@/content/cv/profile.json";

export default function NavBar() {
  const [fullScreenNav, setFullScreenNav] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // document.body.style.overflow = "scroll";
    document.body.style.backgroundColor = "white";
  }, []);

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
          <Link
            href="/me"
            className={clsx(
              "navbar-link",
              pathname.startsWith("/me") && "active",
            )}
          >
            Me
          </Link>
          <a
            href={links.github}
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
            href={links.itch}
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

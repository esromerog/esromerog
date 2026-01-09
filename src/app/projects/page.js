"use client";

import React, { useRef, useState, useEffect } from "react";
import portfolioInfo from "../../portfolio_info.json";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useRouter } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);


export function ButtonList({ obj, isMain, changeWebPage }) {
  if ("links" in obj) {
    const btnList = Object.keys(obj.links).map((key) => {
      return (
        <a
          className="button-content"
          target="_blank"
          rel="noopener noreferrer"
          href={obj.links[key]}
          key={obj.links[key]}
        >
          {key}
        </a>
      );
    });
    return (
      <div className="button-list">
        {btnList}
        {isMain && (
          <button className="button-content" onClick={changeWebPage}>
            More
          </button>
        )}
      </div>
    );
  } else {
    return null;
  }
}

function CompressedInfoCard({ obj, keyName }) {
  const [isInCenter, setIsInCenter] = useState(false);
  const objRef = useRef(null);

  function getPos() {
    if (objRef.current != null) {
      const pos = ScrollTrigger.positionInViewport(objRef.current);
      if (pos > 0.4 && pos < 0.65) {
        setIsInCenter(true);
      } else {
        setIsInCenter(false);
      }
    }
  }

  useEffect(() => {
    ScrollTrigger.observe({
      target: objRef.current,
      type: "wheel,scroll",
      onChangeY: getPos,
    });
    ScrollTrigger.observe({
      target: ".portfolio-main",
      type: "touch",
      onChangeY: getPos,
    });
    getPos();
  }, []);

  const router = useRouter();

  function changeWebPage() {
    gsap.to(window, {
      scrollTo: {
        y: objRef.current,
        offsetY: 0,
      },
      duration: 0.5,
    });
    gsap.to(objRef.current, {
      height: "100vh",
      pin: true,
      duration: 0.5,
    });
    gsap.to(objRef.current, {
      opacity: 0,
      duration: 0.5,
      onComplete: () =>
        setTimeout(() => router.push(`/projects/${keyName}`), 1000),
    });
  }

  return (
    <div
      className={`info-card ${isInCenter && "center"}`}
      key={obj.name}
      ref={objRef}
    >
      <div className="row">
        <div className="info-card-title">
          <button onClick={changeWebPage}>
            <h2>{obj.name}</h2>
          </button>
          <p>{obj.short}</p>
          {isInCenter && (
            <button className="more" onClick={changeWebPage}>
              <span className="material-symbols-outlined">expand_content</span>
            </button>
          )}
        </div>
        <div className="info-card-description">
          <div>
            <h3>Description</h3>
            <p>{obj.description}</p>
          </div>
          <ButtonList obj={obj} isMain={true} changeWebPage={changeWebPage} />
        </div>
      </div>
      <div className="accordion-content">
        <div className="info-card-description">
          <h3>Role</h3>
          <p>{obj.role}</p>
        </div>
      </div>
    </div>
  );
}

function InfoCards() {
  const allInfoCards = Object.keys(portfolioInfo).map((key) => {
    const obj = portfolioInfo[key];
    return <CompressedInfoCard obj={obj} key={key} keyName={key} />;
  });

  return (
    <div>
      <div className="spacer"></div>
      {allInfoCards}
      <div className="spacer"></div>
    </div>
  );
}

export default function ProjectsPage() {
  return <InfoCards />;
}

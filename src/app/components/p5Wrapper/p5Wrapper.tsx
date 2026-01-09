"use client";

import React, { useEffect, useRef, useState } from "react";
import p5Types from "p5";

declare global {
  interface Window {
    p5: typeof p5Types;
  }
}

export type P5jsSketch = (
  p: p5Types,
  parentRef: P5jsContainerRef,
  params: { [key: string]: any }
) => void;
type P5jsContainerRef = HTMLDivElement;
type P5jsContainer = ({
  sketch,
  ...params
}: { sketch: P5jsSketch } & { [key: string]: any }) => React.JSX.Element;

export const P5Wrapper: P5jsContainer = ({ sketch, ...params }) => {
  const parentRef = useRef<P5jsContainerRef>();
  const [isMounted, setIsMounted] = useState<boolean>(false);

  // on mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    let p5instance: p5Types;
    const initP5 = async () => {
      try {
        // import the p5 and p5-sounds client-side
        const p5 = (await import("p5")).default;
        window.p5 = p5;
        await import("p5/lib/addons/p5.sound");
        new p5((p: p5Types) => {
          sketch(p, parentRef.current, params);
          p5instance = p;
        });
      } catch (error) {
        console.log(error);
      }
    };

    initP5();

    return () => {
      if (p5instance) {
        p5instance.remove();
      }
    };
  }, [isMounted, sketch]);

  return <div ref={parentRef}></div>;
};

"use client";

import FragmentCanvas from "fragment-canvas";
import { useRef, useEffect } from "react";
import frag from "./shaders/gradient-sky.frag.glsl";
import { consumeIntroEntry } from "@/_components/PageTransition";

// When arriving from the intro, the colors fade in from black
const REVEAL_DELAY_MS = 200;
const REVEAL_MS = 2000;

export default function ShaderBackground() {
  const canvasRef = useRef(null);
  const instanceRef = useRef(null);

  useEffect(() => {
    const createBg = () => {
      if (!instanceRef.current)
        instanceRef.current = createShaderBg(canvasRef.current, consumeIntroEntry());
    };
    createBg();
  }, []);

  return <canvas className="w-100 h-100" ref={canvasRef}></canvas>;
}

const createShaderBg = (canvas, fadeIn) => {
  const dpr = window.devicePixelRatio || 1;
  const width = canvas.offsetWidth * dpr;
  const height = canvas.offsetHeight * dpr;
  canvas.width = width;
  canvas.height = height;

  const start = performance.now();
  const reveal = () =>
    fadeIn ? Math.min(Math.max((performance.now() - start - REVEAL_DELAY_MS) / REVEAL_MS, 0), 1) : 1;

  return new FragmentCanvas(canvas, {
    fragmentShader: frag,
    autoRender: true,
    uniforms: {
      uReveal: (gl, location) => gl.uniform1f(location, reveal()),
    },
  });
};

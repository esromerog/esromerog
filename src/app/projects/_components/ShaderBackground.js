"use client";

import FragmentCanvas from "fragment-canvas";
import { useRef, useEffect } from "react";
import frag from "./shaders/gradient-sky.frag.glsl";

export default function ShaderBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const createBg = () => createShaderBg(canvasRef.current);
    createBg();
    // window.addEventListener("resize", createBg);
    return () => {
      // window.removeEventListener("resize", createBg);
    };
  }, []);

  return <canvas className="w-100 h-100" ref={canvasRef}></canvas>;
}

const createShaderBg = (canvas) => {
  const dpr = window.devicePixelRatio || 1;
  const width = canvas.offsetWidth * dpr;
  const height = canvas.offsetHeight * dpr;
  canvas.width = width;
  canvas.height = height;

  return new FragmentCanvas(canvas, {
    fragmentShader: frag,
    autoRender: true,
  });
};

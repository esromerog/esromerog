"use client";

import FragmentCanvas from "fragment-canvas";
import { useRef, useEffect } from "react";
import frag from "./shaders/gradient-sky.frag.glsl";

export default function ShaderBackground() {
  const canvasRef = useRef(null);
  const instanceRef = useRef(null);

  useEffect(() => {
    const createBg = () => {
      if (!instanceRef.current)
        instanceRef.current = createShaderBg(canvasRef.current);
    };
    createBg();
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

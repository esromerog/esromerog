"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import grassShader from "./shaders/grassShader";
import { OutlineEffect } from "three/examples/jsm/Addons.js";

export default function Garden() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.style.background = "black";

    gardenJS(canvas);
  }, []);

  return <div className="h-100 w-100 no-scroll" ref={canvasRef} />;
}

// ThreeJS code begins here

// Parameters
const PLANE_SIZE = 50;
const BLADE_COUNT = 100000;
const BLADE_WIDTH = 0.3;
const BLADE_HEIGHT = 0.8;
const BLADE_HEIGHT_VARIATION = 0.6;

const grassMaterialSpecular = new THREE.MeshPhongMaterial({
  color: 0x7bd934,
  shininess: 200,
});

const startTime = Date.now();
const timeUniform = { type: "f", value: 0.0 };

const dirLightPos = new THREE.Vector3(5, 5, 5);
const dirLightTarget = new THREE.Vector3(0, 0, 0);
const lightDirection = dirLightPos.clone().sub(dirLightTarget);

const grassUniforms = {
  tip_offset: { value: 0.1 },
  shadowColor: { value: new THREE.Vector3(0, 0.5, 0.1) },
  highlightColor: { value: new THREE.Vector3(0, 0.75, 0.25) },
  iTime: timeUniform,
  lightDir: { value: lightDirection },
};

const grassMaterial = new THREE.ShaderMaterial({
  uniforms: grassUniforms,
  vertexShader: grassShader.vert,
  fragmentShader: grassShader.frag,
  side: THREE.DoubleSide,
});

function gardenJS(canvas) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x96d4e0);
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );

  camera.position.set(0, 2, 5);
  camera.lookAt(0, 0, 0);

  const ambientLight = new THREE.AmbientLight(0x404040); // soft white light
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);

  directionalLight.position.set(dirLightPos);
  directionalLight.target.position.set(dirLightTarget);

  scene.add(directionalLight);
  scene.add(directionalLight.target);
  scene.add(ambientLight);

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);
  // scene.add(cube);

  const plane = new THREE.PlaneGeometry( PLANE_SIZE, PLANE_SIZE );
  plane.rotateX(Math.PI/2);
  const planeMaterial = new THREE.MeshBasicMaterial( { color: 0x2c8a3f, side: THREE.DoubleSide } );
  const planeMesh = new THREE.Mesh( plane, planeMaterial );
  scene.add( planeMesh );

  generateField(scene);

  const renderer = new THREE.WebGLRenderer();

  renderer.shadowMap.enabled = true;
  renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);

  /*
  const effect = new OutlineEffect(renderer, {
    defaultColor: [1, 1, 1],
    defaultThickness: 0.1,
  });*/

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.update();

  function animate(time) {
    renderer.render(scene, camera);
    controls.update();
    const elapsedTime = Date.now() - startTime;
    grassUniforms.iTime.value = elapsedTime;
  }

  renderer.setAnimationLoop(animate);
  canvas.appendChild(renderer.domElement);
}

// Grass generation functions obtained and modified from
// https://github.com/James-Smyth/three-grass-demo
// https://www.youtube.com/watch?v=bp7REZBV4P4&t=563s

function generateField(scene) {
  const positions = [];
  const uvs = [];
  const indices = [];
  const colors = [];

  for (let i = 0; i < BLADE_COUNT; i++) {
    const VERTEX_COUNT = 5;
    const surfaceMin = (PLANE_SIZE / 2) * -1;
    const surfaceMax = PLANE_SIZE / 2;
    const radius = PLANE_SIZE / 2;

    const r = radius * Math.sqrt(Math.random());
    const theta = Math.random() * 2 * Math.PI;
    const x = r * Math.cos(theta);
    const y = r * Math.sin(theta);

    const pos = new THREE.Vector3(x, 0, y);

    const uv = [
      remap(pos.x, surfaceMin, surfaceMax, 0, 1),
      remap(pos.z, surfaceMin, surfaceMax, 0, 1),
    ];

    const blade = generateBlade(pos, i * VERTEX_COUNT, uv);
    blade.verts.forEach((vert) => {
      positions.push(...vert.pos);
      uvs.push(...vert.uv);
      colors.push(...vert.color);
    });
    blade.indices.forEach((indice) => indices.push(indice));
  }

  const geom = new THREE.BufferGeometry();
  geom.setAttribute(
    "position",
    new THREE.BufferAttribute(new Float32Array(positions), 3),
  );
  geom.setAttribute("uv", new THREE.BufferAttribute(new Float32Array(uvs), 2));
  geom.setAttribute(
    "color",
    new THREE.BufferAttribute(new Float32Array(colors), 3),
  );
  geom.setIndex(indices);
  geom.computeVertexNormals();

  const mesh = new THREE.Mesh(geom, grassMaterial);
  scene.add(mesh);
}

function remap(val, oldMin, oldMax, newMin, newMax) {
  return ((val - oldMin) * (newMax - newMin)) / (oldMax - oldMin) + newMin;
}

function generateBlade(center, vArrOffset, uv) {
  const MID_WIDTH = BLADE_WIDTH * 0.5;
  const TIP_OFFSET = 0.1;
  const height = BLADE_HEIGHT + Math.random() * BLADE_HEIGHT_VARIATION;

  const yaw = Math.random() * Math.PI * 2;
  const yawUnitVec = new THREE.Vector3(Math.sin(yaw), 0, -Math.cos(yaw));
  // const tipBend = Math.random() * Math.PI * 2;
  const tipBend = 0;
  const tipBendUnitVec = new THREE.Vector3(
    Math.sin(tipBend),
    0,
    -Math.cos(tipBend),
  );

  // Find the Bottom Left, Bottom Right, Top Left, Top right, Top Center vertex positions
  const bl = new THREE.Vector3().addVectors(
    center,
    new THREE.Vector3().copy(yawUnitVec).multiplyScalar((BLADE_WIDTH / 2) * 1),
  );
  const br = new THREE.Vector3().addVectors(
    center,
    new THREE.Vector3().copy(yawUnitVec).multiplyScalar((BLADE_WIDTH / 2) * -1),
  );
  const tl = new THREE.Vector3().addVectors(
    center,
    new THREE.Vector3().copy(yawUnitVec).multiplyScalar((MID_WIDTH / 2) * 1),
  );
  const tr = new THREE.Vector3().addVectors(
    center,
    new THREE.Vector3().copy(yawUnitVec).multiplyScalar((MID_WIDTH / 2) * -1),
  );
  const tc = new THREE.Vector3().addVectors(
    center,
    new THREE.Vector3().copy(tipBendUnitVec).multiplyScalar(TIP_OFFSET),
  );

  tl.y += height / 2;
  tr.y += height / 2;
  tc.y += height;

  // Vertex Colors
  const black = [0, 0, 0];
  const gray = [0.5, 0.5, 0.5];
  const white = [1.0, 1.0, 1.0];

  const verts = [
    { pos: bl.toArray(), uv: uv, color: black },
    { pos: br.toArray(), uv: uv, color: black },
    { pos: tr.toArray(), uv: uv, color: gray },
    { pos: tl.toArray(), uv: uv, color: gray },
    { pos: tc.toArray(), uv: uv, color: white },
  ];

  const indices = [
    vArrOffset,
    vArrOffset + 1,
    vArrOffset + 2,
    vArrOffset + 2,
    vArrOffset + 4,
    vArrOffset + 3,
    vArrOffset + 3,
    vArrOffset,
    vArrOffset + 2,
  ];

  return { verts, indices };
}

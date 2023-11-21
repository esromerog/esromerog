import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

import tower from '../assets/tower.glb'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function Tower() {

    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.style.background = 'black';

        const scene = new THREE.Scene()
        //scene.add(new THREE.AxesHelper(20))

        const light = new THREE.SpotLight()
        light.position.set(5, 5, 5)
        scene.add(light)

        const camera = new THREE.PerspectiveCamera(
            75,
            canvas.offsetWidth / canvas.offsetHeight,
            0.1,
            1000
        )
        camera.position.z = 2

        let renderer = new THREE.WebGLRenderer({ antialias: true, transparent: true, powerPreference: "high-performance" });

        renderer.shadowMap.enabled = true
        renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
        canvas.appendChild(renderer.domElement);

        const loader = new GLTFLoader()
        loader.load(
            tower,
            (gltf) => {
                // Bottom light inside
                gltf.scene.children[2].intensity /= 3000;
                // Top light inside
                gltf.scene.children[3].intensity /= 1000;
                // Top left light
                gltf.scene.children[4].intensity /= 3000;
                // Top right light
                gltf.scene.children[5].intensity /= 3000;
                scene.add(gltf.scene)
            },
            (xhr) => {
                console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
            },
            (error) => {
                console.log(error)
            }
        )

        var points = [
            [14, 33, 0],
            [0, 21, -25],
            [-20, 15, 0],
            [0, 12, 15],
            [10, 6, -4]
        ];

        //Convert the array of points into vertices
        for (var i = 0; i < points.length; i++) {
            var x = points[i][0];
            var y = points[i][1];
            var z = points[i][2];
            points[i] = new THREE.Vector3(x, y, z);
        }

        //Create a path from the points
        var path = new THREE.CatmullRomCurve3(points);
        path.curveType = 'catmullrom';
        path.tension = .8;

        var p1;

        function updateCameraPercentage(percentage) {
            p1 = path.getPointAt(percentage % 1);

            camera.position.set(p1.x, p1.y, p1.z);
            camera.lookAt(0, 3, 0);
        }

        var cameraTargetPercentage = 0;
        var currentCameraPercentage = 0;

        var tubePerc = {
            percent: 0
        }

        var tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".scrollTargetTower",
                start: "top top",
                end: "bottom bottom",
                scroller: "#parent-scroll",
                scrub: 1,
            }
        })
        tl.to(tubePerc, {
            percent: 0.96,
            ease: "none",
            onUpdate: function () {
                cameraTargetPercentage = tubePerc.percent;
            }
        });



        let onWindowResize = () => {
            camera.aspect = canvas.offsetWidth / canvas.offsetHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
        };

        window.addEventListener('resize', onWindowResize, false);
        let id;

        function animate() {
            id = requestAnimationFrame(animate)
            render()
        }

        function render() {
            //texture.offset.x+=.004
            //texture2.needsUpdate = true;
            currentCameraPercentage = cameraTargetPercentage
            updateCameraPercentage(currentCameraPercentage);


            renderer.render(scene, camera);
        }

        animate()

        return () => {
            window.removeEventListener('resize', onWindowResize);
            cancelAnimationFrame(id);
            renderer.clear();
            renderer.dispose();
        };

    }, [])

    return <div className="h-100 w-100" ref={canvasRef} />
}

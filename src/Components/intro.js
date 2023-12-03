import React, { useState, useRef, useEffect } from "react";
import P5Wrapper from "./sketch";
import Tower from "./towerAnimation";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin"
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(MotionPathPlugin);


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function ScrambleLetters(header) {
    const alphabet = [];
    // ASCII values for uppercase letters 'A' to 'Z' are in the range 65 to 90
    for (let i = 65; i <= 100; i++) {
        // Use String.fromCharCode to convert ASCII value to a letter and push it to the array
        alphabet.push(String.fromCharCode(i));
    }

    await sleep(300);
    const title = "ESTEBAN ROMERO"
    var letterChangeInitial = setInterval(() => {
        const letter = Math.floor(Math.random() * 25);
        const letterNum = Math.floor(Math.random() * title.length);

        let text = header.innerText;

        text = text.split("")
        text[letterNum] = alphabet[letter];
        text = text.join('');
        header.innerText = text;
    }, 10);

    setTimeout(async () => {
        clearInterval(letterChangeInitial);
        const selectedLetters = [];
        const i = setInterval(() => {
            let letterNum = Math.floor(Math.random() * title.length);
            while (selectedLetters.includes(letterNum)) {
                letterNum = Math.floor(Math.random() * title.length);
            }

            selectedLetters.push(letterNum);
            let text = header.innerText;
            text = text.split("")
            text[letterNum] = title[letterNum];
            text = text.join('');
            header.innerText = text;

            if (text === title) {
                clearInterval(i);
            }

        }, 5)
        // 15 and 3000
    }, 1500);
}

function StartScreen() {

    const [isPlaying, _setIsPlaying] = useState(false);
    const playButtonRef = useRef(null)
    const isPlayingRef = useRef(isPlaying);
    const [show, setShow] = useState(false);
    const header = useRef(null);
    function setIsPlaying(val) {
        _setIsPlaying(val);
        isPlayingRef.current = val;
    }

    useEffect(() => {
        document.body.style.overflowY = "hidden";
        document.body.style.backgroundColor = "black";

        ScrambleLetters(header.current);

        var tl = gsap.timeline();

        tl.to(".blocking", {
            opacity: 0,
            duration: 1,
            delay: 2,
        })
        tl.set(".blocking", {
            duration: 2,
            display: "none"
        })
        tl.set("#Layer_1",{
            opacity: 1
        })
        tl.to(".cls-2", {
            duration: 1,
            ease: "linear",
            motionPath: {
                path: "#path",
            }
        })

        tl.to(".cls-1", {
            duration: 1,
            ease: "linear",
            motionPath: {
                path: "#path",
            },
            onComplete: () => setShow(true)
        }, "<")
        
    }, [])


    return (
        <div className="margin-0">
            <div className="blocking"></div>
            <div className="position-absolute">
                <P5Wrapper isPlaying={isPlayingRef} setIsPlaying={setIsPlaying} playButtonRef={playButtonRef} />
            </div>
            <div className="large-top" id="first-part">
                <div className="intro-div">
                    <h1 className="initial-header" ref={header}>LOADING</h1>
                    <p>Welcome to my portfolio website.</p>
                    <button type="button" className="fade-in btn-start material-symbols-outlined" ref={playButtonRef}>{isPlaying ? "volume_up" : "volume_off"}</button>
                    <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8.18 133.1" width={10} className="mt" style={{opacity: 0}}><path d="M 0 -132 L 0 0" id="path"></path><line x1="4.09" x2="4.09" y2="132.01" className="cls-1" /><polygon points="0 128.7 .73 128.02 4.09 131.63 7.45 128.02 8.18 128.7 4.09 133.1 0 128.7" className="cls-2" /></svg>
                    <h3 className={`reveal ${show && "show"}`}>Scroll Down</h3>
                </div>
            </div>
            <div className="h-100 center-content">
                <p>There is a world within each of our minds</p>
            </div>
            <div className="h-100 center-content">
                <p>I believe in technology as the means to discover the universe we all create</p>
            </div>
            <div id="p5_loading"></div>
        </div>
    )
}

function TowerScroll() {

    const navigate = useNavigate();

    function enterPortfolio() {

        gsap.to(".main-background", {
            duration: 1.5,
            opacity: 1,
            ease: "power3.in",
            onComplete: () => navigate("/portfolio")
        })
        gsap.set(".main-background", {
            display: "block"
        })
        gsap.set(".style-overlay", {
            display: "block"
        })
        gsap.to(".style-overlay", {
            duration: 1.5,
            opacity: 1,
            ease: "power3.in",
            onComplete: () => setTimeout(()=>navigate("/portfolio"), 500)
        })
        gsap.set(".background-layer", {
            opacity: 0,
        })
    }

    return (
        <div>
            <div className="position-sticky">
                <Tower />
            </div>
            <div className="scrollTargetTower">
                <div className="h-100 center-content">
                    <div>
                        <p>This portfolio is a city in my world,</p>
                    </div>
                </div>
                <div className="h-100 center-content">
                    <div>
                        <p>Now, I invite you to explore, traveler from the stars.</p>
                        <button className="begin" onClick={enterPortfolio}>Enter</button>
                    </div>
                    <div className="background-layer" ></div>
                    <div className="main-background front" style={{display: "none", opacity: 0}}></div>
                    <div className="style-overlay front" style={{display: "none", opacity: 0}}></div>
                </div>
            </div>

        </div>
    )
}

export default function IntroScreen() {
    return (
        <div className="scrollable h-100 intro-wrapper" id="parent-scroll">
            <StartScreen />
            <TowerScroll />
        </div>
    )
}
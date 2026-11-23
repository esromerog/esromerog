"use client";

import React, { useState, useRef, useEffect } from "react";
import { P5Wrapper } from "../../../_components/p5Wrapper/p5Wrapper";
import { starsSketch } from "./stars";
import Link from "next/link";
import { links } from "@/content/cv/profile.json";
import { useFadeNavigate } from "@/_components/PageTransition";


function StartScreen() {

    const [isPlaying, _setIsPlaying] = useState(false);
    const playButtonRef = useRef(null)
    const isPlayingRef = useRef(isPlaying);
    const header = useRef(null);
    const fadeTo = useFadeNavigate();

    function setIsPlaying(val) {
        _setIsPlaying(val);
        isPlayingRef.current = val;
    }

    useEffect(() => {
        document.body.style.overflowY = "hidden";
        document.body.style.backgroundColor = "black";

       // ScrambleLetters(header.current);
        
    }, [])


    return (
        <div className="margin-0">
            <div className="position-absolute">
                <P5Wrapper sketch={starsSketch} isPlaying={isPlayingRef} setIsPlaying={setIsPlaying} playButtonRef={playButtonRef} />
            </div>
            <button type="button" className="sound-toggle material-symbols-outlined" aria-label={isPlaying ? "Mute music" : "Play music"} ref={playButtonRef}>{isPlaying ? "volume_up" : "volume_off"}</button>
            <div className="large-top" id="first-part">
                <div className="intro-div">
                    {isPlaying && <p className="music-author">Music: Berlinist - Gris Pt.2 <a href="https://www.berlinistmusic.com/" target="_blank" rel="noopener noreferrer">(© Berlinist / Nomada Studio)</a></p>}
                    <h1 className="initial-header" ref={header}>esteban romero</h1>
                    <div className="intro-link-group">
                        <Link href={"/projects"} onClick={fadeTo("/projects")}>My work</Link>
                        <span>✦</span>
                        <Link href={"/me"} onClick={fadeTo("/me")}>About</Link>
                        <span>✦</span>
                        <Link href={"/cv"} onClick={fadeTo("/cv")}>CV</Link>
                        <span>✦</span>
                        <a href={links.itch} target="_blank" rel="noopener noreferrer">Itch</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function IntroScreen() {
    return (
        <div className="scrollable h-100 intro-wrapper" id="parent-scroll">
            <StartScreen />
        </div>
    )
}
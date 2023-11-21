import React, { useState, useRef } from "react";
import P5Wrapper from "./sketch";
import Tower from "./towerAnimation";
import { Link, useParams } from 'react-router-dom';

function StartScreen() {

    const [isPlaying, _setIsPlaying] = useState(false);
    const playButtonRef = useRef(null)
    const isPlayingRef = useRef(isPlaying);

    function setIsPlaying(val) {
        _setIsPlaying(val);
        isPlayingRef.current = val;
    }

    return (
        <div className="margin-0">
            <div className="position-absolute">
                <P5Wrapper isPlaying={isPlayingRef} setIsPlaying={setIsPlaying} playButtonRef={playButtonRef} />
            </div>
            <div className="large-top" id="first-part">
                <div className="intro-div">
                    <h1 className="initial-header">ESTEBAN ROMERO</h1>
                    <p>Welcome to my portfolio website.</p>
                    <button type="button" className="fade-in btn-start" ref={playButtonRef}>Start</button>
                </div>
            </div>
            <div className="h-100 center-content">
                <div className="sticky-text">
                    <p>There is a world within each of our minds</p>
                </div>
            </div>
            <div className="h-100 center-content">
                <div className="sticky-text">
                    <p>I believe in technology as the means to discover the universe we all create</p>
                </div>
            </div>
            <div id="p5_loading"></div>
        </div>
    )
}

function TowerScroll() {
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
                <div className="h-100 center-content position-sticky">
                    <div>
                        <p>Now, I invite you to explore, traveler from the stars.</p>
                    </div>
                </div>
                <Link to="/portfolio">Begin</Link>
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
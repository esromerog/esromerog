import React, { useRef, useState, useEffect } from 'react'
import portfolioInfo from '../portfolio_info.json'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { Routes, Route, useNavigate, Link, useParams } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import { ButtonList } from './portfolio'

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);
document.body.style.overflow = "scroll";
document.body.style.backgroundColor = "white";


function NextElement({ currSelection }) {

    function getNextInfo(currSelection) {
        const keys = Object.keys(portfolioInfo);
        const currIndx = keys.indexOf(currSelection);
        if (currIndx === keys.length - 1) {
            return keys[0]
        } else {
            return keys[currIndx + 1]
        }
    }

    const nextSelection = getNextInfo(currSelection);
    const nextInfo = portfolioInfo[nextSelection];

    const objRef = useRef(null);
    const navigate = useNavigate();

    function changeWebPage() {
        const tl = gsap.timeline()
        objRef.current.style.position = "inherit";
        tl.to(objRef.current, {
            height: '100vh',
            duration: 0,
            // onComplete: () => navigate(`/portfolio/${obj.name}`)
        })
        tl.to(window, {
            scrollTo: {
                y: objRef.current,
            },
            duration: 0.7,
            ease: "linear"
        })
        tl.to(objRef.current, {
            opacity: 0,
            duration: 1,
            onComplete: () => setTimeout(() => navigate(`/portfolio/${nextSelection}`), 1000)
        }, '<')
    }

    return (
        <div className='next-element' ref={objRef}>
            <button onClick={changeWebPage}>
                <h3>Next Project</h3>
                <h2>{nextInfo.name}</h2>
                <p>{nextInfo.short}</p>
            </button>
        </div >
    )
}

export function MyndMusic() {

    const currentSelection = "mynd_music";
    const info = portfolioInfo[currentSelection];

    const mainDivRef = useRef(null);

    // Effect when the page appears
    useEffect(() => {
        gsap.fromTo(mainDivRef.current, { opacity: 0 }, {
            opacity: 1,
            duration: 1.5,
        })
    })

    return (
        <div ref={mainDivRef}>
            <div className='expanded'>
                <div className='initial-intro'>
                    <h2>Mynd Music</h2>
                    <h3>Description</h3>
                    <p>It all begins by creating a feeling, and translating it into music. Mynd Music is a project where we seek to create music based on a person's feelings throughout a VR experience.</p>
                    <p>It was presented at INC Monterrey 2022 on behalf of Laboratorio Arte, A.C. </p>
                    <p>
                        The core team consisted of five people tasked with music production, analysis, connectivity and the design of the physical installation.
                    </p>
                </div>
                <div className='split-layout'>
                    <div className='info'>
                        <div>
                            <h3>Role</h3>
                            <p>Creative Director · Main Programmer - 3D Experience · Programmer - EEG Analysis Pipeline</p>
                            <h3>Tools</h3>
                            <p>
                                Unity 3D · MNE · BrainFlow · TCP
                            </p>
                        </div>
                        <ButtonList obj={info} />
                    </div>
                    <div className='image-carousel'>
                        <img className="first-image" src="/esromerog/images/mynd_music/presentation.jpg"></img>
                        <Carousel fade touch>
                            <Carousel.Item>
                                <img src="/esromerog/images/mynd_music/intro.png"></img>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img src="/esromerog/images/mynd_music/forest.png"></img>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img src="/esromerog/images/mynd_music/coffee.png"></img>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img src="/esromerog/images/mynd_music/coffee2.png"></img>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img src="/esromerog/images/mynd_music/dessert.png"></img>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img src="/esromerog/images/mynd_music/end.png"></img>
                            </Carousel.Item>
                        </Carousel>
                    </div>
                </div>
            </div>
            <NextElement currSelection={currentSelection} />
        </div>
    )
}


export function AThousandWordSpeller() {

    const currentSelection = "thousand-word-speller";
    const info = portfolioInfo[currentSelection];

    const mainDivRef = useRef(null);

    // Effect when the page appears
    useEffect(() => {
        gsap.fromTo(mainDivRef.current, { opacity: 0 }, {
            opacity: 1,
            duration: 1.5,
        })
    })

    return (
        <div ref={mainDivRef}>
            <video className="top-image" autoPlay={true} loop={true} src='/esromerog/images/thousand-word-speller/video.mov' muted={true} />
            <div className='expanded no-margin'>
                <div className='initial-intro'>
                    <h2>A Thousand-Word Speller</h2>
                    <h3>Description</h3>
                    <p>How can we effectively convey and express the images within our minds? Especially when our means of communication, either because verbal or motor impairment, are limited.</p>
                    <p>This is a P300 based speller with a board made up of images. This method uses generative image and language models to create new pictures in real-time based on the user's current selections.</p>
                </div>
                <div className='split-layout'>
                    <div className='info'>
                        <div>
                            <p>This project obtained second place at the Spring 2022 IEEE BR41N.io Hackathon.</p>
                            <h3>Role & Tools</h3>
                            <p>
                                I programmed the interface with ChatGPT and Stable Diffussion’s APIs, contributed to the design of the board, and system testing.
                            </p>
                        </div>
                        <ButtonList obj={info} />
                    </div>
                    <div className='image-carousel'>
                        <Carousel fade touch>
                            <Carousel.Item>
                                <img src="/esromerog/images/thousand-word-speller/dog.png"></img>
                                <Carousel.Caption>
                                    <h3>Prompt</h3>
                                    <p>Space, dog, pixel-art</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img src="/esromerog/images/thousand-word-speller/dolphin.png"></img>
                                <Carousel.Caption>
                                    <h3>Prompt</h3>
                                    <p>Dolphin, beach, sunset</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img src="/esromerog/images/thousand-word-speller/lion.png"></img>
                                <Carousel.Caption>
                                    <h3>Prompt</h3>
                                    <p>Space, lion, digital art</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img src="/esromerog/images/thousand-word-speller/restaurant.png"></img>
                                <Carousel.Caption>
                                    <h3>Prompt</h3>
                                    <p>Future, restaurant, digital art</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                        </Carousel>
                    </div>
                </div>
            </div>
            <NextElement currSelection={currentSelection} />
        </div>
    )
}

export function Waterfall() {

    const currentSelection = "waterfall";
    const info = portfolioInfo[currentSelection];

    const mainDivRef = useRef(null);

    // Effect when the page appears
    useEffect(() => {
        gsap.fromTo(mainDivRef.current, { opacity: 0 }, {
            opacity: 1,
            duration: 1.5,
        })
    })

    return (
        <div ref={mainDivRef}>
            <div className='expanded'>
                <div className='initial-intro'>
                    <h2>Waterfall</h2>
                    <h3>Description</h3>
                    <p>
                        We may perceive the flow of time actively, as if we’re moving through it, or passively, where we remain static and time moves through us like a waterfall. In this project, we create an immersive VR platformer where the main mechanic to advance is controlling your concentration to speed up or slow down the flow of time.
                    </p>
                </div>
                <div className='split-layout'>
                    <div className='info'>
                        <div>
                            <h3>Role & Tools</h3>
                            <p>
                                I set up the VR experience in Unity and programmed the EEG analysis pipeline with signal acquisition.
                            </p>
                        </div>
                        <ButtonList obj={info} />
                    </div>
                    <div className='image-carousel'>
                        <Carousel fade touch>
                            <Carousel.Item>
                                <img src="/esromerog/images/waterfall/process.jpeg"></img>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img src="/esromerog/images/waterfall/testing.png"></img>
                            </Carousel.Item>
                        </Carousel>
                    </div>
                </div>
            </div>
            <NextElement currSelection={currentSelection} />
        </div>
    )
}

export function BeatMotion() {

    const currentSelection = "beat-motion";
    const info = portfolioInfo[currentSelection];

    const mainDivRef = useRef(null);

    // Effect when the page appears
    useEffect(() => {
        gsap.fromTo(mainDivRef.current, { opacity: 0 }, {
            opacity: 1,
            duration: 1.5,
        })
    })

    return (
        <div ref={mainDivRef}>
            <video className="top-image" autoPlay={true} loop={true} muted={true} src='/esromerog/images/beat-motion/video.mp4' />
            <div className='expanded no-margin'>
                <div className='initial-intro'>
                    <h2>Beat Motion</h2>
                    <h3>Description</h3>
                    <p>
                        Beat Motion is a direct interface between the movement of the body and sound.
                    </p>
                </div>
                <div className='split-layout'>
                    <div className='info'>
                        <div>
                            <p>
                                This is a MIDI controller for music production built using a Kinect. It allows the user to "control knobs" using his/her left arm and to send notes with a 2x3 grid on the right hand.
                            </p>
                            <h3>Role & Tools</h3>
                            <p>
                                I led a small team of four people, where I programmed the interface on C++, and produced the original soundtrack in Ableton Live.
                            </p>
                        </div>
                        <ButtonList obj={info} />
                    </div>
                    <div className='image-carousel'>
                        <img src="/esromerog/images/beat-motion/process.png"></img>
                    </div>
                </div>
            </div>
            <NextElement currSelection={currentSelection} />
        </div>
    )
}

export function QuantifiedSelf() {

    const currentSelection = "quantified-self";
    const info = portfolioInfo[currentSelection];


    const mainDivRef = useRef(null);

    // Effect when the page appears
    useEffect(() => {
        gsap.fromTo(mainDivRef.current, { opacity: 0 }, {
            opacity: 1,
            duration: 1.5,
        })
    })

    return (
        <div ref={mainDivRef}>
            <div className='expanded'>
                <div className='initial-intro'>
                    <h2>You: Quantified Self</h2>
                    <h3>Description</h3>
                    <p>
                        A web platform to understand the data our bodies generate in creative ways. It connects metrics derived from physiological data to P5.js and other web-based frameworks for visualization or sonification.
                    </p>
                    <p>
                        Built for educational purposes in collaboration with Professor Suzanne Dikker.
                    </p>
                    <h3>Role & Tools</h3>
                    <p>
                        I led the programming of the web application using React in JavaScript. Interfaced EMOTIV, Muse and LSL streams with the web-based data. Built some visualizations using P5.js.
                    </p>
                    <ButtonList obj={info}/>
                    <div className='margin-bottom'></div>
                </div>
            </div>
            <NextElement currSelection={currentSelection} />
        </div>
    )
}

export function MutualWaveMachine() {

    const currentSelection = "mutual-wave-machine";
    const info = portfolioInfo[currentSelection];

    const mainDivRef = useRef(null);

    // Effect when the page appears
    useEffect(() => {
        gsap.fromTo(mainDivRef.current, { opacity: 0 }, {
            opacity: 1,
            duration: 1.5,
        })
    })

    return (
        <div ref={mainDivRef}>
            <div className='expanded'>
                <div className='initial-intro'>
                    <h2>Mutual Wave Machine</h2>
                    <h3>Description</h3>
                    <p>
                        Implementation of the Mutual Wave Machine project, by Suzanne Dikker, on my college campus with the help of student club, Wavesense.
                    </p>
                    <p>
                        It's an interactive experience that seeks to explore the connection between two subjects through EEG acquisition and real-time neurofeedback that visualizes the correlation of brain signals.
                    </p>
                </div>
                <div className='split-layout'>
                    <div className='info'>
                        <div>
                            <h3>Role & Tools</h3>
                            <p>
                                I designed the structure in 3D using Fusion 360.
                            </p>
                            <p>
                                Signal acquisition through EMOTIV Epoc headsets with OpenViBE configured with an LSL stream.
                            </p>
                        </div>
                        <ButtonList obj={info} />
                    </div>
                    <div className='image-carousel'>
                        <Carousel fade touch>
                            <Carousel.Item>
                                <img src="/esromerog/images/mutual-wave-machine/sitting.jpeg"></img>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img src="/esromerog/images/mutual-wave-machine/closeup.jpeg"></img>
                            </Carousel.Item>
                        </Carousel>
                    </div>
                </div>
            </div>
            <NextElement currSelection={currentSelection} />
        </div>
    )
}
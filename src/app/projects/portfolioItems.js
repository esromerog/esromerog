"use client";

import React, { useRef, useEffect } from "react";
import portfolioInfo from "../../portfolio_info.json";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useRouter } from "next/navigation";
import Carousel from "react-bootstrap/Carousel";
import { ButtonList } from "./page";
import { Tooltip } from "react-tooltip";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);


function NextElement({ currSelection }) {
  function getNextInfo(currSelection) {
    const keys = Object.keys(portfolioInfo);
    const currIndx = keys.indexOf(currSelection);
    if (currIndx === keys.length - 1) {
      return keys[0];
    } else {
      return keys[currIndx + 1];
    }
  }

  const nextSelection = getNextInfo(currSelection);
  const nextInfo = portfolioInfo[nextSelection];

  const objRef = useRef(null);
  const router = useRouter();

  function changeWebPage() {
    const tl = gsap.timeline();
    objRef.current.style.position = "inherit";
    tl.to(objRef.current, {
      height: "100vh",
      duration: 0,
      // onComplete: () => navigate(`/portfolio/${obj.name}`)
    });
    tl.to(window, {
      scrollTo: {
        y: objRef.current,
      },
      duration: 0.7,
      ease: "linear",
    });
    tl.to(
      objRef.current,
      {
        opacity: 0,
        duration: 1,
        onComplete: () =>
          setTimeout(() => router.push(`/projects/${nextSelection}`)),
      },
      "<"
    );
  }

  return (
    <div className="next-element" ref={objRef}>
      <button onClick={changeWebPage}>
        <h3>Next Project</h3>
        <h2>{nextInfo.name}</h2>
        <p>{nextInfo.short}</p>
      </button>
    </div>
  );
}

export function MyndMusic() {
  const currentSelection = "mynd_music";
  const info = portfolioInfo[currentSelection];

  const mainDivRef = useRef(null);

  // Effect when the page appears
  useEffect(() => {
    gsap.fromTo(
      mainDivRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1.5,
      }
    );
  });

  const refs = {
    barret1999: (
      <p>
        Barrett, L. F., & Russell, J. A. (1999). The structure of current
        affect. <i>Current Directions in Psychological Science, 8</i>(1), 10–14.{" "}
        <a
          href="https://doi.org/10.1111/1467-8721.00003"
          target="_blank"
          rel="noopener noreferrer"
        >
          doi:10.1111/1467-8721.00003
        </a>
      </p>
    ),
    cannard2021: (
      <p>
        Cannard, C., Wahbeh, H., & Delorme, A. (2021). Electroencephalography
        correlates of well-being using a low-cost wearable system.{" "}
        <i>Frontiers in Human Neuroscience,</i> 15, 745135.{" "}
        <a
          href="https://doi.org/10.3389/fnhum.2021.745135"
          target="_blank"
          rel="noopener noreferrer"
        >
          doi:10.3389/fnhum.2021.745135
        </a>
      </p>
    ),
  };

  return (
    <div ref={mainDivRef} className="page-parent">
      <div className="expanded">
        <div className="initial-intro">
          <h2>Mynd Music</h2>
          <h3>Description</h3>
          <p>
            It all begins by creating a feeling, and translating it into music.
            Mynd Music is a project where we seek to create music based on a
            person's feelings throughout a VR experience.
          </p>
          <p>
            It was presented at INC Monterrey 2022 on behalf of Laboratorio
            Arte, A.C.{" "}
          </p>
          <p>
            The core team consisted of five people tasked with music production,
            analysis, connectivity and the design of the physical installation.
          </p>
        </div>
        <div className="split-layout">
          <div className="info">
            <div>
              <h3>Role</h3>
              <p>
                Creative Director · Main Programmer - 3D Experience · Programmer
                - EEG Analysis Pipeline
              </p>
              <h3>Tools</h3>
              <p>Unity 3D · MNE · BrainFlow · TCP</p>
              <h3>Background</h3>
              <p>
                I wanted to make this project an exploration of different
                environments within our minds. The experience walks the subject
                through changing environments that are meant to reflect
                various emotional states, from the peace of being connected to
                nature, to the dread of anxiety and isolation. Meanwhile, the
                EEG analysis is based on emotional models of valence and arousal{" "}
                <span id="barret">[1]</span> measured with consumer-grade
                devices <span id="cannard">[2]</span>.
              </p>
              <Tooltip
                className="refs"
                anchorSelect="#barret"
                content={refs.barret1999}
                variant="light"
                clickable="true"
                opacity={1}
              />
              <Tooltip
                className="refs"
                anchorSelect="#cannard"
                content={refs.cannard2021}
                variant="light"
                clickable="true"
                opacity={1}
              />
            </div>
            <ButtonList obj={info} />
          </div>
          <div className="image-carousel">
            <img
              src="/esromerog/images/mynd_music/presentation.jpg"
              alt="Equipment used for the project displayed at INC Monterrey."
            ></img>
            <Carousel fade touch>
              <Carousel.Item>
                <img
                  src="/esromerog/images/mynd_music/intro.jpg"
                  alt="First scene in VR"
                ></img>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  src="/esromerog/images/mynd_music/forest.jpg"
                  alt="Forest scene in VR"
                ></img>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  src="/esromerog/images/mynd_music/coffee.jpg"
                  alt="VR café"
                ></img>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  src="/esromerog/images/mynd_music/coffee2.jpg"
                  alt="VR café transition"
                ></img>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  src="/esromerog/images/mynd_music/dessert.jpg"
                  alt="Desert scene in VR"
                ></img>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  src="/esromerog/images/mynd_music/end.jpg"
                  alt="Ending of the experience"
                ></img>
              </Carousel.Item>
            </Carousel>
          </div>
        </div>
      </div>
      <NextElement currSelection={currentSelection} />
    </div>
  );
}

export function AThousandWordSpeller() {
  const currentSelection = "thousand-word-speller";
  const info = portfolioInfo[currentSelection];

  const mainDivRef = useRef(null);

  // Effect when the page appears
  useEffect(() => {
    gsap.fromTo(
      mainDivRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1.5,
      }
    );
  });

  const refs = {
    pan2022: (
      <p>
        Pan, J., Chen, X., Ban, N., He, J., Chen, J., & Huang, H. (2022).
        Advances in P300 brain-computer interface spellers: toward paradigm
        design and performance evaluation.{" "}
        <i>Frontiers in Human Neuroscience, 16,</i> 1077717.{" "}
        <a
          href="https://doi.org/10.3389/fnhum.2022.1077717"
          target="_blank"
          rel="noopener noreferrer"
        >
          doi:10.3389/fnhum.2022.1077717
        </a>
      </p>
    ),
    rusanu2023: (
      <p>
        Rușanu, O. A. (2023). A brain-computer interface-based simulation of
        vending machine by the integration between gtec unicorn EEG headset and
        LabVIEW programming environment using P300 speller and UDP
        communication. In{" "}
        <i>
          Lecture Notes in Networks and Systems. The 16th International
          Conference Interdisciplinarity in Engineering
        </i>{" "}
        (pp. 836–849).{" "}
        <a
          href="https://doi.org/10.1007/978-3-031-22375-4_68"
          target="_blank"
          rel="noopener noreferrer"
        >
          doi:10.1007/978-3-031-22375-4_68
        </a>
      </p>
    ),
    sacchett2002: (
      <p>
        Sacchett, C. (2002). Drawing in aphasia: moving towards the interactive.{" "}
        <i>International Journal of Human-Computer Studies,</i> 57(4), 263–277.{" "}
        <a
          href="https://doi.org/10.1006/ijhc.2002.1018"
          target="_blank"
          rel="noopener noreferrer"
        >
          doi:10.1006/ijhc.2002.1018
        </a>
      </p>
    ),
    kleih2016: (
      <p>
        Kleih, S. C., Gottschalt, L., Teichlein, E., & Weilbach, F. X. (2016).
        Toward a P300 based Brain-Computer Interface for aphasia rehabilitation
        after stroke: Presentation of theoretical considerations and a pilot
        feasibility study. <i>Frontiers in Human Neuroscience, 10,</i> 547.{" "}
        <a
          href="https://doi.org/10.3389/fnhum.2016.00547"
          target="_blank"
          rel="noopener noreferrer"
        >
          doi:10.3389/fnhum.2016.00547
        </a>
      </p>
    ),
  };

  return (
    <div ref={mainDivRef}>
      <video
        className="top-image"
        autoPlay={true}
        loop={true}
        src="/esromerog/images/thousand-word-speller/video.mov"
        muted={true}
        playsInline={true}
      />
      <div className="expanded no-margin">
        <div className="initial-intro">
          <h2>A Thousand-Word Speller</h2>
          <h3>Description</h3>
          <p>
            How can we effectively convey and express the images within our
            minds? Especially when our means of communication, either because
            verbal or motor impairment, are limited.
          </p>
          <p>
            This is a P300 based speller with a board made up of images. This
            method uses generative image and language models to create new
            pictures in real-time based on the user's current selections.
          </p>
        </div>
        <div className="split-layout">
          <div className="info">
            <div>
              <p>
                This project obtained second place at the Spring 2022 IEEE
                BR41N.io Hackathon.
              </p>
              <h3>Role & Tools</h3>
              <p>
                I programmed the interface with ChatGPT and Stable Diffussion’s
                APIs, contributed to the design of the board, and system
                testing.
              </p>
              <h3>Background</h3>
              <p>
                This project aimed to find a simple way to communicate mental
                imagery directly from a BCI without requiring any skill or motor
                input. Considering that the P300 protocol has been widely
                studied and optimized <span id="pan2022">[1]</span>, we used an
                experimentally validated speller{" "}
                <span id="rusanu2023">[2]</span> provided by g.Tec for their
                BR41N.io hackathon.
              </p>
              <p>
                As a future line of research, we would like to look into the use
                of this system for patients with aphasia [
                <span id="sacchett2002">3</span>, <span id="kleih2016">4</span>
                ], while also optimizing it to adapt its image selection
                in real-time for more specific artworks.
              </p>
              {Object.keys(refs).map((key) => (
                <Tooltip
                  className="refs"
                  anchorSelect={"#" + key}
                  content={refs[key]}
                  variant="light"
                  clickable="true"
                  opacity={1}
                  key={key}
                />
              ))}
            </div>
            <ButtonList obj={info} />
          </div>
          <div className="image-carousel">
            <Carousel fade touch>
              <Carousel.Item>
                <img
                  src="/esromerog/images/thousand-word-speller/dog.png"
                  alt="Dog generated through this tool"
                ></img>
                <Carousel.Caption>
                  <h3>Prompt</h3>
                  <p>Space, dog, pixel-art</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  src="/esromerog/images/thousand-word-speller/dolphin.png"
                  alt="Dolphin in the beach generated through this tool"
                ></img>
                <Carousel.Caption>
                  <h3>Prompt</h3>
                  <p>Dolphin, beach, sunset</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  src="/esromerog/images/thousand-word-speller/lion.png"
                  alt="Lion generated in the tool"
                ></img>
                <Carousel.Caption>
                  <h3>Prompt</h3>
                  <p>Space, lion, digital art</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  src="/esromerog/images/thousand-word-speller/restaurant.png"
                  alt="Futuristic restaurant generated in this tool"
                ></img>
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
  );
}

export function Waterfall() {
  const currentSelection = "waterfall";
  const info = portfolioInfo[currentSelection];

  const mainDivRef = useRef(null);

  // Effect when the page appears
  useEffect(() => {
    gsap.fromTo(
      mainDivRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1.5,
      }
    );
  });

  const refs = {
    granic2014: (
      <p>
        Granic, I., Lobel, A., & Engels, R. C. M. E. (2014). The benefits of
        playing video games. <i>The American Psychologist, 69</i>(1), 66–78.{" "}
        <a
          href="https://doi.org/10.1037/a0034857"
          target="_blank"
          rel="noopener noreferrer"
        >
          doi:10.1037/a0034857
        </a>
      </p>
    ),
    franco2016: (
      <p>
        Videogames and therapy: A narrative review of recent publication and
        application to treatment. <i> Frontiers in Psychology, 7,</i> 1085.{" "}
        <a
          href="https://doi.org/10.3389/fpsyg.2016.01085"
          target="_blank"
          rel="noopener noreferrer"
        >
          doi:10.3389/fpsyg.2016.01085
        </a>
      </p>
    ),
    marzbani2016: (
      <p>
        Marzbani, H., Marateb, H. R., & Mansourian, M. (2016). Neurofeedback: A
        comprehensive review on system design, methodology and clinical
        applications. <i>Basic and Clinical Neuroscience, 7</i>(2), 143-158.{" "}
        <a
          href="https://doi.org/10.15412/J.BCN.03070208"
          target="_blank"
          rel="noopener noreferrer"
        >
          doi:10.15412/J.BCN.03070208
        </a>
      </p>
    ),
    egner2004: (
      <p>
        Egner, T., & Gruzelier, J. H. (2004). EEG biofeedback of low beta band
        components: frequency-specific effects on variables of attention and
        event-related brain potentials.{" "}
        <i>
          Clinical Neurophysiology: Official Journal of the International
          Federation of Clinical Neurophysiology, 115
        </i>
        (1), 131–139.{" "}
        <a
          href="https://doi.org/10.1016/s1388-2457(03)00353-5"
          target="_blank"
          rel="noopener noreferrer"
        >
          doi:10.1016/s1388-2457(03)00353-5
        </a>
      </p>
    ),
    berger2022: (
      <p>
        Berger, L. M., Wood, G., & Kober, S. E. (2022). Effects of virtual
        reality-based feedback on neurofeedback training performance-A
        sham-controlled study. <i>Frontiers in Human Neuroscience, 16,</i>{" "}
        952261.{" "}
        <a
          href="https://doi.org/10.3389/fnhum.2022.952261"
          target="_blank"
          rel="noopener noreferrer"
        >
          doi:10.3389/fnhum.2022.952261
        </a>
      </p>
    ),
  };

  return (
    <div ref={mainDivRef}>
      <div className="expanded">
        <div className="initial-intro">
          <h2>Waterfall</h2>
          <h3>Description</h3>
          <p>
            We may perceive the flow of time actively, as if we’re moving
            through it, or passively, where we remain static and time moves
            through us like a waterfall. In this project, we create an immersive
            VR platformer where the main mechanic to advance is controlling your
            concentration to speed up or slow down the flow of time.
          </p>
        </div>
        <div className="split-layout">
          <div className="info">
            <div>
              <h3>Role & Tools</h3>
              <p>
                I set up the VR experience in Unity and programmed the EEG
                analysis pipeline with signal acquisition.
              </p>
              <h3>Background</h3>
              <p>
                Recognizing the potential of video games to improve
                motivation, engagement, cognition, and emotion [
                <span id="granic2014">1</span>, <span id="franco2016">2</span>],
                this project was developed as a neurofeedback system with the
                structure of a traditional videogame [
                <span id="marzbani2016">3</span>, <span id="egner2004">4</span>
                ]. Additionally, our approach packaged the experience within a
                VR world to make it more immersive; aiming to increase
                neurofeedback performance <span id="berger2022">[5]</span>.
              </p>
              {Object.keys(refs).map((key) => (
                <Tooltip
                  className="refs"
                  anchorSelect={"#" + key}
                  content={refs[key]}
                  variant="light"
                  clickable="true"
                  opacity={1}
                  key={key}
                />
              ))}
            </div>
            <ButtonList obj={info} />
          </div>
          <div className="image-carousel">
            <Carousel fade touch>
              <Carousel.Item>
                <img
                  src="/esromerog/images/waterfall/process.jpg"
                  alt="The team while working on the development"
                ></img>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  src="/esromerog/images/waterfall/testing.jpg"
                  alt="Testing of the experience"
                ></img>
              </Carousel.Item>
            </Carousel>
          </div>
        </div>
      </div>
      <NextElement currSelection={currentSelection} />
    </div>
  );
}

export function BeatMotion() {
  const currentSelection = "beat-motion";
  const info = portfolioInfo[currentSelection];

  const mainDivRef = useRef(null);

  // Effect when the page appears
  useEffect(() => {
    gsap.fromTo(
      mainDivRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1.5,
      }
    );
  });

  return (
    <div ref={mainDivRef}>
      <video
        className="top-image"
        autoPlay={true}
        loop={true}
        muted={true}
        src="/esromerog/images/beat-motion/video.mp4"
        playsInline={true}
      />
      <div className="expanded no-margin">
        <div className="initial-intro">
          <h2>Beat Motion</h2>
          <h3>Description</h3>
          <p>
            Beat Motion is a direct interface between the movement of the body
            and sound. It used consumer-grade hardware (Kinect) to output MIDI notes that can be used in any audio software.
          </p>
        </div>
        <div className="split-layout">
          <div className="info">
            <div>
              <p>
                This is a MIDI controller for music production built using a
                Kinect. It allows the user to "control knobs" using his/her left
                arm and to send notes with a 2x3 grid on the right hand.
              </p>
              <h3>Role & Tools</h3>
              <p>
                I led a small team of four people, where I programmed the
                interface on C++, and produced the original soundtrack in
                Ableton Live.
              </p>
            </div>
            <ButtonList obj={info} />
          </div>
          <div className="image-carousel">
            <img
              src="/esromerog/images/beat-motion/process.jpg"
              alt="The team during the work process"
            ></img>
          </div>
        </div>
      </div>
      <NextElement currSelection={currentSelection} />
    </div>
  );
}

export function QuantifiedSelf() {
  const currentSelection = "quantified-self";
  const info = portfolioInfo[currentSelection];

  const mainDivRef = useRef(null);

  // Effect when the page appears
  useEffect(() => {
    gsap.fromTo(
      mainDivRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1.5,
      }
    );
  });

  return (
    <div ref={mainDivRef}>
      <div className="expanded">
        <div className="initial-intro">
          <h2>You: Quantified Self</h2>
          <h3>Description</h3>
          <p>
            A web platform to understand the data our bodies generate in
            creative ways. It connects metrics derived from physiological data
            to P5.js and other web-based frameworks for visualization or
            sonification.
          </p>
          <p>
            Built for educational purposes in collaboration with Professor
            Suzanne Dikker.
          </p>
          <h3>Role & Tools</h3>
          <p>
            I led the programming of the web application using React in
            JavaScript. Interfaced EMOTIV, Muse and LSL streams with the
            web-based data. Built some visualizations using P5.js.
          </p>
          <ButtonList obj={info} />
          <div className="margin-bottom"></div>
        </div>
      </div>
      <NextElement currSelection={currentSelection} />
    </div>
  );
}

export function MutualWaveMachine() {
  const currentSelection = "mutual-wave-machine";
  const info = portfolioInfo[currentSelection];

  const mainDivRef = useRef(null);

  // Effect when the page appears
  useEffect(() => {
    gsap.fromTo(
      mainDivRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1.5,
      }
    );
  });

  return (
    <div ref={mainDivRef}>
      <div className="expanded">
        <div className="initial-intro">
          <h2>Mutual Wave Machine</h2>
          <h3>Description</h3>
          <p>
            Implementation of the Mutual Wave Machine project, by Suzanne
            Dikker, on my college campus with the help of my student club,
            <i>wavesense</i>.
          </p>
          <p>
            It's an interactive experience that seeks to explore the connection
            between two subjects through EEG acquisition and real-time
            neurofeedback that visualizes the correlation of brain signals.
          </p>
        </div>
        <div className="split-layout">
          <div className="info">
            <div>
              <h3>Role & Tools</h3>
              <p>I designed the structure in 3D using Fusion 360.</p>
              <p>
                Signal acquisition through EMOTIV Epoc headsets with OpenViBE
                configured with an LSL stream.
              </p>
            </div>
            <ButtonList obj={info} />
          </div>
          <div className="image-carousel">
            <Carousel fade touch>
              <Carousel.Item>
                <img
                  src="/esromerog/images/mutual-wave-machine/sitting.jpg"
                  alt="Local installation of the Mutual Wave Machine"
                ></img>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  src="/esromerog/images/mutual-wave-machine/closeup.jpg"
                  alt="Closeup of our version of the Mutual Wave Machine"
                ></img>
              </Carousel.Item>
            </Carousel>
          </div>
        </div>
      </div>
      <NextElement currSelection={currentSelection} />
    </div>
  );
}

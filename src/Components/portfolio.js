import React, { useRef, useState, useEffect } from 'react'
import portfolioInfo from '../portfolio_info.json'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { Routes, Route, useNavigate } from 'react-router-dom';
import Me from './me'


gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);
document.body.style.overflow = "scroll";
document.body.style.backgroundColor = "white";


export default function Portfolio() {
    return (
        <div className='portfolio-main'>
            <div className='main-background'></div>
            <div className='style-overlay'></div>
            <NavBar />
            <Routes>
                <Route path="/" element={<InfoCards />} />
                <Route path="/:currentSelection" />
                <Route path="/about" element={<Me />} />
            </Routes>
        </div>
    )
}

function CompressedInfoCard({ obj }) {

    const [isInCenter, setIsInCenter] = useState(false);
    const objRef = useRef(null);

    function getPos() {
        if (objRef.current != null) {
            const pos = ScrollTrigger.positionInViewport(objRef.current);
            if (pos > 0.4 && pos < 0.65) {
                setIsInCenter(true);
            } else {
                setIsInCenter(false);
            }
        }
    }

    ScrollTrigger.observe({
        target: objRef.current,
        type: "wheel,scroll",
        onChangeY: getPos
    })
    ScrollTrigger.observe({
        target: ".portfolio-main",
        type: "touch",
        onChangeY: getPos
    })

    useEffect(getPos, [])

    const navigate = useNavigate();

    function changeWebPage() {
        const y = (window.innerHeight - objRef.current.offsetHeight) / 2;
        gsap.to(window, {
            scrollTo: {
                y: objRef.current,
                offsetY: 0,
            },
            duration: 0.5,
        })
        gsap.to(objRef.current, {
            height: '100vh',
            pin: true,
            duration: 0.5,
            // onComplete: () => navigate(`/portfolio/${obj.name}`)
        })
        gsap.to(objRef.current, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => setTimeout(()=>navigate(`/portfolio/${obj.name}`), 1000)
        })
    }

    const [expanded, setExpanded] = useState(false);

    return (
        <div className={`info-card ${isInCenter && 'center'}`} key={obj.name} ref={objRef}>
            <div className='row'>
                <div className='info-card-title'>
                    <h2>{obj.name}</h2>
                    <p>{obj.short}</p>
                </div>
                <div className='info-card-description'>
                    <h3>Description</h3>
                    <p>{obj.description}</p>
                    {/* Here I would put the links to GitHub and such*/}
                    <ButtonList obj={obj}/>
                </div>
            </div>
            <div className='accordion-content'>
                <div className='info-card-description'>
                    <h3>Role</h3>
                    <p>{obj.role}</p>
                </div>
            </div>
        </div>
    )
}

function ButtonList({obj}) {
    const PDFKeys = ["Scientific Transcript"]
    if ("links" in obj) {
        console.log("Links found!")
        console.log(Object.keys(obj.links));
        const btnList = Object.keys(obj.links).map((key) => {
            console.log(obj.links[key]);
            return <a className='button-content' target="_blank" href={obj.links[key]}>{key}</a>
        })
        return <div className='button-list'>{btnList}</div>
    } else {
        return null
    }
}

function InfoCards() {
    const allInfoCards = Object.keys(portfolioInfo).map((key) => {
        const obj = portfolioInfo[key];
        return <CompressedInfoCard obj={obj} key={key} />
    })

    return (
        <div>
            <div className='spacer'></div>
            {allInfoCards}
            <div className='spacer'></div>
        </div>
    )
}

function NavBar() {

    const [fullScreenNav, setFullScreenNav] = useState(false);

    return (
        <div className={`navbar ${fullScreenNav && 'active'}`}>
            <a href='/portfolio'>
            <h2>
                ESTEBAN ROMERO
            </h2></a>
            <div className={`navigation ${fullScreenNav && 'active'}`}>
                <a href='/Docs/EstebanRomeroCV.pdf' target='_blank'>CV</a>
                <a href='/portfolio/about'>Me</a>
                <a href='https://github.com/esromerog' target='_blank'>GitHub</a>
            </div>
            <a className='icon material-symbols-outlined' onClick={() => setFullScreenNav(!fullScreenNav)}>{fullScreenNav ? "expand_less" : "more_vert"}</a>
        </div>
    )
}
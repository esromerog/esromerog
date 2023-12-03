import React, { useRef, useState, useEffect } from 'react'
import portfolioInfo from '../portfolio_info.json'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import Me from './me'
import { MyndMusic, AThousandWordSpeller, Waterfall, BeatMotion, QuantifiedSelf, MutualWaveMachine } from './portfolioItems'


gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);


export default function Portfolio() {
    useEffect(() => {
        document.body.style.overflow = "scroll";
        document.body.style.backgroundColor = "white";
    }, [])

    return (
        <div className='portfolio-main'>
            <div className='main-background'></div>
            <div className='style-overlay'></div>
            <NavBar />
            <Routes>
                <Route path="/" element={<InfoCards />} />
                <Route path="/beat-motion" element={<BeatMotion />} />
                <Route path="/mynd_music" element={<MyndMusic />} />
                <Route path="/thousand-word-speller" element={<AThousandWordSpeller />} />
                <Route path="/waterfall" element={<Waterfall />} />
                <Route path="/mutual-wave-machine" element={<MutualWaveMachine />} />
                <Route path="/quantified-self" element={<QuantifiedSelf />} />
                <Route path="/about" element={<Me />} />
            </Routes>
        </div>
    )
}

function CompressedInfoCard({ obj, keyName }) {

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
            onComplete: () => setTimeout(() => navigate(`/portfolio/${keyName}`), 1000)
        })
    }

    return (
        <div className={`info-card ${isInCenter && 'center'}`} key={obj.name} ref={objRef}>
            <div className='row'>
                <div className='info-card-title'>
                    <button onClick={changeWebPage}><h2>{obj.name}</h2></button>
                    <p>{obj.short}</p>
                    {isInCenter&&<button className='more' onClick={changeWebPage}><span className='material-symbols-outlined'>expand_content</span></button>}
                </div>
                <div className='info-card-description'>
                    <div>
                        <h3>Description</h3>
                        <p>{obj.description}</p>
                    </div>
                    <ButtonList obj={obj} isMain={true} changeWebPage={changeWebPage}/>
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

export function ButtonList({ obj, isMain, changeWebPage }) {
    if ("links" in obj) {
        const btnList = Object.keys(obj.links).map((key) => {
            return <a className='button-content' target="_blank" rel="noopener noreferrer" href={obj.links[key]} key={obj.links[key]}>{key}</a>
        })
        return <div className='button-list'>{btnList}{isMain&&<button className='button-content' onClick={changeWebPage}>More</button>}</div>
    } else {
        return null
    }
}

function InfoCards() {
    const allInfoCards = Object.keys(portfolioInfo).map((key) => {
        const obj = portfolioInfo[key];
        return <CompressedInfoCard obj={obj} key={key} keyName={key} />
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
            <Link to='/portfolio'>
                <h2>
                    ESTEBAN ROMERO
                </h2></Link>
            <div className={`navigation ${fullScreenNav && 'active'}`}>
                <Link to="/portfolio">Home</Link>
                <a href='/esromerog/Docs/EstebanRomeroCV.pdf' target='_blank' rel="noopener noreferrer">CV</a>
                <Link to='/portfolio/about'>Me</Link>
                <a href='https://github.com/esromerog' target='_blank' rel="noopener noreferrer">GitHub</a>
            </div>
            <button className='icon material-symbols-outlined' onClick={() => setFullScreenNav(!fullScreenNav)}>{fullScreenNav ? "expand_less" : "more_vert"}</button>
        </div>
    )
}
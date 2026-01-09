"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

function NavBar() {
    const [fullScreenNav, setFullScreenNav] = useState(false);

    return (
        <div className={`navbar ${fullScreenNav && 'active'}`}>
            <Link href='/projects'>
                <h2>
                    ESTEBAN ROMERO
                </h2>
            </Link>
            <div className={`navigation ${fullScreenNav && 'active'}`}>
                <Link href="/projects">Home</Link>
                <a href='/pdfs/EstebanRomeroCV.pdf' target='_blank' rel="noopener noreferrer">CV</a>
                <Link href='/projects/about'>Me</Link>
                <a href='https://github.com/esromerog' target='_blank' rel="noopener noreferrer">GitHub</a>
            </div>
            <button className='icon material-symbols-outlined' onClick={() => setFullScreenNav(!fullScreenNav)}>{fullScreenNav ? "expand_less" : "more_vert"}</button>
        </div>
    )
}

export default function ProjectsLayout({ children }) {
    useEffect(() => {
        document.body.style.overflow = "scroll";
        document.body.style.backgroundColor = "white";
    }, []);

    return (
        <div className='portfolio-main'>
            <div className='main-background'></div>
            <div className='style-overlay'></div>
            <NavBar />
            {children}
        </div>
    );
}

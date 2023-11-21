import React from "react";
import myPicture from "../assets/me.png";
import iconInsta from "../assets/instagram.svg"
import iconLinkedin from "../assets/linkedin.svg"

export default function Me() {
    return (
        <div className="about-me-parent">
            <div className='about-me'>
                <img src={myPicture}></img>
                <div className="content-holder">
                    <h2>ABOUT ME</h2>
                    <p>Biomedical Engineering Student · Tec de Monterrey, Guadalajara</p>
                    <h3>Description</h3>
                    <p>My name is Esteban Romero, I dream of adaptive and shared immersive experiences.</p>
                    <h3>Contact</h3>
                    <p>esromerog@gmail.com</p>
                    <div className="social-icons">
                        <a href="https://www.linkedin.com/in/esromerog/" target="_blank"><img src={iconLinkedin}></img></a>
                        <a href="https://www.instagram.com/tacosrosas/" target="_blank"><img src={iconInsta}></img></a>
                    </div>
                </div>
            </div>
        </div>
    )
}
import p5 from "p5"
import song from '../assets/gris.mp3'
import React, { useEffect } from "react"

window.p5 = p5
require('p5/lib/addons/p5.sound')

const s = (p, playButtonRef, isPlaying, setIsPlaying, mute) => {
  var mysound;
  var fft, amps;

  p.preload = () => {
    console.log("Preloaded");
    p.soundFormats('mp3', 'ogg');
    mysound = p.loadSound(song);
  }

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight*2);
  }

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight*2);
    p.frameRate(30);
    fft = new p5.FFT(0.8, 64);
    amps = new p5.Amplitude();
  }

  playButtonRef.current.onclick = function() {
    if (isPlaying.current) {
      console.log("Pausing!")
      mysound.pause();
    } else {
      mysound.play();
    }
    setIsPlaying(!isPlaying.current);
  }

  let seed = 0;

  p.draw = () => {
    p.background(0);

    let spectrum = fft.analyze();
    let stepx = p.round(p.width / 64); // Adjust this step value
    let stepy = p.round(p.height / 64);

    let level = amps.getLevel();

    let specx = 0;
    for (let x = 0; x < p.width; x += stepx) {
      const xamp = spectrum[specx] / 255 || 0;
      specx = specx + 1;
      let specy = 0;
      for (let y = 0; y < p.height; y += stepy) {
        const yamp = spectrum[specy] / 255 || 0;
        specy = specy + 1;
        //const offx = (noise(x * 0.01 + seed, y * 0.01 + seed) + noise(x * 0.01 + seed * 3, y * 0.01 + seed * 3)) * 200 - 200;
        //point(x+offx+spectrum[x]/255*100, y+offx+spectrum[y]/255*100);
        //point(map(x + offx, 0, width, 100, 300) + xamp * 100, map(y + offx, 0, height, 100, 300) + yamp * 100)
        p.stroke(xamp * 255 + 100, level * 255 + 100, yamp * 255 + 100);

        const offx = (p.noise(x * 0.01 + seed + xamp * 0.2, y * 0.01 + seed + yamp * 0.2) + p.noise(x * 0.01 + seed * 4 + xamp * 4, y * 0.01 + seed * 4 + yamp * 4)) * 200 - 200;

        p.point(p.map(x + offx, 0, p.width, 50, p.width - 50), p.map(y + offx, 0, p.height, 50, p.height - 50))
      }
    }

    seed = seed + 0.003;
  }
}

export default function P5Wrapper({isPlaying, playButtonRef, setIsPlaying}) {

  const canvasRef = React.useRef();

  useEffect(() => {

    const sketch = new p5(p=>s(p, playButtonRef, isPlaying, setIsPlaying), canvasRef.current);

    // Super important cleanup function
    return () => {
      sketch.noLoop();
      sketch.remove();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //  className="h-100"
  return (
    <div ref={canvasRef} />
  )
};
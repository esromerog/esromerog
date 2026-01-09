"use client";

// In Next.js, use public folder path for assets
const song = "/sounds/gris.mp3";

export const starsSketch = (
  p,
  parentRef,
  { playButtonRef, isPlaying, setIsPlaying }
) => {
  var mysound;
  var fft, amps;

  p.preload = () => {
    p.soundFormats("mp3", "ogg");
    mysound = p.loadSound(song);
    console.log("Preloaded");
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight * 2);
  };

  p.setup = () => {
    let parentStyle = window.getComputedStyle(parentRef);
    p.createCanvas(p.windowWidth, p.windowHeight * 2).parent(parentRef);
    p.frameRate(30);
    fft = new window.p5.FFT(0.8, 64);
    amps = new window.p5.Amplitude();


  };

  console.log(playButtonRef);
  playButtonRef.current.onclick = function () {
    if (isPlaying.current) {
      console.log("Pausing!");
      mysound.pause();
    } else {
      mysound.setVolume(1.0);
      mysound.play();
    }
    setIsPlaying(!isPlaying.current);
  };

  let seed = 0;

  p.draw = () => {
    p.background(0);

    let spectrum = fft.analyze();
    let stepx = p.round(p.width / 64);
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
        p.stroke(xamp * 255 + 100, level * 255 + 100, yamp * 255 + 100);
        p.strokeWeight(1.5);

        const offx =
          (p.noise(x * 0.01 + seed + xamp * 0.2, y * 0.01 + seed + yamp * 0.2) +
            p.noise(
              x * 0.01 + seed * 4 + xamp * 4,
              y * 0.01 + seed * 4 + yamp * 4
            )) *
            200 -
          200;

        p.point(
          p.map(x + offx, 0, p.width, 50, p.width - 50),
          p.map(y + offx, 0, p.height, 50, p.height - 50)
        );
      }
    }

    seed = seed + 0.003;
  };
};

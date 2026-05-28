"use client";

// Movement from https://labehar.medium.com/visualizing-chaos-creating-a-lorenz-attractor-with-p5-js-3531e915ea45

export const backgroundSketch = (p, parentRef) => {
  const color1 = [255, 160, 180, 255];
  const color2 = [206, 239, 242, 255];
  const t = 0.008;
  let circles = [];

  const x_min = -20, x_max = 20;
  const y_min = -30, y_max = 30;
  const z_min = 55, z_max = 0;

  const o = 10, lorenzP = 28, b = 8 / 3;
  const mouse_c = 0.05;

  class MovingCircle {
    constructor(circle_color) {
      this.color = circle_color;
      this.x = p.random(-10, 10);
      this.y = p.random(-10, 10);
      this.z = p.random(-10, 10);
    }
  }

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight).parent(parentRef);
    p.noStroke();
    circles.push(new MovingCircle(color2));
    circles.push(new MovingCircle(color1));
    circles.push(new MovingCircle(color2));
    circles.push(new MovingCircle(color1));
  };

  p.draw = () => {
    p.background(255, 253, 250);

    for (let movingCircle of circles) {
      let x = movingCircle.x;
      let y = movingCircle.y;
      let z = movingCircle.z;

      let dx = o * (y - x) * t / 10;
      let dy = (x * (lorenzP - z) - y) * t / 10;
      let dz = (x * y - b * z) * t / 10;

      movingCircle.x += dx;
      movingCircle.y += dy;
      movingCircle.z += dz;

      p.fill(...movingCircle.color);
      let posx = p.map(x, x_min, x_max, p.width / 8, p.width - p.width / 8);
      let targetX = posx + (p.mouseX - p.width / 2);
      let posy = p.map(y, y_min, y_max, p.height / 8, p.height - p.height / 8);
      let targetY = posy - (p.mouseY - p.height / 2);
      posx = p.lerp(posx, targetX, mouse_c);
      posy = p.lerp(posy, targetY, mouse_c);
      let tD = p.max(p.width, p.height) / 1.5;
      let d = p.map(z, z_min, z_max, tD / 1.5, tD, true);
      p.circle(posx, posy, d);
    }
    p.filter(p.BLUR, 100);
    // To-do – Create my grainy noise filter that blurs and adds noise
    // Could even separate into two filters to also use in the garden's sky
    // Look at https://p5js.org/reference/p5/createFilterShader/
  };
};
/***************************************************************************************
*    Title: a conversation of spheres
*    Author: Sophia (fractal kitty)
*    Date: n.d.
*    Code version: 1.0
*    Availability: https://codepen.io/fractalkitty/pen/KKoMKJO
*
***************************************************************************************/

//variables
let six;
let marbles = []; 
let timer = 5;
let button;

function preload() {
  for (let i = 0; i < 7; i++) {
    marbles[i] = loadImage(
      "https://assets.codepen.io/4559259/v" + (i + 1) + ".png"
    ); 
    // LOAD SOUND
    six = loadSound("SIX.mp3");
  }
}
function setup() {
  cnv = createCanvas(windowWidth, windowHeight, WEBGL); 
  noStroke(); 
  six.play();
  six.loop();
}
function draw() {
  t = frameCount / 1000; 
  background(0, 0, 30); 
  orbitControl(0.05, 0.05, 0.05); 
  camera(
    100 * abs(sin(t / 3)),
    100 * abs(sin(t / 2)),
    100 * abs(sin(t / 2)),
    0,
    0,
    0
  ); 
  for (let i = 0; i < 3; i++) {
   
    push();
    rotateY((PI / 3) * i + t); 
    rotateX((PI / 3) * i - t);
    rotateZ((PI / 3) * i + t);
    marblesDraw(100); 
    pop();
//timer
    if (frameCount % 60 == 0 && timer > 0) {
      
      timer--;
    }
    //  console.log(timer);
    if (timer == 0) {
      button = createButton("Carry on Listening");
      button.position(200, height/2);
      button.mousePressed(function goToAnotherPage() {
        window.location.href =
          "https://editor.p5js.org/natashatan/sketches/h_e2T2qUD";
      });
      button = createButton("Let's Breath");
      button.position(425, height/2);
      button.mousePressed(function goToAnotherPage() {
        window.location.href =
          "https://tashatan1.github.io/let-s-breath/";
      });
    }
  }
}
//animation for visual
function marblesDraw(r) {
  push();
  for (let i = 1; i <= 7; i++) {
    push();
    x = r * sin(((i * PI) / 15) * t);
    y = r * cos(((i * PI) / 15) * t);
    z = r * tan(((i * PI) / 30) * t);
    p = r * sin((i * t) / 100) + x / 100; 
    rotateX(p);
    translate(x, y, z);
    texture(marbles[i - 1]);
    sphere(min(50 / r, 5), 24, 24);
    pop();
    push();
    rotateX(-p);
    translate(-x, -y, -z);
    texture(marbles[i - 1]);
    sphere(min(50 / r, 5), 24, 24); 
    pop();
  }
  pop();
  r = r * 0.92; 
  if (r > 10) {
    marblesDraw(r); 
  }
}

/***************************************************************************************
*    Title: a conversation of spheres
*    Author: Sophia (fractal kitty)
*    Date: n.d.
*    Code version: 1.0
*    Availability: https://codepen.io/fractalkitty/pen/KKoMKJO
*
***************************************************************************************/


//wccchallenge recursive
//textures from: https://codepen.io/fractalkitty/pen/zYpQxQN
//coded beyond the time of night I think well. I think the comments are just an internal monologe that escaped.
let six;
let marbles = []; //lost and found - maybe
let timer = 5;
let button;

function preload() {
  for (let i = 0; i < 7; i++) {
    marbles[i] = loadImage(
      "https://assets.codepen.io/4559259/v" + (i + 1) + ".png"
    ); //coated in life (petri dish pics)
    // LOAD SOUND
    six = loadSound("SIX.mp3");
  }
}
function setup() {
  cnv = createCanvas(windowWidth, windowHeight, WEBGL); //created in the third dimension for 2D
  noStroke(); //we don't draw the line here or there or anywhere
  six.play();
  six.loop();
}
function draw() {
  t = frameCount / 1000; //I could have used Degrees, but NOPE
  background(0, 0, 30); //just a little blue makes me smile
  orbitControl(0.05, 0.05, 0.05); //don't we all just want a little control? - this is just to fake you out here - you almost had control... but then a camera was born:
  camera(
    100 * abs(sin(t / 3)),
    100 * abs(sin(t / 2)),
    100 * abs(sin(t / 2)),
    0,
    0,
    0
  ); //perspective changes with each moment
  for (let i = 0; i < 3; i++) {
    //loops of loops
    push();
    rotateY((PI / 3) * i + t); //oh the directions we turn
    rotateX((PI / 3) * i - t);
    rotateZ((PI / 3) * i + t);
    marblesDraw(100); //to draw is to code
    pop();

    if (frameCount % 60 == 0 && timer > 0) {
      // if the frameCount is divisible by 60, then a second has passed. it will stop at 0
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
          "https://editor.p5js.org/natashatan/sketches/gxSMDJpDT";
      });
    }
  }
}

function marblesDraw(r) {
  push();
  for (let i = 1; i <= 7; i++) {
    push();
    x = r * sin(((i * PI) / 15) * t);
    y = r * cos(((i * PI) / 15) * t);
    z = r * tan(((i * PI) / 30) * t);
    p = r * sin((i * t) / 100) + x / 100; //a letter for a number - super descriptive...
    rotateX(p);
    translate(x, y, z);
    texture(marbles[i - 1]);
    sphere(min(50 / r, 5), 24, 24);
    pop();
    push();
    rotateX(-p);
    translate(-x, -y, -z);
    texture(marbles[i - 1]);
    sphere(min(50 / r, 5), 24, 24); //orbs are fantastic little toys
    pop();
  }
  pop();
  r = r * 0.92; //shrink a little and repeat
  if (r > 10) {
    marblesDraw(r); //and here is where recursion happens
  }
}

// https://peterbeshai.com/blog/2018-10-28-p5js-ccapture/
// https://github.com/spite/ccapture.js

// Global var
let direction;
let stepSize, rideDuration, startTime;
let graphics, app;
let capturer, fps;

function setup() {
  // 
  var density = displayDensity();
  pixelDensity(density);
  createCanvas(6480 / density, 3840 / density);

  // Capture settings
  fps = 30;
  capturer = new CCapture({ format: 'png', framerate: fps });

  // this is optional, but lets us see how the animation will look in browser.
  frameRate(fps);

  // start the recording
  capturer.start();

  // Init Var
  objects = [...Array(500)].map(e => [random(width), random(height)]);  
  startTime = millis();
  rideDuration = getRideDuration(2);

}

function draw() {
  background(255);

  // duration in seconds
  var duration = 5;
  var t = (millis() - startTime)/1000;

  // if we have passed t=duration then end the animation.
  if (t > duration) {
    noLoop();
    console.log('finished recording.');
    capturer.stop();
    capturer.save();
    return;
  }

  // Draw something here

  stepSize = animate(t, 0, 1, duration, 2.5)
  console.log(`${t}, ${stepSize}, ${duration}`)
  stepSize = (direction === 'up') ? stepSize : -stepSize;

  for (const object of objects) {

    object[1] += stepSize;
    fill(noise(object[1])*255, noise(object[0])*255, noise(t)*255)
    stroke(noise(object[0])*255, noise(object[1])*255, noise(t)*255)
    ellipse(object[0], object[1], width/20, width/20);

  }

  // end drawing code

  // handle saving the frame
  console.log('capturing frame');
  capturer.capture(document.getElementById('defaultCanvas0'));

}


function keyPressed() {

  if (keyCode === 32) setup(); // 32 = Space
  if (keyCode === 38) direction = 'up'; // 38 = ArrowUp
  if (keyCode === 40) direction = 'down'; // 40 = ArrowDown
  if (key == 's' || key == 'S') saveThumb(650, 350);

}

// Tools
// resize canvas when the window is resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight, false);
}

function map(x, a, b, c, d) {
  return (x - a) / (b - a) * (d - c) + c
}

// Int conversion
function toInt(value) {
  return ~~value;
}

// Timestamp
function timestamp() {
  return Date.now();
}
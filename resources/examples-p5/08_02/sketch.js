// Global var
let direction;
let stepSize;
let objects;
let buffer;

function setup() {

  // Canvas setup
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5Container");
  p5.disableFriendlyErrors = true; // disables FES
  buffer = createGraphics(width, height, WEBGL)
  // Colors and drawing modes
  background(255);
  smooth();
  noStroke();

  // Init Var
  objects = [...Array(100)].map(e => [
    random(-width / 2, width / 2),
    random(-height / 2, height / 2)
  ]);

}

function draw() {

  stepSize = (direction === 'up') ? 1 : -1;

  buffer.background(255)

  for (const object of objects) {
    object[1] += random(stepSize);
    buffer.stroke(map(object[1], 0, height, 255, 0));
    buffer.fill(map(object[1], 0, height, 0, 255));
    buffer.ellipse(object[0], object[1], 100, 100);
  }

  image(buffer, 0, 0)

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

// Int conversion
function toInt(value) {
  return ~~value;
}

// Timestamp
function timestamp() {
  return Date.now();
}

// Thumb
function saveThumb(w, h) {
  let img = get(width / 2 - w / 2, height / 2 - h / 2, w, h);
  save(img, 'thumb.jpg');
}
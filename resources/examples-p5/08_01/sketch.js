// Global var
let direction;
let stepSize, rideDuration, startTime;
let objects;

function setup() {

  // Canvas setup
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5Container");
  p5.disableFriendlyErrors = true; // disables FES

  // Colors and drawing modes
  background(255);
  smooth();
  noStroke();

  // Init Var
  objects = [...Array(100)].map(e => [random(width), random(height)]);
  startTime = new Date();
  rideDuration = getRideDuration(2);
}

function draw() {

  background(255);

  // Time since the sketch started
  let t = (new Date() - startTime) / 1000;
  stepSize = animate(t, 0, 2, rideDuration, 2.5)
  console.log(`${t}, ${stepSize}, ${rideDuration}`)

  stepSize = (direction === 'up') ? stepSize : -stepSize;

  for (const object of objects) {

    object[1] += stepSize;
    fill(map(object[1], 0, height, 0, 255))
    ellipse(object[0], object[1], 100, 100);

  }

}

function keyPressed() {

  if (keyCode === 32) setup() // 32 = Space
  if (keyCode === 38) direction = 'up' // 38 = ArrowUp
  if (keyCode === 40) direction = 'down' // 40 = ArrowDown
  if (keyCode >= 48 && keyCode <= 57) rideDuration = getRideDuration(toInt(key)) // 48...57 = Digits
  //
  if (key === 's' || key === 'S') saveThumb(650, 350);

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
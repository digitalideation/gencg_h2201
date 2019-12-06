// Global var
let direction;
let stepSize, rideDuration, startTime;
let graphics, app;
let stats;


function setup() {

  app = new PIXI.Application({ antialias: true });
  document.getElementById('pixiContainer').appendChild(app.view);

  app.stage.interactive = true;
  app.renderer.backgroundColor = 0x061639;
  app.renderer.view.style.position = "absolute";
  app.renderer.view.style.display = "block";
  app.renderer.autoDensity = true;
  app.renderer.clearBeforeRender = false;
  app.renderer.resize(window.innerWidth, window.innerHeight);
  // Init Var
  startTime = new Date();
  rideDuration = getRideDuration(2);

  // Create graphics
  graphics = [];
  for (var i = 0; i < 5000; i++) {
    const graphic = new PIXI.Graphics();
    const fillColor = color(random(255), random(50), random(10))
    // const rgbString = `0x${fillColor.toString('#rrggbb').substring(1)}`;
    const rgbString = Math.random() * 0xff0000;
    // const rgbString = `0x${toInt(random(255))}${toInt(random(10))}${toInt(random(10))}`;
    graphic.beginFill(rgbString, 0.5);
    graphic.drawCircle(0, 0, random(window.innerHeight / 80));
    graphic.endFill();
    graphic.x = random(0, window.innerWidth)
    graphic.y = random(0, window.innerHeight)
    graphics[i] = graphic;
    app.stage.addChild(graphic);
  }

  // Stats
  stats = new Stats();
  stats.showPanel(1); // 0: fps, 1: ms, 2: mb, 3+: custom
  document.body.appendChild(stats.dom);
}

function draw() {

  stats.begin();

  // Time since the sketch started
  let t = (new Date() - startTime) / 1000;
  stepSize = animate(t, 0, 6, rideDuration, 2.5)
  // console.log(`${t}, ${stepSize}, ${rideDuration}`)

  stepSize = (direction === 'up') ? stepSize : -stepSize;

  for (const graphic of graphics) {
    graphic.y += random(-stepSize, stepSize);
  }

  stats.end();

}


window.onkeydown = keyDown
window.onresize = windowResized

function keyDown(event) {
  if (event.code === 'Space') setup()
  if (event.code === 'ArrowUp') direction = 'up'
  if (event.code === 'ArrowDown') direction = 'down'
  if (event.code.includes('Digit')) rideDuration = getRideDuration(toInt(event.key))
}


// Tools
// resize canvas when the window is resized
function windowResized() {
  app.renderer.resize(window.innerWidth, window.innerHeight);  
}

// Int conversion
function toInt(value) {
  return ~~value;
}

// Timestamp
function timestamp() {
  return Date.now();
}
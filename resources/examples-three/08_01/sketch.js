// Based on the code P_2_0_02.pde from
// Generative Gestaltung, ISBN: 978-3-87439-759-9

// Global var
let direction;
let stepSize;
let positions;
let scene, camera, light, renderer;
let controls
let objects, objectsCount;

init();
animate();

function init() {

  // Create scene renderer and camera
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer();

  // Create and add light
  createLights();

  // Create and add objects
  objectsCount = 1000;
  createObjects(objectsCount);

  // Orbit Controls
  // controls = new THREE.OrbitControls( camera, renderer.domElement );

  // Add renderer to the page
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById('threeContainer').appendChild(renderer.domElement);

  // Misc listeners
  document.addEventListener('keydown', onKeydown, false);
  window.addEventListener( 'resize', onWindowResized, false );

}

function animate() {

  requestAnimationFrame(animate);

  // Add your animations here
  stepSize = (direction === 'up') ? -.5 : .5;
  for (const object of objects) {
    object.position.y += Math.random() * stepSize;
  }

  // controls.update()
  render();

}

function render() {

  // Render functions go here.
  renderer.render(scene, camera);

}

function restart() {

  // Remove all objects
  while (scene.children.length) {
    scene.children.pop();
  }
  scene.dispose();

  // Create lights and objects again
  createLights();
  createObjects(objectsCount);

}

function createLights() {

  light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(1, 1, 1).normalize();
  scene.add(light);

}

function createObjects(objectsCount) {

  objects = [];
  let geometry = new THREE.BoxBufferGeometry(20, 20, 20);

  for (let i = 0; i < objectsCount; i++) {

    let object = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff }));

    object.position.x = Math.random() * 800 - 400;
    object.position.y = Math.random() * 800 - 400;
    object.position.z = Math.random() * 800 - 400;

    object.rotation.x = Math.random() * 2 * Math.PI;
    object.rotation.y = Math.random() * 2 * Math.PI;
    object.rotation.z = Math.random() * 2 * Math.PI;

    object.scale.x = Math.random() + 0.5;
    object.scale.y = Math.random() + 0.5;
    object.scale.z = Math.random() + 0.5;

    object.material.color.setRGB(object.position.x / 800 + .5, object.position.y / 800 + .5, object.position.z / 800 + .5);

    objects.push(object)
    scene.add(object);

  }
}

function onKeydown() {

  if (event.keyCode === 32) restart() // 32 = Space
  if (event.keyCode === 38) direction = 'up' // 38 = ArrowUp
  if (event.keyCode === 40) direction = 'down' // 40 = ArrowDown

}

function onWindowResized() {

  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

}

// Tools
// Int conversion
function toInt(value) {
  return ~~value;
}
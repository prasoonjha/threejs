import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";

//first and foremost, add a scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 2;

//webgl, the most common 3js renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

/**
 * add orbit controls and attach onchange event listener
 * NOTE: if you do not need to attach an event listener, you can instead choose to only instantiate a new OrbitControl
 * object with usual constructor 
 * just make sure you add it only after scene and renderer has been declared
 */

const controls = new OrbitControls(camera, renderer.domElement);
controls.addEventListener("change", render);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({
  color: new THREE.Color(1, 1, 1),
  wireframe: true,
});

const cube = new THREE.Mesh(geometry, material);
//attach cube to the scene
scene.add(cube);

window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  render();
}

const stats = Stats();
document.body.appendChild(stats.dom);

/**
 * the animation loop, a function that calls itself, using the requestAnimationFrame api
 * dump all your heavy animation computations inside this loop 
 */
function animate() {
  cube.rotation.x += 0.001;
  cube.rotation.y -= 0.001;
  stats.update();
  // render();

  //executes the callback just before when the browser is ready for a repaint
  requestAnimationFrame(animate);
}

//render function
function render() {
  renderer.render(scene, camera);
}

animate();
render();

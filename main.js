import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// creating rendere WebGl which links the Js app and the Graphics driver of the system
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//creating a scene + camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// to orbit around the target (using mouse drag)
const controls = new OrbitControls(camera, renderer.domElement);

//placing the axis
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

const gridHelper = new THREE.GridHelper();
scene.add(gridHelper);

//placing the geometry
const geometry = new THREE.BoxGeometry(1, 1, 1); //geometry - creating skeleteon
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); //material - choosing finishing material & color
const cube = new THREE.Mesh(geometry, material); //combining both
scene.add(cube);

const planegeometry = new THREE.PlaneGeometry(1, 1);
const planematerial = new THREE.MeshBasicMaterial({
  color: 0xffff00,
});
const plane = new THREE.Mesh(planegeometry, planematerial);
plane.position.set(0.5, 1.5, 0);
scene.add(plane);

const spheregeometry = new THREE.SphereGeometry(0.75);
const spherematerial = new THREE.MeshStandardMaterial({
  color: 0xffff00,
});
const sphere = new THREE.Mesh(spheregeometry, spherematerial);
sphere.position.set(0, 3, 0);
scene.add(sphere);

//light
const light = new THREE.DirectionalLight(0xffffff, 0.8);
scene.add(light);
light.position.set(-30, 50, 0);

const lighthelper = new THREE.DirectionalLightHelper(light, 5);
scene.add(lighthelper);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
scene.add(directionalLight);

//placnig the camera position
camera.position.set(3, 2, 5);

let bounce = 0;
function animate() {
  //creating a loop that will call each sec
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  cube.rotation.z += 0.01;

  controls.update();

  bounce += 0.01;

  sphere.position.y = 4 * Math.abs(Math.sin(bounce));

  //rendering the scene and taking with camera
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

/**
 *
 * Geometry - skeleton
 *  Material - basic, (lambert,standard (requires light to show up))
 * light - spot,ambient,directional
 * shadows
 *
 */

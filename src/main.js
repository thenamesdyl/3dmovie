import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { SceneManager } from './scenes/SceneManager.js';
import { OpeningScene } from './scenes/OpeningScene.js'; // Import your first scene

// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xcccccc); // Light grey background

// Camera setup
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1.5, 5); // Adjust camera position as needed

// Renderer setup
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true; // Enable shadows if needed
document.body.appendChild(renderer.domElement);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;
controls.minDistance = 1;
controls.maxDistance = 50;
controls.target.set(0, 1, 0); // Set target slightly above the origin if model pivot is at the feet
controls.update();

// Clock for delta time calculation
const clock = new THREE.Clock();

// Scene Manager Initialization
const sceneManager = new SceneManager(renderer, camera);

// Load the initial scene
sceneManager.loadScene(OpeningScene);

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    const deltaTime = clock.getDelta();

    controls.update(); // Update controls

    // Update and render the current scene via the Scene Manager
    sceneManager.update(deltaTime);

    // Direct rendering is now handled by SceneManager
    // renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

animate(); // Start the animation loop 
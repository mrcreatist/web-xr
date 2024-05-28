import * as THREE from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';

// Create scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.xr.enabled = true;
document.body.appendChild(VRButton.createButton(renderer));
document.body.appendChild(renderer.domElement);

// Add a light source
const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
light.position.set(0.5, 1, 0.25);
scene.add(light);

// Create a rotating cube
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshStandardMaterial({ color: 0x0077ff });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

cube.position.set(0, 1.5, -3);

function animate () {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.setAnimationLoop(render);
}

function render () {
    renderer.render(scene, camera);
}

animate();

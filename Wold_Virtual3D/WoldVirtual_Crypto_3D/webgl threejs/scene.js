import * as THREE from 'https://unpkg.com/three@0.150.1/build/three.module.js';

export function createScene() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x181818);
  return scene;
}

export function createCamera(container) {
  const camera = new THREE.PerspectiveCamera(
    75,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.set(0, 2, 6);
  return camera;
}

export function createRenderer(container) {
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);
  return renderer;
} 
import * as THREE from 'https://unpkg.com/three@0.150.1/build/three.module.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.150.1/examples/jsm/loaders/GLTFLoader.js';

export function loadTestModel(scene) {
  // Suelo (plano)
  const planeGeometry = new THREE.PlaneGeometry(20, 20);
  const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x444444 });
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = -Math.PI / 2; // Horizontal
  plane.position.y = 0;
  plane.receiveShadow = true;
  scene.add(plane);

  // Cubo de prueba
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);
  cube.position.set(0, 0.5, 0); // Encima del suelo
  cube.castShadow = true;
  cube.name = 'cubo';
  scene.add(cube);

  // Esfera de prueba
  const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
  const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0x2196f3 });
  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sphere.position.set(2, 0.5, 0);
  sphere.castShadow = true;
  sphere.name = 'esfera';
  scene.add(sphere);

  // Cilindro de prueba
  const cylinderGeometry = new THREE.CylinderGeometry(0.4, 0.4, 1.2, 32);
  const cylinderMaterial = new THREE.MeshStandardMaterial({ color: 0xff9800 });
  const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
  cylinder.position.set(-2, 0.6, 0);
  cylinder.castShadow = true;
  cylinder.name = 'cilindro';
  scene.add(cylinder);
}

/**
 * Carga un modelo GLTF/GLB desde una URL y lo añade a la escena.
 * @param {THREE.Scene} scene - La escena donde añadir el modelo.
 * @param {string} url - URL del archivo GLTF/GLB.
 * @param {function} [onLoaded] - Callback opcional cuando el modelo se carga.
 */
export function loadGLTFModel(scene, url, onLoaded) {
  const loader = new GLTFLoader();
  loader.load(
    url,
    (gltf) => {
      const model = gltf.scene;
      model.position.set(0, 0, 0);
      scene.add(model);
      if (onLoaded) onLoaded(model);
      console.log('Modelo GLTF cargado:', url);
    },
    undefined,
    (error) => {
      console.error('Error al cargar el modelo GLTF:', error);
    }
  );
}

// Ejemplo de uso (descomenta para probar):
// loadGLTFModel(scene, 'URL_DEL_MODELO.glb'); 

addTestCube({x: 3, y: 0.5, z: 2}, 0x0000ff, 'cubo_azul');
removeObjectByName('cubo_azul');
addTestSphere({x: 0, y: 1, z: 0}, 0xff00ff, 'esfera_magenta');
addTestCylinder({x: -2, y: 0.6, z: 1}, '#00ff00', 'cilindro_verde');

setObjectPosition('cubo', {x: 2, y: 1, z: 0});
setObjectRotation('cubo', {x: 0, y: Math.PI/2, z: 0});
setObjectScale('cubo', {x: 2, y: 1, z: 1});
setObjectVisibility('cubo', false); 
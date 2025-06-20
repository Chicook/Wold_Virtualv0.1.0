import { createScene } from './scene.js';
import { createCamera } from './scene.js';
import { createRenderer } from './scene.js';
import { addLights } from './lights.js';
import { addControls } from './controls.js';
import { loadTestModel } from './modelLoader.js';

const container = document.getElementById('three-canvas');
const scene = createScene();
const camera = createCamera(container);
const renderer = createRenderer(container);
addLights(scene);
const controls = addControls(camera, renderer.domElement);

// Añadir ejes de referencia
import * as THREE from 'https://unpkg.com/three@0.150.1/build/three.module.js';
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// Objetos de prueba
loadTestModel(scene);

// Tooltip simple
let tooltip = document.getElementById('threejs-tooltip');
if (!tooltip) {
  tooltip = document.createElement('div');
  tooltip.id = 'threejs-tooltip';
  tooltip.style.position = 'fixed';
  tooltip.style.pointerEvents = 'none';
  tooltip.style.background = 'rgba(30,30,30,0.85)';
  tooltip.style.color = '#fff';
  tooltip.style.padding = '4px 10px';
  tooltip.style.borderRadius = '4px';
  tooltip.style.fontSize = '14px';
  tooltip.style.display = 'none';
  tooltip.style.zIndex = '1000';
  document.body.appendChild(tooltip);
}

// Panel contextual flotante
let infoPanel = document.getElementById('threejs-info-panel');
if (!infoPanel) {
  infoPanel = document.createElement('div');
  infoPanel.id = 'threejs-info-panel';
  infoPanel.style.position = 'fixed';
  infoPanel.style.pointerEvents = 'none';
  infoPanel.style.background = 'rgba(20,20,40,0.97)';
  infoPanel.style.color = '#fff';
  infoPanel.style.padding = '10px 18px';
  infoPanel.style.borderRadius = '8px';
  infoPanel.style.fontSize = '15px';
  infoPanel.style.display = 'none';
  infoPanel.style.zIndex = '1001';
  infoPanel.style.boxShadow = '0 2px 12px #0008';
  document.body.appendChild(infoPanel);
}

// Animación y rotación del cubo
function animate() {
  requestAnimationFrame(animate);
  // Rotar el cubo si existe
  const cube = scene.getObjectByName('cubo');
  if (cube) {
    cube.rotation.y += 0.01;
    cube.rotation.x += 0.005;
  }
  renderer.render(scene, camera);
}
animate();

// Detección de clics en objetos
container.addEventListener('click', (event) => {
  const rect = renderer.domElement.getBoundingClientRect();
  const mouse = new THREE.Vector2(
    ((event.clientX - rect.left) / rect.width) * 2 - 1,
    -((event.clientY - rect.top) / rect.height) * 2 + 1
  );
  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(scene.children, true);
  if (intersects.length > 0) {
    const obj = intersects[0].object;
    if (obj.name) {
      console.log('¡Has hecho clic en:', obj.name + '!');
      // Mostrar panel contextual
      infoPanel.innerHTML = `<b>Nombre:</b> ${obj.name}<br><b>Tipo:</b> ${obj.type}<br><b>Posición:</b> (${obj.position.x.toFixed(2)}, ${obj.position.y.toFixed(2)}, ${obj.position.z.toFixed(2)})`;
      infoPanel.style.left = event.clientX + 16 + 'px';
      infoPanel.style.top = event.clientY + 12 + 'px';
      infoPanel.style.display = 'block';
      // Emitir evento personalizado global
      window.dispatchEvent(new CustomEvent('threejs-object-click', {
        detail: {
          name: obj.name,
          type: obj.type,
          position: { x: obj.position.x, y: obj.position.y, z: obj.position.z },
          object: obj
        }
      }));
    }
  } else {
    infoPanel.style.display = 'none';
  }
});

// Ocultar panel contextual al hacer clic fuera del canvas
window.addEventListener('click', (event) => {
  if (!container.contains(event.target)) {
    infoPanel.style.display = 'none';
  }
});

// Hover y resaltado de objetos
let lastHighlighted = null;
let lastOriginalColor = null;
container.addEventListener('mousemove', (event) => {
  const rect = renderer.domElement.getBoundingClientRect();
  const mouse = new THREE.Vector2(
    ((event.clientX - rect.left) / rect.width) * 2 - 1,
    -((event.clientY - rect.top) / rect.height) * 2 + 1
  );
  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(scene.children, true);

  if (lastHighlighted) {
    // Restaurar color original
    lastHighlighted.material.color.set(lastOriginalColor);
    lastHighlighted = null;
    lastOriginalColor = null;
    tooltip.style.display = 'none';
  }

  if (intersects.length > 0) {
    const obj = intersects[0].object;
    if (obj.name && obj.material && obj.material.color) {
      lastHighlighted = obj;
      lastOriginalColor = obj.material.color.getHex();
      obj.material.color.set(0xffff00); // Resalta en amarillo
      // Mostrar tooltip
      tooltip.textContent = obj.name;
      tooltip.style.left = event.clientX + 12 + 'px';
      tooltip.style.top = event.clientY + 8 + 'px';
      tooltip.style.display = 'block';
    }
  }
});

container.addEventListener('mouseleave', () => {
  if (lastHighlighted) {
    lastHighlighted.material.color.set(lastOriginalColor);
    lastHighlighted = null;
    lastOriginalColor = null;
  }
  tooltip.style.display = 'none';
  infoPanel.style.display = 'none';
});

// Redimensionamiento
window.addEventListener('resize', () => {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
});

// =========================
// Funciones globales útiles
// =========================

/**
 * Cambia el color de un objeto por nombre.
 * @param {string} name - Nombre del objeto.
 * @param {number|string} color - Color en formato hexadecimal (ej: 0xff0000 o '#ff0000').
 */
window.setObjectColor = function(name, color) {
  const obj = scene.getObjectByName(name);
  if (obj && obj.material && obj.material.color) {
    obj.material.color.set(color);
    console.log(`Color de '${name}' cambiado a`, color);
  } else {
    console.warn(`No se encontró el objeto '${name}' o no tiene material.`);
  }
};

/**
 * Enfoca la cámara en un objeto por nombre.
 * @param {string} name - Nombre del objeto.
 * @param {number} [distance=4] - Distancia de la cámara al objeto.
 */
window.focusCameraOnObject = function(name, distance = 4) {
  const obj = scene.getObjectByName(name);
  if (obj) {
    const target = obj.position.clone();
    camera.position.set(target.x + distance, target.y + distance, target.z + distance);
    controls.target.copy(target);
    controls.update();
    console.log(`Cámara enfocada en '${name}'.`);
  } else {
    console.warn(`No se encontró el objeto '${name}'.`);
  }
};

/**
 * Resetea la cámara a la posición inicial.
 */
window.resetCamera = function() {
  camera.position.set(0, 2, 6);
  controls.target.set(0, 1, 0);
  controls.update();
  console.log('Cámara reseteada.');
};

/**
 * Elimina un objeto de la escena por su nombre.
 * @param {string} name - Nombre del objeto a eliminar.
 */
window.removeObjectByName = function(name) {
  const obj = scene.getObjectByName(name);
  if (obj) {
    scene.remove(obj);
    obj.geometry?.dispose?.();
    obj.material?.dispose?.();
    renderer.renderLists?.dispose?.();
    console.log(`Objeto '${name}' eliminado de la escena.`);
  } else {
    console.warn(`No se encontró el objeto '${name}'.`);
  }
};

/**
 * Añade un cubo de prueba a la escena.
 * @param {{x:number, y:number, z:number}} position - Posición del cubo.
 * @param {number|string} color - Color del cubo (hex o string).
 * @param {string} [name] - Nombre opcional del cubo.
 */
window.addTestCube = function(position = {x:0, y:0.5, z:0}, color = 0x00ff00, name) {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshStandardMaterial({ color });
  const cube = new THREE.Mesh(geometry, material);
  cube.position.set(position.x, position.y, position.z);
  cube.castShadow = true;
  cube.name = name || `cubo_${Math.floor(Math.random()*10000)}`;
  scene.add(cube);
  console.log(`Cubo añadido en (${position.x},${position.y},${position.z}) con color`, color, 'y nombre', cube.name);
  return cube;
};

/**
 * Añade una esfera de prueba a la escena.
 * @param {{x:number, y:number, z:number}} position - Posición de la esfera.
 * @param {number|string} color - Color de la esfera (hex o string).
 * @param {string} [name] - Nombre opcional de la esfera.
 */
window.addTestSphere = function(position = {x:0, y:0.5, z:0}, color = 0x2196f3, name) {
  const geometry = new THREE.SphereGeometry(0.5, 32, 32);
  const material = new THREE.MeshStandardMaterial({ color });
  const sphere = new THREE.Mesh(geometry, material);
  sphere.position.set(position.x, position.y, position.z);
  sphere.castShadow = true;
  sphere.name = name || `esfera_${Math.floor(Math.random()*10000)}`;
  scene.add(sphere);
  console.log(`Esfera añadida en (${position.x},${position.y},${position.z}) con color`, color, 'y nombre', sphere.name);
  return sphere;
};

/**
 * Añade un cilindro de prueba a la escena.
 * @param {{x:number, y:number, z:number}} position - Posición del cilindro.
 * @param {number|string} color - Color del cilindro (hex o string).
 * @param {string} [name] - Nombre opcional del cilindro.
 */
window.addTestCylinder = function(position = {x:0, y:0.6, z:0}, color = 0xff9800, name) {
  const geometry = new THREE.CylinderGeometry(0.4, 0.4, 1.2, 32);
  const material = new THREE.MeshStandardMaterial({ color });
  const cylinder = new THREE.Mesh(geometry, material);
  cylinder.position.set(position.x, position.y, position.z);
  cylinder.castShadow = true;
  cylinder.name = name || `cilindro_${Math.floor(Math.random()*10000)}`;
  scene.add(cylinder);
  console.log(`Cilindro añadido en (${position.x},${position.y},${position.z}) con color`, color, 'y nombre', cylinder.name);
  return cylinder;
};

/**
 * Cambia la posición de un objeto por nombre.
 * @param {string} name - Nombre del objeto.
 * @param {{x:number, y:number, z:number}} position - Nueva posición.
 */
window.setObjectPosition = function(name, position) {
  const obj = scene.getObjectByName(name);
  if (obj) {
    obj.position.set(position.x, position.y, position.z);
    console.log(`Posición de '${name}' cambiada a`, position);
  } else {
    console.warn(`No se encontró el objeto '${name}'.`);
  }
};

/**
 * Cambia la rotación de un objeto por nombre (en radianes).
 * @param {string} name - Nombre del objeto.
 * @param {{x:number, y:number, z:number}} rotation - Nueva rotación (en radianes).
 */
window.setObjectRotation = function(name, rotation) {
  const obj = scene.getObjectByName(name);
  if (obj) {
    obj.rotation.set(rotation.x, rotation.y, rotation.z);
    console.log(`Rotación de '${name}' cambiada a`, rotation);
  } else {
    console.warn(`No se encontró el objeto '${name}'.`);
  }
};

/**
 * Cambia la escala de un objeto por nombre.
 * @param {string} name - Nombre del objeto.
 * @param {{x:number, y:number, z:number}} scale - Nueva escala.
 */
window.setObjectScale = function(name, scale) {
  const obj = scene.getObjectByName(name);
  if (obj) {
    obj.scale.set(scale.x, scale.y, scale.z);
    console.log(`Escala de '${name}' cambiada a`, scale);
  } else {
    console.warn(`No se encontró el objeto '${name}'.`);
  }
};

/**
 * Cambia la visibilidad de un objeto por nombre.
 * @param {string} name - Nombre del objeto.
 * @param {boolean} visible - Nueva visibilidad.
 */
window.setObjectVisibility = function(name, visible) {
  const obj = scene.getObjectByName(name);
  if (obj) {
    obj.visible = visible;
    console.log(`Visibilidad de '${name}' cambiada a`, visible);
  } else {
    console.warn(`No se encontró el objeto '${name}'.`);
  }
}; 
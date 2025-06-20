// utils.js
// Funciones auxiliares para el entorno Three.js

export function distance3D(a, b) {
  // a y b son objetos {x, y, z}
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  const dz = a.z - b.z;
  return Math.sqrt(dx*dx + dy*dy + dz*dz);
} 
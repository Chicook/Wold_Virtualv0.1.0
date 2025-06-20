# WebGL Three.js - Frontend 3D del Metaverso

## Estructura del Proyecto

```
webgl threejs/
├── components/
│   ├── three/        # Componentes Three.js (viewer, controles, escenas, etc.)
│   └── UI/           # Componentes de interfaz de usuario
├── services/         # Comunicación con Reflex (API/WebSocket)
├── store/            # Gestión de estado global (Zustand, etc.)
├── public/           # Assets públicos (modelos, texturas)
├── README.md         # Documentación y guía de desarrollo
```

## Propósito
Este módulo contiene el frontend 3D basado en React y Three.js. Aquí se desarrolla la experiencia visual inmersiva, la carga de modelos, la interacción y la integración con Reflex (backend Python).

## Integración con Reflex
- El componente `ThreeJSViewer` recibirá datos y eventos desde Reflex.
- La comunicación será vía API REST, WebSocket o custom component.
- El objetivo es lograr una sincronización bidireccional de estado y eventos.

## Próximos pasos
1. Implementar el componente base `ThreeJSViewer` en React/Three.js.
2. Preparar servicios para comunicación con Reflex.
3. Integrar el visor 3D en la UI de Reflex.
4. Modularizar y documentar cada nuevo componente.

## 🚀 Arranque y desarrollo

1. Instala las dependencias:
   ```bash
   npm install
   ```
2. Inicia el servidor de desarrollo:
   ```bash
   npm start
   # o, si usas Vite
   npm run dev
   ```
   Esto levantará la app en http://localhost:3000

3. Abre la app Reflex (ver instrucciones en su README) y verás el visor 3D embebido en el área principal de contenido.

---

# Componentes UI reutilizables

## ColorModeProvider.jsx
Proveedor de modo de color (oscuro/claro/sistema) para React puro.

- Permite alternar entre modo claro, oscuro y sistema en toda la app.
- Expone un contexto para acceder y cambiar el modo desde cualquier componente.

**Ejemplo de uso:**
```jsx
import { ColorModeProvider, ColorModeContext } from './components/UI/ColorModeProvider';

function App() {
  const { colorMode, toggleColorMode } = React.useContext(ColorModeContext);
  return (
    <ColorModeProvider>
      <button onClick={toggleColorMode}>Alternar modo: {colorMode}</button>
      {/* ...otros componentes... */}
    </ColorModeProvider>
  );
}
```

---

## CodeBlock.jsx
Componente para resaltar sintaxis de código usando Shiki.

- Muestra bloques de código con resaltado de sintaxis para múltiples lenguajes y temas.
- Útil para documentación, tutoriales, foros, etc.

**Ejemplo de uso:**
```jsx
import CodeBlock from './components/UI/CodeBlock';

<CodeBlock code={"console.log('Hola mundo')"} language="js" theme="nord" />
```

**Dependencias:**
```bash
npm install shiki
```

---

# Helpers universales (`utils/`)

## debounce.js
Evita llamadas excesivas a funciones (ej: búsqueda en tiempo real).
```js
import debounce from './utils/debounce';
debounce('buscar', () => buscarAPI(valor), 300);
```

## throttle.js
Limita la frecuencia de ejecución de funciones (ej: scroll, resize).
```js
import throttle from './utils/throttle';
if (throttle('scroll', 200)) { /* ... */ }
```

## range.js
Genera secuencias numéricas al estilo Python.
```js
import range from './utils/range';
[...range(1, 5)]; // [1, 2, 3, 4]
```

---

# Recursos reutilizados y adaptados de la copia de seguridad

Este frontend integra y refactoriza recursos clave provenientes de la carpeta `@/copia_de_seguridad` para optimizar el desarrollo y facilitar futuras extensiones:

## Helpers universales (`utils/`)
- **debounce.js, throttle.js, range.js**:
  - Optimizan llamadas a funciones, limitan la frecuencia de ejecución y generan secuencias numéricas.
  - Documentados con ejemplos de uso en este README.

## Componentes UI reutilizables (`components/UI/`)
- **UserProfile.jsx**: Perfil de usuario, edición de avatar, estado e inventario. Integra endpoints REST del backend.
- **ColorModeProvider.jsx**: Proveedor de modo oscuro/claro/sistema para toda la app.
- **CodeBlock.jsx**: Resaltado de sintaxis de código usando Shiki.
- Todos los componentes están documentados con ejemplos de integración.

## Integración y advertencias
- Cada recurso adaptado está documentado en el README de raíz y en el backend (`inicio/README.md`), con ejemplos y advertencias.
- Consulta dichos README para detalles de integración y extensión.

---

# WebGL Three.js - Entorno Base

## Descripción
Este directorio contiene el entorno 3D base del metaverso, construido con Three.js y preparado para integración con React y Reflex.

---

## Mejoras recientes
- Añadidos objetos de prueba: **esfera** y **cilindro** junto al cubo y el suelo.
- El cubo ahora **gira automáticamente** sobre su eje.
- **Detección de clics** en cubo, esfera y cilindro (muestra el nombre en consola).
- Añadido **AxesHelper** (ejes de referencia) para orientación espacial.
- **Resaltado de objetos** al pasar el ratón (hover).
- **Tooltip** con el nombre del objeto bajo el cursor.
- **Función para cargar modelos GLTF/GLB** desde una URL (`loadGLTFModel`).
- **Panel contextual flotante**: al hacer clic en un objeto, muestra su información (nombre, tipo, posición) cerca del cursor.
- **Funciones globales para control externo**: cambiar color, posición, rotación, escala, visibilidad, enfocar cámara, resetear cámara, eliminar y añadir cubos, esferas y cilindros de prueba.
- **Evento global personalizado**: se emite un evento `threejs-object-click` cada vez que se hace clic en un objeto 3D.

---

## Estructura de archivos
```
webgl threejs/
│
├── index.html         # Página principal para visualizar la escena 3D
├── main.js            # Punto de entrada: inicializa la escena, cámara, renderizador
├── scene.js           # Configuración y gestión de la escena Three.js
├── controls.js        # Configuración de controles de usuario (OrbitControls)
├── lights.js          # Configuración de luces
├── modelLoader.js     # Utilidad para cargar modelos 3D y añadir objetos de prueba
├── utils.js           # Funciones auxiliares (distancia, helpers, etc.)
└── README.md          # Esta documentación
```

---

## ¿Qué incluye este entorno?
- Suelo (plano), cubo, esfera y cilindro de prueba visibles.
- Cubo animado (rotación automática).
- Detección de clics en objetos principales (nombre en consola).
- **Resaltado de objetos al pasar el ratón (hover).**
- **Tooltip con el nombre del objeto bajo el cursor.**
- **Carga de modelos GLTF/GLB desde una URL.**
- **Panel contextual flotante con información del objeto clicado.**
- **Funciones globales para control externo (React/Reflex o consola):**
  - `setObjectColor(name, color)`
  - `setObjectPosition(name, {x, y, z})`
  - `setObjectRotation(name, {x, y, z})`
  - `setObjectScale(name, {x, y, z})`
  - `setObjectVisibility(name, visible)`
  - `focusCameraOnObject(name, distance)`
  - `resetCamera()`
  - `removeObjectByName(name)`
  - `addTestCube(position, color, name)`
  - `addTestSphere(position, color, name)`
  - `addTestCylinder(position, color, name)`
- **Evento global personalizado:**
  - Se emite un evento `threejs-object-click` en `window` cada vez que se hace clic en un objeto 3D.
  - El evento contiene: `{ name, type, position, object }`.
- Cámara y controles de usuario (OrbitControls).
- Luces básicas.
- Ejes de referencia (AxesHelper).
- Código modular y preparado para ampliación.
- Imports de Three.js y OrbitControls desde CDN (unpkg).

---

## ¿Cómo ampliar o integrar?
- Puedes añadir más objetos en `modelLoader.js`.
- Puedes importar helpers desde `utils.js`.
- **Para cargar un modelo GLTF/GLB:**
  ```js
  import { loadGLTFModel } from './modelLoader.js';
  loadGLTFModel(scene, 'URL_DEL_MODELO.glb');
  ```
- **Funciones globales disponibles:**
  - Cambiar color de un objeto:
    ```js
    setObjectColor('cubo', 0xff0000);
    setObjectColor('esfera', '#00ffcc');
    ```
  - Cambiar posición de un objeto:
    ```js
    setObjectPosition('cubo', {x: 2, y: 1, z: 0});
    ```
  - Cambiar rotación de un objeto (en radianes):
    ```js
    setObjectRotation('cubo', {x: 0, y: Math.PI/2, z: 0});
    ```
  - Cambiar escala de un objeto:
    ```js
    setObjectScale('cubo', {x: 2, y: 1, z: 1});
    ```
  - Cambiar visibilidad de un objeto:
    ```js
    setObjectVisibility('cubo', false);
    ```
  - Enfocar la cámara en un objeto:
    ```js
    focusCameraOnObject('cilindro', 6);
    ```
  - Resetear la cámara:
    ```js
    resetCamera();
    ```
  - Eliminar un objeto por nombre:
    ```js
    removeObjectByName('cubo');
    ```
  - Añadir un cubo de prueba:
    ```js
    addTestCube({x: 3, y: 0.5, z: 2}, 0x0000ff, 'cubo_azul');
    ```
  - Añadir una esfera de prueba:
    ```js
    addTestSphere({x: 0, y: 1, z: 0}, 0xff00ff, 'esfera_magenta');
    ```
  - Añadir un cilindro de prueba:
    ```js
    addTestCylinder({x: -2, y: 0.6, z: 1}, '#00ff00', 'cilindro_verde');
    ```
- **Escuchar el evento global personalizado desde React o la consola:**
  ```js
  window.addEventListener('threejs-object-click', (e) => {
    const { name, type, position, object } = e.detail;
    console.log('Objeto 3D clicado:', name, type, position, object);
    // Aquí puedes disparar lógica React, abrir paneles, etc.
  });
  ```
- El entorno está listo para ser controlado desde React o Reflex (ver README de bk-componentereact-3D para integración avanzada).
- **Panel contextual:** Al hacer clic en un objeto, se muestra un panel flotante con su información. Haz clic fuera del canvas para ocultarlo.

---

## Siguientes pasos recomendados
- Documentar eventos y API para comunicación con la UI React.
- Mejorar la interacción visual (más efectos, tooltips avanzados, etc.).

---

## Contacto y soporte
Para dudas o mejoras, consulta la documentación de Three.js o contacta al equipo de desarrollo del metaverso. 
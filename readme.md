# WoldVirtual - Metaverso Cripto 3D Descentralizado

## 🌐 Visión y Dirección del Proyecto
WoldVirtual Crypto 3D es un proyecto de código abierto que busca construir un metaverso 3D descentralizado, accesible vía web, donde cualquier persona pueda crear, explorar y monetizar experiencias virtuales. Nuestra meta es empoderar a los usuarios y desarrolladores para que no solo interactúen en mundos virtuales preexistentes, sino que también puedan publicar sus propios juegos, entornos y activos digitales, gestionando la propiedad mediante NFTs y tecnología blockchain. Apostamos por la transparencia, la colaboración comunitaria y la innovación abierta, integrando tecnologías como Three.js para el renderizado 3D, Reflex para la lógica de negocio y la interfaz, y soluciones descentralizadas como IPFS para el almacenamiento de contenido. El proyecto está en constante evolución y abierto a contribuciones de la comunidad global.

## 🚀 Descripción
WoldVirtual es un metaverso cripto 3D descentralizado y de código abierto que permite a los usuarios crear, explorar y monetizar experiencias virtuales. Construido con Reflex y Three.js, ofrece una plataforma completa para la creación de mundos virtuales.

---

## 🔄 Flujo de Trabajo Modular: Integración de Three.js, React y Reflex

### 1. @/webgl threejs (`Wold_Virtual3D/webgl threejs`)
- **Propósito:** Proporciona el entorno 3D base, modular y ampliable, con utilidades para crear, modificar y manipular objetos en tiempo real.
- **Capacidades:**
  - Creación y manipulación de cubos, esferas, cilindros y modelos GLTF.
  - Funciones globales para control externo (React/Reflex).
  - Emisión de eventos personalizados para integración con UI.
  - Panel contextual y utilidades de interacción avanzada.

### 2. @/bk-componentereact-3D (`Wold_Virtual3D/bk_public/react_complementos/bk-componentereact-3D`)
- **Propósito:** Desarrollo de la interfaz de usuario React, que se superpone y comunica con el entorno 3D.
- **Capacidades:**
  - Componentes UI modulares (paneles, menús, inventario, chat, etc.).
  - Escucha de eventos globales emitidos por Three.js.
  - Envío de comandos y acciones al entorno 3D mediante funciones globales o eventos.
  - Preparada para recibir datos y comandos desde Reflex.

### 3. @/assets (`Wold_Virtual3D/bk_public/assets`)
- **Propósito:** Almacén centralizado de recursos (modelos 3D, imágenes, iconos, sonidos, etc.) utilizados tanto por el entorno 3D como por la UI y Reflex.
- **Recomendación:** Mantener un README en esta carpeta con el inventario y estado de los recursos.

### 4. Reflex (orquestador y backend)
- **Propósito:** Unifica y orquesta la lógica de negocio, el estado global, la comunicación con blockchain y la integración entre el entorno 3D y la UI React.
- **Capacidades:**
  - Mantiene el estado maestro del metaverso.
  - Expone API y eventos para sincronizar Three.js y React.
  - Gestiona la conexión con blockchain y almacenamiento descentralizado.

---

### 🔗 Diagrama de Flujo Conceptual

```
flowchart TD
    subgraph Threejs["@/webgl threejs (3D)"]
      A1["Renderizado 3D"]
      A2["Manipulación de objetos"]
      A3["Eventos personalizados"]
    end
    subgraph ReactUI["@/bk-componentereact-3D (UI)"]
      B1["Paneles y menús"]
      B2["Inventario, chat, etc."]
      B3["Escucha eventos 3D"]
    end
    subgraph Reflex["Reflex (Backend)"]
      C1["Estado global"]
      C2["API y lógica"]
      C3["Blockchain y assets"]
    end
    subgraph Assets["@/assets"]
      D1["Modelos 3D"]
      D2["Imágenes, iconos"]
      D3["Sonidos"]
    end
    A3 -- "Eventos y comandos" --> B3
    B1 -- "Acciones de usuario" --> C2
    C2 -- "Actualizaciones de estado" --> A2
    C2 -- "Datos y comandos" --> B1
    A2 -- "Carga de recursos" --> D1
    B2 -- "Carga de recursos" --> D2
    C3 -- "Gestión de recursos" --> D1
```

---

### 🛠️ Pasos para la integración final
1. **Desarrollar y probar el entorno 3D en @/webgl threejs.**
2. **Desarrollar la UI React en @/bk-componentereact-3D, escuchando eventos y enviando comandos al entorno 3D.**
3. **Centralizar y documentar los recursos en @/assets.**
4. **Unificar todo en Reflex, orquestando la comunicación y el estado global.**
5. **Documentar la integración y los puntos de extensión en los README de cada módulo.**

---

## 🏗️ Arquitectura del Proyecto

### Estructura de Carpetas
```
WoldVirtual_Crypto_3D/
├── components/          # Componentes reutilizables
│   ├── scene.py        # Escena 3D con Three.js
│   └── ui.py           # Componentes de interfaz
├── assets/             # Recursos estáticos
│   ├── models/         # Modelos 3D
│   ├── textures/       # Texturas
│   └── sounds/         # Audio
├── utils/              # Utilidades
│   ├── constants.py    # Constantes globales
│   ├── helpers.py      # Funciones de ayuda
│   └── web3_utils.py   # Utilidades blockchain
└── models/             # Modelos de datos
```

### Archivos Principales
- `WoldVirtual_Crypto_3D.py`: Punto de entrada de la aplicación
- `state.py`: Gestión del estado global
- `styles.py`: Estilos globales
- `rxconfig.py`: Configuración de Reflex

## 🛠️ Tecnologías Principales

### Frontend
- **Reflex**: Framework Python Full-Stack
- **Three.js**: Motor 3D
- **React Three Fiber**: Integración React con Three.js
- **React Three Drei**: Componentes útiles para Three.js

### Backend
- **Reflex**: Manejo de estado y lógica de negocio
- **SQLite**: Base de datos (desarrollo)
- **Web3.py**: Integración con blockchain

### Blockchain
- **Ethereum/Polygon**: Redes soportadas
- **Web3.js**: Interacción con smart contracts
- **IPFS**: Almacenamiento descentralizado

## 📋 Requisitos del Sistema

### Desarrollo
- Python 3.8+
- Node.js 16+
- WebGL 2.0 compatible
- Git

### Producción
- Servidor con soporte WebGL
- Base de datos PostgreSQL
- Nodo blockchain
- Servidor IPFS

## 🚀 Instalación

### 1. Clonar el Repositorio
```bash
git clone https://github.com/tu-usuario/WoldVirtual_Crypto_3D.git
cd WoldVirtual_Crypto_3D
```

### 2. Configurar Entorno Virtual
```bash
# Crear entorno virtual
python -m venv .venv

# Activar entorno virtual
# Windows
.venv\Scripts\activate
# Unix/Mac
source .venv/bin/activate
```

### 3. Instalar Dependencias
```bash
# Instalar dependencias Python
pip install -r requirements.txt

# Instalar dependencias Node.js
npm install
```

### 4. Configurar Variables de Entorno
```bash
# Copiar archivo de ejemplo
cp .env.example .env

# Editar .env con tus configuraciones
```

## 💻 Desarrollo

### Iniciar Servidor de Desarrollo
```bash
reflex run
```
La aplicación estará disponible en `http://localhost:3000`

### Estructura de Desarrollo
- `components/`: Componentes reutilizables
- `assets/`: Recursos estáticos
- `utils/`: Utilidades y helpers
- `models/`: Modelos de datos

## 🎮 Características Principales

### Renderizado 3D
- Escenas inmersivas
- Física realista
- Iluminación dinámica
- Optimización de rendimiento

### Integración Blockchain
- Conexión de wallets
- NFTs para activos
- Marketplace descentralizado
- Gobernanza DAO

### Creación de Contenido
- Editor de escenas
- Importación de modelos
- Sistema de terrenos
- Creación de avatares

## 📚 Documentación

### Guías
- [Guía de Desarrollo](docs/development.md)
- [Guía de Contribución](docs/contributing.md)
- [Guía de Despliegue](docs/deployment.md)

### API
- [API Reference](docs/api.md)
- [Componentes](docs/components.md)
- [Estado](docs/state.md)

## 🤝 Contribuir

### Proceso de Contribución
1. Fork el repositorio
2. Crear rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

### Convenciones de Código
- PEP 8 para Python
- TypeScript para componentes
- Documentación con docstrings
- Tests unitarios

## 📝 Licencia
Este proyecto está licenciado bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 📞 Contacto
- Website: [woldvirtual.com](https://woldvirtual.com)
- Discord: [Discord Server](https://discord.gg/woldvirtual)
- Twitter: [@WoldVirtual](https://twitter.com/WoldVirtual)

## 🙏 Agradecimientos
- Reflex por el framework
- Three.js por el motor 3D
- La comunidad de código abierto

## Arquitectura Tecnológica Recomendada

- **Frontend:** Three.js (WebGL) + React/TypeScript para renderizado 3D interactivo.
- **Backend:** Reflex (Python Full-Stack Framework) para lógica de negocio, gestión de estado y orquestación blockchain.
- **Blockchain:** Web3 (Ethereum, Polygon, Solana, Avalanche, etc.) para NFTs y economía cripto.
- **Almacenamiento descentralizado:** IPFS/Arweave para modelos 3D, assets y lógica de juegos.

---

## Estrategia de Modularización Inicial

### 1. Core de Interconexión Frontend–Backend
- **Frontend (Three.js + React/TypeScript):**
  - Componente raíz/canvas Three.js modular.
  - Servicio de comunicación con Reflex (WebSocket/REST).
  - Componentes básicos de entidades (avatar, objeto) que reaccionan al estado y reportan eventos.
- **Backend (Reflex/Python):**
  - State central con estado global relevante para la escena 3D y la sesión de usuario.
  - Handlers para eventos del frontend y actualización de estado.
  - Placeholder de usuario/sesión.

### 2. Módulos esenciales de Blockchain y Almacenamiento
- **Integración blockchain:** Módulo Python para conexión básica a Web3, consulta de contratos y placeholders para transacciones.
- **Interacción con IPFS/Arweave:** Funciones para subir y consultar archivos y hashes, y exponerlos al frontend.

---

## Justificación
- Validar la comunicación bidireccional desde el inicio evita cuellos de botella y refactorizaciones costosas.
- Permite pruebas end-to-end: desde el movimiento de un avatar hasta la actualización en Reflex y la consulta de un NFT en blockchain.
- Facilita la colaboración y la extensión futura.

---

## Próximos pasos
1. Crear el componente raíz/canvas Three.js y el servicio de comunicación con Reflex en el frontend.
2. Ampliar el State y los handlers de Reflex para la gestión de estado y eventos.
3. Crear módulos base para blockchain y almacenamiento descentralizado.
4. Documentar y dejar hooks/listeners para la integración bidireccional.

---

**Este README se irá actualizando conforme avance la arquitectura y la modularización.**

---

# Recursos reutilizados y adaptados de la copia de seguridad

Este proyecto integra y refactoriza numerosos recursos provenientes de la carpeta `@/copia_de_seguridad` para acelerar el desarrollo, mantener buenas prácticas y facilitar futuras extensiones. A continuación se detallan los principales recursos integrados:

## Helpers y utilidades universales
- **debounce.js, throttle.js, range.js** (ver `webgl threejs/utils/`):
  - Permiten optimizar llamadas a funciones, limitar la frecuencia de ejecución y generar secuencias numéricas.
  - Documentados y con ejemplos de uso en el README del frontend.

## Modelos y patrones de datos
- **Modelo de usuario avanzado** (adaptado de `models/user.py`):
  - Incluye campos para wallet, avatar, inventario, reputación, etc.
  - Integrado y documentado en el backend Reflex (`inicio/state.py`).
- **Gestión de assets y escenas**:
  - Lógica y métodos enriquecidos a partir de la copia de seguridad.

## Componentes visuales y UI
- **UserProfile.jsx, ColorModeProvider.jsx, CodeBlock.jsx** (ver `webgl threejs/components/UI/`):
  - Componentes reutilizables para perfil de usuario, modo oscuro/claro y resaltado de código.
  - Documentados con ejemplos de integración en el README del frontend.

## Lógica avanzada y experimental
- **Integración blockchain y almacenamiento descentralizado**:
  - Placeholders y módulos preparados para Web3, IPFS, etc., con advertencias y documentación para futura activación.
- **Helpers de threading y asincronía** (ej: `run_in_thread` de `utils/misc.py`):
  - Útiles para tareas pesadas en el backend Reflex, documentados en el README de backend.

## Documentación cruzada
- Cada recurso adaptado está documentado en el README de su sección (`webgl threejs/README.md`, `inicio/README.md`), con ejemplos de uso y advertencias.
- Se recomienda consultar dichos README para detalles de integración y extensión.

---

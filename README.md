## 🌐 Frontend - Angular

Este proyecto contiene la interfaz de usuario desarrollada en Angular. A continuación, los pasos
para su correcta ejecución en entorno local.

### ✅ Requisitos

- Node.js (>= 18.x)
- Angular CLI
- npm o yarn

### ⚙️ Instalación

```bash
npm install
# o
yarn install
```

### 🔧 Configuración

#### 📁 Archivo `public/environment.js`

Este archivo contiene la configuración de URLs necesarias para el funcionamiento del sistema

#### 🌐 Proxy para desarrollo

Para consumir correctamente el `urlApiWheater`, es necesario configurar un proxy local que
redireccione las peticiones y evite errores de CORS.

Ejemplo de `proxy.conf.json`:

```json
{
	"/weather": {
		"target": "https://api.openweathermap.org/data/2.5",
		"secure": true,
		"changeOrigin": true,
		"pathRewrite": {
			"^/weather": ""
		}
	}
}
```

Y para correr la app con proxy:

```bash
ng serve --proxy-config proxy.conf.json
```

> Asegurarse de usar `/weather/` como prefijo en las llamadas al api dentro del código Angular.

### ▶️ Ejecución

```bash
ng serve --proxy-config proxy.conf.json
```

Acceso: [http://localhost:4200/](http://localhost:4200/)

---

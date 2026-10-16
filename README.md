# HouseKarma | Frontend

<p align="center">
  <img src="https://img.shields.io/badge/Angular-21-DD0031?logo=angular&logoColor=white" alt="Angular 21">
  <img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/RxJS-7.8-B7178C?logo=reactivex&logoColor=white" alt="RxJS">
  <img src="https://img.shields.io/badge/License-TBD-lightgrey" alt="Licencia pendiente">
</p>

**HouseKarma** es una plataforma orientada a mejorar la confianza en el mercado del alquiler mediante la reputación de inquilinos y caseros.

Este repositorio contiene el frontend desarrollado con Angular 21. Su objetivo es ofrecer una interfaz clara, accesible y adaptable, preparada para conectarse con el backend Spring Boot mediante una API REST.

> [!NOTE]
> Este README documenta el estado conocido del frontend. Las pantallas y formularios desarrollados no implican que todas las operaciones estén conectadas al backend ni que el flujo completo de la aplicación esté terminado.

---

## Índice

- [ Objetivo del proyecto](#-objetivo-del-proyecto)
- [ Tecnologías](#️-tecnologías)
- [ Funcionalidades](#-funcionalidades)
- [ Estructura del proyecto](#-estructura-del-proyecto)
- [ Requisitos previos](#️-requisitos-previos)
- [ Instalación y ejecución](#-instalación-y-ejecución)
- [ Pruebas y compilación](#-pruebas-y-compilación)
- [ Integración con el backend](#-integración-con-el-backend)
- [ Limitaciones conocidas](#️-limitaciones-conocidas)
- [ Roadmap](#️-roadmap)
- [ Buenas prácticas](#-buenas-prácticas)

---

##  Objetivo del proyecto

HouseKarma busca facilitar la creación de relaciones de confianza entre las personas que participan en un alquiler.

La plataforma contempla distintos perfiles de usuario:

- **Inquilino:** persona que alquila una vivienda.
- **Casero:** persona que ofrece una vivienda en alquiler.
- **Administrador:** perfil previsto para las tareas de gestión de la plataforma.

El frontend se está desarrollando de forma modular para facilitar la incorporación progresiva de nuevas funcionalidades y su integración con el backend.

##  Tecnologías

- **Angular 21:** desarrollo de la interfaz mediante componentes standalone.
- **TypeScript:** tipado estático y organización del código.
- **Angular Router:** navegación entre vistas.
- **Angular Reactive Forms:** formularios reactivos y validación de datos.
- **Angular Signals:** gestión reactiva de determinados estados locales de la interfaz.
- **Tailwind CSS 4:** utilidades de estilo.
- **Lucide Angular:** iconografía para la interfaz.
- **RxJS:** herramientas para trabajar con operaciones asíncronas.
- **Vitest:** entorno de pruebas configurado en el proyecto.
- **npm:** instalación de dependencias y ejecución de scripts.
- **Git y GitHub:** control de versiones y colaboración.

> [!NOTE]
> Las tecnologías anteriores aparecen en la configuración conocida del proyecto. Su presencia en `package.json` no significa que todas estén utilizadas actualmente en todas las funcionalidades.

##  Funcionalidades

###  Implementado en la interfaz

- [x] Configuración inicial del proyecto Angular.
- [x] Aplicación basada en componentes standalone.
- [x] Estructura inicial de navegación.
- [x] Layout público compartido.
- [x] Vista de inicio.
- [x] Pantalla de registro con formulario reactivo.
- [x] Pantalla de inicio de sesión con formulario reactivo.
- [x] Validación de campos obligatorios y formato del correo electrónico.
- [x] Validación de longitud mínima de contraseña en el registro.
- [x] Comprobación de coincidencia de contraseñas.
- [x] Selección entre los roles `INQUILINO` y `CASERO` en el registro.
- [x] Control de visibilidad de la contraseña.
- [x] Mensajes de validación y errores de formulario.
- [x] Enlaces de navegación entre registro e inicio de sesión.

###  En desarrollo o pendientes de integración

- [ ] Enviar el formulario de registro al backend.
- [ ] Conectar el inicio de sesión con el endpoint de autenticación.
- [ ] Procesar y gestionar el JWT devuelto por el backend.
- [ ] Definir la estrategia de almacenamiento del token.
- [ ] Incorporar un mecanismo para adjuntar el token a las peticiones protegidas.
- [ ] Gestionar los errores HTTP y la expiración de la autenticación.
- [ ] Verificar la configuración CORS desde el navegador.
- [ ] Implementar y comprobar las rutas protegidas según los permisos reales.

###  Funcionalidades previstas

- [ ] Perfiles de usuario conectados con datos reales.
- [ ] Búsqueda de usuarios.
- [ ] Registro y consulta de viviendas mediante la API.
- [ ] Gestión de experiencias de alquiler.
- [ ] Confirmación y finalización de experiencias.
- [ ] Sistema de valoraciones y reputación.
- [ ] Paneles diferenciados para inquilinos, caseros y administradores.
- [ ] Funcionalidades de administración de usuarios.

> [!WARNING]
> Las funcionalidades previstas no deben considerarse implementadas hasta que exista código funcional y se haya verificado su comportamiento. La disponibilidad de un endpoint en el backend tampoco garantiza que ya esté conectado al frontend.

---

##  Estructura del proyecto

La aplicación cuenta con una estructura inicial Angular y una configuración de rutas que contempla la vista de inicio, el registro y el inicio de sesión.

La organización conocida de las rutas incluye:

```text
src/
└── app/
    ├── features/
    │   ├── home/
    │   │   └── pages/
    │   │       └── home/
    │   └── auth/
    │       └── pages/
    │           ├── login/
    │           └── register/
    ├── layouts/
    │   └── public-layout/
    ├── app.config.ts
    ├── app.routes.ts
    ├── app.css
    ├── app.html
    ├── app.spec.ts
    └── app.ts
```

> [!IMPORTANT]
> Este árbol recoge la estructura conocida en los archivos compartidos. Debe contrastarse con el repositorio actual antes de considerarlo un inventario completo. Las carpetas `core`, `shared`, los layouts privados y los módulos de viviendas, experiencias, valoraciones y administración forman parte de la organización prevista, pero no se presentan aquí como implementados.

---

##  Requisitos previos

Antes de ejecutar el proyecto, instala:

- **Node.js:** versión compatible con Angular 21. En el entorno de desarrollo documentado se utilizó Node.js 24.13.0.
- **npm:** gestor de paquetes. En el entorno documentado se utilizó npm 11.6.2.
- **Git:** para clonar el repositorio y gestionar los cambios.

Puedes comprobar las versiones instaladas con:

```bash
node -v
npm -v
git --version
```

##  Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/ruddycruzc/houseKarma-frontend.git
cd houseKarma-frontend
```

### 2. Instalar las dependencias

```bash
npm install
```

### 3. Iniciar el servidor de desarrollo

```bash
npm start
```

El comando ejecuta `ng serve -o`. Se abrirá automáticamente la aplicación en el navegador.

### 4. Compilar el proyecto

```bash
npm run build
```

La compilación permite detectar errores de TypeScript, plantillas y configuración de Angular.

### 5. Ejecutar las pruebas

```bash
npm test
```

Este comando ejecuta el script de pruebas configurado en `package.json`.

> [!NOTE]
> Se documentó una compilación satisfactoria durante el desarrollo inicial. Debe ejecutarse de nuevo después de los últimos cambios para confirmar el estado actual. No se da por confirmada una suite de pruebas frontend completamente superada.

---

##  Pruebas y compilación

Las comprobaciones del frontend deben cubrir progresivamente:

- Validación de los formularios de registro e inicio de sesión.
- Coincidencia de las contraseñas durante el registro.
- Selección correcta del rol.
- Visibilidad y ocultación de contraseñas.
- Navegación entre las vistas públicas.
- Tratamiento de respuestas HTTP correctas y erróneas.
- Integración con los endpoints reales.
- Acceso a rutas protegidas según la autenticación y los permisos.

### Estado conocido

- **Compilación:** se registró una compilación satisfactoria en una revisión anterior.
- **Pruebas automatizadas frontend:** pendiente de confirmar el resultado de la ejecución más reciente.
- **Pruebas de integración frontend-backend:** pendientes de completar.
- **Pruebas manuales de API:** se han documentado comprobaciones del backend con Postman. Estas no sustituyen las pruebas de integración desde Angular.

---

## Integración con el backend

El backend de HouseKarma utiliza Java, Spring Boot, MySQL y autenticación JWT.

La integración del frontend debe centralizar las peticiones HTTP en servicios Angular y utilizar los contratos reales de la API.

### Endpoints identificados

- `POST /api/usuarios`: registro de usuarios.
- `POST /api/auth/login`: inicio de sesión.
- `POST /api/viviendas`: registro de viviendas.
- `GET /api/viviendas`: listado de viviendas.
- `GET /api/viviendas/{id}`: consulta de una vivienda por identificador.

El estado de acceso y los permisos concretos de cada endpoint deben verificarse en la configuración actual del backend.

### Próximos pasos de integración

1. Configurar la URL base del backend mediante los entornos de Angular.
2. Crear o completar los servicios de autenticación y usuarios.
3. Adaptar los formularios a los DTO reales.
4. Procesar correctamente las respuestas y los errores del servidor.
5. Definir la gestión del JWT y las peticiones protegidas.
6. Comprobar CORS desde el navegador.
7. Integrar las viviendas.
8. Conectar las demás funcionalidades cuando sus endpoints estén disponibles y verificados.

> [!WARNING]
> Los formularios de registro e inicio de sesión tienen lógica de validación local, pero sus métodos de envío todavía contienen puntos pendientes de integración. No crean cuentas ni autentican usuarios contra Spring Boot hasta completar esa conexión.

---

##  Limitaciones conocidas

- El registro y el inicio de sesión no están completamente conectados al backend.
- No se ha confirmado la gestión completa del token JWT en el frontend.
- La autorización efectiva por rol debe verificarse tanto en Angular como en Spring Security.
- Las funcionalidades de viviendas, experiencias, valoraciones y administración no deben darse por integradas solo por estar previstas en la arquitectura.
- La configuración CORS debe probarse desde el origen real de Angular.
- El resultado más reciente de compilación y pruebas debe actualizarse cuando se vuelva a ejecutar la suite.

---

## Roadmap

### Fase 1. Base de la aplicación

- [x] Configuración inicial de Angular.
- [x] Rutas públicas iniciales.
- [x] Vistas de inicio, registro e inicio de sesión.
- [x] Validaciones locales de formularios.

### Fase 2. Autenticación

- [ ] Conectar registro e inicio de sesión.
- [ ] Gestionar el JWT.
- [ ] Definir el estado de autenticación.
- [ ] Verificar el acceso a rutas protegidas.
- [ ] Probar errores y expiración del token.

### Fase 3. Funcionalidades principales

- [ ] Integrar perfiles de usuario.
- [ ] Conectar el módulo de viviendas.
- [ ] Implementar el flujo de experiencias de alquiler.
- [ ] Incorporar valoraciones y reputación.

### Fase 4. Roles y administración

- [ ] Completar la navegación diferenciada por rol.
- [ ] Verificar los permisos en coordinación con el backend.
- [ ] Desarrollar las funcionalidades administrativas pendientes.

### Fase 5. Calidad y entrega

- [ ] Completar las pruebas unitarias y de integración.
- [ ] Verificar el diseño responsive y la accesibilidad.
- [ ] Comprobar la configuración de producción.
- [ ] Actualizar la documentación técnica.
- [ ] Preparar el despliegue del frontend.

---

## Buenas prácticas

Durante el desarrollo se toman como referencia los siguientes principios:

- **SOLID:** separar responsabilidades y mantener componentes enfocados.
- **DRY:** evitar duplicaciones innecesarias.
- **TDD:** añadir pruebas para los comportamientos relevantes.
- **Componentes standalone:** utilizar la arquitectura moderna de Angular.
- **Servicios:** centralizar la comunicación HTTP y la lógica compartida.
- **Seguridad:** no incluir credenciales, claves JWT ni secretos en el repositorio.
- **Commits atómicos:** mantener cambios pequeños y descriptivos.
- **Documentación continua:** actualizar el README y la Wiki a medida que cambie la implementación.

---

## Documentación relacionada

La documentación técnica ampliada se mantiene en la Wiki de GitHub del proyecto backend.

https://github.com/ruddycruzc/houseKarma-backend.git

Se recomienda consultar allí las páginas de:

- Arquitectura del backend.
- Base de datos y migraciones.
- Seguridad y autenticación.
- API y endpoints.
- Pruebas e integración.
- Integración Angular-backend.
- Roadmap y funcionalidades pendientes.

---

<p align="center">
  <strong>HouseKarma</strong><br>
  Construyendo confianza, una experiencia de alquiler a la vez.
</p>

>  ***Proyecto personal:*** HouseKarma está aún en desarrollo y sigue en evolución.

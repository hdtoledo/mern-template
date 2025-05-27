# 🧠 Proyecto Base Full Stack MERN: Autenticación y Gestión de Usuarios

Este proyecto es una **plantilla funcional avanzada** que integra un **frontend en React + Vite** con un **backend en Node.js + Express + MongoDB** para implementar:

- Autenticación de usuarios con JWT.
- Gestión de usuarios desde un panel administrativo.
- CRUD de usuarios con consumo de API REST.
- Roles diferenciados (`admin` y `user`).
- Redirección dinámica basada en el rol.
- Layouts reutilizables según el tipo de usuario.
- Scripts unificados de desarrollo con `concurrently`.

Ideal como base para dashboards administrativos, aplicaciones SaaS, o sistemas internos empresariales.

---

## 🗂 Estructura general del proyecto

```
.
├── backend-mongodb/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── config/
│   └── server.js
│
└── frontend-auth/
    ├── src/
    │   ├── pages/
    │   ├── components/
    │   ├── layouts/
    │   ├── App.jsx
    │   └── main.jsx
```

---

## 🚀 ¿Qué incluye?

### ✅ Frontend (React + Vite + TailwindCSS)
- Login y Registro con validación.
- Redirección automática al dashboard según el rol.
- Layout dinámico para `admin` y `user`.
- Tabla de usuarios con edición y eliminación.
- Modal editable con animaciones y backdrop.
- Sidebar responsive con visualización según rol.
- Protección de rutas mediante `PrivateRoute` y `AdminRoute`.

### ✅ Backend (Node.js + Express + MongoDB)
- Endpoints RESTful para login, registro y CRUD de usuarios.
- Autenticación con JSON Web Tokens (JWT).
- Encriptación de contraseñas con `bcrypt`.
- Validación de roles (`admin` / `user`) y protección de rutas.
- Arquitectura limpia con controladores y middlewares.

---

## 🧪 Cómo correr el proyecto

### 1. Clonar el repositorio

```bash
git clone https://github.com/hdtoledo/mern-template.git
cd mern-template
```

### 2. Instalar dependencias del backend y frontend

```bash
npm install
```

Este comando ejecuta tanto el frontend como el backend usando `concurrently`:

```json
"scripts": {
  "dev": "concurrently \"npm run dev --prefix backend-mongodb\" \"npm run dev --prefix frontend-auth\""
}
```

### 3. Variables de entorno

#### Backend (`backend-mongodb/.env`)

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/auth_db
JWT_SECRET=tu_clave_secreta
```

### 4. Abrir en navegador

```bash
http://localhost:5173
```

---

## 🔐 Datos de ejemplo

Puedes insertar usuarios desde MongoDB o registrarte desde el frontend. Para probar el panel `admin`, crea un usuario manualmente con:

```json
{
  "nombre": "Admin",
  "correo": "admin@example.com",
  "password": "admin123",
  "rol": "admin"
}
```

---

## 🧰 Endpoints principales

| Método | Ruta                    | Descripción                  |
|--------|-------------------------|------------------------------|
| POST   | `/api/register`         | Registro de usuario          |
| POST   | `/api/login`            | Login de usuario             |
| GET    | `/api/users`            | Obtener todos los usuarios   |
| DELETE | `/api/users/:id`        | Eliminar usuario por ID      |
| PUT    | `/api/users/:id`        | Actualizar usuario por ID    |

---

## 💡 Características destacadas

- Panel admin responsive con TailwindCSS.
- Modal con cierre por clic en fondo.
- Sistema de roles con rutas protegidas.
- Layouts reutilizables para estructura profesional.
- Estructura escalable para agregar productos, pedidos, etc.

---

## 📚 Recomendaciones de uso y ampliación

- Agregar paginación y filtros en la tabla de usuarios.
- Implementar token refresh o expiración.
- Migrar autenticación a context o Zustand.
- Implementar manejo de errores centralizados.
- Conectar a MongoDB Atlas para producción.

---

## 🤝 Créditos

Desarrollado por [@hdtoledo](https://github.com/hdtoledo)

🚀 Proyecto educativo libre para modificación, mejora y aprendizaje.

---

## 📝 Licencia

Este proyecto se entrega bajo la licencia MIT. Puedes modificarlo, distribuirlo y adaptarlo a tus necesidades. (2025)

# Coyote Salón Social — Programa de fidelización

Formulario público de registro de clientes + dashboard administrativo para el
programa de fidelización de Coyote Salón Social.

Este repositorio es **uno de los tres** proyectos independientes del mismo
tipo (uno por restaurante del grupo empresarial). Cada restaurante tiene su
propio formulario, su propio dashboard, su propio backend y su propia base de
datos — no comparten nada entre sí a propósito, para que un problema en uno no
afecte a los otros.

## Qué hay en este repositorio

```
coyote/formulario/   Formulario público de registro (HTML/CSS/JS, sin build)
dashboard/            Panel administrativo (login + dashboard)
backend/              API en Express + Postgres
docker-compose.yml     Postgres + pgAdmin para desarrollo local
```

El backend sirve tanto la API (`/api/...`) como los archivos estáticos del
formulario (`/coyote`) y el dashboard (`/dashboard`) — es un único servicio,
no hace falta desplegar nada por separado.

## Cómo funciona (resumen para alguien nuevo)

- **Formulario público** (`coyote/formulario/`): cualquier persona lo llena
  para registrarse al programa de fidelización. No requiere login. Tiene
  protección anti-bot (campo trampa + tiempo mínimo de llenado) y validación
  tanto en el navegador como en el servidor.
- **Dashboard** (`dashboard/`): requiere iniciar sesión (usuario/contraseña
  de administrador). Permite ver estadísticas, buscar/filtrar clientes,
  editarlos, moverlos a una papelera (borrado suave, se purga solo a los 30
  días) y exportar a Excel.
- **Backend** (`backend/`): API REST en Express. Usa el patrón Repository
  (`backend/repositories/`) para que las rutas no armen SQL directamente.
  Sesión de administrador con `express-session` guardada en la misma base de
  Postgres (tabla `session`, la crea sola `connect-pg-simple`).

## Requisitos

- Node.js 18 o superior
- Docker (solo para desarrollo local; en producción se usa Neon)

## Desarrollo local

1. Levantar Postgres local con Docker:

   ```bash
   docker compose up -d
   ```

2. Configurar variables de entorno:

   ```bash
   cd backend
   cp .env.example .env
   ```

   Con Docker Compose, las variables `DB_*` del `.env.example` ya coinciden
   con el `docker-compose.yml` — no hay que tocarlas para desarrollo local.

3. Instalar dependencias y aplicar el esquema:

   ```bash
   npm install
   npm run db:migrate
   ```

4. Crear el usuario administrador (usa `ADMIN_USERNAME`/`ADMIN_PASSWORD` del `.env`):

   ```bash
   npm run seed:admin
   ```

5. Levantar el servidor:

   ```bash
   npm run dev
   ```

   - Formulario público: http://localhost:3000/coyote/formulario/formulario.html
   - Login del dashboard: http://localhost:3000/dashboard/login.html

## Variables de entorno (`backend/.env`)

| Variable | Obligatoria | Descripción |
|---|---|---|
| `SESSION_SECRET` | Sí | Clave para firmar la cookie de sesión. **Debe ser aleatoria y distinta en producción** (no usar el valor de ejemplo). |
| `DATABASE_URL` | Solo en producción | Connection string de Postgres (Neon). Si está definida, tiene prioridad sobre las `DB_*` de abajo. Debe incluir `?sslmode=verify-full`. |
| `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` | Solo si no hay `DATABASE_URL` | Conexión a Postgres local (Docker). |
| `PORT` | No (default 3000) | Puerto del servidor. |
| `ADMIN_USERNAME`, `ADMIN_PASSWORD` | Para `npm run seed:admin` | Credenciales del primer usuario administrador. |
| `NODE_ENV=production` | En producción | Activa cookies `secure` (requiere HTTPS). |

`backend/.env` **nunca** se sube al repositorio (está en `.gitignore`) porque
contiene contraseñas y la cadena de conexión a la base de datos real.

## Scripts disponibles (`backend/`)

| Comando | Qué hace |
|---|---|
| `npm start` | Arranca el servidor (producción) |
| `npm run dev` | Arranca el servidor con recarga automática |
| `npm test` | Corre las pruebas (validación y anti-bot) |
| `npm run seed:admin` | Crea o actualiza el usuario administrador |
| `npm run db:migrate` | Aplica `schema.sql` a la base configurada en `.env` — seguro de correr varias veces, sirve tanto para la primera vez como para aplicar cambios de esquema a una base que ya existe |

## Despliegue actual

- **Backend + estáticos**: [Render](https://render.com), desplegado automáticamente en cada push a `main`.
- **Base de datos**: [Neon](https://neon.tech) (Postgres serverless).

### Poner un dominio propio

1. En Render: Settings → Custom Domains → agregar el dominio.
2. Render da un valor de registro DNS (`CNAME` normalmente) para agregar en el proveedor del dominio (ej. GoDaddy).
3. Render emite el certificado SSL automáticamente una vez el DNS propaga (puede tardar hasta un par de horas).

## Seguridad (resumen de lo que ya está implementado)

- Contraseñas de administrador con `bcrypt`.
- Sesión vía cookie `httpOnly` + `secure` (en producción) + `sameSite=lax`.
- Cabeceras de seguridad con `helmet` (incluye una Content-Security-Policy explícita).
- Rate limiting en login y en el registro público (protección contra fuerza bruta y spam).
- Protección anti-bot en el formulario público (campo trampa + tiempo mínimo).
- Toda consulta SQL usa parámetros (`$1, $2, ...`), nunca concatenación de strings.
- `cedula`, `correo` y `telefono` son únicos a nivel de base de datos: un mismo dato de contacto no puede quedar asociado a dos clientes distintos.

## Notas para quien tome el proyecto

- Este repo, la base de Neon y el servicio de Render viven hoy en cuentas
  personales del equipo de desarrollo. Antes de operar con clientes reales a
  largo plazo, se recomienda migrar todo a cuentas propias de la empresa
  (o una organización de GitHub), para no depender de que una persona en
  particular mantenga el acceso.
- Cada restaurante del grupo tiene su propio repositorio independiente del
  mismo tipo — no es necesario ni recomendable unificarlos en un solo backend.

CREATE TABLE IF NOT EXISTS clientes (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    telefono VARCHAR(30) NOT NULL,
    tipo_documento VARCHAR(30) NOT NULL,
    cedula VARCHAR(20) NOT NULL,
    correo VARCHAR(150) NOT NULL,
    pais VARCHAR(5) NOT NULL,
    ciudad VARCHAR(100) NOT NULL,
    genero VARCHAR(20) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    es_padre BOOLEAN NOT NULL,
    tiene_pareja BOOLEAN NOT NULL,
    fecha_aniversario DATE,
    medio_contacto VARCHAR(20) NOT NULL,
    mayor_edad BOOLEAN NOT NULL,
    habeas_data BOOLEAN NOT NULL,
    recibir_novedades BOOLEAN NOT NULL DEFAULT FALSE,
    puntos INTEGER NOT NULL DEFAULT 0,
    fecha_registro TIMESTAMP NOT NULL DEFAULT NOW(),
    eliminado_en TIMESTAMP,
    UNIQUE (tipo_documento, cedula)
);

CREATE INDEX IF NOT EXISTS idx_clientes_genero ON clientes (genero);
CREATE INDEX IF NOT EXISTS idx_clientes_pais ON clientes (pais);
CREATE INDEX IF NOT EXISTS idx_clientes_medio_contacto ON clientes (medio_contacto);
CREATE INDEX IF NOT EXISTS idx_clientes_fecha_registro ON clientes (fecha_registro);
CREATE INDEX IF NOT EXISTS idx_clientes_eliminado_en ON clientes (eliminado_en);

CREATE TABLE IF NOT EXISTS admin_users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

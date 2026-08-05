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
    UNIQUE (cedula),
    UNIQUE (correo),
    UNIQUE (telefono)
);

DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'clientes_tipo_documento_cedula_key'
    ) THEN
        ALTER TABLE clientes DROP CONSTRAINT clientes_tipo_documento_cedula_key;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'clientes_cedula_key') THEN
        ALTER TABLE clientes ADD CONSTRAINT clientes_cedula_key UNIQUE (cedula);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'clientes_correo_key') THEN
        ALTER TABLE clientes ADD CONSTRAINT clientes_correo_key UNIQUE (correo);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'clientes_telefono_key') THEN
        ALTER TABLE clientes ADD CONSTRAINT clientes_telefono_key UNIQUE (telefono);
    END IF;
END $$;

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

DROP TABLE IF EXISTS solicitudes;

CREATE TABLE IF NOT EXISTS solicitudes_artistas (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    telefono VARCHAR(30) NOT NULL,
    correo VARCHAR(150),
    tipo_servicio VARCHAR(50) NOT NULL,
    portafolio VARCHAR(300) NOT NULL,
    fecha_registro TIMESTAMP NOT NULL DEFAULT NOW(),
    eliminado_en TIMESTAMP
);

ALTER TABLE solicitudes_artistas ADD COLUMN IF NOT EXISTS eliminado_en TIMESTAMP;

CREATE INDEX IF NOT EXISTS idx_solicitudes_artistas_fecha_registro ON solicitudes_artistas (fecha_registro);
CREATE INDEX IF NOT EXISTS idx_solicitudes_artistas_eliminado_en ON solicitudes_artistas (eliminado_en);

CREATE TABLE IF NOT EXISTS solicitudes_empleo (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    telefono VARCHAR(30) NOT NULL,
    correo VARCHAR(150),
    cargo VARCHAR(50) NOT NULL,
    fecha_registro TIMESTAMP NOT NULL DEFAULT NOW(),
    eliminado_en TIMESTAMP
);

ALTER TABLE solicitudes_empleo ADD COLUMN IF NOT EXISTS eliminado_en TIMESTAMP;
ALTER TABLE solicitudes_empleo ADD COLUMN IF NOT EXISTS documento_tipo VARCHAR(30);
ALTER TABLE solicitudes_empleo ADD COLUMN IF NOT EXISTS documento_numero VARCHAR(30);
ALTER TABLE solicitudes_empleo ADD COLUMN IF NOT EXISTS experiencia TEXT;

CREATE INDEX IF NOT EXISTS idx_solicitudes_empleo_fecha_registro ON solicitudes_empleo (fecha_registro);
CREATE INDEX IF NOT EXISTS idx_solicitudes_empleo_eliminado_en ON solicitudes_empleo (eliminado_en);

CREATE TABLE IF NOT EXISTS solicitudes_proveedores (
    id SERIAL PRIMARY KEY,
    nombre_empresa VARCHAR(150) NOT NULL,
    contacto VARCHAR(150) NOT NULL,
    telefono VARCHAR(30) NOT NULL,
    correo VARCHAR(150),
    que_suministra VARCHAR(50) NOT NULL,
    fecha_registro TIMESTAMP NOT NULL DEFAULT NOW(),
    eliminado_en TIMESTAMP
);

ALTER TABLE solicitudes_proveedores ADD COLUMN IF NOT EXISTS eliminado_en TIMESTAMP;
ALTER TABLE solicitudes_proveedores ADD COLUMN IF NOT EXISTS documento_tipo VARCHAR(30);
ALTER TABLE solicitudes_proveedores ADD COLUMN IF NOT EXISTS documento_numero VARCHAR(30);

CREATE INDEX IF NOT EXISTS idx_solicitudes_proveedores_fecha_registro ON solicitudes_proveedores (fecha_registro);
CREATE INDEX IF NOT EXISTS idx_solicitudes_proveedores_eliminado_en ON solicitudes_proveedores (eliminado_en);

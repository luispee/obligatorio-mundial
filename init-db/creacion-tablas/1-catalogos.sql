CREATE TABLE logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    mensaje VARCHAR(255),
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE pais (
    codigo CHAR(3) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE pais_sede (
    codigo_pais CHAR(3) PRIMARY KEY,

    CONSTRAINT fk_pais_sede_pais
        FOREIGN KEY (codigo_pais)
        REFERENCES pais(codigo)
);

CREATE TABLE seleccion (
    codigo_pais CHAR(3) PRIMARY KEY,

    CONSTRAINT fk_seleccion_pais
        FOREIGN KEY (codigo_pais)
        REFERENCES pais(codigo)
);

CREATE TABLE tipo_documento (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tipo VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE estado_venta (
    id INT AUTO_INCREMENT PRIMARY KEY,
    estado VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE estado_transferencia (
    id INT AUTO_INCREMENT PRIMARY KEY,
    estado VARCHAR(50) NOT NULL UNIQUE
);
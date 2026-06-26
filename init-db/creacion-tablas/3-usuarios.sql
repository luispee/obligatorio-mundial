CREATE TABLE usuario (
    mail VARCHAR(255) PRIMARY KEY,

    hash_contrasena VARCHAR(255) NOT NULL,

    codigo_pais_documento CHAR(3) NOT NULL,
    id_tipo_documento INT NOT NULL,
    numero_documento VARCHAR(50) NOT NULL,

    codigo_pais_residencia CHAR(3) NOT NULL,

    localidad VARCHAR(100) NOT NULL,
    calle VARCHAR(150) NOT NULL,
    numero_puerta VARCHAR(20) NOT NULL,
    codigo_postal VARCHAR(20),

    CONSTRAINT fk_usuario_pais_documento
        FOREIGN KEY (codigo_pais_documento)
        REFERENCES pais(codigo),

    CONSTRAINT fk_usuario_pais_residencia
        FOREIGN KEY (codigo_pais_residencia)
        REFERENCES pais(codigo),

    CONSTRAINT fk_usuario_tipo_documento
        FOREIGN KEY (id_tipo_documento)
        REFERENCES tipo_documento(id),
);

CREATE TABLE administrador (
    mail VARCHAR(255) PRIMARY KEY,
    fecha_asignacion DATE NOT NULL,
    codigo_pais_sede CHAR(3) NOT NULL,

    CONSTRAINT fk_admin_usuario
        FOREIGN KEY (mail)
        REFERENCES usuario(mail),

    CONSTRAINT fk_admin_pais_sede
        FOREIGN KEY (codigo_pais_sede)
        REFERENCES pais_sede(codigo_pais)
);

CREATE TABLE funcionario (
    mail VARCHAR(255) PRIMARY KEY,
    numero_legajo VARCHAR(50) NOT NULL UNIQUE,
    activo BOOLEAN NOT NULL DEFAULT TRUE,

    CONSTRAINT fk_funcionario_usuario
        FOREIGN KEY (mail)
        REFERENCES usuario(mail)
);

CREATE TABLE cliente (
    mail VARCHAR(255) PRIMARY KEY,
    fecha_registro DATETIME NOT NULL,
    verificado BOOLEAN NOT NULL,

    CONSTRAINT fk_cliente_usuario
        FOREIGN KEY (mail)
        REFERENCES usuario(mail)
);

CREATE TABLE telefono_usuario (
    mail VARCHAR(255) NOT NULL,
    telefono VARCHAR(30) NOT NULL,

    PRIMARY KEY (mail, telefono),

    CONSTRAINT fk_telefono_usuario
        FOREIGN KEY (mail)
        REFERENCES usuario(mail)
);
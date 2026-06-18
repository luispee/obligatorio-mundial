CREATE TABLE estadio (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    ciudad VARCHAR(100) NOT NULL,
    codigo_pais_sede CHAR(3) NOT NULL,

    activo BOOLEAN NOT NULL DEFAULT TRUE,

    CONSTRAINT fk_estadio_pais_sede
        FOREIGN KEY (codigo_pais_sede)
        REFERENCES pais_sede(codigo_pais)
);

CREATE TABLE sector (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    capacidad_maxima INT NOT NULL,
    id_estadio INT NOT NULL,

    CONSTRAINT fk_sector_estadio
        FOREIGN KEY (id_estadio)
        REFERENCES estadio(id)
);

CREATE TABLE evento (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fecha_hora DATETIME NOT NULL,

    codigo_seleccion_local CHAR(3) NOT NULL,
    codigo_seleccion_visitante CHAR(3) NOT NULL,

    id_estadio INT NOT NULL,

    activo BOOLEAN NOT NULL DEFAULT TRUE,

    CONSTRAINT fk_evento_local
        FOREIGN KEY (codigo_seleccion_local)
        REFERENCES seleccion(codigo_pais),

    CONSTRAINT fk_evento_visitante
        FOREIGN KEY (codigo_seleccion_visitante)
        REFERENCES seleccion(codigo_pais),

    CONSTRAINT fk_evento_estadio
        FOREIGN KEY (id_estadio)
        REFERENCES estadio(id),

    CONSTRAINT chk_selecciones_distintas
        CHECK (
            codigo_seleccion_local <>
            codigo_seleccion_visitante
        )
);

CREATE TABLE sector_evento (
    id_sector INT NOT NULL,
    id_evento INT NOT NULL,

    precio DECIMAL(10,2) NOT NULL,
    capacidad_disponible INT NOT NULL,

    activo BOOLEAN NOT NULL DEFAULT TRUE,

    PRIMARY KEY (id_sector, id_evento),

    CONSTRAINT fk_sector_evento_sector
        FOREIGN KEY (id_sector)
        REFERENCES sector(id),

    CONSTRAINT fk_sector_evento_evento
        FOREIGN KEY (id_evento)
        REFERENCES evento(id)
);
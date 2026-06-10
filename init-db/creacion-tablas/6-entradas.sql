CREATE TABLE entrada (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    cantidad_transferencias INT NOT NULL DEFAULT 0,
    usada BOOLEAN NOT NULL DEFAULT FALSE,

    mail_cliente_propietario VARCHAR(255) NOT NULL,

    id_venta BIGINT NOT NULL,

    id_sector INT NOT NULL,
    id_evento INT NOT NULL,

    CONSTRAINT fk_entrada_cliente
        FOREIGN KEY (mail_cliente_propietario)
        REFERENCES cliente(mail),

    CONSTRAINT fk_entrada_venta
        FOREIGN KEY (id_venta)
        REFERENCES venta(id),

    CONSTRAINT fk_entrada_sector_evento
        FOREIGN KEY (id_sector, id_evento)
        REFERENCES sector_evento(id_sector, id_evento)
);
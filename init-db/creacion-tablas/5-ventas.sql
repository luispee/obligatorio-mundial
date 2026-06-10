CREATE TABLE venta (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    fecha_hora DATETIME NOT NULL,

    id_estado_venta INT NOT NULL,

    monto_total DECIMAL(12,2) NOT NULL,
    porcentaje_comision DECIMAL(5,2) NOT NULL,

    mail_cliente VARCHAR(255) NOT NULL,

    CONSTRAINT fk_venta_estado
        FOREIGN KEY (id_estado_venta)
        REFERENCES estado_venta(id),

    CONSTRAINT fk_venta_cliente
        FOREIGN KEY (mail_cliente)
        REFERENCES cliente(mail)
);
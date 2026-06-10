CREATE TABLE transferencia (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    fecha_hora DATETIME NOT NULL,

    id_estado_transferencia INT NOT NULL,

    mail_cliente_remitente VARCHAR(255) NOT NULL,
    mail_cliente_destinatario VARCHAR(255) NOT NULL,

    id_entrada BIGINT NOT NULL,

    CONSTRAINT fk_transferencia_remitente
        FOREIGN KEY (mail_cliente_remitente)
        REFERENCES cliente(mail),

    CONSTRAINT fk_transferencia_destinatario
        FOREIGN KEY (mail_cliente_destinatario)
        REFERENCES cliente(mail),

    CONSTRAINT fk_transferencia_entrada
        FOREIGN KEY (id_entrada)
        REFERENCES entrada(id),

    CONSTRAINT fk_transferencia_estado
        FOREIGN KEY (id_estado_transferencia)
        REFERENCES estado_transferencia(id),

    CONSTRAINT chk_clientes_distintos
        CHECK (
            mail_cliente_remitente <>
            mail_cliente_destinatario
        )
);
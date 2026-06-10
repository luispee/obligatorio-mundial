CREATE TABLE validacion (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    fecha_hora DATETIME NOT NULL,

    codigo_qr VARCHAR(255) NOT NULL,

    mail_funcionario VARCHAR(255) NOT NULL,
    id_dispositivo INT NOT NULL,

    id_entrada BIGINT NOT NULL UNIQUE,

    CONSTRAINT fk_validacion_fd
        FOREIGN KEY (
            mail_funcionario,
            id_dispositivo
        )
        REFERENCES funcionario_dispositivo(
            mail_funcionario,
            id_dispositivo
        ),

    CONSTRAINT fk_validacion_entrada
        FOREIGN KEY (id_entrada)
        REFERENCES entrada(id)
);
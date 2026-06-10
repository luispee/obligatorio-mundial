CREATE TABLE sector_evento_funcionario_dispositivo (
    mail_funcionario VARCHAR(255) NOT NULL,
    id_dispositivo INT NOT NULL,

    id_sector INT NOT NULL,
    id_evento INT NOT NULL,

    PRIMARY KEY (
        mail_funcionario,
        id_dispositivo,
        id_sector,
        id_evento
    ),

    CONSTRAINT fk_sefd_fd
        FOREIGN KEY (
            mail_funcionario,
            id_dispositivo
        )
        REFERENCES funcionario_dispositivo(
            mail_funcionario,
            id_dispositivo
        ),

    CONSTRAINT fk_sefd_sector_evento
        FOREIGN KEY (
            id_sector,
            id_evento
        )
        REFERENCES sector_evento(
            id_sector,
            id_evento
        )
);
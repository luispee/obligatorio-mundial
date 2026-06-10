CREATE TABLE dispositivo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    modelo VARCHAR(100) NOT NULL,
    numero_serie VARCHAR(100) NOT NULL UNIQUE,
    operativo BOOLEAN NOT NULL
);

CREATE TABLE funcionario_dispositivo (
    mail_funcionario VARCHAR(255) NOT NULL,
    id_dispositivo INT NOT NULL,

    PRIMARY KEY (
        mail_funcionario,
        id_dispositivo
    ),

    CONSTRAINT fk_fd_funcionario
        FOREIGN KEY (mail_funcionario)
        REFERENCES funcionario(mail),

    CONSTRAINT fk_fd_dispositivo
        FOREIGN KEY (id_dispositivo)
        REFERENCES dispositivo(id)
);
INSERT INTO dispositivo (modelo, numero_serie, operativo) VALUES
('iPhone 16', 'NS-100', 1),
('SAMSUMG S26', 'NS-101', 1);

INSERT INTO funcionario_dispositivo (mail_funcionario, id_dispositivo) VALUES
('funcionario1@fifa.com',1 ),
('funcionario2@fifa.com',2 );

INSERT INTO sector_evento_funcionario_dispositivo (mail_funcionario, id_dispositivo, id_sector, id_evento) VALUES
('funcionario1@fifa.com', 1, 5, 4)
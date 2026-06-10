INSERT INTO usuario (
  mail, 
  hash_contrasena, 
  codigo_pais_documento, 
  id_tipo_documento, 
  numero_documento, 
  codigo_pais_residencia,
  localidad,
  calle,
  numero_puerta,
  codigo_postal) VALUES
('user@example.com', '$2b$12$Lkc2UiHt4XUC5zRnvDJ1geeo3d3s8z9Y/v5LyMk497ECgHusL98HK', 'URY', 3, '12345678', 'URY', 'Montevideo', 'Calle Falsa', 123, '1000'),
('adminCAN@fifa.com', '$2b$12$ppBt4Yolr72oWLfL66aKP.zuHKvQYqHePXH.Ie7zQeytKHRePO9CC', 'CAN', 2, '12345678', 'CAN', 'Toronto', 'Calle Falsa', 123, '1100'),
('adminMEX@fifa.com', '$2b$12$1qzi5/7FRr8VHHFvZ/HGH.vG5/dUGw8zuB3TqYWzj4xioXGzxqWUi', 'MEX', 2, '12345678', 'MEX', 'Ciudad de México', 'Calle Falsa', 123, '1200'),
('adminUSA@fifa.com', '$2b$12$zUjqJKUxFR.Nh2DvXgB1leyZ11lbBlHccXQMsnHSuPe9Ol0xOw9KK', 'USA', 2, '12345678', 'USA', 'New York', 'Calle Falsa', 123, '1300'),
('funcionario1@fifa.com', '$2b$12$mfCzuJl5PhhbsqJ8ktaMPO16pzgSAjrI551fnQdJVxMNz6wuwM73y', 'URY', 3, '87654321', 'URY', 'Montevideo', 'Calle Falsa', 123, '1400'),
('funcionario2@fifa.com', '$2b$12$N18B/n.inS/fX66Md32Lm.MStXHsLwC6BOBIdD3ue.MHm5A02z0IS', 'ARG', 1, '87654321', 'ARG', 'Buenos Aires', 'Calle Falsa', 123, '1500');

INSERT INTO administrador (mail, fecha_asignacion, codigo_pais_sede) VALUES
('adminCAN@fifa.com', '2026-06-09', 'CAN'),
('adminMEX@fifa.com', '2026-06-09', 'MEX'),
('adminUSA@fifa.com', '2026-06-09', 'USA');

INSERT INTO funcionario (mail, numero_legajo) VALUES
('funcionario1@fifa.com', 1001),
('funcionario2@fifa.com', 1002);

INSERT INTO cliente (mail, fecha_registro, verificado) VALUES
('user@example.com', '2026-06-09', false);
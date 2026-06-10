INSERT INTO estadio (id, nombre, ciudad, codigo_pais_sede) VALUES
(1,'BMO Field', 'Toronto', 'CAN'),
(2,'BC Place', 'Vancouver', 'CAN'),

(3,'Estadio Azteca', 'Ciudad de México', 'MEX'),
(4,'Estadio Akron', 'Guadalajara', 'MEX'),
(5,'Estadio BBVA', 'Monterrey', 'MEX'),

(6,'Mercedes-Benz Stadium', 'Atlanta', 'USA'),
(7,'Gillette Stadium', 'Boston', 'USA'),
(8,'AT&T Stadium', 'Dallas', 'USA'),
(9,'NRG Stadium', 'Houston', 'USA'),
(10,'Arrowhead Stadium', 'Kansas City', 'USA'),
(11,'SoFi Stadium', 'Los Ángeles', 'USA'),
(12,'Hard Rock Stadium', 'Miami', 'USA'),
(13,'MetLife Stadium', 'New Jersey', 'USA'),
(14,'Lincoln Financial Field', 'Philadelphia', 'USA'),
(15,'Levi''s Stadium', 'San Francisco', 'USA'),
(16,'Lumen Field', 'Seattle', 'USA');

INSERT INTO sector (id, nombre_sector, capacidad_maxima, id_estadio) VALUES
-- Estadio 1 (45.000)
(1, 'Tribuna Norte', 9000, 1),
(2, 'Tribuna Sur', 9000, 1),
(3, 'Tribuna Este', 13500, 1),
(4, 'Tribuna Oeste', 13500, 1),

-- Estadio 2 (54.000)
(5, 'Tribuna Norte', 10800, 2),
(6, 'Tribuna Sur', 10800, 2),
(7, 'Tribuna Este', 16200, 2),
(8, 'Tribuna Oeste', 16200, 2),

-- Estadio 3 (83.000)
(9, 'Tribuna Norte', 16600, 3),
(10, 'Tribuna Sur', 16600, 3),
(11, 'Tribuna Este', 24900, 3),
(12, 'Tribuna Oeste', 24900, 3),

-- Estadio 4 (48.000)
(13, 'Tribuna Norte', 9600, 4),
(14, 'Tribuna Sur', 9600, 4),
(15, 'Tribuna Este', 14400, 4),
(16, 'Tribuna Oeste', 14400, 4),

-- Estadio 5 (53.500)
(17, 'Tribuna Norte', 10700, 5),
(18, 'Tribuna Sur', 10700, 5),
(19, 'Tribuna Este', 16050, 5),
(20, 'Tribuna Oeste', 16050, 5),

-- Estadio 6 (75.000)
(21, 'Tribuna Norte', 15000, 6),
(22, 'Tribuna Sur', 15000, 6),
(23, 'Tribuna Este', 22500, 6),
(24, 'Tribuna Oeste', 22500, 6),

-- Estadio 7 (65.000)
(25, 'Tribuna Norte', 13000, 7),
(26, 'Tribuna Sur', 13000, 7),
(27, 'Tribuna Este', 19500, 7),
(28, 'Tribuna Oeste', 19500, 7),

-- Estadio 8 (94.000)
(29, 'Tribuna Norte', 18800, 8),
(30, 'Tribuna Sur', 18800, 8),
(31, 'Tribuna Este', 28200, 8),
(32, 'Tribuna Oeste', 28200, 8),

-- Estadio 9 (72.220)
(33, 'Tribuna Norte', 14444, 9),
(34, 'Tribuna Sur', 14444, 9),
(35, 'Tribuna Este', 21666, 9),
(36, 'Tribuna Oeste', 21666, 9),

-- Estadio 10 (73.000)
(37, 'Tribuna Norte', 14600, 10),
(38, 'Tribuna Sur', 14600, 10),
(39, 'Tribuna Este', 21900, 10),
(40, 'Tribuna Oeste', 21900, 10),

-- Estadio 11 (70.000)
(41, 'Tribuna Norte', 14000, 11),
(42, 'Tribuna Sur', 14000, 11),
(43, 'Tribuna Este', 21000, 11),
(44, 'Tribuna Oeste', 21000, 11),

-- Estadio 12 (65.000)
(45, 'Tribuna Norte', 13000, 12),
(46, 'Tribuna Sur', 13000, 12),
(47, 'Tribuna Este', 19500, 12),
(48, 'Tribuna Oeste', 19500, 12),

-- Estadio 13 (82.500)
(49, 'Tribuna Norte', 16500, 13),
(50, 'Tribuna Sur', 16500, 13),
(51, 'Tribuna Este', 24750, 13),
(52, 'Tribuna Oeste', 24750, 13),

-- Estadio 14 (69.000)
(53, 'Tribuna Norte', 13800, 14),
(54, 'Tribuna Sur', 13800, 14),
(55, 'Tribuna Este', 20700, 14),
(56, 'Tribuna Oeste', 20700, 14),

-- Estadio 15 (71.000)
(57, 'Tribuna Norte', 14200, 15),
(58, 'Tribuna Sur', 14200, 15),
(59, 'Tribuna Este', 21300, 15),
(60, 'Tribuna Oeste', 21300, 15),

-- Estadio 16 (69.000)
(61, 'Tribuna Norte', 13800, 16),
(62, 'Tribuna Sur', 13800, 16),
(63, 'Tribuna Este', 20700, 16),
(64, 'Tribuna Oeste', 20700, 16);

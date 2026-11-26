INSERT INTO "COMPLEJO" ("ID", "NOMBRE") VALUES
  (1, 'Complejo Municipal'),
  (2, 'Complejo del Barrio')
ON CONFLICT ("ID") DO NOTHING;

INSERT INTO "PISTA" ("ID", "NOMBRE", "SUPERFICIE_M2", "ID_COMPLEJO") VALUES
  (7, 'Pista cubierta', 420, 2),
  (8, 'Pista exterior', 300, 2),
  (9, 'Pista cubierta · nuevo', 540, 1)
ON CONFLICT ("ID") DO NOTHING;

SELECT setval(pg_get_serial_sequence('"COMPLEJO"', 'ID'),
              (SELECT MAX("ID") FROM "COMPLEJO"), true);
SELECT * FROM "COMPLEJO" ORDER BY "ID";

SELECT setval(pg_get_serial_sequence('"PISTA"', 'ID'),
              (SELECT MAX("ID") FROM "PISTA"), true);
SELECT * FROM "PISTA" ORDER BY "ID";

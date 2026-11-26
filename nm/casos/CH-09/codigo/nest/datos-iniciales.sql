INSERT INTO "TALLER" ("ID", "NOMBRE") VALUES
  (1, 'Taller Norte'),
  (2, 'Taller del Barrio')
ON CONFLICT ("ID") DO NOTHING;

INSERT INTO "REPARACION" ("ID", "NOMBRE", "COSTE_CENTIMOS", "ID_TALLER") VALUES
  (7, 'Ajuste de frenos', 9500, 2),
  (8, 'Cambio de cadena', 7000, 2),
  (9, 'Ajuste de frenos · nuevo', 12000, 1)
ON CONFLICT ("ID") DO NOTHING;

SELECT setval(pg_get_serial_sequence('"TALLER"', 'ID'),
              (SELECT MAX("ID") FROM "TALLER"), true);
SELECT * FROM "TALLER" ORDER BY "ID";

SELECT setval(pg_get_serial_sequence('"REPARACION"', 'ID'),
              (SELECT MAX("ID") FROM "REPARACION"), true);
SELECT * FROM "REPARACION" ORDER BY "ID";

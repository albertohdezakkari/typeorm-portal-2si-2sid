INSERT INTO "AGENCIA" ("ID", "NOMBRE") VALUES
  (1, 'Agencia Horizonte'),
  (2, 'Agencia Camino')
ON CONFLICT ("ID") DO NOTHING;

INSERT INTO "EXCURSION" ("ID", "NOMBRE", "DURACION_HORAS", "ID_AGENCIA") VALUES
  (7, 'Ruta del bosque', 8, 2),
  (8, 'Visita al castillo', 6, 2),
  (9, 'Ruta del bosque · nuevo', 10, 1)
ON CONFLICT ("ID") DO NOTHING;

SELECT setval(pg_get_serial_sequence('"AGENCIA"', 'ID'),
              (SELECT MAX("ID") FROM "AGENCIA"), true);
SELECT * FROM "AGENCIA" ORDER BY "ID";

SELECT setval(pg_get_serial_sequence('"EXCURSION"', 'ID'),
              (SELECT MAX("ID") FROM "EXCURSION"), true);
SELECT * FROM "EXCURSION" ORDER BY "ID";

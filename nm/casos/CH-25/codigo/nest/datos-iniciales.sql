INSERT INTO "EMISORA" ("ID", "NOMBRE") VALUES
  (1, 'Radio Horizonte'),
  (2, 'Radio Barrio')
ON CONFLICT ("ID") DO NOTHING;

INSERT INTO "PROGRAMA" ("ID", "NOMBRE", "DURACION_MINUTOS", "ID_EMISORA") VALUES
  (7, 'Buenos días', 120, 2),
  (8, 'Tarde cultural', 90, 2),
  (9, 'Buenos días · nuevo', 150, 1)
ON CONFLICT ("ID") DO NOTHING;

SELECT setval(pg_get_serial_sequence('"EMISORA"', 'ID'),
              (SELECT MAX("ID") FROM "EMISORA"), true);
SELECT * FROM "EMISORA" ORDER BY "ID";

SELECT setval(pg_get_serial_sequence('"PROGRAMA"', 'ID'),
              (SELECT MAX("ID") FROM "PROGRAMA"), true);
SELECT * FROM "PROGRAMA" ORDER BY "ID";

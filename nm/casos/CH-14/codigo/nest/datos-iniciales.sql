INSERT INTO "PARQUE" ("ID", "NOMBRE") VALUES
  (1, 'Parque del Agua'),
  (2, 'Parque del Este')
ON CONFLICT ("ID") DO NOTHING;

INSERT INTO "ZONA" ("ID", "NOMBRE", "CAPACIDAD", "ID_PARQUE") VALUES
  (7, 'Zona de juegos', 110, 2),
  (8, 'Zona de picnic', 80, 2),
  (9, 'Zona de juegos · nuevo', 140, 1)
ON CONFLICT ("ID") DO NOTHING;

SELECT setval(pg_get_serial_sequence('"PARQUE"', 'ID'),
              (SELECT MAX("ID") FROM "PARQUE"), true);
SELECT * FROM "PARQUE" ORDER BY "ID";

SELECT setval(pg_get_serial_sequence('"ZONA"', 'ID'),
              (SELECT MAX("ID") FROM "ZONA"), true);
SELECT * FROM "ZONA" ORDER BY "ID";

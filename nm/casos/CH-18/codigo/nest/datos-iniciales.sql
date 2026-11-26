INSERT INTO "CLUB" ("ID", "NOMBRE") VALUES
  (1, 'Club Encuentro'),
  (2, 'Club Horizonte')
ON CONFLICT ("ID") DO NOTHING;

INSERT INTO "ACTIVIDAD" ("ID", "NOMBRE", "PLAZAS", "ID_CLUB") VALUES
  (7, 'Taller de fotografía', 50, 2),
  (8, 'Ruta urbana', 35, 2),
  (9, 'Taller de fotografía · nuevo', 65, 1)
ON CONFLICT ("ID") DO NOTHING;

SELECT setval(pg_get_serial_sequence('"CLUB"', 'ID'),
              (SELECT MAX("ID") FROM "CLUB"), true);
SELECT * FROM "CLUB" ORDER BY "ID";

SELECT setval(pg_get_serial_sequence('"ACTIVIDAD"', 'ID'),
              (SELECT MAX("ID") FROM "ACTIVIDAD"), true);
SELECT * FROM "ACTIVIDAD" ORDER BY "ID";

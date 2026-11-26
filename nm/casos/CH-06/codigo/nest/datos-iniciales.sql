INSERT INTO "GIMNASIO" ("ID", "NOMBRE") VALUES
  (1, 'Gimnasio Norte'),
  (2, 'Gimnasio Centro')
ON CONFLICT ("ID") DO NOTHING;

INSERT INTO "SESION" ("ID", "NOMBRE", "PLAZAS", "ID_GIMNASIO") VALUES
  (7, 'Pilates inicial', 34, 2),
  (8, 'Entrenamiento funcional', 24, 2),
  (9, 'Pilates inicial · nuevo', 44, 1)
ON CONFLICT ("ID") DO NOTHING;

SELECT setval(pg_get_serial_sequence('"GIMNASIO"', 'ID'),
              (SELECT MAX("ID") FROM "GIMNASIO"), true);
SELECT * FROM "GIMNASIO" ORDER BY "ID";

SELECT setval(pg_get_serial_sequence('"SESION"', 'ID'),
              (SELECT MAX("ID") FROM "SESION"), true);
SELECT * FROM "SESION" ORDER BY "ID";

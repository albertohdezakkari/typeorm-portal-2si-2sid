INSERT INTO "ESCUELA" ("ID", "NOMBRE") VALUES
  (1, 'Escuela Puente'),
  (2, 'Escuela Encuentro')
ON CONFLICT ("ID") DO NOTHING;

INSERT INTO "AULA" ("ID", "NOMBRE", "CAPACIDAD", "ID_ESCUELA") VALUES
  (7, 'Aula Olmo', 42, 2),
  (8, 'Aula Pino', 30, 2),
  (9, 'Aula Olmo · nuevo', 54, 1)
ON CONFLICT ("ID") DO NOTHING;

SELECT setval(pg_get_serial_sequence('"ESCUELA"', 'ID'),
              (SELECT MAX("ID") FROM "ESCUELA"), true);
SELECT * FROM "ESCUELA" ORDER BY "ID";

SELECT setval(pg_get_serial_sequence('"AULA"', 'ID'),
              (SELECT MAX("ID") FROM "AULA"), true);
SELECT * FROM "AULA" ORDER BY "ID";

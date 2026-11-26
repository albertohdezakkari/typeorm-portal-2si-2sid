INSERT INTO "ESTUDIO" ("ID", "NOMBRE") VALUES
  (1, 'Estudio Prisma'),
  (2, 'Estudio Lumen')
ON CONFLICT ("ID") DO NOTHING;

INSERT INTO "ESCENA" ("ID", "NOMBRE", "DURACION_SEGUNDOS", "ID_ESTUDIO") VALUES
  (7, 'Escena de apertura', 125, 2),
  (8, 'Escena del puente', 95, 2),
  (9, 'Escena de apertura · nuevo', 155, 1)
ON CONFLICT ("ID") DO NOTHING;

SELECT setval(pg_get_serial_sequence('"ESTUDIO"', 'ID'),
              (SELECT MAX("ID") FROM "ESTUDIO"), true);
SELECT * FROM "ESTUDIO" ORDER BY "ID";

SELECT setval(pg_get_serial_sequence('"ESCENA"', 'ID'),
              (SELECT MAX("ID") FROM "ESCENA"), true);
SELECT * FROM "ESCENA" ORDER BY "ID";

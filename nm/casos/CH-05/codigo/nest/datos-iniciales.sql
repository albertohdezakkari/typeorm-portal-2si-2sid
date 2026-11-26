INSERT INTO "FESTIVAL" ("ID", "NOMBRE") VALUES
  (1, 'Festival del Sol'),
  (2, 'Festival del Río')
ON CONFLICT ("ID") DO NOTHING;

INSERT INTO "ACTUACION" ("ID", "NOMBRE", "DURACION_MINUTOS", "ID_FESTIVAL") VALUES
  (7, 'Concierto acústico', 85, 2),
  (8, 'Danza urbana', 60, 2),
  (9, 'Concierto acústico · nuevo', 110, 1)
ON CONFLICT ("ID") DO NOTHING;

SELECT setval(pg_get_serial_sequence('"FESTIVAL"', 'ID'),
              (SELECT MAX("ID") FROM "FESTIVAL"), true);
SELECT * FROM "FESTIVAL" ORDER BY "ID";

SELECT setval(pg_get_serial_sequence('"ACTUACION"', 'ID'),
              (SELECT MAX("ID") FROM "ACTUACION"), true);
SELECT * FROM "ACTUACION" ORDER BY "ID";

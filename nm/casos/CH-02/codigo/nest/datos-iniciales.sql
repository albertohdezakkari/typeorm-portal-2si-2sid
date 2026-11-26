INSERT INTO "HUERTO" ("ID", "NOMBRE") VALUES
  (1, 'Huerto del Río'),
  (2, 'Huerto del Parque')
ON CONFLICT ("ID") DO NOTHING;

INSERT INTO "PARCELA" ("ID", "NOMBRE", "SUPERFICIE_M2", "ID_HUERTO") VALUES
  (7, 'Parcela A', 65, 2),
  (8, 'Parcela B', 45, 2),
  (9, 'Parcela C', 80, 1)
ON CONFLICT ("ID") DO NOTHING;

SELECT setval(pg_get_serial_sequence('"HUERTO"', 'ID'),
              (SELECT MAX("ID") FROM "HUERTO"), true);
SELECT * FROM "HUERTO" ORDER BY "ID";

SELECT setval(pg_get_serial_sequence('"PARCELA"', 'ID'),
              (SELECT MAX("ID") FROM "PARCELA"), true);
SELECT * FROM "PARCELA" ORDER BY "ID";

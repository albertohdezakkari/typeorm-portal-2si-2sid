INSERT INTO "COOPERATIVA" ("ID", "NOMBRE") VALUES
  (1, 'Cooperativa Olivo'),
  (2, 'Cooperativa Campo')
ON CONFLICT ("ID") DO NOTHING;

INSERT INTO "LOTE" ("ID", "NOMBRE", "KILOS", "ID_COOPERATIVA") VALUES
  (7, 'Lote de manzanas', 160, 2),
  (8, 'Lote de peras', 120, 2),
  (9, 'Lote de manzanas · nuevo', 200, 1)
ON CONFLICT ("ID") DO NOTHING;

SELECT setval(pg_get_serial_sequence('"COOPERATIVA"', 'ID'),
              (SELECT MAX("ID") FROM "COOPERATIVA"), true);
SELECT * FROM "COOPERATIVA" ORDER BY "ID";

SELECT setval(pg_get_serial_sequence('"LOTE"', 'ID'),
              (SELECT MAX("ID") FROM "LOTE"), true);
SELECT * FROM "LOTE" ORDER BY "ID";

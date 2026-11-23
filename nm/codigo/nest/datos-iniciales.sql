INSERT INTO "AYUNTAMIENTO" ("ID", "NOMBRE") VALUES
  (1, 'Ayuntamiento del Río'),
  (2, 'Ayuntamiento del Valle')
ON CONFLICT ("ID") DO NOTHING;

INSERT INTO "OBRA" ("ID", "NOMBRE", "PRESUPUESTO_EUROS", "ID_AYUNTAMIENTO") VALUES
  (7, 'Mejora de acera', 15000, 2),
  (8, 'Zona de sombra', 12000, 2),
  (9, 'Mejora de acera · nuevo', 18000, 1)
ON CONFLICT ("ID") DO NOTHING;

SELECT setval(pg_get_serial_sequence('"AYUNTAMIENTO"', 'ID'),
              (SELECT MAX("ID") FROM "AYUNTAMIENTO"), true);
SELECT * FROM "AYUNTAMIENTO" ORDER BY "ID";

SELECT setval(pg_get_serial_sequence('"OBRA"', 'ID'),
              (SELECT MAX("ID") FROM "OBRA"), true);
SELECT * FROM "OBRA" ORDER BY "ID";

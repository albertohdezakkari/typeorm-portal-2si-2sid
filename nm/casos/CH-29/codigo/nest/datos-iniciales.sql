INSERT INTO "GRANJA" ("ID", "NOMBRE") VALUES
  (1, 'Granja del Sol'),
  (2, 'Granja del Monte')
ON CONFLICT ("ID") DO NOTHING;

INSERT INTO "COSECHA" ("ID", "NOMBRE", "KILOS", "ID_GRANJA") VALUES
  (7, 'Cosecha de tomate', 300, 2),
  (8, 'Cosecha de calabaza', 220, 2),
  (9, 'Cosecha de tomate · nuevo', 380, 1)
ON CONFLICT ("ID") DO NOTHING;

SELECT setval(pg_get_serial_sequence('"GRANJA"', 'ID'),
              (SELECT MAX("ID") FROM "GRANJA"), true);
SELECT * FROM "GRANJA" ORDER BY "ID";

SELECT setval(pg_get_serial_sequence('"COSECHA"', 'ID'),
              (SELECT MAX("ID") FROM "COSECHA"), true);
SELECT * FROM "COSECHA" ORDER BY "ID";

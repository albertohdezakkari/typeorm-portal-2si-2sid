INSERT INTO "PUERTO" ("ID", "NOMBRE") VALUES
  (1, 'Puerto del Mar'),
  (2, 'Puerto del Faro')
ON CONFLICT ("ID") DO NOTHING;

INSERT INTO "EMBARCACION" ("ID", "NOMBRE", "ESLORA_METROS", "ID_PUERTO") VALUES
  (7, 'Brisa', 20, 2),
  (8, 'Albatros', 14, 2),
  (9, 'Brisa · nuevo', 26, 1)
ON CONFLICT ("ID") DO NOTHING;

SELECT setval(pg_get_serial_sequence('"PUERTO"', 'ID'),
              (SELECT MAX("ID") FROM "PUERTO"), true);
SELECT * FROM "PUERTO" ORDER BY "ID";

SELECT setval(pg_get_serial_sequence('"EMBARCACION"', 'ID'),
              (SELECT MAX("ID") FROM "EMBARCACION"), true);
SELECT * FROM "EMBARCACION" ORDER BY "ID";

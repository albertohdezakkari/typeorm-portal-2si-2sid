INSERT INTO "REFUGIO" ("ID", "NOMBRE") VALUES
  (1, 'Refugio Norte'),
  (2, 'Refugio Sur')
ON CONFLICT ("ID") DO NOTHING;

INSERT INTO "ANIMAL" ("ID", "NOMBRE", "EDAD_MESES", "ID_REFUGIO") VALUES
  (7, 'Nala', 32, 2),
  (8, 'Bruno', 24, 2),
  (9, 'Nala · nuevo', 40, 1)
ON CONFLICT ("ID") DO NOTHING;

SELECT setval(pg_get_serial_sequence('"REFUGIO"', 'ID'),
              (SELECT MAX("ID") FROM "REFUGIO"), true);
SELECT * FROM "REFUGIO" ORDER BY "ID";

SELECT setval(pg_get_serial_sequence('"ANIMAL"', 'ID'),
              (SELECT MAX("ID") FROM "ANIMAL"), true);
SELECT * FROM "ANIMAL" ORDER BY "ID";

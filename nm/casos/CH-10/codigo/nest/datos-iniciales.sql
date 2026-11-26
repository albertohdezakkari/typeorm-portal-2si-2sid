INSERT INTO "HOSPITAL" ("ID", "NOMBRE") VALUES
  (1, 'Hospital Central'),
  (2, 'Hospital del Valle')
ON CONFLICT ("ID") DO NOTHING;

INSERT INTO "HABITACION" ("ID", "NOMBRE", "CAMAS", "ID_HOSPITAL") VALUES
  (7, 'Habitación A', 4, 2),
  (8, 'Habitación B', 3, 2),
  (9, 'Habitación A · nuevo', 5, 1)
ON CONFLICT ("ID") DO NOTHING;

SELECT setval(pg_get_serial_sequence('"HOSPITAL"', 'ID'),
              (SELECT MAX("ID") FROM "HOSPITAL"), true);
SELECT * FROM "HOSPITAL" ORDER BY "ID";

SELECT setval(pg_get_serial_sequence('"HABITACION"', 'ID'),
              (SELECT MAX("ID") FROM "HABITACION"), true);
SELECT * FROM "HABITACION" ORDER BY "ID";

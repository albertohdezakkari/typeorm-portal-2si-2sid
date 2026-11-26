INSERT INTO "URBANIZACION" ("ID", "NOMBRE") VALUES
  (1, 'Urbanización Jardín'),
  (2, 'Urbanización Lago')
ON CONFLICT ("ID") DO NOTHING;

INSERT INTO "PLAZA" ("ID", "NOMBRE", "SUPERFICIE_M2", "ID_URBANIZACION") VALUES
  (7, 'Plaza P-01', 28, 2),
  (8, 'Plaza P-02', 18, 2),
  (9, 'Plaza P-01 · nuevo', 38, 1)
ON CONFLICT ("ID") DO NOTHING;

SELECT setval(pg_get_serial_sequence('"URBANIZACION"', 'ID'),
              (SELECT MAX("ID") FROM "URBANIZACION"), true);
SELECT * FROM "URBANIZACION" ORDER BY "ID";

SELECT setval(pg_get_serial_sequence('"PLAZA"', 'ID'),
              (SELECT MAX("ID") FROM "PLAZA"), true);
SELECT * FROM "PLAZA" ORDER BY "ID";

INSERT INTO "EMPRESA" ("ID", "NOMBRE") VALUES
  (1, 'Empresa Brújula'),
  (2, 'Empresa Delta')
ON CONFLICT ("ID") DO NOTHING;

INSERT INTO "PROYECTO" ("ID", "NOMBRE", "HORAS_ESTIMADAS", "ID_EMPRESA") VALUES
  (7, 'Portal de reservas', 160, 2),
  (8, 'Catálogo interno', 120, 2),
  (9, 'Portal de reservas · nuevo', 200, 1)
ON CONFLICT ("ID") DO NOTHING;

SELECT setval(pg_get_serial_sequence('"EMPRESA"', 'ID'),
              (SELECT MAX("ID") FROM "EMPRESA"), true);
SELECT * FROM "EMPRESA" ORDER BY "ID";

SELECT setval(pg_get_serial_sequence('"PROYECTO"', 'ID'),
              (SELECT MAX("ID") FROM "PROYECTO"), true);
SELECT * FROM "PROYECTO" ORDER BY "ID";

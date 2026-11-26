INSERT INTO "LOCUTOR" ("ID", "NOMBRE", "APELLIDOS", "EMAIL") VALUES
  (1, 'Diego', 'Ruiz López', 'diego.ruiz@example.test'),
  (2, 'Ana', 'Vidal Sanz', 'ana.vidal@example.test')
ON CONFLICT ("ID") DO NOTHING;

INSERT INTO "ASIGNACION" ("ID_PROGRAMA", "ID_LOCUTOR", "ROL") VALUES
  (7, 1, 'Presentación'),
  (7, 2, 'Entrevistas'),
  (8, 1, 'Coordinación')
ON CONFLICT ("ID_PROGRAMA", "ID_LOCUTOR") DO NOTHING;

SELECT setval(pg_get_serial_sequence('"LOCUTOR"', 'ID'),
              (SELECT MAX("ID") FROM "LOCUTOR"), true);
SELECT * FROM "ASIGNACION" ORDER BY "ID_PROGRAMA", "ID_LOCUTOR";

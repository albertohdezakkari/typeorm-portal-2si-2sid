INSERT INTO "AGRICULTOR" ("ID", "NOMBRE", "APELLIDOS", "EMAIL") VALUES
  (1, 'Diego', 'Ruiz López', 'diego.ruiz@example.test'),
  (2, 'Ana', 'Vidal Sanz', 'ana.vidal@example.test')
ON CONFLICT ("ID") DO NOTHING;

INSERT INTO "ASIGNACION" ("ID_COSECHA", "ID_AGRICULTOR", "ROL") VALUES
  (7, 1, 'Recolección'),
  (7, 2, 'Clasificación'),
  (8, 1, 'Coordinación')
ON CONFLICT ("ID_COSECHA", "ID_AGRICULTOR") DO NOTHING;

SELECT setval(pg_get_serial_sequence('"AGRICULTOR"', 'ID'),
              (SELECT MAX("ID") FROM "AGRICULTOR"), true);
SELECT * FROM "ASIGNACION" ORDER BY "ID_COSECHA", "ID_AGRICULTOR";

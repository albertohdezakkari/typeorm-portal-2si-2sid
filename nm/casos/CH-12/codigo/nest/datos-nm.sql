INSERT INTO "INSPECTOR" ("ID", "NOMBRE", "APELLIDOS", "EMAIL") VALUES
  (1, 'Diego', 'Ruiz López', 'diego.ruiz@example.test'),
  (2, 'Ana', 'Vidal Sanz', 'ana.vidal@example.test')
ON CONFLICT ("ID") DO NOTHING;

INSERT INTO "ASIGNACION" ("ID_LOTE", "ID_INSPECTOR", "ROL") VALUES
  (7, 1, 'Control de calidad'),
  (7, 2, 'Trazabilidad'),
  (8, 1, 'Coordinación')
ON CONFLICT ("ID_LOTE", "ID_INSPECTOR") DO NOTHING;

SELECT setval(pg_get_serial_sequence('"INSPECTOR"', 'ID'),
              (SELECT MAX("ID") FROM "INSPECTOR"), true);
SELECT * FROM "ASIGNACION" ORDER BY "ID_LOTE", "ID_INSPECTOR";

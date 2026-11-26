INSERT INTO "MECANICO" ("ID", "NOMBRE", "APELLIDOS", "EMAIL") VALUES
  (1, 'Diego', 'Ruiz López', 'diego.ruiz@example.test'),
  (2, 'Ana', 'Vidal Sanz', 'ana.vidal@example.test')
ON CONFLICT ("ID") DO NOTHING;

INSERT INTO "ASIGNACION" ("ID_REPARACION", "ID_MECANICO", "ROL") VALUES
  (7, 1, 'Diagnóstico'),
  (7, 2, 'Reparación'),
  (8, 1, 'Coordinación')
ON CONFLICT ("ID_REPARACION", "ID_MECANICO") DO NOTHING;

SELECT setval(pg_get_serial_sequence('"MECANICO"', 'ID'),
              (SELECT MAX("ID") FROM "MECANICO"), true);
SELECT * FROM "ASIGNACION" ORDER BY "ID_REPARACION", "ID_MECANICO";

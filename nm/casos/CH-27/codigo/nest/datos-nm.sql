INSERT INTO "TECNICO" ("ID", "NOMBRE", "APELLIDOS", "EMAIL") VALUES
  (1, 'Diego', 'Ruiz López', 'diego.ruiz@example.test'),
  (2, 'Ana', 'Vidal Sanz', 'ana.vidal@example.test')
ON CONFLICT ("ID") DO NOTHING;

INSERT INTO "ASIGNACION" ("ID_PLAZA", "ID_TECNICO", "ROL") VALUES
  (7, 1, 'Inspección'),
  (7, 2, 'Mantenimiento'),
  (8, 1, 'Coordinación')
ON CONFLICT ("ID_PLAZA", "ID_TECNICO") DO NOTHING;

SELECT setval(pg_get_serial_sequence('"TECNICO"', 'ID'),
              (SELECT MAX("ID") FROM "TECNICO"), true);
SELECT * FROM "ASIGNACION" ORDER BY "ID_PLAZA", "ID_TECNICO";

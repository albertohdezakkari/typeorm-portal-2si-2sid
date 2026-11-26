INSERT INTO "COLABORADOR" ("ID", "NOMBRE", "APELLIDOS", "EMAIL") VALUES
  (1, 'Diego', 'Ruiz López', 'diego.ruiz@example.test'),
  (2, 'Ana', 'Vidal Sanz', 'ana.vidal@example.test')
ON CONFLICT ("ID") DO NOTHING;

INSERT INTO "ASIGNACION" ("ID_PROYECTO", "ID_COLABORADOR", "ROL") VALUES
  (7, 1, 'Desarrollo'),
  (7, 2, 'Diseño'),
  (8, 1, 'Coordinación')
ON CONFLICT ("ID_PROYECTO", "ID_COLABORADOR") DO NOTHING;

SELECT setval(pg_get_serial_sequence('"COLABORADOR"', 'ID'),
              (SELECT MAX("ID") FROM "COLABORADOR"), true);
SELECT * FROM "ASIGNACION" ORDER BY "ID_PROYECTO", "ID_COLABORADOR";

INSERT INTO "REVISOR" ("ID", "NOMBRE", "APELLIDOS", "EMAIL") VALUES
  (1, 'Diego', 'Ruiz López', 'diego.ruiz@example.test'),
  (2, 'Ana', 'Vidal Sanz', 'ana.vidal@example.test')
ON CONFLICT ("ID") DO NOTHING;

INSERT INTO "ASIGNACION" ("ID_DOCUMENTO", "ID_REVISOR", "ROL") VALUES
  (7, 1, 'Catalogación'),
  (7, 2, 'Verificación'),
  (8, 1, 'Coordinación')
ON CONFLICT ("ID_DOCUMENTO", "ID_REVISOR") DO NOTHING;

SELECT setval(pg_get_serial_sequence('"REVISOR"', 'ID'),
              (SELECT MAX("ID") FROM "REVISOR"), true);
SELECT * FROM "ASIGNACION" ORDER BY "ID_DOCUMENTO", "ID_REVISOR";

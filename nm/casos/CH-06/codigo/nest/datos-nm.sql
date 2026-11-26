INSERT INTO "INSTRUCTOR" ("ID", "NOMBRE", "APELLIDOS", "EMAIL") VALUES
  (1, 'Diego', 'Ruiz López', 'diego.ruiz@example.test'),
  (2, 'Ana', 'Vidal Sanz', 'ana.vidal@example.test')
ON CONFLICT ("ID") DO NOTHING;

INSERT INTO "ASIGNACION" ("ID_SESION", "ID_INSTRUCTOR", "ROL") VALUES
  (7, 1, 'Calentamiento'),
  (7, 2, 'Entrenamiento'),
  (8, 1, 'Coordinación')
ON CONFLICT ("ID_SESION", "ID_INSTRUCTOR") DO NOTHING;

SELECT setval(pg_get_serial_sequence('"INSTRUCTOR"', 'ID'),
              (SELECT MAX("ID") FROM "INSTRUCTOR"), true);
SELECT * FROM "ASIGNACION" ORDER BY "ID_SESION", "ID_INSTRUCTOR";

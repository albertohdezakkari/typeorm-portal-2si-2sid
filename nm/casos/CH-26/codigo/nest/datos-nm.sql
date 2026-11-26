INSERT INTO "DOCENTE" ("ID", "NOMBRE", "APELLIDOS", "EMAIL") VALUES
  (1, 'Diego', 'Ruiz López', 'diego.ruiz@example.test'),
  (2, 'Ana', 'Vidal Sanz', 'ana.vidal@example.test')
ON CONFLICT ("ID") DO NOTHING;

INSERT INTO "ASIGNACION" ("ID_AULA", "ID_DOCENTE", "ROL") VALUES
  (7, 1, 'Docencia'),
  (7, 2, 'Apoyo'),
  (8, 1, 'Coordinación')
ON CONFLICT ("ID_AULA", "ID_DOCENTE") DO NOTHING;

SELECT setval(pg_get_serial_sequence('"DOCENTE"', 'ID'),
              (SELECT MAX("ID") FROM "DOCENTE"), true);
SELECT * FROM "ASIGNACION" ORDER BY "ID_AULA", "ID_DOCENTE";

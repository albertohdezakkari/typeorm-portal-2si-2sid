INSERT INTO "PROFESIONAL" ("ID", "NOMBRE", "APELLIDOS", "EMAIL") VALUES
  (1, 'Diego', 'Ruiz López', 'diego.ruiz@example.test'),
  (2, 'Ana', 'Vidal Sanz', 'ana.vidal@example.test')
ON CONFLICT ("ID") DO NOTHING;

INSERT INTO "ASIGNACION" ("ID_OBRA", "ID_PROFESIONAL", "ROL") VALUES
  (7, 1, 'Electricista'),
  (7, 2, 'Arquitecta'),
  (8, 1, 'Coordinador')
ON CONFLICT ("ID_OBRA", "ID_PROFESIONAL") DO NOTHING;

SELECT setval(pg_get_serial_sequence('"PROFESIONAL"', 'ID'),
              (SELECT MAX("ID") FROM "PROFESIONAL"), true);
SELECT * FROM "ASIGNACION" ORDER BY "ID_OBRA", "ID_PROFESIONAL";

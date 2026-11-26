INSERT INTO "JARDINERO" ("ID", "NOMBRE", "APELLIDOS", "EMAIL") VALUES
  (1, 'Diego', 'Ruiz López', 'diego.ruiz@example.test'),
  (2, 'Ana', 'Vidal Sanz', 'ana.vidal@example.test')
ON CONFLICT ("ID") DO NOTHING;

INSERT INTO "ASIGNACION" ("ID_ZONA", "ID_JARDINERO", "ROL") VALUES
  (7, 1, 'Riego'),
  (7, 2, 'Poda'),
  (8, 1, 'Coordinación')
ON CONFLICT ("ID_ZONA", "ID_JARDINERO") DO NOTHING;

SELECT setval(pg_get_serial_sequence('"JARDINERO"', 'ID'),
              (SELECT MAX("ID") FROM "JARDINERO"), true);
SELECT * FROM "ASIGNACION" ORDER BY "ID_ZONA", "ID_JARDINERO";

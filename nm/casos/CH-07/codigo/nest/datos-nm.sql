INSERT INTO "GUIA" ("ID", "NOMBRE", "APELLIDOS", "EMAIL") VALUES
  (1, 'Diego', 'Ruiz López', 'diego.ruiz@example.test'),
  (2, 'Ana', 'Vidal Sanz', 'ana.vidal@example.test')
ON CONFLICT ("ID") DO NOTHING;

INSERT INTO "ASIGNACION" ("ID_EXCURSION", "ID_GUIA", "ROL") VALUES
  (7, 1, 'Guía de ruta'),
  (7, 2, 'Apoyo logístico'),
  (8, 1, 'Coordinación')
ON CONFLICT ("ID_EXCURSION", "ID_GUIA") DO NOTHING;

SELECT setval(pg_get_serial_sequence('"GUIA"', 'ID'),
              (SELECT MAX("ID") FROM "GUIA"), true);
SELECT * FROM "ASIGNACION" ORDER BY "ID_EXCURSION", "ID_GUIA";

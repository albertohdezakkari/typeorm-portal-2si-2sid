INSERT INTO "ANALISTA" ("ID", "NOMBRE", "APELLIDOS", "EMAIL") VALUES
  (1, 'Diego', 'Ruiz López', 'diego.ruiz@example.test'),
  (2, 'Ana', 'Vidal Sanz', 'ana.vidal@example.test')
ON CONFLICT ("ID") DO NOTHING;

INSERT INTO "ASIGNACION" ("ID_MUESTRA", "ID_ANALISTA", "ROL") VALUES
  (7, 1, 'Análisis'),
  (7, 2, 'Verificación'),
  (8, 1, 'Coordinación')
ON CONFLICT ("ID_MUESTRA", "ID_ANALISTA") DO NOTHING;

SELECT setval(pg_get_serial_sequence('"ANALISTA"', 'ID'),
              (SELECT MAX("ID") FROM "ANALISTA"), true);
SELECT * FROM "ASIGNACION" ORDER BY "ID_MUESTRA", "ID_ANALISTA";

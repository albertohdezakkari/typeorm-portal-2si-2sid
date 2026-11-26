INSERT INTO "MONITOR" ("ID", "NOMBRE", "APELLIDOS", "EMAIL") VALUES
  (1, 'Diego', 'Ruiz López', 'diego.ruiz@example.test'),
  (2, 'Ana', 'Vidal Sanz', 'ana.vidal@example.test')
ON CONFLICT ("ID") DO NOTHING;

INSERT INTO "ASIGNACION" ("ID_ACTIVIDAD", "ID_MONITOR", "ROL") VALUES
  (7, 1, 'Dinamización'),
  (7, 2, 'Apoyo'),
  (8, 1, 'Coordinación')
ON CONFLICT ("ID_ACTIVIDAD", "ID_MONITOR") DO NOTHING;

SELECT setval(pg_get_serial_sequence('"MONITOR"', 'ID'),
              (SELECT MAX("ID") FROM "MONITOR"), true);
SELECT * FROM "ASIGNACION" ORDER BY "ID_ACTIVIDAD", "ID_MONITOR";

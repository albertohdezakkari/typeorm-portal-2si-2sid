INSERT INTO "ENFERMERO" ("ID", "NOMBRE", "APELLIDOS", "EMAIL") VALUES
  (1, 'Diego', 'Ruiz López', 'diego.ruiz@example.test'),
  (2, 'Ana', 'Vidal Sanz', 'ana.vidal@example.test')
ON CONFLICT ("ID") DO NOTHING;

INSERT INTO "ASIGNACION" ("ID_HABITACION", "ID_ENFERMERO", "ROL") VALUES
  (7, 1, 'Cuidados'),
  (7, 2, 'Supervisión'),
  (8, 1, 'Coordinación')
ON CONFLICT ("ID_HABITACION", "ID_ENFERMERO") DO NOTHING;

SELECT setval(pg_get_serial_sequence('"ENFERMERO"', 'ID'),
              (SELECT MAX("ID") FROM "ENFERMERO"), true);
SELECT * FROM "ASIGNACION" ORDER BY "ID_HABITACION", "ID_ENFERMERO";

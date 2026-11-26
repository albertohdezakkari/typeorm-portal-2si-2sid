INSERT INTO "ENTRENADOR" ("ID", "NOMBRE", "APELLIDOS", "EMAIL") VALUES
  (1, 'Diego', 'Ruiz López', 'diego.ruiz@example.test'),
  (2, 'Ana', 'Vidal Sanz', 'ana.vidal@example.test')
ON CONFLICT ("ID") DO NOTHING;

INSERT INTO "ASIGNACION" ("ID_PISTA", "ID_ENTRENADOR", "ROL") VALUES
  (7, 1, 'Entrenamiento'),
  (7, 2, 'Supervisión'),
  (8, 1, 'Coordinación')
ON CONFLICT ("ID_PISTA", "ID_ENTRENADOR") DO NOTHING;

SELECT setval(pg_get_serial_sequence('"ENTRENADOR"', 'ID'),
              (SELECT MAX("ID") FROM "ENTRENADOR"), true);
SELECT * FROM "ASIGNACION" ORDER BY "ID_PISTA", "ID_ENTRENADOR";

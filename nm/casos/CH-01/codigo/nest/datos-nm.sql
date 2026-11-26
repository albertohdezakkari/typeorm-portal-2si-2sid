INSERT INTO "CUIDADOR" ("ID", "NOMBRE", "APELLIDOS", "EMAIL") VALUES
  (1, 'Diego', 'Ruiz López', 'diego.ruiz@example.test'),
  (2, 'Ana', 'Vidal Sanz', 'ana.vidal@example.test')
ON CONFLICT ("ID") DO NOTHING;

INSERT INTO "ASIGNACION" ("ID_ANIMAL", "ID_CUIDADOR", "ROL") VALUES
  (7, 1, 'Alimentación'),
  (7, 2, 'Seguimiento sanitario'),
  (8, 1, 'Coordinación')
ON CONFLICT ("ID_ANIMAL", "ID_CUIDADOR") DO NOTHING;

SELECT setval(pg_get_serial_sequence('"CUIDADOR"', 'ID'),
              (SELECT MAX("ID") FROM "CUIDADOR"), true);
SELECT * FROM "ASIGNACION" ORDER BY "ID_ANIMAL", "ID_CUIDADOR";

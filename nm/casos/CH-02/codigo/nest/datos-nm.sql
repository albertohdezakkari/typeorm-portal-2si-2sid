INSERT INTO "CULTIVADOR" ("ID", "NOMBRE", "APELLIDOS", "EMAIL") VALUES
  (1, 'Diego', 'Ruiz López', 'diego.ruiz@example.test'),
  (2, 'Ana', 'Vidal Sanz', 'ana.vidal@example.test')
ON CONFLICT ("ID") DO NOTHING;

INSERT INTO "ASIGNACION" ("ID_PARCELA", "ID_CULTIVADOR", "ROL") VALUES
  (7, 1, 'Siembra'),
  (7, 2, 'Riego'),
  (8, 1, 'Coordinación')
ON CONFLICT ("ID_PARCELA", "ID_CULTIVADOR") DO NOTHING;

SELECT setval(pg_get_serial_sequence('"CULTIVADOR"', 'ID'),
              (SELECT MAX("ID") FROM "CULTIVADOR"), true);
SELECT * FROM "ASIGNACION" ORDER BY "ID_PARCELA", "ID_CULTIVADOR";

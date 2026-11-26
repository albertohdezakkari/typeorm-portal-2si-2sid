INSERT INTO "RESTAURADOR" ("ID", "NOMBRE", "APELLIDOS", "EMAIL") VALUES
  (1, 'Diego', 'Ruiz López', 'diego.ruiz@example.test'),
  (2, 'Ana', 'Vidal Sanz', 'ana.vidal@example.test')
ON CONFLICT ("ID") DO NOTHING;

INSERT INTO "ASIGNACION" ("ID_PIEZA", "ID_RESTAURADOR", "ROL") VALUES
  (7, 1, 'Conservación'),
  (7, 2, 'Documentación'),
  (8, 1, 'Coordinación')
ON CONFLICT ("ID_PIEZA", "ID_RESTAURADOR") DO NOTHING;

SELECT setval(pg_get_serial_sequence('"RESTAURADOR"', 'ID'),
              (SELECT MAX("ID") FROM "RESTAURADOR"), true);
SELECT * FROM "ASIGNACION" ORDER BY "ID_PIEZA", "ID_RESTAURADOR";

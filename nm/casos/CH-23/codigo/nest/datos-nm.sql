INSERT INTO "COCINERO" ("ID", "NOMBRE", "APELLIDOS", "EMAIL") VALUES
  (1, 'Diego', 'Ruiz López', 'diego.ruiz@example.test'),
  (2, 'Ana', 'Vidal Sanz', 'ana.vidal@example.test')
ON CONFLICT ("ID") DO NOTHING;

INSERT INTO "ASIGNACION" ("ID_COMANDA", "ID_COCINERO", "ROL") VALUES
  (7, 1, 'Preparación'),
  (7, 2, 'Emplatado'),
  (8, 1, 'Coordinación')
ON CONFLICT ("ID_COMANDA", "ID_COCINERO") DO NOTHING;

SELECT setval(pg_get_serial_sequence('"COCINERO"', 'ID'),
              (SELECT MAX("ID") FROM "COCINERO"), true);
SELECT * FROM "ASIGNACION" ORDER BY "ID_COMANDA", "ID_COCINERO";

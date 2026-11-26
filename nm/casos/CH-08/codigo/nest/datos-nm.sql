INSERT INTO "PANADERO" ("ID", "NOMBRE", "APELLIDOS", "EMAIL") VALUES
  (1, 'Diego', 'Ruiz López', 'diego.ruiz@example.test'),
  (2, 'Ana', 'Vidal Sanz', 'ana.vidal@example.test')
ON CONFLICT ("ID") DO NOTHING;

INSERT INTO "ASIGNACION" ("ID_PRODUCTO", "ID_PANADERO", "ROL") VALUES
  (7, 1, 'Elaboración'),
  (7, 2, 'Control de calidad'),
  (8, 1, 'Coordinación')
ON CONFLICT ("ID_PRODUCTO", "ID_PANADERO") DO NOTHING;

SELECT setval(pg_get_serial_sequence('"PANADERO"', 'ID'),
              (SELECT MAX("ID") FROM "PANADERO"), true);
SELECT * FROM "ASIGNACION" ORDER BY "ID_PRODUCTO", "ID_PANADERO";

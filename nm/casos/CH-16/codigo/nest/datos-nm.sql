INSERT INTO "VENDEDOR" ("ID", "NOMBRE", "APELLIDOS", "EMAIL") VALUES
  (1, 'Diego', 'Ruiz López', 'diego.ruiz@example.test'),
  (2, 'Ana', 'Vidal Sanz', 'ana.vidal@example.test')
ON CONFLICT ("ID") DO NOTHING;

INSERT INTO "ASIGNACION" ("ID_ARTICULO", "ID_VENDEDOR", "ROL") VALUES
  (7, 1, 'Venta'),
  (7, 2, 'Asesoramiento'),
  (8, 1, 'Coordinación')
ON CONFLICT ("ID_ARTICULO", "ID_VENDEDOR") DO NOTHING;

SELECT setval(pg_get_serial_sequence('"VENDEDOR"', 'ID'),
              (SELECT MAX("ID") FROM "VENDEDOR"), true);
SELECT * FROM "ASIGNACION" ORDER BY "ID_ARTICULO", "ID_VENDEDOR";

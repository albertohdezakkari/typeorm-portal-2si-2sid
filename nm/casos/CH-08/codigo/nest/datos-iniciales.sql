INSERT INTO "PANADERIA" ("ID", "NOMBRE") VALUES
  (1, 'Panadería Espiga'),
  (2, 'Panadería Trigo')
ON CONFLICT ("ID") DO NOTHING;

INSERT INTO "PRODUCTO" ("ID", "NOMBRE", "PRECIO_CENTIMOS", "ID_PANADERIA") VALUES
  (7, 'Pan integral', 830, 2),
  (8, 'Caja de pastas', 650, 2),
  (9, 'Pan integral · nuevo', 1010, 1)
ON CONFLICT ("ID") DO NOTHING;

SELECT setval(pg_get_serial_sequence('"PANADERIA"', 'ID'),
              (SELECT MAX("ID") FROM "PANADERIA"), true);
SELECT * FROM "PANADERIA" ORDER BY "ID";

SELECT setval(pg_get_serial_sequence('"PRODUCTO"', 'ID'),
              (SELECT MAX("ID") FROM "PRODUCTO"), true);
SELECT * FROM "PRODUCTO" ORDER BY "ID";

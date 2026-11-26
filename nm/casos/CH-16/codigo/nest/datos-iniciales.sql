INSERT INTO "TIENDA" ("ID", "NOMBRE") VALUES
  (1, 'Tienda Esquina'),
  (2, 'Tienda Centro')
ON CONFLICT ("ID") DO NOTHING;

INSERT INTO "ARTICULO" ("ID", "NOMBRE", "STOCK", "ID_TIENDA") VALUES
  (7, 'Cuaderno azul', 72, 2),
  (8, 'Estuche verde', 60, 2),
  (9, 'Cuaderno azul · nuevo', 84, 1)
ON CONFLICT ("ID") DO NOTHING;

SELECT setval(pg_get_serial_sequence('"TIENDA"', 'ID'),
              (SELECT MAX("ID") FROM "TIENDA"), true);
SELECT * FROM "TIENDA" ORDER BY "ID";

SELECT setval(pg_get_serial_sequence('"ARTICULO"', 'ID'),
              (SELECT MAX("ID") FROM "ARTICULO"), true);
SELECT * FROM "ARTICULO" ORDER BY "ID";

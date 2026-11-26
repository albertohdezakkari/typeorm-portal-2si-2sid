INSERT INTO "ARCHIVO" ("ID", "NOMBRE") VALUES
  (1, 'Archivo Municipal'),
  (2, 'Archivo del Centro')
ON CONFLICT ("ID") DO NOTHING;

INSERT INTO "DOCUMENTO" ("ID", "NOMBRE", "PAGINAS", "ID_ARCHIVO") VALUES
  (7, 'Inventario antiguo', 95, 2),
  (8, 'Memoria del barrio', 75, 2),
  (9, 'Inventario antiguo · nuevo', 115, 1)
ON CONFLICT ("ID") DO NOTHING;

SELECT setval(pg_get_serial_sequence('"ARCHIVO"', 'ID'),
              (SELECT MAX("ID") FROM "ARCHIVO"), true);
SELECT * FROM "ARCHIVO" ORDER BY "ID";

SELECT setval(pg_get_serial_sequence('"DOCUMENTO"', 'ID'),
              (SELECT MAX("ID") FROM "DOCUMENTO"), true);
SELECT * FROM "DOCUMENTO" ORDER BY "ID";

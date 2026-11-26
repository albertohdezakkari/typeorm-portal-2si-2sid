INSERT INTO "CAFETERIA" ("ID", "NOMBRE") VALUES
  (1, 'Cafetería Plaza'),
  (2, 'Cafetería Jardín')
ON CONFLICT ("ID") DO NOTHING;

INSERT INTO "COMANDA" ("ID", "NOMBRE", "IMPORTE_CENTIMOS", "ID_CAFETERIA") VALUES
  (7, 'Comanda C-01', 1700, 2),
  (8, 'Comanda C-02', 1250, 2),
  (9, 'Comanda C-01 · nuevo', 2150, 1)
ON CONFLICT ("ID") DO NOTHING;

SELECT setval(pg_get_serial_sequence('"CAFETERIA"', 'ID'),
              (SELECT MAX("ID") FROM "CAFETERIA"), true);
SELECT * FROM "CAFETERIA" ORDER BY "ID";

SELECT setval(pg_get_serial_sequence('"COMANDA"', 'ID'),
              (SELECT MAX("ID") FROM "COMANDA"), true);
SELECT * FROM "COMANDA" ORDER BY "ID";

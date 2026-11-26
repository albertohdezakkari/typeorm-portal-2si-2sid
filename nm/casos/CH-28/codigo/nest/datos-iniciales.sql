INSERT INTO "VIVERO" ("ID", "NOMBRE") VALUES
  (1, 'Vivero Raíz'),
  (2, 'Vivero Hoja')
ON CONFLICT ("ID") DO NOTHING;

INSERT INTO "PLANTA" ("ID", "NOMBRE", "ALTURA_CM", "ID_VIVERO") VALUES
  (7, 'Lavanda', 95, 2),
  (8, 'Romero', 70, 2),
  (9, 'Lavanda · nuevo', 120, 1)
ON CONFLICT ("ID") DO NOTHING;

SELECT setval(pg_get_serial_sequence('"VIVERO"', 'ID'),
              (SELECT MAX("ID") FROM "VIVERO"), true);
SELECT * FROM "VIVERO" ORDER BY "ID";

SELECT setval(pg_get_serial_sequence('"PLANTA"', 'ID'),
              (SELECT MAX("ID") FROM "PLANTA"), true);
SELECT * FROM "PLANTA" ORDER BY "ID";

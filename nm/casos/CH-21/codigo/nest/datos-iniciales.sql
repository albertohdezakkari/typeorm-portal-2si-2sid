INSERT INTO "LABORATORIO" ("ID", "NOMBRE") VALUES
  (1, 'Laboratorio Azul'),
  (2, 'Laboratorio Verde')
ON CONFLICT ("ID") DO NOTHING;

INSERT INTO "MUESTRA" ("ID", "NOMBRE", "CANTIDAD_ML", "ID_LABORATORIO") VALUES
  (7, 'Muestra M-01', 75, 2),
  (8, 'Muestra M-02', 60, 2),
  (9, 'Muestra M-01 · nuevo', 90, 1)
ON CONFLICT ("ID") DO NOTHING;

SELECT setval(pg_get_serial_sequence('"LABORATORIO"', 'ID'),
              (SELECT MAX("ID") FROM "LABORATORIO"), true);
SELECT * FROM "LABORATORIO" ORDER BY "ID";

SELECT setval(pg_get_serial_sequence('"MUESTRA"', 'ID'),
              (SELECT MAX("ID") FROM "MUESTRA"), true);
SELECT * FROM "MUESTRA" ORDER BY "ID";

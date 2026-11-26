INSERT INTO "ESTACION" ("ID", "NOMBRE") VALUES
  (1, 'Estación Central'),
  (2, 'Estación Norte')
ON CONFLICT ("ID") DO NOTHING;

INSERT INTO "TRAYECTO" ("ID", "NOMBRE", "DISTANCIA_KM", "ID_ESTACION") VALUES
  (7, 'Ruta del valle', 215, 2),
  (8, 'Ruta de la costa', 180, 2),
  (9, 'Ruta del valle · nuevo', 250, 1)
ON CONFLICT ("ID") DO NOTHING;

SELECT setval(pg_get_serial_sequence('"ESTACION"', 'ID'),
              (SELECT MAX("ID") FROM "ESTACION"), true);
SELECT * FROM "ESTACION" ORDER BY "ID";

SELECT setval(pg_get_serial_sequence('"TRAYECTO"', 'ID'),
              (SELECT MAX("ID") FROM "TRAYECTO"), true);
SELECT * FROM "TRAYECTO" ORDER BY "ID";

INSERT INTO "MUSEO" ("ID", "NOMBRE") VALUES
  (1, 'Museo del Barrio'),
  (2, 'Museo del Centro')
ON CONFLICT ("ID") DO NOTHING;

INSERT INTO "PIEZA" ("ID", "NOMBRE", "ANTIGUEDAD_ANIOS", "ID_MUSEO") VALUES
  (7, 'Vasija azul', 150, 2),
  (8, 'Reloj de pared', 120, 2),
  (9, 'Vasija azul · nuevo', 180, 1)
ON CONFLICT ("ID") DO NOTHING;

SELECT setval(pg_get_serial_sequence('"MUSEO"', 'ID'),
              (SELECT MAX("ID") FROM "MUSEO"), true);
SELECT * FROM "MUSEO" ORDER BY "ID";

SELECT setval(pg_get_serial_sequence('"PIEZA"', 'ID'),
              (SELECT MAX("ID") FROM "PIEZA"), true);
SELECT * FROM "PIEZA" ORDER BY "ID";

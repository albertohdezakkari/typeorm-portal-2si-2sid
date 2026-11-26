INSERT INTO "EDITORIAL" ("ID", "NOMBRE") VALUES
  (1, 'Editorial Roble'),
  (2, 'Editorial Faro')
ON CONFLICT ("ID") DO NOTHING;

INSERT INTO "PUBLICACION" ("ID", "NOMBRE", "PAGINAS", "ID_EDITORIAL") VALUES
  (7, 'Rutas del Ebro', 320, 2),
  (8, 'Historias cortas', 240, 2),
  (9, 'Rutas del Ebro · nuevo', 400, 1)
ON CONFLICT ("ID") DO NOTHING;

SELECT setval(pg_get_serial_sequence('"EDITORIAL"', 'ID'),
              (SELECT MAX("ID") FROM "EDITORIAL"), true);
SELECT * FROM "EDITORIAL" ORDER BY "ID";

SELECT setval(pg_get_serial_sequence('"PUBLICACION"', 'ID'),
              (SELECT MAX("ID") FROM "PUBLICACION"), true);
SELECT * FROM "PUBLICACION" ORDER BY "ID";

INSERT INTO "CINE" ("ID", "NOMBRE") VALUES
  (1, 'Cine Alameda'),
  (2, 'Cine del Parque')
ON CONFLICT ("ID") DO NOTHING;

INSERT INTO "PROYECCION" ("ID", "PELICULA", "DURACION_MINUTOS", "ID_CINE") VALUES
  (7, 'Viaje al norte', 215, 2),
  (8, 'La última estación', 125, 2),
  (9, 'Viaje al norte · nuevo', 305, 1)
ON CONFLICT ("ID") DO NOTHING;

SELECT setval(pg_get_serial_sequence('"CINE"', 'ID'),
              (SELECT MAX("ID") FROM "CINE"), true);
SELECT * FROM "CINE" ORDER BY "ID";

SELECT setval(pg_get_serial_sequence('"PROYECCION"', 'ID'),
              (SELECT MAX("ID") FROM "PROYECCION"), true);
SELECT * FROM "PROYECCION" ORDER BY "ID";

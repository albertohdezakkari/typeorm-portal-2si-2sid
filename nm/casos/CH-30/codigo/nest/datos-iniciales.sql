INSERT INTO "TEATRO" ("ID", "NOMBRE") VALUES
  (1, 'Teatro Aurora'),
  (2, 'Teatro del Barrio')
ON CONFLICT ("ID") DO NOTHING;

INSERT INTO "FUNCION" ("ID", "NOMBRE", "AFORO", "ID_TEATRO") VALUES
  (7, 'La puerta azul', 350, 2),
  (8, 'Historias del andén', 250, 2),
  (9, 'La puerta azul · nuevo', 450, 1)
ON CONFLICT ("ID") DO NOTHING;

SELECT setval(pg_get_serial_sequence('"TEATRO"', 'ID'),
              (SELECT MAX("ID") FROM "TEATRO"), true);
SELECT * FROM "TEATRO" ORDER BY "ID";

SELECT setval(pg_get_serial_sequence('"FUNCION"', 'ID'),
              (SELECT MAX("ID") FROM "FUNCION"), true);
SELECT * FROM "FUNCION" ORDER BY "ID";

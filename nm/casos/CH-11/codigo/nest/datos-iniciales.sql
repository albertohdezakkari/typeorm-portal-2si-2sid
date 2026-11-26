INSERT INTO "HOTEL" ("ID", "NOMBRE") VALUES
  (1, 'Hotel Aurora'),
  (2, 'Hotel del Lago')
ON CONFLICT ("ID") DO NOTHING;

INSERT INTO "RESERVA" ("ID", "NOMBRE", "NOCHES", "ID_HOTEL") VALUES
  (7, 'Reserva R-101', 7, 2),
  (8, 'Reserva R-102', 5, 2),
  (9, 'Reserva R-101 · nuevo', 9, 1)
ON CONFLICT ("ID") DO NOTHING;

SELECT setval(pg_get_serial_sequence('"HOTEL"', 'ID'),
              (SELECT MAX("ID") FROM "HOTEL"), true);
SELECT * FROM "HOTEL" ORDER BY "ID";

SELECT setval(pg_get_serial_sequence('"RESERVA"', 'ID'),
              (SELECT MAX("ID") FROM "RESERVA"), true);
SELECT * FROM "RESERVA" ORDER BY "ID";

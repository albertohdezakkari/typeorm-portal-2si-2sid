INSERT INTO "HUESPED" ("ID", "NOMBRE", "APELLIDOS", "EMAIL") VALUES
  (1, 'Diego', 'Ruiz López', 'diego.ruiz@example.test'),
  (2, 'Ana', 'Vidal Sanz', 'ana.vidal@example.test')
ON CONFLICT ("ID") DO NOTHING;

INSERT INTO "ASIGNACION" ("ID_RESERVA", "ID_HUESPED", "ROL") VALUES
  (7, 1, 'Titular'),
  (7, 2, 'Acompañante'),
  (8, 1, 'Responsable del grupo')
ON CONFLICT ("ID_RESERVA", "ID_HUESPED") DO NOTHING;

SELECT setval(pg_get_serial_sequence('"HUESPED"', 'ID'),
              (SELECT MAX("ID") FROM "HUESPED"), true);
SELECT * FROM "ASIGNACION" ORDER BY "ID_RESERVA", "ID_HUESPED";

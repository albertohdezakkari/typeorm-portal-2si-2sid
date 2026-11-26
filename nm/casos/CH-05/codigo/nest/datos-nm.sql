INSERT INTO "ARTISTA" ("ID", "NOMBRE", "APELLIDOS", "EMAIL") VALUES
  (1, 'Diego', 'Ruiz López', 'diego.ruiz@example.test'),
  (2, 'Ana', 'Vidal Sanz', 'ana.vidal@example.test')
ON CONFLICT ("ID") DO NOTHING;

INSERT INTO "ASIGNACION" ("ID_ACTUACION", "ID_ARTISTA", "ROL") VALUES
  (7, 1, 'Interpretación'),
  (7, 2, 'Dirección artística'),
  (8, 1, 'Coordinación')
ON CONFLICT ("ID_ACTUACION", "ID_ARTISTA") DO NOTHING;

SELECT setval(pg_get_serial_sequence('"ARTISTA"', 'ID'),
              (SELECT MAX("ID") FROM "ARTISTA"), true);
SELECT * FROM "ASIGNACION" ORDER BY "ID_ACTUACION", "ID_ARTISTA";

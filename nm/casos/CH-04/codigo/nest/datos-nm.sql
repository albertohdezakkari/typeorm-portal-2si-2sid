INSERT INTO "AUTOR" ("ID", "NOMBRE", "APELLIDOS", "EMAIL") VALUES
  (1, 'Diego', 'Ruiz López', 'diego.ruiz@example.test'),
  (2, 'Ana', 'Vidal Sanz', 'ana.vidal@example.test')
ON CONFLICT ("ID") DO NOTHING;

INSERT INTO "ASIGNACION" ("ID_PUBLICACION", "ID_AUTOR", "ROL") VALUES
  (7, 1, 'Redacción'),
  (7, 2, 'Revisión'),
  (8, 1, 'Coordinación')
ON CONFLICT ("ID_PUBLICACION", "ID_AUTOR") DO NOTHING;

SELECT setval(pg_get_serial_sequence('"AUTOR"', 'ID'),
              (SELECT MAX("ID") FROM "AUTOR"), true);
SELECT * FROM "ASIGNACION" ORDER BY "ID_PUBLICACION", "ID_AUTOR";

INSERT INTO "INTERPRETE" ("ID", "NOMBRE", "APELLIDOS", "EMAIL") VALUES
  (1, 'Diego', 'Ruiz López', 'diego.ruiz@example.test'),
  (2, 'Ana', 'Vidal Sanz', 'ana.vidal@example.test')
ON CONFLICT ("ID") DO NOTHING;

INSERT INTO "ASIGNACION" ("ID_FUNCION", "ID_INTERPRETE", "ROL") VALUES
  (7, 1, 'Interpretación'),
  (7, 2, 'Narración'),
  (8, 1, 'Coordinación')
ON CONFLICT ("ID_FUNCION", "ID_INTERPRETE") DO NOTHING;

SELECT setval(pg_get_serial_sequence('"INTERPRETE"', 'ID'),
              (SELECT MAX("ID") FROM "INTERPRETE"), true);
SELECT * FROM "ASIGNACION" ORDER BY "ID_FUNCION", "ID_INTERPRETE";

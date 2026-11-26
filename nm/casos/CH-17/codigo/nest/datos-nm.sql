INSERT INTO "ACTOR" ("ID", "NOMBRE", "APELLIDOS", "EMAIL") VALUES
  (1, 'Diego', 'Ruiz López', 'diego.ruiz@example.test'),
  (2, 'Ana', 'Vidal Sanz', 'ana.vidal@example.test')
ON CONFLICT ("ID") DO NOTHING;

INSERT INTO "ASIGNACION" ("ID_ESCENA", "ID_ACTOR", "ROL") VALUES
  (7, 1, 'Protagonista'),
  (7, 2, 'Reparto'),
  (8, 1, 'Coordinación')
ON CONFLICT ("ID_ESCENA", "ID_ACTOR") DO NOTHING;

SELECT setval(pg_get_serial_sequence('"ACTOR"', 'ID'),
              (SELECT MAX("ID") FROM "ACTOR"), true);
SELECT * FROM "ASIGNACION" ORDER BY "ID_ESCENA", "ID_ACTOR";

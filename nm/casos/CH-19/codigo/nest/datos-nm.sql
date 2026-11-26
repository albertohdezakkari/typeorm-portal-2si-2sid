INSERT INTO "TRIPULANTE" ("ID", "NOMBRE", "APELLIDOS", "EMAIL") VALUES
  (1, 'Diego', 'Ruiz López', 'diego.ruiz@example.test'),
  (2, 'Ana', 'Vidal Sanz', 'ana.vidal@example.test')
ON CONFLICT ("ID") DO NOTHING;

INSERT INTO "ASIGNACION" ("ID_EMBARCACION", "ID_TRIPULANTE", "ROL") VALUES
  (7, 1, 'Navegación'),
  (7, 2, 'Mantenimiento'),
  (8, 1, 'Coordinación')
ON CONFLICT ("ID_EMBARCACION", "ID_TRIPULANTE") DO NOTHING;

SELECT setval(pg_get_serial_sequence('"TRIPULANTE"', 'ID'),
              (SELECT MAX("ID") FROM "TRIPULANTE"), true);
SELECT * FROM "ASIGNACION" ORDER BY "ID_EMBARCACION", "ID_TRIPULANTE";

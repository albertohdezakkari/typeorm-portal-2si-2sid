INSERT INTO "CONDUCTOR" ("ID", "NOMBRE", "APELLIDOS", "EMAIL") VALUES
  (1, 'Diego', 'Ruiz López', 'diego.ruiz@example.test'),
  (2, 'Ana', 'Vidal Sanz', 'ana.vidal@example.test')
ON CONFLICT ("ID") DO NOTHING;

INSERT INTO "ASIGNACION" ("ID_TRAYECTO", "ID_CONDUCTOR", "ROL") VALUES
  (7, 1, 'Conducción'),
  (7, 2, 'Relevo'),
  (8, 1, 'Coordinación')
ON CONFLICT ("ID_TRAYECTO", "ID_CONDUCTOR") DO NOTHING;

SELECT setval(pg_get_serial_sequence('"CONDUCTOR"', 'ID'),
              (SELECT MAX("ID") FROM "CONDUCTOR"), true);
SELECT * FROM "ASIGNACION" ORDER BY "ID_TRAYECTO", "ID_CONDUCTOR";

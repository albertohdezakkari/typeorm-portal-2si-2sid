#!/usr/bin/env bash
# Solo para una tabla nueva de referencia. En tu proyecto existente conserva sus datos.
set -e
aws dynamodb execute-statement \
  --statement "INSERT INTO \"AYUNTAMIENTOS_${TALLER_EQUIPO}\" VALUE {'AYUNTAMIENTO_ID':1,'NOMBRE':'Ayuntamiento del Río'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"AYUNTAMIENTOS_${TALLER_EQUIPO}\" VALUE {'AYUNTAMIENTO_ID':2,'NOMBRE':'Ayuntamiento del Valle'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"OBRAS_${TALLER_EQUIPO}\" VALUE {'OBRA_ID':7,'NOMBRE':'Mejora de acera','PRESUPUESTO_EUROS':15000,'AYUNTAMIENTO_ID':2}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"OBRAS_${TALLER_EQUIPO}\" VALUE {'OBRA_ID':8,'NOMBRE':'Zona de sombra','PRESUPUESTO_EUROS':12000,'AYUNTAMIENTO_ID':2}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"OBRAS_${TALLER_EQUIPO}\" VALUE {'OBRA_ID':9,'NOMBRE':'Mejora de acera · nuevo','PRESUPUESTO_EUROS':18000,'AYUNTAMIENTO_ID':1}"

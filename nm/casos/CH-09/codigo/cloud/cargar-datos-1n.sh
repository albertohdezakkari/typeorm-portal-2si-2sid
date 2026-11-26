#!/usr/bin/env bash
# Solo para una tabla nueva de referencia. En tu proyecto existente conserva sus datos.
set -e
aws dynamodb execute-statement \
  --statement "INSERT INTO \"TALLERES_${TALLER_EQUIPO}\" VALUE {'TALLER_ID':1,'NOMBRE':'Taller Norte'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"TALLERES_${TALLER_EQUIPO}\" VALUE {'TALLER_ID':2,'NOMBRE':'Taller del Barrio'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"REPARACIONES_${TALLER_EQUIPO}\" VALUE {'REPARACION_ID':7,'NOMBRE':'Ajuste de frenos','COSTE_CENTIMOS':9500,'TALLER_ID':2}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"REPARACIONES_${TALLER_EQUIPO}\" VALUE {'REPARACION_ID':8,'NOMBRE':'Cambio de cadena','COSTE_CENTIMOS':7000,'TALLER_ID':2}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"REPARACIONES_${TALLER_EQUIPO}\" VALUE {'REPARACION_ID':9,'NOMBRE':'Ajuste de frenos · nuevo','COSTE_CENTIMOS':12000,'TALLER_ID':1}"

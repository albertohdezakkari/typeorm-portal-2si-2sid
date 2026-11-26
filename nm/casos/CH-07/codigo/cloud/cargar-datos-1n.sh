#!/usr/bin/env bash
# Solo para una tabla nueva de referencia. En tu proyecto existente conserva sus datos.
set -e
aws dynamodb execute-statement \
  --statement "INSERT INTO \"AGENCIAS_${TALLER_EQUIPO}\" VALUE {'AGENCIA_ID':1,'NOMBRE':'Agencia Horizonte'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"AGENCIAS_${TALLER_EQUIPO}\" VALUE {'AGENCIA_ID':2,'NOMBRE':'Agencia Camino'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"EXCURSIONES_${TALLER_EQUIPO}\" VALUE {'EXCURSION_ID':7,'NOMBRE':'Ruta del bosque','DURACION_HORAS':8,'AGENCIA_ID':2}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"EXCURSIONES_${TALLER_EQUIPO}\" VALUE {'EXCURSION_ID':8,'NOMBRE':'Visita al castillo','DURACION_HORAS':6,'AGENCIA_ID':2}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"EXCURSIONES_${TALLER_EQUIPO}\" VALUE {'EXCURSION_ID':9,'NOMBRE':'Ruta del bosque · nuevo','DURACION_HORAS':10,'AGENCIA_ID':1}"

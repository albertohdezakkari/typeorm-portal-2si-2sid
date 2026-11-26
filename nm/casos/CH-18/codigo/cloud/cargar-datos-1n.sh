#!/usr/bin/env bash
# Solo para una tabla nueva de referencia. En tu proyecto existente conserva sus datos.
set -e
aws dynamodb execute-statement \
  --statement "INSERT INTO \"CLUBES_${TALLER_EQUIPO}\" VALUE {'CLUB_ID':1,'NOMBRE':'Club Encuentro'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"CLUBES_${TALLER_EQUIPO}\" VALUE {'CLUB_ID':2,'NOMBRE':'Club Horizonte'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ACTIVIDADES_${TALLER_EQUIPO}\" VALUE {'ACTIVIDAD_ID':7,'NOMBRE':'Taller de fotografía','PLAZAS':50,'CLUB_ID':2}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ACTIVIDADES_${TALLER_EQUIPO}\" VALUE {'ACTIVIDAD_ID':8,'NOMBRE':'Ruta urbana','PLAZAS':35,'CLUB_ID':2}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ACTIVIDADES_${TALLER_EQUIPO}\" VALUE {'ACTIVIDAD_ID':9,'NOMBRE':'Taller de fotografía · nuevo','PLAZAS':65,'CLUB_ID':1}"

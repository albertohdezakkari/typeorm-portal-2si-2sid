#!/usr/bin/env bash
# Solo para una tabla nueva de referencia. En tu proyecto existente conserva sus datos.
set -e
aws dynamodb execute-statement \
  --statement "INSERT INTO \"EMISORAS_${TALLER_EQUIPO}\" VALUE {'EMISORA_ID':1,'NOMBRE':'Radio Horizonte'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"EMISORAS_${TALLER_EQUIPO}\" VALUE {'EMISORA_ID':2,'NOMBRE':'Radio Barrio'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"PROGRAMAS_${TALLER_EQUIPO}\" VALUE {'PROGRAMA_ID':7,'NOMBRE':'Buenos días','DURACION_MINUTOS':120,'EMISORA_ID':2}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"PROGRAMAS_${TALLER_EQUIPO}\" VALUE {'PROGRAMA_ID':8,'NOMBRE':'Tarde cultural','DURACION_MINUTOS':90,'EMISORA_ID':2}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"PROGRAMAS_${TALLER_EQUIPO}\" VALUE {'PROGRAMA_ID':9,'NOMBRE':'Buenos días · nuevo','DURACION_MINUTOS':150,'EMISORA_ID':1}"

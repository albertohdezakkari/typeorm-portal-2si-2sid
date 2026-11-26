#!/usr/bin/env bash
# Solo para una tabla nueva de referencia. En tu proyecto existente conserva sus datos.
set -e
aws dynamodb execute-statement \
  --statement "INSERT INTO \"PUERTOS_${TALLER_EQUIPO}\" VALUE {'PUERTO_ID':1,'NOMBRE':'Puerto del Mar'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"PUERTOS_${TALLER_EQUIPO}\" VALUE {'PUERTO_ID':2,'NOMBRE':'Puerto del Faro'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"EMBARCACIONES_${TALLER_EQUIPO}\" VALUE {'EMBARCACION_ID':7,'NOMBRE':'Brisa','ESLORA_METROS':20,'PUERTO_ID':2}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"EMBARCACIONES_${TALLER_EQUIPO}\" VALUE {'EMBARCACION_ID':8,'NOMBRE':'Albatros','ESLORA_METROS':14,'PUERTO_ID':2}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"EMBARCACIONES_${TALLER_EQUIPO}\" VALUE {'EMBARCACION_ID':9,'NOMBRE':'Brisa · nuevo','ESLORA_METROS':26,'PUERTO_ID':1}"

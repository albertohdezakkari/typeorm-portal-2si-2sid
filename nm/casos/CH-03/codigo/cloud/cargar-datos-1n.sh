#!/usr/bin/env bash
# Solo para una tabla nueva de referencia. En tu proyecto existente conserva sus datos.
set -e
aws dynamodb execute-statement \
  --statement "INSERT INTO \"MUSEOS_${TALLER_EQUIPO}\" VALUE {'MUSEO_ID':1,'NOMBRE':'Museo del Barrio'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"MUSEOS_${TALLER_EQUIPO}\" VALUE {'MUSEO_ID':2,'NOMBRE':'Museo del Centro'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"PIEZAS_${TALLER_EQUIPO}\" VALUE {'PIEZA_ID':7,'NOMBRE':'Vasija azul','ANTIGUEDAD_ANIOS':150,'MUSEO_ID':2}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"PIEZAS_${TALLER_EQUIPO}\" VALUE {'PIEZA_ID':8,'NOMBRE':'Reloj de pared','ANTIGUEDAD_ANIOS':120,'MUSEO_ID':2}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"PIEZAS_${TALLER_EQUIPO}\" VALUE {'PIEZA_ID':9,'NOMBRE':'Vasija azul · nuevo','ANTIGUEDAD_ANIOS':180,'MUSEO_ID':1}"
